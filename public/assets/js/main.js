/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function() { //revisado

    $("#preloader").fadeOut("slow");
});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */

$(function() { //Revisado

    var Page = (function() {

        var $navArrows = $('#nav-arrows'),
            $nav = $('#nav-dots > span'),
            slitslider = $('#slider').slitslider({
                onBeforeChange: function(slide, pos) {

                    $nav.removeClass('nav-dot-current');
                    $nav.eq(pos).addClass('nav-dot-current');

                },
                autoplay: true,
                interval: 3000
            }),

            init = function() {

                initEvents();

            },
            initEvents = function() {

                // add navigation events
                $navArrows.children(':last').on('click', function() {

                    slitslider.next();
                    return false;

                });

                $navArrows.children(':first').on('click', function() {

                    slitslider.previous();
                    return false;

                });

                $nav.each(function(i) {

                    $(this).on('click', function(event) {

                        var $dot = $(this);

                        if (!slitslider.isActive()) {

                            $nav.removeClass('nav-dot-current');
                            $dot.addClass('nav-dot-current');

                        }

                        slitslider.jump(i + 1);
                        return false;

                    });

                });

            };

        return { init: init };

    })();

    Page.init();

});



$(document).ready(function() {

    /* ========================================================================= */
    /*	Menu item highlighting
    /* ========================================================================= */

    jQuery('#nav').singlePageNav({
        offset: jQuery('#nav').outerHeight(),
        filter: ':not(.external)',
        speed: 1500,
        currentClass: 'current',
        easing: 'easeInOutExpo',
        updateHash: true,
    });


    $(window).scroll(function() {
        if ($(window).scrollTop() > 400) {
            $("#navigation").removeClass("animated-header");
            $("#logo").css({
                "width": "50px",
                "height": "50px",
                "top": "4px",
                "transition": "1s"
            });
        } else {
            $("#navigation").addClass("animated-header");
            $("#logo").css({
                "width": "70px",
                "height": "70px",
                "top": "10px"
            });
        }
    });


    /* ========================================================================= */
    /*	Fix Slider Height
    /* ========================================================================= */

    // Slider Height
    var slideHeight = $(window).height(); //revisado
    $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height', slideHeight);

    $(window).resize(function() {
        'use strict',
        $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height', slideHeight);
    });


    var owl = $("#testimonial");
    owl.owlCarousel({ //Revisado
        navigation: true,
        pagination: false,
        slideSpeed: 700,
        paginationSpeed: 400,
        singleItem: true,
        navigationText: ["<i class='fa fa-angle-left fa-lg'></i>", "<i class='fa fa-angle-right fa-lg'></i>"],
    });
});

/* ========================================================================= */
/*	maps
/* ========================================================================= */

var coords = [-12.16793261742782, -76.98974340643949];
var map = L.map('map-template').setView(coords, 17);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker(coords).addTo(map)
    .bindPopup('Encuentranos aquí')
    .openPopup();


/* ========================================================================= */
/*	end validation form
/* ========================================================================= */


var wow = new WOW({
    offset: 75, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
});
wow.init();