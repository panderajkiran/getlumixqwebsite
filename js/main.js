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



// Auto-update navbar active link based on click, hash, and scroll position
const initNavbarActiveTracking = () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  if (!navLinks.length) return;

  const setActiveLink = (targetLink) => {
    navLinks.forEach(link => {
      const isMatch = link === targetLink;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const pathname = window.location.pathname.toLowerCase();

  // 1. Check if we are on a dedicated sub-page (e.g. product.html)
  if (pathname.includes('product')) {
    const productLink = navLinks.find(link => 
      link.dataset.section === 'product' || 
      (link.getAttribute('href') && link.getAttribute('href').includes('product'))
    );
    if (productLink) {
      setActiveLink(productLink);
      return;
    }
  }

  // 2. Map links to sections on current page
  const sectionMap = [];
  navLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (section) {
      sectionMap.push({ link, sectionId, section });
    }
  });

  if (!sectionMap.length) return;

  let isManualClick = false;
  let clickTimeout = null;

  // 3. Immediate click handler for all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setActiveLink(link);
      isManualClick = true;
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        isManualClick = false;
      }, 900);
    });
  });

  // 4. Robust scroll spy with top offset
  const updateActiveOnScroll = () => {
    if (isManualClick) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const navOffset = 140; // Detection line just beneath the navbar

    // If at the very top of hero (before first section), clear active
    const firstSectionTop = sectionMap[0].section.offsetTop;
    if (scrollY < firstSectionTop - 250) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      return;
    }

    // Find the current section in view
    let currentItem = null;
    for (let i = 0; i < sectionMap.length; i++) {
      const { link, section } = sectionMap[i];
      const rect = section.getBoundingClientRect();
      if (rect.top <= navOffset && rect.bottom >= navOffset) {
        currentItem = link;
        break;
      }
    }

    // If reached bottom of page, activate last item (FAQ)
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      currentItem = sectionMap[sectionMap.length - 1].link;
    }

    if (currentItem) {
      setActiveLink(currentItem);
    }
  };

  // 5. Check hash on page load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matched = sectionMap.find(item => item.sectionId === hash);
    if (matched) {
      setActiveLink(matched.link);
      isManualClick = true;
      setTimeout(() => { isManualClick = false; }, 1000);
    }
  } else {
    updateActiveOnScroll();
  }

  // 6. Listen for scroll events
  window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
};

// Smooth navigation back to home page start when clicking the logo
const initNavLogo = () => {
  const logoElements = document.querySelectorAll('.nav-logo, .footer-logo');
  if (!logoElements.length) return;

  logoElements.forEach((logo) => {
    if (logo.tagName !== 'A') {
      logo.style.cursor = 'pointer';
    }

    logo.addEventListener('click', (e) => {
      const pathname = window.location.pathname;
      const isHomePage = pathname.endsWith('index.html') || 
                         pathname === '/' || 
                         pathname.endsWith('/') || 
                         !pathname.includes('.html');

      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // Also ensure scroll top on body/doc in case of edge container scrolling
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Clear any anchor hash
        if (window.location.hash) {
          history.pushState(null, null, pathname + window.location.search);
        }
        // Clear active highlights
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        });
      } else {
        if (logo.tagName !== 'A') {
          window.location.href = 'index.html';
        }
      }
    });
  });
};

// Scroll-to-top floating button
const initScrollToTop = () => {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  const heroHeight = window.innerHeight; // Show after scrolling past hero

  const handleScroll = () => {
    if (window.scrollY > heroHeight) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
};

// Play/pause capability detail videos on visibility to conserve CPU
const initDetailVideoPlayControl = () => {
  const videos = document.querySelectorAll('.card-grid-video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  videos.forEach(video => observer.observe(video));
};

// Progressive sticky card deck physics for Use Cases
const initStickyUseCasesStack = () => {
  const cards = Array.from(document.querySelectorAll('.sticky-card-wrapper'));
  if (!cards.length) return;

  const handleStackPhysics = () => {
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      const nextCard = cards[index + 1];
      if (!nextCard) return;

      const nextCardRect = nextCard.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const overlapStart = cardRect.top + 60;
      const overlapDistance = nextCardRect.top - overlapStart;

      if (overlapDistance < 250 && overlapDistance > 0) {
        const progress = 1 - (overlapDistance / 250);
        const scale = 1 - (progress * 0.04);
        const opacity = 1 - (progress * 0.15);
        card.style.transform = `scale(${scale})`;
        card.style.opacity = `${opacity}`;
      } else if (overlapDistance <= 0) {
        card.style.transform = 'scale(0.96)';
        card.style.opacity = '0.85';
      } else {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      }
    });
  };

  window.addEventListener('scroll', handleStackPhysics, { passive: true });
  handleStackPhysics();
};

// Interactive Challenge vs Solution Toggle for Use Case cards
const initUseCaseToggles = () => {
  const cards = document.querySelectorAll('.sticky-card-wrapper');
  if (!cards.length) return;

  cards.forEach(card => {
    const toggleBtns = card.querySelectorAll('.uc-toggle-btn');
    const challengePane = card.querySelector('.uc-pane-challenge');
    const solutionPane = card.querySelector('.uc-pane-solution');
    const badge = card.querySelector('.sticky-image-badge');
    const ctaBtn = card.querySelector('.sticky-card-footer a');
    const ctaText = card.querySelector('.btn-cta-text');

    if (!toggleBtns.length || !challengePane || !solutionPane) return;

    toggleBtns.forEach((btn, btnIndex) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.dataset.tab;

        // Update button states
        toggleBtns.forEach(b => {
          const isCurrent = b === btn;
          b.classList.toggle('active', isCurrent);
          b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
          b.setAttribute('tabindex', isCurrent ? '0' : '-1');
        });

        // Switch panes
        if (tab === 'solution') {
          challengePane.classList.remove('active');
          solutionPane.classList.add('active');

          if (badge && badge.dataset.solution) {
            badge.textContent = badge.dataset.solution;
            badge.classList.add('badge-solution');
          }

          if (ctaText && ctaBtn && ctaBtn.dataset.solutionText) {
            ctaText.textContent = ctaBtn.dataset.solutionText;
          }
        } else {
          solutionPane.classList.remove('active');
          challengePane.classList.add('active');

          if (badge && badge.dataset.challenge) {
            badge.textContent = badge.dataset.challenge;
            badge.classList.remove('badge-solution');
          }

          if (ctaText && ctaBtn && ctaBtn.dataset.challengeText) {
            ctaText.textContent = ctaBtn.dataset.challengeText;
          }
        }
      });

      // Keyboard arrow navigation between toggle buttons
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const targetIndex = e.key === 'ArrowRight' 
            ? (btnIndex + 1) % toggleBtns.length 
            : (btnIndex - 1 + toggleBtns.length) % toggleBtns.length;
          toggleBtns[targetIndex].focus();
          toggleBtns[targetIndex].click();
        }
      });
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
  initNavbarActiveTracking();
  initScrollToTop();
  initDetailVideoPlayControl();
  initStickyUseCasesStack();
  initUseCaseToggles();
  initNavLogo();
  console.log('App initialized.');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
