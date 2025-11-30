// ===== Menu Data =====
const menuArray = [
    {
        id: 1,
        name: 'Burger',
        emoji: '🍔',
        ingredients: ['beef', 'cheese', 'lettuce'],
        price: 14
    },
    {
        id: 2,
        name: 'Pizza',
        emoji: '🍕',
        ingredients: ['pepperoni', 'mushroom', 'mozarella'],
        price: 12
    },
    {
        id: 3,
        name: 'Soda',
        emoji: '🥤',
        ingredients: ['ice', 'fizz'],
        price: 5
    }
]

// ===== State Variables =====
let orderArray = []
let orderTotal = 0
let offerShown = false
let lastAddedItemId = null

// ===== DOM Elements =====
const menuItemsEl = document.getElementById('menu-items')
const orderItemsEl = document.getElementById('order-items')
const orderTotalEl = document.getElementById('order-total')
const completeOrderBtn = document.getElementById('complete-order-btn')
const checkoutModal = document.getElementById('checkout-modal')
const paymentForm = document.getElementById('payment-form')
const orderConfirmation = document.getElementById('order-confirmation')
const customerNameEl = document.getElementById('customer-name')
const offerModal = document.getElementById('offer-modal')
const acceptOfferBtn = document.getElementById('accept-offer-btn')
const declineOfferBtn = document.getElementById('decline-offer-btn')

// ===== Initialization =====
function init() {
    renderMenu()
    loadOrderFromStorage()
    setupEventListeners()
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Event delegation for add buttons
    menuItemsEl.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-btn')) {
            const itemId = parseInt(e.target.dataset.itemId)
            addToOrder(itemId)
        }
    })

    // Event delegation for remove buttons
    orderItemsEl.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const orderIndex = parseInt(e.target.dataset.orderIndex)
            removeFromOrder(orderIndex)
        }
    })

    // Complete order button
    completeOrderBtn.addEventListener('click', function() {
        openCheckoutModal()
    })

    // Payment form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault()
        processPayment()
    })

    // Close modal when clicking outside
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            closeCheckoutModal()
        }
    })

    // Offer modal buttons
    acceptOfferBtn.addEventListener('click', function() {
        addDiscountedSoda()
        closeOfferModal()
    })

    declineOfferBtn.addEventListener('click', function() {
        closeOfferModal()
    })

    // Close offer modal when clicking outside
    offerModal.addEventListener('click', function(e) {
        if (e.target === offerModal) {
            closeOfferModal()
        }
    })
}

// ===== Render Functions =====
function renderMenu() {
    const menuHtml = menuArray.map(item => {
        return `
            <div class="menu-item">
                <span class="menu-item-emoji">${item.emoji}</span>
                <div class="menu-item-info">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <p class="menu-item-ingredients">${item.ingredients.join(', ')}</p>
                    <p class="menu-item-price">$${item.price}</p>
                </div>
                <button class="add-btn" data-item-id="${item.id}">+</button>
            </div>
        `
    }).join('')

    menuItemsEl.innerHTML = menuHtml
}

function renderOrder() {
    if (orderArray.length === 0) {
        orderItemsEl.innerHTML = ''
        orderTotalEl.classList.add('hidden')
        completeOrderBtn.classList.add('hidden')
        return
    }

    const orderHtml = orderArray.map((item, index) => {
        return `
            <div class="order-item">
                <div class="order-item-left">
                    <h4 class="order-item-name">${item.name}</h4>
                    <button class="remove-btn" data-order-index="${index}">remove</button>
                </div>
                <span class="order-item-price">$${item.price}</span>
            </div>
        `
    }).join('')

    orderItemsEl.innerHTML = orderHtml

    // Calculate and display total
    orderTotal = orderArray.reduce((total, item) => total + item.price, 0)
    
    orderTotalEl.innerHTML = `
        <span class="order-total-label">Total price:</span>
        <span class="order-total-amount">$${orderTotal}</span>
    `
    
    orderTotalEl.classList.remove('hidden')
    completeOrderBtn.classList.remove('hidden')
}

// ===== Order Management Functions =====
function addToOrder(itemId) {
    const menuItem = menuArray.find(item => item.id === itemId)
    
    if (menuItem) {
        orderArray.push({ ...menuItem })
        lastAddedItemId = itemId
        renderOrder()
        saveOrderToStorage()
        
        // Show offer modal if item is not Soda and offer hasn't been shown yet
        if (itemId !== 3 && !offerShown && !orderHasSoda()) {
            showOfferModal()
        }
    }
}

function removeFromOrder(orderIndex) {
    orderArray.splice(orderIndex, 1)
    renderOrder()
    saveOrderToStorage()
}

function orderHasSoda() {
    return orderArray.some(item => item.id === 3)
}

function addDiscountedSoda() {
    const soda = menuArray.find(item => item.id === 3)
    if (soda) {
        const discountedSoda = { ...soda, price: 3, isDiscounted: true }
        orderArray.push(discountedSoda)
        offerShown = true
        renderOrder()
        saveOrderToStorage()
    }
}

// ===== Modal Functions =====
function openCheckoutModal() {
    checkoutModal.classList.remove('hidden')
    document.getElementById('card-name').focus()
}

function closeCheckoutModal() {
    checkoutModal.classList.add('hidden')
    paymentForm.reset()
}

function showOfferModal() {
    offerModal.classList.remove('hidden')
}

function closeOfferModal() {
    offerModal.classList.add('hidden')
}

function processPayment() {
    const cardName = document.getElementById('card-name').value.trim()
    
    if (cardName) {
        closeCheckoutModal()
        clearOrder()
        showOrderConfirmation(cardName)
    }
}

function showOrderConfirmation(customerName) {
    customerNameEl.textContent = customerName
    orderConfirmation.classList.remove('hidden')
    
    // Hide confirmation after 5 seconds
    setTimeout(() => {
        orderConfirmation.classList.add('hidden')
    }, 5000)
}

function clearOrder() {
    orderArray = []
    orderTotal = 0
    offerShown = false
    lastAddedItemId = null
    renderOrder()
    saveOrderToStorage()
}

// ===== Local Storage Functions =====
function saveOrderToStorage() {
    localStorage.setItem('sobhyDinerOrder', JSON.stringify(orderArray))
}

function loadOrderFromStorage() {
    const savedOrder = localStorage.getItem('sobhyDinerOrder')
    
    if (savedOrder) {
        orderArray = JSON.parse(savedOrder)
        renderOrder()
    }
}

// ===== Start the App =====
init()
