(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Load reservations when modal is shown
    $('#reservationsModal').on('show.bs.modal', function (e) {
        loadReservations();
    });


    // Load menu items when modal is shown
    $('#menuModal').on('show.bs.modal', function (e) {
        loadMenuItems();
    });


    // Load messages when modal is shown
    $('#messagesModal').on('show.bs.modal', function (e) {
        loadMessages();
    });


    // Handle menu item form submission
    $('#menuItemForm').submit(function(e) {
        e.preventDefault();
        
        const menuId = $('#menuId').val();
        const menuItemData = {
            name: $('#menuName').val(),
            description: $('#menuDescription').val(),
            price: parseFloat($('#menuPrice').val()),
            category: $('#menuCategory').val(),
            image: $('#menuImage').val(),
            isAvailable: $('#menuAvailable').is(':checked')
        };
        
        if (menuId) {
            // Update existing menu item
            updateMenuItem(menuId, menuItemData);
        } else {
            // Create new menu item
            createMenuItem(menuItemData);
        }
    });


    // Load reservations from API
    function loadReservations() {
        $.ajax({
            url: '/api/reservations',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    renderReservations(response.data);
                } else {
                    alert('Error loading reservations: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading reservations:', error);
                alert('Error loading reservations. Please try again.');
            }
        });
    }


    // Render reservations in table
    function renderReservations(reservations) {
        const tbody = $('#reservationsTableBody');
        tbody.empty();
        
        if (reservations.length === 0) {
            tbody.append('<tr><td colspan="6" class="text-center">No reservations found</td></tr>');
            return;
        }
        
        reservations.forEach(reservation => {
            const date = new Date(reservation.date).toLocaleString();
            const statusClass = reservation.status === 'confirmed' ? 'text-success' : 
                              reservation.status === 'cancelled' ? 'text-danger' : 'text-warning';
            
            const row = `
                <tr>
                    <td>${reservation.name}</td>
                    <td>${reservation.email}</td>
                    <td>${date}</td>
                    <td>${reservation.numberOfPeople}</td>
                    <td><span class="${statusClass}">${reservation.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="updateReservationStatus('${reservation._id}', 'confirmed')">Confirm</button>
                        <button class="btn btn-sm btn-warning me-1" onclick="updateReservationStatus('${reservation._id}', 'pending')">Pending</button>
                        <button class="btn btn-sm btn-danger" onclick="updateReservationStatus('${reservation._id}', 'cancelled')">Cancel</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }


    // Update reservation status
    function updateReservationStatus(id, status) {
        $.ajax({
            url: `/api/reservations/${id}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            contentType: 'application/json',
            data: JSON.stringify({ status: status }),
            success: function(response) {
                if (response.success) {
                    alert('Reservation status updated successfully');
                    loadReservations();
                } else {
                    alert('Error updating reservation: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating reservation:', error);
                alert('Error updating reservation. Please try again.');
            }
        });
    }


    // Load menu items from API
    function loadMenuItems() {
        $.ajax({
            url: '/api/menu',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    renderMenuItems(response.data);
                } else {
                    alert('Error loading menu items: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading menu items:', error);
                alert('Error loading menu items. Please try again.');
            }
        });
    }


    // Render menu items in table
    function renderMenuItems(menuItems) {
        const tbody = $('#menuTableBody');
        tbody.empty();
        
        if (menuItems.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No menu items found</td></tr>');
            return;
        }
        
        menuItems.forEach(item => {
            const availableText = item.isAvailable ? 'Yes' : 'No';
            const availableClass = item.isAvailable ? 'text-success' : 'text-danger';
            
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><span class="${availableClass}">${availableText}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="editMenuItem('${item._id}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMenuItem('${item._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }


    // Create menu item
    function createMenuItem(menuItemData) {
        $.ajax({
            url: '/api/menu',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            contentType: 'application/json',
            data: JSON.stringify(menuItemData),
            success: function(response) {
                if (response.success) {
                    alert('Menu item created successfully');
                    $('#menuItemForm')[0].reset();
                    $('#menuId').val('');
                    loadMenuItems();
                } else {
                    alert('Error creating menu item: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error creating menu item:', error);
                alert('Error creating menu item. Please try again.');
            }
        });
    }


    // Update menu item
    function updateMenuItem(id, menuItemData) {
        $.ajax({
            url: `/api/menu/${id}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            contentType: 'application/json',
            data: JSON.stringify(menuItemData),
            success: function(response) {
                if (response.success) {
                    alert('Menu item updated successfully');
                    $('#menuItemForm')[0].reset();
                    $('#menuId').val('');
                    loadMenuItems();
                } else {
                    alert('Error updating menu item: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating menu item:', error);
                alert('Error updating menu item. Please try again.');
            }
        });
    }


    // Edit menu item
    function editMenuItem(id) {
        $.ajax({
            url: `/api/menu/${id}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    const item = response.data;
                    $('#menuId').val(item._id);
                    $('#menuName').val(item.name);
                    $('#menuDescription').val(item.description);
                    $('#menuPrice').val(item.price);
                    $('#menuCategory').val(item.category);
                    $('#menuImage').val(item.image || '');
                    $('#menuAvailable').prop('checked', item.isAvailable);
                } else {
                    alert('Error loading menu item: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading menu item:', error);
                alert('Error loading menu item. Please try again.');
            }
        });
    }


    // Delete menu item
    function deleteMenuItem(id) {
        if (!confirm('Are you sure you want to delete this menu item?')) {
            return;
        }
        
        $.ajax({
            url: `/api/menu/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    alert('Menu item deleted successfully');
                    loadMenuItems();
                } else {
                    alert('Error deleting menu item: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error deleting menu item:', error);
                alert('Error deleting menu item. Please try again.');
            }
        });
    }


    // Load messages from API
    function loadMessages() {
        $.ajax({
            url: '/api/contact',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    renderMessages(response.data);
                } else {
                    alert('Error loading messages: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading messages:', error);
                alert('Error loading messages. Please try again.');
            }
        });
    }


    // Render messages in table
    function renderMessages(messages) {
        const tbody = $('#messagesTableBody');
        tbody.empty();
        
        if (messages.length === 0) {
            tbody.append('<tr><td colspan="5" class="text-center">No messages found</td></tr>');
            return;
        }
        
        messages.forEach(message => {
            const statusClass = message.status === 'read' ? 'text-success' : 
                              message.status === 'replied' ? 'text-primary' : 'text-warning';
            
            const row = `
                <tr>
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.subject}</td>
                    <td><span class="${statusClass}">${message.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="viewMessage('${message._id}')">View</button>
                        <button class="btn btn-sm btn-warning me-1" onclick="updateMessageStatus('${message._id}', 'read')">Mark Read</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMessage('${message._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }


    // View message details
    function viewMessage(id) {
        $.ajax({
            url: `/api/contact/${id}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    const message = response.data;
                    alert(`From: ${message.name} (${message.email})\nSubject: ${message.subject}\n\n${message.message}`);
                } else {
                    alert('Error loading message: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading message:', error);
                alert('Error loading message. Please try again.');
            }
        });
    }


    // Update message status
    function updateMessageStatus(id, status) {
        $.ajax({
            url: `/api/contact/${id}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            contentType: 'application/json',
            data: JSON.stringify({ status: status }),
            success: function(response) {
                if (response.success) {
                    alert('Message status updated successfully');
                    loadMessages();
                } else {
                    alert('Error updating message: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating message:', error);
                alert('Error updating message. Please try again.');
            }
        });
    }


    // Delete message
    function deleteMessage(id) {
        if (!confirm('Are you sure you want to delete this message?')) {
            return;
        }
        
        $.ajax({
            url: `/api/contact/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    alert('Message deleted successfully');
                    loadMessages();
                } else {
                    alert('Error deleting message: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error deleting message:', error);
                alert('Error deleting message. Please try again.');
            }
        });
    }


    // Get auth token from localStorage
    function getAuthToken() {
        // In a real application, you would get this from localStorage or a secure storage
        // For now, we'll return a placeholder
        return localStorage.getItem('authToken') || '';
    }

})(jQuery);
