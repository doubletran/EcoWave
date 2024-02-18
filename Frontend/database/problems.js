import {addDoc, collection, deleteDoc, doc, FieldValue, GeoPoint, getDoc, getDocs, increment, query, Timestamp, updateDoc, where} from 'firebase/firestore';

import firebase from '../config/firebase';
import * as geofire from 'geofire-common';
const db = collection(firebase, 'problems');

export async function getAll() {
  const querySnapshot = await getDocs(db);
  let problems = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data()); 
    const data = doc.data();
    problems.push({
      id: doc.id,
      title: data.title,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      description: data.description,
      imageUrl: data.imageUrl
    })
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
}

export async function create({title, latitude, longitude, description, imageUrl, userId}) {
  return await addDoc(db, {
    title: title,
    description: description,
    location: new GeoPoint(latitude, longitude),
    geohash: geofire.geohashForLocation([latitude,longitude ]),
    time: Timestamp.fromDate(new Date()),
    flag: 0,
    userId: userId,
    imageUrl: imageUrl,
  });
}
export async function remove(id) {
  console.log('Deleted: at' + await deleteDoc(doc(db, id)));
}

export async function flag(id, factor) {
  await updateDoc(doc(db, id), {'flag': increment(factor)});
}
 