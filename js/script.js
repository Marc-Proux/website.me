const headerEl = $('.header');
var currentSlide = 0;
var skillShow = false;

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
    showSlide(currentSlide);
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

function changeSlide(n) {
    showSlide(currentSlide + n);
}

function showSlide(index){
    var slides = $(".slides");
    var dots = $(".dot");
    if (index >= slides.length) {
        index = 0;
    }
    if (index < 0) {
        index = slides.length - 1;
    }
    for (var i = 0; i < index; i++) {
        element = $("#slide-" + i);
        $(element).css('left', (-(100*(index-i)+10))+'%');
    }
    for (var i = index; i < slides.length; i++) {
        element = $("#slide-" + i);
        $(element).css('left', (-(100*(index-i))+10)+'%');
    }
    $(dots[currentSlide]).removeClass("active");
    currentSlide = index;
    animateProgressBar("slide-"+currentSlide);
    $(dots[currentSlide]).addClass("active");

}

function animateProgressBar(slide){
    var progressCircle = $("#"+slide+" .progress-bar--inner svg circle");
    const svgStrokeDashArray = parseInt(window.getComputedStyle(progressCircle[0]).getPropertyValue("stroke-dasharray").replace("px", ""));
    (progressCircle).each(function() {
        var current = $(this);
        var value = parseInt(current.attr("value"));
        var offsetValue = Math.floor(((100 - value) * svgStrokeDashArray) / 100);
        current.css({
            'stroke-dashoffset': svgStrokeDashArray,
        });
        current.animate(
            {strokeDashoffset: offsetValue},1000);
        current.css("stroke-dashoffset", offsetValue);
    });
}

window.onscroll = function(e) {
    var section = $("#skills")
    var sectionTop = section.offset().top-335;
    if (!(this.oldScroll > this.scrollY)) {
        console.log(this.scrollY);
        console.log(skillShow)
        if (this.scrollY > sectionTop && skillShow == false) {
            animateProgressBar("slide-"+currentSlide);
            skillShow = true;
        }
    }
    else if (this.oldScroll > this.scrollY && this.scrollY < sectionTop) {
        skillShow = false;
    }
    this.oldScroll = this.scrollY;
}
  