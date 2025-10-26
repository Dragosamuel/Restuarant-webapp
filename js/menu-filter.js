// Menu filtering and search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterMenuItems(searchTerm);
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // Apply filter
            filterByCategory(filterType);
        });
    });
    
    // Function to filter menu items by search term
    function filterMenuItems(searchTerm) {
        const foodItems = document.querySelectorAll('.food-item-card');
        
        foodItems.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const description = item.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.closest('.col-lg-6').style.display = 'block';
            } else {
                item.closest('.col-lg-6').style.display = 'none';
            }
        });
    }
    
    // Function to filter by category
    function filterByCategory(category) {
        const foodItems = document.querySelectorAll('.food-item-card');
        
        foodItems.forEach(item => {
            // For now, we'll show all items for all filters
            // In a real implementation, you would have data attributes to filter by category
            item.closest('.col-lg-6').style.display = 'block';
        });
        
        // Show a toast notification
        showToast(`Showing ${category} items`, 'success');
    }
    
    // Toast notification function
    function showToast(message, type = 'info') {
        // Check if toast already exists
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        
        // Add icon based on type
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'error') icon = '❌';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-content">${message}</span>
            <span class="toast-close">&times;</span>
        `;
        
        // Add to body
        document.body.appendChild(toast);
        
        // Add close functionality
        toast.querySelector('.toast-close').addEventListener('click', function() {
            toast.remove();
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }
});