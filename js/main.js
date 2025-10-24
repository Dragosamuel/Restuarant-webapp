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
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
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


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    // Handle reservation form submission
    $('#reservationForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const name = $('#name').val();
        const email = $('#email').val();
        const datetime = $('#datetime').val();
        const people = $('#select1').val();
        const message = $('#message').val();
        
        // Simple validation
        if (!name || !email || !datetime || !people) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Prepare data for API
        const reservationData = {
            name: name,
            email: email,
            date: new Date(datetime),
            numberOfPeople: parseInt(people),
            specialRequest: message
        };
        
        // Send to backend API
        $.ajax({
            url: '/api/reservations',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reservationData),
            success: function(response) {
                if (response.success) {
                    alert('Reservation submitted successfully!');
                    // Reset form
                    $('#reservationForm')[0].reset();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error submitting reservation:', error);
                alert('Error submitting reservation. Please try again.');
            }
        });
    });
    
    // Handle contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Prepare data for API
        const contactData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };
        
        // Send to backend API
        $.ajax({
            url: '/api/contact',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(contactData),
            success: function(response) {
                if (response.success) {
                    alert('Message sent successfully!');
                    // Reset form
                    $('#contactForm')[0].reset();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error sending message:', error);
                alert('Error sending message. Please try again.');
            }
        });
    });
    
})(jQuery);