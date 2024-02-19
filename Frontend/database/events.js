import {addDoc, collection, GeoPoint, getDocs, Timestamp, query, getDocsFromServer, updateDoc, doc } from 'firebase/firestore';

import firebase from '../config/firebase';

const db = collection(firebase, 'events');

export async function getAll() {
  const querySnapshot = await getDocsFromServer(collection(firebase, "events"));
  let events = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data()); 
    let data = doc.data();
    events.push(Object.assign(data, {id: doc.id}))
  })
  return events
}

export async function get(id) {
  const document = await getDoc(doc(EventsDB, id));
  console.log(' get:' + JSON.stringify(document.data()));
}
export async function getMyEvent(userId){
  const document = await getDoc(doc(EventsDB, {'userId': userId}));
  return document
}

export async function create({title, description, latitude, longtitude, problemRef,  time, userId}) {
  return await addDoc(EventsDB, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longtitude),
    create_time: Timestamp.fromDate(new Date()),
    time: time,
    participants: [userId],
    problemRef: problemRef
  });
}

export async function update(eventId, updates) {
  let ref = doc(firebase, "events", eventId)
  return await updateDoc(ref, updates)
}


export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}
