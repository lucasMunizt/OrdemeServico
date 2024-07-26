import { db } from './configDataBase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
