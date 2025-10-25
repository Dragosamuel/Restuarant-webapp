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
    
    // Check if user is authenticated when page loads
    $(document).ready(function() {
        if (!checkAuth()) {
            window.location.href = 'login.html';
        }
    });
    
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
        if (checkAuth()) {
            loadReservations();
        }
    });


    // Load menu items when modal is shown
    $('#menuModal').on('show.bs.modal', function (e) {
        if (checkAuth()) {
            loadMenuItems();
        }
    });


    // Load messages when modal is shown
    $('#messagesModal').on('show.bs.modal', function (e) {
        if (checkAuth()) {
            loadMessages();
        }
    });


    // Load staff when modal is shown
    $('#staffModal').on('show.bs.modal', function (e) {
        if (checkAuth()) {
            loadStaff();
            loadStaffForSelectors();
        }
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
            isAvailable: $('#menuAvailable').is(':checked'),
            // AR features
            arModel: {
                modelUrl: $('#arModelUrl').val(),
                modelType: $('#arModelType').val(),
                thumbnail: $('#arThumbnail').val(),
                dimensions: {
                    width: $('#arWidth').val() ? parseFloat($('#arWidth').val()) : undefined,
                    height: $('#arHeight').val() ? parseFloat($('#arHeight').val()) : undefined,
                    depth: $('#arDepth').val() ? parseFloat($('#arDepth').val()) : undefined
                }
            },
            // Voice features
            voiceKeyword: $('#voiceKeyword').val(),
            // Accessibility features
            accessibility: {
                audioDescription: $('#audioDescription').val(),
                highContrast: $('#highContrast').is(':checked'),
                screenReaderText: $('#screenReaderText').val()
            }
        };
        
        // Clean up empty AR dimensions
        if (!menuItemData.arModel.dimensions.width) delete menuItemData.arModel.dimensions.width;
        if (!menuItemData.arModel.dimensions.height) delete menuItemData.arModel.dimensions.height;
        if (!menuItemData.arModel.dimensions.depth) delete menuItemData.arModel.dimensions.depth;
        if (Object.keys(menuItemData.arModel.dimensions).length === 0) delete menuItemData.arModel.dimensions;
        
        if (menuId) {
            // Update existing menu item
            updateMenuItem(menuId, menuItemData);
        } else {
            // Create new menu item
            createMenuItem(menuItemData);
        }
    });


    // Handle staff form submission
    $('#staffForm').submit(function(e) {
        e.preventDefault();
        
        const staffId = $('#staffId').val();
        const staffData = {
            name: $('#staffName').val(),
            email: $('#staffEmail').val(),
            phone: $('#staffPhone').val(),
            position: $('#staffPosition').val(),
            department: $('#staffDepartment').val(),
            hireDate: $('#staffHireDate').val()
        };
        
        if (staffId) {
            // Update existing staff member
            updateStaffMember(staffId, staffData);
        } else {
            // Create new staff member
            createStaffMember(staffData);
        }
    });


    // Handle add shift button click
    $('#addShiftBtn').click(function() {
        const staffId = $('#shiftStaffSelect').val();
        const date = $('#shiftDate').val();
        const startTime = $('#shiftStartTime').val();
        const endTime = $('#shiftEndTime').val();
        const shiftType = $('#shiftType').val();
        
        if (!staffId || !date || !startTime || !endTime || !shiftType) {
            alert('Please fill in all shift fields');
            return;
        }
        
        addShift(staffId, { date, startTime, endTime, shiftType });
    });


    // Handle update performance button click
    $('#updatePerformanceBtn').click(function() {
        const staffId = $('#performanceStaffSelect').val();
        const attendanceRate = $('#attendanceRate').val();
        const punctuality = $('#punctuality').val();
        const overallRating = $('#overallRating').val();
        
        if (!staffId) {
            alert('Please select a staff member');
            return;
        }
        
        const performanceData = {};
        if (attendanceRate) performanceData.attendanceRate = parseFloat(attendanceRate);
        if (punctuality) performanceData.punctuality = parseFloat(punctuality);
        if (overallRating) performanceData.overallRating = parseFloat(overallRating);
        
        updatePerformance(staffId, performanceData);
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
                console.error('Response:', xhr.responseText);
                console.error('Status:', xhr.status);
                alert('Error loading reservations. Please try again. Status: ' + xhr.status + ', Error: ' + error);
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


    // Load staff from API
    function loadStaff() {
        $.ajax({
            url: '/api/staff',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    renderStaff(response.data);
                } else {
                    alert('Error loading staff: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading staff:', error);
                console.error('Response:', xhr.responseText);
                console.error('Status:', xhr.status);
                alert('Error loading staff. Please try again. Status: ' + xhr.status + ', Error: ' + error);
            }
        });
    }


    // Render staff in table
    function renderStaff(staff) {
        const tbody = $('#staffTableBody');
        tbody.empty();
        
        if (staff.length === 0) {
            tbody.append('<tr><td colspan="6" class="text-center">No staff members found</td></tr>');
            return;
        }
        
        staff.forEach(member => {
            const statusClass = member.status === 'active' ? 'text-success' : 
                              member.status === 'on-leave' ? 'text-warning' : 'text-danger';
            
            const row = `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.email}</td>
                    <td>${member.position}</td>
                    <td>${member.department}</td>
                    <td><span class="${statusClass}">${member.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="editStaffMember('${member._id}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteStaffMember('${member._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }


    // Load staff for selectors
    function loadStaffForSelectors() {
        $.ajax({
            url: '/api/staff',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    // Populate staff selectors
                    const staffSelects = $('#shiftStaffSelect, #performanceStaffSelect');
                    staffSelects.empty();
                    staffSelects.append('<option value="">Select Staff Member</option>');
                    
                    response.data.forEach(member => {
                        staffSelects.append(`<option value="${member._id}">${member.name}</option>`);
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading staff for selectors:', error);
            }
        });
    }


    // Create new staff member
    function createStaffMember(staffData) {
        $.ajax({
            url: '/api/staff',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(staffData),
            success: function(response) {
                if (response.success) {
                    alert('Staff member created successfully');
                    $('#staffForm')[0].reset();
                    $('#staffId').val('');
                    loadStaff();
                    loadStaffForSelectors();
                } else {
                    alert('Error creating staff member: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error creating staff member:', error);
                alert('Error creating staff member. Please try again.');
            }
        });
    }


    // Update staff member
    function updateStaffMember(id, staffData) {
        $.ajax({
            url: `/api/staff/${id}`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(staffData),
            success: function(response) {
                if (response.success) {
                    alert('Staff member updated successfully');
                    $('#staffForm')[0].reset();
                    $('#staffId').val('');
                    loadStaff();
                } else {
                    alert('Error updating staff member: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating staff member:', error);
                alert('Error updating staff member. Please try again.');
            }
        });
    }


    // Edit staff member
    function editStaffMember(id) {
        $.ajax({
            url: `/api/staff/${id}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    const staff = response.data;
                    $('#staffId').val(staff._id);
                    $('#staffName').val(staff.name);
                    $('#staffEmail').val(staff.email);
                    $('#staffPhone').val(staff.phone);
                    $('#staffPosition').val(staff.position);
                    $('#staffDepartment').val(staff.department);
                    $('#staffHireDate').val(new Date(staff.hireDate).toISOString().split('T')[0]);
                    
                    // Switch to add staff tab
                    $('#staffTabs a[href="#add-staff"]').tab('show');
                } else {
                    alert('Error loading staff member: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading staff member:', error);
                alert('Error loading staff member. Please try again.');
            }
        });
    }


    // Delete staff member
    function deleteStaffMember(id) {
        if (!confirm('Are you sure you want to delete this staff member?')) {
            return;
        }
        
        $.ajax({
            url: `/api/staff/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            },
            success: function(response) {
                if (response.success) {
                    alert('Staff member deleted successfully');
                    loadStaff();
                    loadStaffForSelectors();
                } else {
                    alert('Error deleting staff member: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error deleting staff member:', error);
                alert('Error deleting staff member. Please try again.');
            }
        });
    }


    // Add shift to staff member
    function addShift(staffId, shiftData) {
        $.ajax({
            url: `/api/staff/${staffId}/shifts`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(shiftData),
            success: function(response) {
                if (response.success) {
                    alert('Shift added successfully');
                    $('#shiftStaffSelect').val('');
                    $('#shiftDate').val('');
                    $('#shiftStartTime').val('');
                    $('#shiftEndTime').val('');
                    $('#shiftType').val('');
                } else {
                    alert('Error adding shift: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error adding shift:', error);
                alert('Error adding shift. Please try again.');
            }
        });
    }


    // Update performance metrics
    function updatePerformance(staffId, performanceData) {
        $.ajax({
            url: `/api/staff/${staffId}/performance`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + getAuthToken(),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(performanceData),
            success: function(response) {
                if (response.success) {
                    alert('Performance metrics updated successfully');
                    $('#performanceStaffSelect').val('');
                    $('#attendanceRate').val('');
                    $('#punctuality').val('');
                    $('#overallRating').val('');
                } else {
                    alert('Error updating performance metrics: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error updating performance metrics:', error);
                alert('Error updating performance metrics. Please try again.');
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
                console.error('Response:', xhr.responseText);
                console.error('Status:', xhr.status);
                alert('Error loading menu items. Please try again. Status: ' + xhr.status + ', Error: ' + error);
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
                    
                    // AR features
                    if (item.arModel) {
                        $('#arModelUrl').val(item.arModel.modelUrl || '');
                        $('#arModelType').val(item.arModel.modelType || '');
                        $('#arThumbnail').val(item.arModel.thumbnail || '');
                        if (item.arModel.dimensions) {
                            $('#arWidth').val(item.arModel.dimensions.width || '');
                            $('#arHeight').val(item.arModel.dimensions.height || '');
                            $('#arDepth').val(item.arModel.dimensions.depth || '');
                        }
                    }
                    
                    // Voice features
                    $('#voiceKeyword').val(item.voiceKeyword || '');
                    
                    // Accessibility features
                    if (item.accessibility) {
                        $('#audioDescription').val(item.accessibility.audioDescription || '');
                        $('#highContrast').prop('checked', item.accessibility.highContrast || false);
                        $('#screenReaderText').val(item.accessibility.screenReaderText || '');
                    }
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
                console.error('Response:', xhr.responseText);
                console.error('Status:', xhr.status);
                alert('Error loading messages. Please try again. Status: ' + xhr.status + ', Error: ' + error);
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
        // Get the actual token from localStorage
        const token = localStorage.getItem('authToken') || '';
        console.log('Auth token:', token);
        return token;
    }

    // Check if user is authenticated
    function checkAuth() {
        const token = getAuthToken();
        if (!token) {
            alert('You are not logged in. Redirecting to login page.');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

})(jQuery);
