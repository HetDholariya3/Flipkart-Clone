// Load cart from localStorage or initialize empty array
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count in header and elsewhere
function updateCartCount() {
  const count = cart.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0),0
  );
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) cartCountElem.textContent = count;
}

// Remove item by index
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
  updateCartCount();
}

// Change quantity by index and delta (+1 or -1)
function changeQuantity(index, delta) {
  if (cart[index]) {
    let newQty = Number(cart[index].quantity) + delta;
    if (newQty < 1) newQty = 1; // Minimum quantity 1
    cart[index].quantity = newQty;
    saveCart();
    renderCartItems();
    updateCartCount();
  }
}

// Render cart items on page
function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const emptyCartMsg = container.querySelector(".empty-cart");

  if (cart.length === 0) {
    if (emptyCartMsg) emptyCartMsg.style.display = "block";
    container.innerHTML = "";
    container.appendChild(emptyCartMsg);
    updateSummary(0, 0, 0);
    return;
  } else {
    if (emptyCartMsg) emptyCartMsg.style.display = "none";
  }

  container.innerHTML = ""; // Clear existing

  let totalPrice = 0;
  let totalOriginal = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price) || 0;
    const originalPrice = Number(item.originalPrice) || 0;
    const quantity = Number(item.quantity) || 0;

    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <img class="cart-item-image" src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">
          ₹${price.toLocaleString()} 
          <span class="original-price">₹${originalPrice.toLocaleString()}</span>
          <span class="discount">(${
            originalPrice > 0
              ? Math.round(100 - (price / originalPrice) * 100)
              : 0
          }% OFF)</span>
        </p>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
            <input class="quantity-input" type="text" value="${quantity}" readonly />
            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
          </div>
          <span class="remove-item" data-index="${index}">Remove</span>
        </div>
      </div>
    `;
    container.appendChild(itemEl);

    totalPrice += price * quantity;
    totalOriginal += originalPrice * quantity;
  });

  const discount = totalOriginal - totalPrice;
  updateSummary(cart.length, totalPrice, discount);
}

// Update price summary on the right
function updateSummary(totalItems, totalPrice, discount = 0) {
  totalItems = Number(totalItems) || 0;
  totalPrice = Number(totalPrice) || 0;
  discount = Number(discount) || 0;
  const finalPrice = totalPrice; // You can add delivery charge logic if needed

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById(
    "total-price"
  ).textContent = `₹${totalPrice.toLocaleString()}`;
  document.getElementById(
    "total-discount"
  ).textContent = `-₹${discount.toLocaleString()}`;
  document.getElementById(
    "final-price"
  ).textContent = `₹${finalPrice.toLocaleString()}`;
}

// Event delegation for quantity buttons and remove links
document
  .getElementById("cart-items-container")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-btn")) {
      const index = +e.target.dataset.index;
      const action = e.target.dataset.action;
      if (action === "increase") changeQuantity(index, 1);
      else if (action === "decrease") changeQuantity(index, -1);
    } else if (e.target.classList.contains("remove-item")) {
      const index = +e.target.dataset.index;
      removeItem(index);
    }
  });

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems();
});


document
  .getElementById("place-order-btn")
  .addEventListener("click", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty! Please add items before placing an order.");
      return;
    }

    // You can add logic here to save order or send to server (in future)
    alert("Order placed successfully! Thank you for shopping with us.");

    // Clear cart and redirect to homepage
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html"; // Create this page if needed
  });
