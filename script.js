// Enhanced navigation functionality with top scrolling
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Function to show section and scroll to top
  function showSection(targetId) {
    // Hide all sections
    sections.forEach((section) => {
      section.classList.add('hidden');
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      targetSection.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });

    // Scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Close mobile menu if open
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  }

  // Add click event listeners to all nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);

      // Add active class to clicked link
      this.classList.add('active');

      // Show the target section
      showSection(targetId);
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImages = document.querySelectorAll('.lightbox-image');

  // Open lightbox when clicking on images
  lightboxImages.forEach((image) => {
    image.addEventListener('click', function () {
      const imageSrc = this.getAttribute('data-src') || this.src;
      const imageAlt = this.alt;

      lightboxImage.src = imageSrc;
      lightboxImage.alt = imageAlt;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Close lightbox when clicking close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
});

console.log('kocham Dorotę ❤');
