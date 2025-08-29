// Mobile Menu Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuToggle = document.querySelector(".menu");
    const navMenu = document.querySelector(".flex-container ul");

    // Toggle mobile menu
    mobileMenuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show-mobile-menu");

        // Animate hamburger lines
        const lines = mobileMenuToggle.querySelectorAll(".line");
        lines.forEach((line, index) => {
            if (navMenu.classList.contains("show-mobile-menu")) {
                // Transform to X
                if (index === 0) {
                    line.style.transform = "rotate(45deg) translate(5px, 5px)";
                } else if (index === 1) {
                    line.style.opacity = "0";
                } else if (index === 2) {
                    line.style.transform =
                        "rotate(-45deg) translate(7px, -6px)";
                }
            } else {
                // Transform back to hamburger
                if (index === 0) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                } else if (index === 1) {
                    line.style.opacity = "1";
                } else if (index === 2) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                }
            }
        });
    });

    // Close mobile menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show-mobile-menu");

            // Reset hamburger lines
            const lines = mobileMenuToggle.querySelectorAll(".line");
            lines.forEach((line, index) => {
                if (index === 0) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                } else if (index === 1) {
                    line.style.opacity = "1";
                } else if (index === 2) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                }
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
        if (
            !mobileMenuToggle.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            navMenu.classList.remove("show-mobile-menu");

            // Reset hamburger lines
            const lines = mobileMenuToggle.querySelectorAll(".line");
            lines.forEach((line, index) => {
                if (index === 0) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                } else if (index === 1) {
                    line.style.opacity = "1";
                } else if (index === 2) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                }
            });
        }
    });

    // Handle window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            navMenu.classList.remove("show-mobile-menu");

            // Reset hamburger lines when switching to desktop
            const lines = mobileMenuToggle.querySelectorAll(".line");
            lines.forEach((line, index) => {
                if (index === 0) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                } else if (index === 1) {
                    line.style.opacity = "1";
                } else if (index === 2) {
                    line.style.transform = "rotate(0) translate(0, 0)";
                }
            });
        }
    });
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const heroForm = document.getElementById("heroContactForm");
    const heroFormStatus = document.getElementById("hero-form-status");

    if (heroForm) {
        heroForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(heroForm);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");

            // Simple validation
            if (!name || !email || !message) {
                showFormStatus("Please fill in all fields.", "error");
                return;
            }

            if (!isValidEmail(email)) {
                showFormStatus("Please enter a valid email address.", "error");
                return;
            }

            // Simulate form submission
            showFormStatus("Sending message...", "success");

            setTimeout(() => {
                showFormStatus(
                    "Thank you! Your message has been sent successfully.",
                    "success"
                );
                heroForm.reset();
            }, 1500);
        });
    }

    function showFormStatus(message, type) {
        heroFormStatus.textContent = message;
        heroFormStatus.style.display = "block";
        heroFormStatus.className = type;

        if (type === "success") {
            heroFormStatus.style.background = "rgba(40, 167, 69, 0.2)";
            heroFormStatus.style.color = "#28a745";
            heroFormStatus.style.border = "1px solid #28a745";
        } else {
            heroFormStatus.style.background = "rgba(220, 53, 69, 0.2)";
            heroFormStatus.style.color = "#dc3545";
            heroFormStatus.style.border = "1px solid #dc3545";
        }

        // Hide success message after 5 seconds
        if (type === "success") {
            setTimeout(() => {
                heroFormStatus.style.display = "none";
            }, 5000);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Skills Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-fill");

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute("data-width");

                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);

    skillBars.forEach((bar) => {
        observer.observe(bar);
    });
});

// Smooth scroll for navigation links
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight =
                    document.querySelector(".flex-container").offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
});
