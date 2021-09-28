import { initializeApp, getApps } from "firebase/app";
import { getFirestore, addDoc, collection } from "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4GCsE4F9NgOBgiv1XsnEPUsi-IywOejg",
  authDomain: "tayspotify-app.firebaseapp.com",
  projectId: "tayspotify-app",
  storageBucket: "tayspotify-app.appspot.com",
  messagingSenderId: "555995158468",
  appId: "1:555995158468:web:e87c002906784cf176f691",
  measurementId: "G-JFE4KHL6EN"
};
let app;
if (!getApps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}


export default { app };

