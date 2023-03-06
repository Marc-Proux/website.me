const headerEl = $('.header');
var currentSlide = 0;
var skillShow = false;
const myCarousel = document.getElementById("skills-carousel");
const navLinks = document.querySelectorAll('.nav-link');
const navBar = document.getElementById('navbar-button');
var firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
var old_sec = "home-sec";
const old_sec_array = ["home-sec", "about-sec"];

myCarousel.addEventListener("slide.bs.carousel", function(event){
    currentSlide = event.to;
    animateProgressBar("slide-"+currentSlide);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        $('.header').addClass('header--scrolled');
    }
    else {
        $('.header').removeClass('header--scrolled');
    }
});

$(function() {
    AOS.init({disable: 'mobile'});
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show()) 
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            $('.navbar-collapse').collapse('hide');
        });
    });

    $(document).click(function(event) {
        $('.navbar-collapse').collapse('hide');
    });
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

function animateProgressBar(slide){
    var type = $("#"+slide).attr("type");
    if (type == "linear") {
        var progressBars = $("#"+slide+" .progress-bar");
        (progressBars).each(function() {
            var current = $(this);
            var value = parseInt(current.attr("aria-valuenow"));
            var offsetValue = value + "%";
            current.css({
                'width': "0%",
            });
            current.stop().animate(
                {width: offsetValue},
                {duration: 700, 
                 easing: "linear"});
        });
    }
}

$(document).on('submit', '#contact-form', function(event) {
    var form = $(".needs-validation");
    if (form[0].checkValidity() === false) {
        form.addClass('was-validated');
        event.preventDefault();
        event.stopPropagation();
    } else{
        event.preventDefault();
        $("#sending-mail-loading").modal('toggle');
        $.ajax({
            url: "/contact/",
            type: "POST",
            data: {
                name: $('[name="name"]').val(),
                phone: $('[name="phone"]').val(),
                email: $('[name="email"]').val(),
                message: $('[name="message"]').val(),
                csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
            },

            
            success: function(data) {
                if (data.success){
                    $("#sending-mail-loading").modal('toggle');
                    $("#form-confirmation").modal('toggle');
                    form.removeClass('was-validated');
                    $("#contact-form").trigger("reset");
                }

                else if (data.error){
                    $("#sending-mail-loading").modal('toggle');
                    $("#form-error").modal('toggle');
                }
                else if (data.fail){
                    $("#sending-mail-loading").modal('toggle');
                    $("#fatal-error").modal('toggle');
                    form.removeClass('was-validated');
                    $("#contact-form").trigger("reset");
                }
            },
        });
    }
});


firstScrollSpyEl.addEventListener('activate.bs.scrollspy', function (event) {
    var active = $("a.active")
    var id = active.attr("id");
    if (id === "skills-sec" && old_sec_array.includes(old_sec)) {
        animateProgressBar("slide-"+currentSlide);
    }
    old_sec = id;
})