import {
  addDoc,
  collection,
  GeoPoint,
  Timestamp,
  getDocsFromServer,
  updateDoc,
  doc,
  getDoc,
  query,
  getDocs,
  where,
  orderBy
} from "firebase/firestore";

import firebase from "../config/firebase";
import * as geofire from "geofire-common";
import { useAuth } from "@clerk/clerk-expo";
const EventsDB = collection(firebase, "events");

export async function getAll() {
  const querySnapshot = await getDocsFromServer(EventsDB, orderBy("date"))
  let events = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let data = doc.data();
    events.push(Object.assign(data, { id: doc.id }));
  });
  return events;
}

export async function get(id) {
  const document = await getDoc(doc(EventsDB, id));
  //console.log(' get:' + JSON.stringify(document.data()));
  return document;
}
export function filterByTypes(types) {
  return where("types", "array-contains-any", types);
}
// export function queryByDate(start, end){
//   return query(EventsDB, and (where("time.start", ">=", start), where ("time.end", "<=", end)))
// }
// export function queryByCap(low, high){
//   return query(EventsDB, and(where("capacity", ">=", low), where("capacity", "<=", high)))
// }

export async function queryWithFilter(types, dateRange, capRange) {
  let events = [];
  let q;
  if (types.length > 0) {
    q = query(EventsDB, filterByTypes(types), orderBy("time.start"));
  } else {
    q = query(EventsDB);
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let data = doc.data();
    events.push(Object.assign(data, { id: doc.id }));
  });

  return events;
}
export async function getEventsByProblem(problemId) {
  const q = query(EventsDB, where("problemId", "==", problemId));
  const querySnapshot = await getDocs(q);
  let events = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let data = doc.data();
    events.push(Object.assign(data, { id: doc.id }));
  });
  return events;
}

export async function getMyEvent(userId) {
  const q = query(EventsDB,  where("participants", "array-contains", userId))
  let events = [];
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let data = doc.data();
    events.push(Object.assign(data, { id: doc.id }));
  });
  return events;
}

export async function create({
  name,
  description,
  latitude,
  longitude,
  address,
  userId,
  images,
  problemId,
  capacity,
  types,
  start,
  end,
}) {

  return await addDoc(EventsDB, {
    name: name,
    description: description,
    location: new GeoPoint(latitude, longitude),
    address: address,
    types: types,
    geohash: geofire.geohashForLocation([latitude, longitude]),
    time: {
      start: Timestamp.fromDate(start),
      end: Timestamp.fromDate(end),
    },
    images: images,
    capacity: capacity,
    participants: [userId],
    problemId: problemId ? problemId: null
  });
}

export async function update(eventId, updates) {
  let ref = doc(firebase, "events", eventId);
  return await updateDoc(ref, updates);
}

export async function remove(id) {
  console.log("Deleted: at" + (await deleteDoc(doc(db, id))));
}
