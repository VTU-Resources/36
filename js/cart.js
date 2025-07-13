// cart.js – Logic for cart.html and checkout.html pages

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((id) => {
      const item = notes.find((n) => n.id === id);
      if (!item) return;
      const price = item.price - (item.discount || 0);
      total += price;
      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" class="cart-thumb" />
          <div class="cart-details">
            <strong>${item.name}</strong>
            <p>₹${item.price} → ₹${price}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    });

    totalPriceEl.innerText = `₹${total}`;
    localStorage.setItem("cartTotal", total);
  }

  window.removeFromCart = function (id) {
    cart = cart.filter((item) => item !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("✅ Checkout successful! (Simulated)");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");
      window.location.href = "index.html";
    });
  }

  renderCart();
});