import {addDoc, collection, deleteDoc, doc, FieldValue, GeoPoint, getDoc, getDocs, increment, query, Timestamp, updateDoc, where} from 'firebase/firestore';

import firebase from '../config/firebase';

const db = collection(firebase, 'problems');

export async function getAll() {
  const querySnapshot = await getDocs(db);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
}
export async function get(id) {
  const document = await getDoc(doc(db, id));
  console.log(' get:' + JSON.stringify(document.data()));
}

export async function create({title, latitude, longtitude, description}) {
  return await addDoc(db, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longtitude),
    time: Timestamp.fromDate(new Date()),
    flag: 0,
  });
}
export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}

export async function flag(id, factor) {
  await updateDoc(doc(db, id), {'flag': increment(factor)});
}
