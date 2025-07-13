// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAP45c8oVZ16_zikJvEUlqrxWm8Ta_VQA",
  authDomain: "vtu-notes-store.firebaseapp.com",
  databaseURL: "https://vtu-notes-store-default-rtdb.firebaseio.com",
  projectId: "vtu-notes-store",
  storageBucket: "vtu-notes-store.appspot.com", // ✅ fixed domain!
  messagingSenderId: "651603149035",
  appId: "1:651603149035:web:c7ca6564952fc05fb1beae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Make available globally
window.firebaseApp = app;
window.firebaseDB = database;
window.firebaseStorage = storage;
window.push = push;
window.ref = ref;
window.onValue = onValue;
window.set = set;
window.sRef = sRef;
window.uploadBytes = uploadBytes;
window.getDownloadURL = getDownloadURL;
