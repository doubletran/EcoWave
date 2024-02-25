import {addDoc, collection, deleteDoc, doc, getDocsFromServer, FieldValue, GeoPoint, getDoc, getDocs, increment, query, Timestamp, updateDoc, where} from 'firebase/firestore';

import firebase from '../config/firebase';
import * as geofire from 'geofire-common';
const db = collection(firebase, 'problems');

export async function getAll() {
  const querySnapshot = await getDocsFromServer(db);
  let problems = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let data = doc.data();
    problems.push(Object.assign(data, { id: doc.id }));
  });
  return problems;
}


export async function getKNN(k=3, {latitude, longitude}) {
  let radius = 5000;
  const center = [latitude, longitude]
  
  while (problems.length < k){
    const bounds = geofire.geohashQueryBounds(center, radius);
    let problems = []
    for (const b of bounds){
      const q = query(
        collection(db), 
        orderBy('geohash'), 
        startAt(b[0]), 
        endAt(b[1]));
    
      problems.push(await getDocs(q));
    }
    radius += 500
  }
  return problems;
}


export async function get(id) {
  const document = await getDoc(doc(db, id));
  console.log(' get:' + JSON.stringify(document.data()));
  return document.data()
}

export async function create({title, latitude, longitude, description, images, userId, types}) {
  const docRef =  await addDoc(db, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longitude),
    geohash: geofire.geohashForLocation([latitude,longitude ]),
    time: Timestamp.fromDate(new Date()),
    types: types,
    flag: 0,
    userId: userId,
    images: images
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef

}
export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}

export async function flag(id, factor) {
  await updateDoc(doc(db, id), {'flag': increment(factor)});
}
 