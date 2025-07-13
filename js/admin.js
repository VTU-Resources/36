// admin.js – Logic for admin.html panel with login authentication

document.addEventListener("DOMContentLoaded", function () {
  const loginWrapper = document.getElementById("adminLoginWrapper");
  const panelWrapper = document.getElementById("adminPanelWrapper");
  const loginForm = document.getElementById("adminLoginForm");

  const storedSession = sessionStorage.getItem("adminLoggedIn");
  if (storedSession === "true") {
    loginWrapper.style.display = "none";
    panelWrapper.style.display = "block";
    initAdminPanel();
  } else {
    loginWrapper.style.display = "block";
    panelWrapper.style.display = "none";
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("adminUser").value.trim();
    const pass = document.getElementById("adminPass").value.trim();
    if (user === "sc" && pass === "cs") {
      sessionStorage.setItem("adminLoggedIn", "true");
      loginWrapper.style.display = "none";
      panelWrapper.style.display = "block";
      initAdminPanel();
    } else {
      alert("Invalid credentials. Try again.");
    }
  });

  function initAdminPanel() {
    const form = document.getElementById("noteForm");
    const noteList = document.getElementById("noteList");
    const previewImg = document.getElementById("previewImg");

    document.getElementById("noteImage").addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => (previewImg.src = reader.result);
        reader.readAsDataURL(file);
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const id = Date.now().toString();
      const name = document.getElementById("noteName").value;
      const category = document.getElementById("noteCategory").value;
      const price = parseInt(document.getElementById("notePrice").value);
      const discount = parseInt(document.getElementById("noteDiscount").value || 0);
      const description = document.getElementById("noteDesc").value;
      const tags = document.getElementById("noteTags").value.split(",").map((t) => t.trim());
      const image = previewImg.src;

      const newNote = { id, name, category, price, discount, description, tags, image };
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(newNote);
      localStorage.setItem("notes", JSON.stringify(notes));

      alert("Note added successfully!");
      form.reset();
      previewImg.src = "images/default-thumbnail.jpg";
      renderNotes();
    });

    function renderNotes() {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      noteList.innerHTML = "<h2>📝 All Notes</h2>" +
        notes.map((note) => `
        <div class="admin-note-card">
          <img src="${note.image}" alt="${note.name}" />
          <div>
            <strong>${note.name}</strong>
            <p>₹${note.price} → ₹${note.price - (note.discount || 0)}</p>
            <p>${note.category}</p>
            <button onclick="deleteNote('${note.id}')">Delete</button>
          </div>
        </div>`).join("");
    }

    window.deleteNote = function (id) {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter((n) => n.id !== id);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    };

    renderNotes();
  }
});