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

  // Preload video asynchronously in the background after page loads to avoid render-blocking
  const startPreload = () => {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
      video.load();
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(startPreload, 2200); // Trigger preload 2.2 seconds after complete
  } else {
    window.addEventListener('load', () => {
      setTimeout(startPreload, 2200); // Trigger preload 2.2 seconds after window load event
    });
  }

  // Use IntersectionObserver to play/pause (conserving CPU)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!video.src) {
          startPreload();
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

const initTransitionScroll = () => {
  const section = document.querySelector('.transition-section');
  const text = document.querySelector('.transition-text');
  if (!section || !text) return;

  // Split text content into spans for typewriter reveal
  const rawText = text.textContent.trim();
  const words = rawText.split(/\s+/);
  text.innerHTML = words.map(word => `<span class="reveal-word">${word}</span>`).join(' ');

  const wordSpans = text.querySelectorAll('.reveal-word');
  const totalWords = wordSpans.length;

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate scroll progress through the transition section
    // 0 when section top is at viewport bottom, 1 when section bottom is at viewport top
    const startOffset = viewportHeight;
    const endOffset = -rect.height;
    const currentPos = rect.top;
    
    const range = startOffset - endOffset;
    const progress = (startOffset - currentPos) / range;
    
    // Typewriter effect mapping progress from 0.15 to 0.55 (typing completes earlier to allow reading)
    let activeThreshold = 0;
    if (progress >= 0.15 && progress <= 0.55) {
      activeThreshold = ((progress - 0.15) / 0.4) * totalWords;
    } else if (progress > 0.55) {
      activeThreshold = totalWords;
    }

    wordSpans.forEach((span, index) => {
      if (index <= activeThreshold) {
        span.classList.add('revealed');
      } else {
        span.classList.remove('revealed');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call
};

const initCapabilitiesSidebarObserver = () => {
  const menuItems = document.querySelectorAll('.capabilities-sidebar .menu-item');
  const blocks = document.querySelectorAll('.capability-detail-block');
  if (!menuItems.length || !blocks.length) return;

  // Track scroll position to toggle active state in sidebar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        menuItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
            // Smoothly center the active item inside horizontal scrolling container on mobile
            item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35, // Trigger state change when 35% of the block is visible
    rootMargin: '-10% 0px -40% 0px' // Offset viewport boundary to match human eyes
  });

  blocks.forEach(block => observer.observe(block));

  // Add click support to scroll smoothly to blocks
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetBlock = document.getElementById(targetId);
      if (targetBlock) {
        const offset = 140; // Spacing for sticky navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetBlock.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Initialize component interactions
const initApp = () => {
  initNavbar();
  initHeroVideo();
  initVideoLoader();
  initHeroReveal();
  initFAQ();
  initTransitionScroll();
  initCapabilitiesSidebarObserver();
  console.log('App initialized.');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
