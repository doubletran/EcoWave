import firebase from "../config/firebase";
import { GeoPoint, Timestamp } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
const EventsDB= collection(firebase, "events");


export async function getAll() {

  const querySnapshot = await getDocs(db);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
export async function get(id){
  const document = await getDoc(doc(db,id ));
  console.log(" get:"+ JSON.stringify(document.data()));
}


export async function create({ title, latitude, longtitude, time  }) {
  return await addDoc(db, {
    title: title,
    context: context,
    location: new GeoPoint(latitude, longtitude),
    create_time: Timestamp.fromDate(new Date()),
    time: Timestamp.fromDate(new Date(time)),

  });
}
export async function remove(id) {
  console.log("Deleted: at" + await deleteDoc(doc(db, id)));
}
