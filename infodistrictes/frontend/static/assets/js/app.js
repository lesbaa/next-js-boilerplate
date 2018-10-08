(function($) {

    'use strict';

    function initNavbar() {

        var scroll = $(window).scrollTop();

        $('.navbar-toggle').on('click', function(event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.menu-arrow,.submenu-arrow').on('click', function(e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    }

    function initStickyMenu() {

        var nextSection = document.getElementById('graph1'),
            stickyOffset = nextSection.offsetTop,
            stickyCheck = function () {

                // Get the offset position of the next section after ABOUT
                stickyOffset = nextSection.offsetTop

                if (window.pageYOffset >= (stickyOffset - 100)) {
                    $('#topnav').addClass('visible')
                } else {
                    $('#topnav').removeClass('visible')
                }

                // Hide mouse scroll icon after 200px
                if (window.pageYOffset >= 200) {
                    $('#scrollIcon').addClass('hide')
                } else {
                    $('#scrollIcon').removeClass('hide')
                }
            };

        stickyCheck();

        $(window).scroll(function() {

            stickyCheck();

            // var scroll = $(window).scrollTop();
            //
            // if (scroll >= 50) {
            //     $('.sticky').addClass('darkheader');
            // } else {
            //     $('.sticky').removeClass('darkheader');
            // }
        });
    }

    function initSmoothLink() {

        $('.navigation-menu a, .scroll-link, .smooth-nostyle a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }

    function initScrollspy() {

        $('#navigation').scrollspy({ offset: 70 });
    }

    function initTooltips() {

        $('[data-toggle="tooltip"]').tooltip();
    }


    function init() {
        initNavbar();
        initStickyMenu();
        initSmoothLink();
        initScrollspy();
        initTooltips();
    }

    init();

})(jQuery)
