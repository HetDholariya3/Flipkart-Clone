// Add to Cart Functionality with Quantity Management
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  // Update cart counter on page load
  updateCartCounter();

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");

      const productName =
        productCard.querySelector(".product-title")?.textContent.trim() ||
        "Unnamed";
      const priceText =
        productCard.querySelector(".product-price")?.textContent || "₹0";
      const originalPriceText =
        productCard.querySelector(".original-price")?.textContent || "₹0";
      const imageSrc = productCard.querySelector(".product-image")?.src || "";

      const productPrice = parseInt(priceText.replace(/[^\d]/g, "")) || 0;
      const originalPrice =
        parseInt(originalPriceText.replace(/[^\d]/g, "")) || 0;

      if (!productPrice || !originalPrice) {
        alert("Error: Couldn't read product prices correctly.");
        return;
      }

      const product = {
        name: productName,
        price: productPrice,
        originalPrice: originalPrice,
        image: imageSrc,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingIndex = cart.findIndex(
        (item) => item.name === product.name
      );

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();

      alert(`${product.name} added to cart!`);
    });
  });
});

// Update Cart Counter Badge
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCounter = document.querySelector(".cart-counter");
  if (cartCounter) {
    cartCounter.textContent = totalItems > 0 ? totalItems : "";
  }
}


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const productCards = document.querySelectorAll(".product-card");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();

        let anyVisible = false;

        productCards.forEach(card => {
            const title = card.querySelector(".product-title").textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = "block";
                anyVisible = true;
            } else {
                card.style.display = "none";
            }
        });

        // Optional: Show a message if no product found
        const noResults = document.getElementById("no-results");
        if (!anyVisible) {
            if (!noResults) {
                const message = document.createElement("p");
                message.textContent = "No products found.";
                message.id = "no-results";
                document.querySelector(".products-grid").appendChild(message);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    });
});
