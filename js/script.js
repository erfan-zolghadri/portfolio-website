const currentYear = new Date().getFullYear();
const birthYear = 1998

const nav = document.querySelector("#nav");
const header = document.querySelector("#header");
const navMenu = document.querySelector(".nav-menu");
const navBtn = document.querySelector(".nav-btn");
const navIcon = document.querySelector(".nav-icon");
let isNavMenuVisible = false;
const contactForm = document.querySelector(".contact-form");

// Section fade effect
const fades = document.querySelectorAll(".fade");
const appearOptions = {
    // When whole element should be in the page, starts appearing
    threshold: 1,
};

const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("appear");
            // Stop intersecting after its appeared
            appearOnScroll.unobserve(entry.target);
        }
    });
},
    appearOptions);

fades.forEach((fade) => {
    appearOnScroll.observe(fade);
});
// End of section fade effect

// Nav
// Changing nav bg after header is scrolled
const headerOptions = {
    // Before leaving header completely, change nav styles
    rootMargin: "-150px 0px 0px 0px",
};

const headerObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            nav.classList.add("js-nav-scrolled");
        } else {
            nav.classList.remove("js-nav-scrolled");
        }
    });
}, headerOptions);

headerObserver.observe(header);
// End of changing nav bg after header is scrolled

// Showing nav-menu / changing nav icon
navBtn.addEventListener("click", () => {
    navMenu.classList.toggle("js-active");

    // changing nav icon on click
    navIcon.classList.toggle("js-change");

    if (!isNavMenuVisible) {
        navIcon.setAttribute("xlink:href", "./sprites/solid.svg#times");
        isNavMenuVisible = true;
    } else {
        navIcon.setAttribute("xlink:href", "./sprites/solid.svg#bars");
        isNavMenuVisible = false;
    }
    // End of changing nav icon on click
});
// End of nav

// Header
// Hero typing effect
new TypeIt(".hero-strings", {
    strings: ["Web Developer.", "Backend Developer.", "Django Developer."],
    speed: 70,
    waitUntilVisible: true,
    nextStringDelay: [1500, 1000],
    loop: true,
    breakLines: false,
    loopDelay: [1500, 1000],
}).go();
// End of header

// Section: about
// Calculating age based on currentYear
document.querySelector(".about-age").innerHTML = currentYear - birthYear;
// End of section: about

// Section: testimonials
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
// End of section: testimonials

// Section: contact
// Contact form submission
(function () {
    emailjs.init("user_8MTqmxqQ5CVah57IHC7vh");
})();

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_79w6lwb";
    const templateID = "template_0zelqmy";

    emailjs.sendForm(serviceID, templateID, this).then(
        (response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("SUCCESS!");
            // Clearing inputs
            this.reset();
        },
        (error) => {
            console.log("FAILED ", error);
            alert("FAILED ", error);
        }
    );
});
// End of contact form submission
// End of section: contact