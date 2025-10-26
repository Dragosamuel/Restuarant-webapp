// Admin real-time notifications using Socket.IO
(function() {
    // Check if we're on the admin page
    if (window.location.pathname !== '/admin.html' && window.location.pathname !== '/admin') {
        return;
    }
    
    // Load Socket.IO client
    const script = document.createElement('script');
    script.src = '/socket.io/socket.io.js';
    script.onload = function() {
        initializeSocket();
    };
    document.head.appendChild(script);
    
    function initializeSocket() {
        // Connect to Socket.IO server
        const socket = io();
        
        // Listen for new user registrations
        socket.on('newUserRegistered', function(userData) {
            showNotification(`New user registered: ${userData.name} (${userData.email})`, 'info');
        });
        
        // Listen for user logins
        socket.on('userLoggedInNotification', function(userData) {
            showNotification(`User logged in: ${userData.name} (${userData.email})`, 'success');
        });
        
        // Listen for admin notifications
        socket.on('newAdminNotification', function(data) {
            showNotification(data.message, data.type || 'info');
        });
        
        // Notify server when admin is online
        socket.emit('adminNotification', {
            message: 'Admin panel opened',
            type: 'info'
        });
        
        console.log('Real-time admin notifications initialized');
    }
    
    // Show notification in the admin panel
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
})();