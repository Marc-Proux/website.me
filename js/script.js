const headerEl = $('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        $('.header').addClass('header-scrolled');
    }
    else {
        $('.header').removeClass('header-scrolled');
    }
    navHighlighter();
});

$(function() {
    AOS.init();
    $("#home-sec").addClass("active");
});


$(function() {
    var typed = $('.typed');
    typed.each(function() {
        var typed = new Typed(this, {
            strings: ["Informatique", "Réseaux", "Développement Web"],
            typeSpeed: 50,
            loop: true,
            backDelay:1500,
            backSpeed: 30,
            showCursor: false,
        });
    });
});

function navHighlighter() {
    var sections = $("section[id]");
    let scrollY = $(window).scrollTop();
    sections.each(function() {
        var current = $(this);
        var sectionHeight = current.height();
        var sectionTop = current.offset().top - 50;
        var sectionId = current.attr("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            $("#"+sectionId + "-sec").addClass("active");
        } else {
            $("#"+sectionId + "-sec").removeClass("active");
        }
    }
    );
}

var scrollFunction = function(id) {
    window.scrollTo(0, $("#" + id).offset().top);
}