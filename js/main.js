import { initNavbar } from './navbar.js';

const initVideoLoader = () => {
  const video = document.querySelector('.hero-video');
  const container = document.querySelector('.hero-video-container');
  if (!video || !container) return;

  // Slow the video playback rate to 0.8
  video.playbackRate = 0.8;

  // Set loading class initially
  container.classList.add('video-loading');

  // Remove loading and trigger playing fade-in when active
  video.addEventListener('playing', () => {
    container.classList.remove('video-loading');
    container.classList.add('video-playing');
  });

  // Use IntersectionObserver to load and play when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Load the src if not already loaded
        if (!video.src && video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
        }
        video.play().catch(err => console.log('Video play interrupted:', err));
      } else {
        // Pause when scrolled out of view to save CPU/resources
        if (video.src) {
          video.pause();
        }
      }
    });
  }, { threshold: 0.15 });

  observer.observe(container);
};

const initHeroReveal = () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    // Add the class after a small paint delay
    setTimeout(() => {
      heroContent.classList.add('hero-revealed');
    }, 100);
  }
};

const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const wrapper = item.querySelector('.faq-answer-wrapper');
    if (!btn || !wrapper) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
          if (otherWrapper) {
            otherWrapper.style.maxHeight = '0';
          }
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        wrapper.style.maxHeight = '0';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
};

const initHeroVideo = () => {
  const video = document.querySelector('.hero-video-element');
  if (video && video.dataset.src) {
    video.src = video.dataset.src;
    video.load();
    video.play().catch(err => console.log('Hero video play blocked/failed:', err));
  }
};

// Initialize component interactions
const initApp = () => {
  initNavbar();
  initHeroVideo();
  initVideoLoader();
  initHeroReveal();
  initFAQ();
  console.log('App initialized.');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
