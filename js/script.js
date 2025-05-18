/*
   KAYAKALP CLINIC Portfolio Website
   Main JavaScript File
*/

$(document).ready(function() {
    'use strict';
    
    // Preloader
    $(window).on('load', function() {
        $('#preloader').fadeOut(1000, function() {
            $(this).remove();
        });
    });
    
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Navbar color change on scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('#mainNav').addClass('bg-white shadow-sm');
            $('#mainNav').removeClass('bg-transparent');
            $('.nav-link').addClass('text-dark').removeClass('text-white');
            $('.brand-text').addClass('text-dark').removeClass('text-white');
        } else {
            $('#mainNav').removeClass('bg-white shadow-sm');
            $('#mainNav').addClass('bg-transparent');
            $('.nav-link').removeClass('text-dark').addClass('text-white');
            $('.brand-text').removeClass('text-dark').addClass('text-white');
        }
    });
    
    // Trigger the scroll event to set initial navbar state
    $(window).trigger('scroll');
    
    // Smooth scroll for links
    $('a.nav-link, .scroll-down, a.btn-book').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            
            const hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
            
            // Close mobile menu if open
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
    
    // Initialize Magnific Popup for Gallery
    $('.gallery-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        }
    });
    
    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // Form submissions
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();
        
        // In a real scenario, you would send the form data to a server
        // For demo purposes, we'll just show the confirmation message
        
        // Simple form validation
        let isValid = true;
        $('#appointmentForm input:required, #appointmentForm select:required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (isValid) {
            // Form submission success
            $('#appointmentForm')[0].reset();
            $('#bookingConfirmation').removeClass('d-none').fadeIn();
            
            // Hide the confirmation after a delay
            setTimeout(function() {
                $('#bookingConfirmation').fadeOut();
            }, 5000);
        }
    });
    
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        $('#contactForm input:required, #contactForm textarea:required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (isValid) {
            // Form submission success
            $('#contactForm')[0].reset();
            $('#contactConfirmation').removeClass('d-none').fadeIn();
            
            // Hide the confirmation after a delay
            setTimeout(function() {
                $('#contactConfirmation').fadeOut();
            }, 5000);
        }
    });
    
    // Service modals - dynamic content
    $('.service-link').on('click', function() {
        const serviceName = $(this).siblings('h3').text();
        const serviceImg = $(this).closest('.service-card').find('.service-img img').attr('src');
        const targetModal = $($(this).data('bs-target'));
        
        targetModal.find('.modal-title').text(serviceName);
        targetModal.find('.modal-body img').attr('src', serviceImg);
    });
    
    // Set minimum date for booking as tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const formattedDate = tomorrow.toISOString().split('T')[0];
    $('#date').attr('min', formattedDate);
    
    // Animation for numbers counting
    function counterAnimation() {
        const counters = $('.counter');
        
        counters.each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text());
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
    
    // Trigger counter animation when element comes into view
    $(window).on('scroll', function() {
        if ($('#about').length && isInViewport($('#about'))) {
            counterAnimation();
            // Remove scroll event once triggered
            $(window).off('scroll');
        }
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
});