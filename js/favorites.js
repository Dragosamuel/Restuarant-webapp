// Favorites System
document.addEventListener('DOMContentLoaded', function() {
    initFavoritesSystem();
});

function initFavoritesSystem() {
    // Add favorite buttons to food item cards
    const foodCards = document.querySelectorAll('.food-item-card');
    
    foodCards.forEach(card => {
        // Check if favorite button already exists
        if (!card.querySelector('.favorite-btn')) {
            // Create favorite button
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'btn btn-sm favorite-btn position-absolute';
            favoriteBtn.style.cssText = 'top: 10px; right: 10px; background: rgba(255, 255, 255, 0.8); border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;';
            
            // Check if item is already favorited
            const itemId = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent : '';
            const isFavorited = isItemFavorited(itemId);
            
            if (isFavorited) {
                favoriteBtn.innerHTML = '<i class="fas fa-heart text-danger"></i>';
                favoriteBtn.dataset.favorited = 'true';
            } else {
                favoriteBtn.innerHTML = '<i class="far fa-heart text-dark"></i>';
                favoriteBtn.dataset.favorited = 'false';
            }
            
            // Add click event
            favoriteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavorite(this, itemId);
            });
            
            // Add to card
            card.style.position = 'relative';
            card.appendChild(favoriteBtn);
        }
    });
}

function toggleFavorite(button, itemId) {
    const isFavorited = button.dataset.favorited === 'true';
    
    if (isFavorited) {
        // Remove from favorites
        button.innerHTML = '<i class="far fa-heart text-dark"></i>';
        button.dataset.favorited = 'false';
        removeFromFavorites(itemId);
        showToast(`Removed ${itemId} from favorites`, 'info');
    } else {
        // Add to favorites
        button.innerHTML = '<i class="fas fa-heart text-danger"></i>';
        button.dataset.favorited = 'true';
        addToFavorites(itemId);
        showToast(`Added ${itemId} to favorites!`, 'success');
        
        // Add animation
        button.classList.add('animate__animated', 'animate__heartBeat');
        setTimeout(() => {
            button.classList.remove('animate__animated', 'animate__heartBeat');
        }, 1000);
    }
}

function addToFavorites(itemId) {
    // Get existing favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Add new item if not already in favorites
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function removeFromFavorites(itemId) {
    // Get existing favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Remove item from favorites
    favorites = favorites.filter(id => id !== itemId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isItemFavorited(itemId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(itemId);
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Export functions
window.initFavoritesSystem = initFavoritesSystem;
window.getFavorites = getFavorites;