import {addDoc, collection, GeoPoint, getDocs, Timestamp, query, getDocsFromServer, updateDoc, doc } from 'firebase/firestore';

import firebase from '../config/firebase';
import * as geofire from 'geofire-common'

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

export async function create({title, description, latitude, longitude, address, problemRef,  start, end, userId}) {
  console.log(start)
  return await addDoc(db, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longitude),
    address: address,
   geohash: geofire.geohashForLocation([latitude,longitude ]),
    time: {
      start: Timestamp.fromDate(start),
      end: Timestamp.fromDate(end)
    },
    participants: [userId]
    // problemRef: problemRef
  });
}

export async function update(eventId, updates) {
  let ref = doc(firebase, "events", eventId)
  return await updateDoc(ref, updates)
}


export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}
