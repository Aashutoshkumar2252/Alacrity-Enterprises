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

    // --- Modal Form Handling with animation ---
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalForm = document.getElementById('modal-contact-form');
    const modalSuccess = document.getElementById('modal-success');

    if (openModalBtn && modalOverlay && closeModalBtn) {
        // Open modal
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('hidden');

            // Add animation class to modal container (assumed first child div inside overlay)
            const modalContainer = modalOverlay.querySelector('div');
            modalContainer.classList.add('modal-open-animation');
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            modalForm.reset();
            modalSuccess.classList.add('hidden');

            const modalContainer = modalOverlay.querySelector('div');
            modalContainer.classList.remove('modal-open-animation');
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

                    const modalContainer = modalOverlay.querySelector('div');
                    modalContainer.classList.remove('modal-open-animation');
                }, 3000);
            });
        }
    }
});



//img slider
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Hero Section Image Slider (Right-to-Left Effect)
    const sliderContainer = document.getElementById('slider-container');
    const sliderImages = document.querySelectorAll('.slider-image');
    const totalImages = sliderImages.length;
    let currentImageIndex = 0;
    const slideDuration = 5000; // 5 seconds interval between slides

    function slideImages() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        const offset = -currentImageIndex * 100; // Calculate percentage to slide
        sliderContainer.style.transform = `translateX(${offset}%)`;
    }

    // Duplicate the first image at the end for seamless looping transition
    // This is a common trick for smooth infinite carousels without complex JS
    const firstImageClone = sliderImages[0].cloneNode(true);
    sliderContainer.appendChild(firstImageClone);

    // Start the slider
    setInterval(slideImages, slideDuration);

    // Optional: Reset position after a full loop (when the clone is shown)
    // This prevents a sudden jump back to the start
    sliderContainer.addEventListener('transitionend', () => {
        if (currentImageIndex === totalImages) {
            sliderContainer.style.transition = 'none'; // Temporarily remove transition
            currentImageIndex = 0;
            sliderContainer.style.transform = `translateX(0%)`;
            // Force a reflow to apply the `none` transition before adding it back
            void sliderContainer.offsetWidth;
            sliderContainer.style.transition = 'transform 1s ease-in-out'; // Add transition back
        }
    });
});