const headerEl = $('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        $('.header').addClass('header-scrolled');
    }
    else {
        $('.header').removeClass('header-scrolled');
    }
});