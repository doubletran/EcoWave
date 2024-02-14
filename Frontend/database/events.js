import {addDoc, collection, GeoPoint, getDocs, Timestamp, query } from 'firebase/firestore';

import firebase from '../config/firebase';

const db = collection(firebase, 'events');

export async function getAll() {
  const querySnapshot = await getDocs(collection(firebase, "events"));
  return querySnapshot
}

export async function get(id) {
  const document = await getDoc(doc(EventsDB, id));
  console.log(' get:' + JSON.stringify(document.data()));
}

export async function create({title, description, latitude, longtitude, problemRef,  time, userId}) {
  return await addDoc(EventsDB, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longtitude),
    create_time: Timestamp.fromDate(new Date()),
    time: time,
    userId: userId,
    problemRef: problemRef
  });
}


export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}
