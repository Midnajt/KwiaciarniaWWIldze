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

  // Lightbox functionality with gallery navigation
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxImages = document.querySelectorAll('.lightbox-image');

  let currentGallery = []; // { src, alt }[]
  let currentIndex = 0;

  function showLightboxImage(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
  }

  function showPrevImage(e) {
    if (e) e.stopPropagation();
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentIndex];
    showLightboxImage(item.src, item.alt);
  }

  function showNextImage(e) {
    if (e) e.stopPropagation();
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    const item = currentGallery[currentIndex];
    showLightboxImage(item.src, item.alt);
  }

  function setGalleryArrowsVisible(visible) {
    const arrows = document.querySelectorAll('.lightbox-arrow');
    arrows.forEach((el) => {
      el.style.visibility = visible ? 'visible' : 'hidden';
      el.style.pointerEvents = visible ? 'auto' : 'none';
    });
  }
  setGalleryArrowsVisible(false); // hide until a gallery is opened

  // Open lightbox when clicking on images
  lightboxImages.forEach((image) => {
    image.addEventListener('click', function () {
      const imageSrc = this.getAttribute('data-src') || this.src;
      const imageAlt = this.alt || '';
      const galleryName = this.getAttribute('data-gallery');

      if (galleryName) {
        const galleryImages = document.querySelectorAll('.lightbox-image[data-gallery="' + galleryName + '"]');
        currentGallery = Array.from(galleryImages).map((img) => ({
          src: img.getAttribute('data-src') || img.src,
          alt: img.alt || '',
        }));
        currentIndex = currentGallery.findIndex((item) => item.src === imageSrc);
        if (currentIndex < 0) currentIndex = 0;
        setGalleryArrowsVisible(currentGallery.length > 1);
      } else {
        currentGallery = [];
        setGalleryArrowsVisible(false);
      }

      showLightboxImage(imageSrc, imageAlt);
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // Close lightbox when clicking close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Prev/Next arrows
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
  }

  // Close lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard: Escape close, Left/Right navigate gallery
  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      closeLightbox();
      return;
    }
    if (currentGallery.length > 1) {
      if (e.key === 'ArrowLeft') {
        showPrevImage();
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
        e.preventDefault();
      }
    }
  });

  // Touch swipe: na telefonie przewijanie zdjęć gestem w lewo/w prawo
  const lightboxContent = document.getElementById('lightbox-content');
  const swipeMin = 50;
  let touchStartX = 0;

  if (lightboxContent) {
    lightboxContent.addEventListener(
      'touchstart',
      function (e) {
        if (currentGallery.length <= 1) return;
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    lightboxContent.addEventListener('touchend', function (e) {
      if (currentGallery.length <= 1) return;
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      if (delta > swipeMin) showNextImage();
      else if (delta < -swipeMin) showPrevImage();
    });
  }
});

console.log('kocham Dorotę ❤');
