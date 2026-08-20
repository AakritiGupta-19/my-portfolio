/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   DARK MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    if (isDark) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const observerOptions = {

    root: null,

    threshold: 0.35

};

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        observerOptions
    );

sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   FLIP CARDS
===================================================== */

const flipCards =
    document.querySelectorAll(".flip-card");

flipCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* =====================================================
   PROJECT SCROLL REVEAL
===================================================== */

const projectCards =
    document.querySelectorAll(".project-card");

const projectObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    projectObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.18
        }
    );


projectCards.forEach(card => {

    projectObserver.observe(card);

});


/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTop =
    document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


function showError(input, message) {

    const formGroup =
        input.closest(".form-group");

    const error =
        formGroup.querySelector(".error-message");

    error.textContent = message;

    input.style.borderColor = "#e45c72";

}


function clearError(input) {

    const formGroup =
        input.closest(".form-group");

    const error =
        formGroup.querySelector(".error-message");

    error.textContent = "";

    input.style.borderColor = "";

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const subject =
        document.getElementById("subject");

    const message =
        document.getElementById("message");

    let valid = true;


    /* NAME */

    if (name.value.trim() === "") {

        showError(
            name,
            "Please enter your name."
        );

        valid = false;

    } else {

        clearError(name);

    }


    /* EMAIL */

    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email."
        );

        valid = false;

    } else if (!validateEmail(email.value.trim())) {

        showError(
            email,
            "Please enter a valid email address."
        );

        valid = false;

    } else {

        clearError(email);

    }


    /* SUBJECT */

    if (subject.value.trim() === "") {

        showError(
            subject,
            "Please enter a subject."
        );

        valid = false;

    } else {

        clearError(subject);

    }


    /* MESSAGE */

    if (message.value.trim() === "") {

        showError(
            message,
            "Please enter your message."
        );

        valid = false;

    } else if (message.value.trim().length < 10) {

        showError(
            message,
            "Message should contain at least 10 characters."
        );

        valid = false;

    } else {

        clearError(message);

    }


    if (!valid) {

        formStatus.textContent =
            "Please fix the highlighted fields.";

        formStatus.style.color = "#e45c72";

        return;

    }


    /*
       IMPORTANT:
       The form is connected to Formspree in HTML.
       Replace YOUR_FORM_ID with your actual Formspree form ID.
    */

    formStatus.textContent =
        "Sending your message...";

    formStatus.style.color =
        "var(--text)";


    /*
       Submit the form normally after validation.
    */

    contactForm.submit();

});


/* =====================================================
   REMOVE ERROR WHILE TYPING
===================================================== */

document
    .querySelectorAll(
        "#contactForm input, #contactForm textarea"
    )
    .forEach(input => {

        input.addEventListener(
            "input",
            () => clearError(input)
        );

    });