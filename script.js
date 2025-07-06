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

    // --- Smooth scrolling for internal anchor links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenu.classList.remove('flex');
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // --- Modal Form Handling ---
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalForm = document.getElementById('modal-contact-form');
    const modalSuccess = document.getElementById('modal-success');

    if (openModalBtn && modalOverlay && closeModalBtn) {
        // Open modal
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('hidden');
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            modalForm.reset();
            modalSuccess.classList.add('hidden');
        });

        // Handle form submission
        if (modalForm && modalSuccess) {
            modalForm.addEventListener('submit', function (e) {
                e.preventDefault();

                console.log('Modal form submitted!');
                console.log('Name:', document.getElementById('modal-name').value);
                console.log('Email:', document.getElementById('modal-email').value);
                console.log('Company:', document.getElementById('modal-company').value);
                console.log('Subject:', document.getElementById('modal-subject').value);
                console.log('Message:', document.getElementById('modal-message').value);

                modalSuccess.classList.remove('hidden');

                // Clear form and auto-close after delay
                setTimeout(() => {
                    modalForm.reset();
                    modalSuccess.classList.add('hidden');
                    modalOverlay.classList.add('hidden');
                }, 3000);
            });
        }
    }
});
