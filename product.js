document.addEventListener('DOMContentLoaded', function() {
    // Product image zoom
    const productImage = document.querySelector('.product-main-image');
    if (productImage) {
        productImage.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    }
    
    // Quantity selector
    const minusBtn = document.querySelector('.quantity-minus');
    const plusBtn = document.querySelector('.quantity-plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = document.querySelector('.product-title').textContent;
            const price = parseFloat(document.querySelector('.current-price').textContent.replace('₹', ''));
            const image = document.querySelector('.product-main-image').src;
            
            addToCart(productId, productName, price, image);
        });
    }
});