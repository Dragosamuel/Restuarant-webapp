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


    // Handle registration form submission
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const isAdmin = $('#isAdmin').is(':checked');
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        // Prepare data for API
        const registerData = {
            name: name,
            email: email,
            password: password
        };
        
        // Determine endpoint based on admin checkbox
        const endpoint = isAdmin ? '/api/auth/register-admin' : '/api/auth/register';
        
        // Send to backend API
        $.ajax({
            url: endpoint,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registerData),
            success: function(response) {
                if (response.success) {
                    const userType = isAdmin ? 'Admin' : 'User';
                    alert(`${userType} registration successful! You can now login.`);
                    
                    // Emit real-time event for admin notification
                    if (typeof io !== 'undefined') {
                        const socket = io();
                        socket.emit('userRegistered', {
                            name: response.data.name,
                            email: response.data.email,
                            role: response.data.role,
                            timestamp: new Date()
                        });
                    }
                    
                    // Redirect to login page
                    window.location.href = 'login.html';
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error registering:', error);
                console.error('XHR:', xhr);
                console.error('Status:', status);
                
                // Provide more detailed error information
                let errorMessage = 'Error registering. Please try again.';
                
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = 'Error: ' + xhr.responseJSON.message;
                } else if (xhr.status === 0) {
                    errorMessage = 'Network error. Please check your connection and try again.';
                } else if (xhr.status === 400) {
                    errorMessage = 'Invalid registration data. Please check your inputs.';
                } else if (xhr.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                
                alert(errorMessage);
            }
        });
    });

})(jQuery);