// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const googleAPI = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = process.env.EXPO_PUBLIC_FIREBASE_CONFIGs

app = initializeApp(firebaseConfig);

firebase= getFirestore(app)
export default firebase;
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// try {
//   const docRef = await 
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// export default class Firebase{

 
//   constructor(){
//     try {
//       addDoc(collection(db, "Problems"), {
//             first: "Ada",
//             last: "Lovelace",
//             born: 1815
//           });

//      getDocs(collection(db, "Problems"))
//      .then((result) => {
//       console.log(result);
//      }).catch((err) => {
//       console.log('init')
//       console.log(err)
//      });
//     } catch(e) {
//       console.log("catch"  +e);
//     }
    
//   }

// }