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


    // Handle login form submission
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const email = $('#email').val();
        const password = $('#password').val();
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Prepare data for API
        const loginData = {
            email: email,
            password: password
        };
        
        // Send to backend API
        $.ajax({
            url: '/api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function(response) {
                if (response.success) {
                    // Save token to localStorage
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    
                    // Redirect to admin dashboard
                    window.location.href = 'admin.html';
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error logging in:', error);
                console.error('Response:', xhr.responseText);
                console.error('Status:', xhr.status);
                alert('Error logging in. Please try again. Status: ' + xhr.status + ', Error: ' + error);
            }
        });
    });

})(jQuery);