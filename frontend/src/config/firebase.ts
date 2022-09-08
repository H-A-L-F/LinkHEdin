// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { collection, CollectionReference, DocumentData, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZAob7DSr978Oa6SG5_VQ8yzfjekEzNQY",
    authDomain: "linkhedin-e627d.firebaseapp.com",
    projectId: "linkhedin-e627d",
    storageBucket: "linkhedin-e627d.appspot.com",
    messagingSenderId: "742607851462",
    appId: "1:742607851462:web:1fca2044af002a06c4acc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const storage = getStorage(app)

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}