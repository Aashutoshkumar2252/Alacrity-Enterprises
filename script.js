// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex'); // Ensure it toggles flex for display
        });
    }

    // --- Smooth scrolling for internal anchor links and normal navigation for external links ---
    // This targets all <a> tags within <nav> elements.
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Check if the href starts with '#' (indicating an internal anchor link)
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Prevent default browser navigation for internal links

                // Get the target element to scroll to
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu after clicking an internal link
                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenu.classList.remove('flex');
                    mobileMenu.classList.add('hidden');
                }
            }
            // For links that do NOT start with '#', the default behavior (navigating to a new page)
            // is allowed to proceed, so no e.preventDefault() here.
        });
    });

    // --- Handle contact form submission ---
    // This part of the script will only run if the contact form elements exist on the page.
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm && successMessage) { // Ensure both elements exist before adding listener
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission (page reload)

            console.log('Form submitted!');
            console.log('Name:', document.getElementById('name').value);
            console.log('Email:', document.getElementById('email').value);
            console.log('Company:', document.getElementById('company').value);
            console.log('Subject:', document.getElementById('subject').value);
            console.log('Message:', document.getElementById('message').value);

            // Show success message
            successMessage.style.display = 'block';

            // Optionally, clear the form fields and hide the message after a short delay
            setTimeout(() => {
                contactForm.reset(); // Clears all form fields
                successMessage.style.display = 'none'; // Hides the success message
            }, 3000); // 3 seconds
        });
    }
});