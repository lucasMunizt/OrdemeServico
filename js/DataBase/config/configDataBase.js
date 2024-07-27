import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHx8UWBtj114TXB8s3l9BAPCTLAJ3n9m4",
    authDomain: "ordem-servico-7a8fe.firebaseapp.com",
    databaseURL: "https://ordem-servico-7a8fe-default-rtdb.firebaseio.com",
    projectId: "ordem-servico-7a8fe",
    storageBucket: "ordem-servico-7a8fe.appspot.com",
    messagingSenderId: "877530828399",
    appId: "1:877530828399:web:b702f8f1fff05f7a5a879a",
    measurementId: "G-NS998C5SQS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInWithEmailAndPassword };
