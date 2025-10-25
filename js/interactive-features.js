// Interactive Features JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initDarkMode();
    initToastNotifications();
    initFilterButtons();
    initFloatingCart();
    initAddToCartButtons();
    initCustomizeButtons();
    initSearchFunctionality();
    
    // Initialize existing advanced features
    initARViewer();
    initVoiceOrdering();
    initQRCodeOrdering();
});

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
            showToast('Dark mode enabled', 'success');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
            showToast('Light mode enabled', 'success');
        }
    });
}

// Toast Notifications
function initToastNotifications() {
    // Toast notifications are handled by the showToast function
}

function showToast(message, type = 'info') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    
    // Set icon based on type
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'warning') iconClass = 'fa-exclamation-triangle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            ${message}
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        toast.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Filter Buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, you would filter the menu items here
            showToast(`Filtering by: ${this.textContent}`, 'info');
        });
    });
}

// Floating Cart
function initFloatingCart() {
    const floatingCart = document.querySelector('.floating-cart');
    
    floatingCart.addEventListener('click', function() {
        showToast('Cart opened - 3 items in cart', 'success');
        // In a real implementation, you would open the cart modal here
    });
}

// Add to Cart Buttons
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get item name from card title
            const card = this.closest('.food-item-card');
            const itemName = card.querySelector('.card-title').textContent;
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Show toast notification
            showToast(`Added ${itemName} to your cart!`, 'success');
            
            // Add animation effect
            this.classList.add('btn-success');
            setTimeout(() => {
                this.classList.remove('btn-success');
            }, 1000);
        });
    });
}

// Customize Buttons
function initCustomizeButtons() {
    const customizeButtons = document.querySelectorAll('.btn-customize');
    
    customizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get item name from card title
            const card = this.closest('.food-item-card');
            const itemName = card.querySelector('.card-title').textContent;
            
            showToast(`Customizing ${itemName}...`, 'info');
            // In a real implementation, you would open the customization modal here
        });
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-filter-bar input');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        
        // In a real implementation, you would filter the menu items here
        if (searchTerm.length > 2) {
            showToast(`Searching for: ${searchTerm}`, 'info');
        }
    });
}

// AR Viewer (existing functionality)
function initARViewer() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('ar-preview-btn') || e.target.closest('.ar-preview-btn')) {
            const button = e.target.classList.contains('ar-preview-btn') ? e.target : e.target.closest('.ar-preview-btn');
            const menuItemId = button.dataset.itemId;
            showARPreview(menuItemId);
        }
    });
}

function showARPreview(menuItemId) {
    showToast('AR Preview launching soon!', 'warning');
    // In a full implementation, this would show a 3D model of the dish using AR technology
}

// Voice Ordering (existing functionality)
function initVoiceOrdering() {
    const voiceBtn = document.getElementById('voiceOrderBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', toggleVoiceRecognition);
    }
}

function toggleVoiceRecognition() {
    showToast('Voice ordering activated! Say what you\'d like to order.', 'success');
    // In a full implementation, this would use the Web Speech API
}

// QR Code Ordering (existing functionality)
function initQRCodeOrdering() {
    const qrBtn = document.getElementById('qrOrderBtn');
    if (qrBtn) {
        qrBtn.addEventListener('click', showQRCode);
    }
}

function showQRCode() {
    showToast('QR Code Ordering - Scan to order from your table', 'info');
    // In a full implementation, this would generate a QR code for the table
}

// Export functions for use in other modules
window.showToast = showToast;