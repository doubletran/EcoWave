import {addDoc, collection, GeoPoint, getDocs, Timestamp} from 'firebase/firestore';

import firebase from '../config/firebase';

const EventsDB = collection(firebase, 'events');

export async function getAll() {
  const querySnapshot = await getDocs(db);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
}

export async function get(id) {
  const document = await getDoc(doc(EventsDB, id));
  console.log(' get:' + JSON.stringify(document.data()));
}

export async function create({title, description, latitude, longtitude, time}) {
  return await addDoc(EventsDB, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longtitude),
    create_time: Timestamp.fromDate(new Date()),
    time: time,
    problemRef: "undefined"
  });
}

export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}
