// --- Initialize AOS Animation Library ---
AOS.init({
    duration: 1000,
    once: false,
});

// --- CART SYSTEM ---
let cart = [];
let totalPrice = 0;

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function addToCart(name, price, img) {
    cart.push({ name, price, img });
    updateCartUI();
    if (!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countDisplay = document.getElementById('cart-count');
    const countNav = document.getElementById('cart-count-nav');
    const totalDisplay = document.getElementById('cart-total-price');

    container.innerHTML = '';
    totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: #999;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            totalPrice += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
                </div>
            `;
        });
    }

    countDisplay.innerText = cart.length;
    countNav.innerText = cart.length;
    totalDisplay.innerText = '₹' + totalPrice;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    openOrder("Cart Checkout", "₹" + totalPrice);
    toggleCart();
}

// --- ORDER MODAL LOGIC ---
const modal = document.getElementById('orderModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');

function openOrder(name, price) {
    modalTitle.innerText = "Order: " + name;
    modalPrice.innerText = "Total Amount: " + price;
    modal.style.display = 'flex';
}

function closeOrder() {
    modal.style.display = 'none';
    document.getElementById('custName').value = '';
    document.getElementById('custMobile').value = '';
    document.getElementById('custCity').value = '';
    document.getElementById('custAddr').value = '';
}

function confirmOrder() {
    const name = document.getElementById('custName').value;
    const mobile = document.getElementById('custMobile').value;
    const city = document.getElementById('custCity').value;
    const addr = document.getElementById('custAddr').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (name === '' || addr === '' || mobile === '' || city === '') {
        alert('Please fill in all details to place your order!');
    } else {
        const isCartCheckout = modalTitle.innerText === "Order: Cart Checkout";
        const total = isCartCheckout ? '₹' + totalPrice : modalPrice.innerText;
        alert(
            'Thank you, ' + name + '!\n' +
            'Your order has been placed successfully.\n' +
            'Total: ' + total + '\n' +
            'Payment Method: ' + payment + '\n\n' +
            'We will deliver to: ' + addr + ', ' + city
        );
        cart = [];
        updateCartUI();
        closeOrder();
    }
}

// --- Close modal on outside click ---
window.onclick = function (event) {
    if (event.target === modal) {
        closeOrder();
    }
};
