// main.js – Real-time VTU Notes with Firestore, Search, Dark Mode, Cart, Categories

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getFirestore, collection, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// 🔧 Your Firebase Config – replace with your values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesRef = collection(db, "notes");

// 🎯 DOM Elements
const noteContainer = document.getElementById("latest-notes");
const categoryContainer = document.getElementById("featured-categories");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("searchInput");

let allNotes = [];

function renderNotes(notes) {
  if (!noteContainer) return;
  noteContainer.innerHTML = "";

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <a href="product.html?id=${note.id}">
        <img src="${note.image || 'https://via.placeholder.com/150'}" alt="${note.name}" />
        <h3>${note.name}</h3>
        <p class="price">₹${note.price - (note.discount || 0)} 
        ${note.discount ? `<span class="old-price">₹${note.price}</span>` : ''}</p>
      </a>
      <button onclick="addToCart('${note.id}')">Add to Cart</button>
    `;
    noteContainer.appendChild(card);
  });
}

// 📦 Render categories from notes
function renderCategories(notes) {
  if (!categoryContainer) return;
  const categories = [...new Set(notes.map(n => n.category))];
  categoryContainer.innerHTML = categories
    .map(cat => `
      <a href="category.html?name=${encodeURIComponent(cat)}">
        <div class="note-card">
          <img src="images/default-thumbnail.jpg" alt="${cat}" />
          <h3>${cat} Notes</h3>
        </div>
      </a>
    `).join("");
}

// 🔄 Sync from Firestore live
onSnapshot(notesRef, snapshot => {
  allNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderNotes(allNotes);
  renderCategories(allNotes);
});

// 🔍 Search
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = allNotes.filter(n => n.name.toLowerCase().includes(keyword));
    renderNotes(filtered);
  });
}

// 🛒 Add to Cart
window.addToCart = function (id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Note added to cart!");
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = cart.length;
  }
};

// 🌓 Dark Mode Toggle
window.toggleDarkMode = function () {
  document.body.classList.toggle("dark-mode");
};
