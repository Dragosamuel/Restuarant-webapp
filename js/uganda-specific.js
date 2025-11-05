// Update all price displays on the page
function formatUgandanPrice(price) {
    return `Ugx ${Number(price).toLocaleString()}`;
}

// Update all price displays on the page
function updatePriceDisplays() {
    document.querySelectorAll('.menu-price').forEach(element => {
        const price = parseFloat(element.getAttribute('data-price'));
        if (!Number.isNaN(price)) element.textContent = formatUgandanPrice(price);
    });
}

// Format date and time according to Ugandan locale
function formatUgandanDateTime(date) {
    return new Date(date).toLocaleString('en-UG', {
        timeZone: 'Africa/Kampala'
    });
}

// Add Ugandan cultural elements
function initializeUgandanElements() {
    // Update welcome message
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = 'Tusanyuse okubalaba! (Welcome!)';
    }

    // Update currency symbols
    updatePriceDisplays();

    // Add Ugandan time
    const timeDisplay = document.querySelector('.restaurant-hours');
    if (timeDisplay) {
        timeDisplay.setAttribute('data-timezone', 'Africa/Kampala');
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeUgandanElements();
});

// Export functions for use in other files
window.ugandanUtils = {
    formatPrice: formatUgandanPrice,
    formatDateTime: formatUgandanDateTime,
    updatePrices: updatePriceDisplays
};