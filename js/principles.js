/**
 * Lumi6 Principles Interactive Engine
 * - Precision ScrollSpy for sticky sidebar navigation
 * - Smooth click scrolling with instant active state update
 * - One-click share & anchor link copy with toast notification
 * - Reading scroll progress indicator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('readingProgressBar');
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && progressBar) {
      const percentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${Math.min(percentage, 100)}%`;
    }
  };

  // 2. Toast Notification System
  const toast = document.getElementById('shareToast');
  const toastText = document.getElementById('toastText');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Helper: Copy text to clipboard
  const copyUrlToClipboard = (url, successMsg) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopyText(url, successMsg);
      });
    } else {
      fallbackCopyText(url, successMsg);
    }
  };

  const fallbackCopyText = (text, successMsg) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      showToast('Could not copy link');
    }
    document.body.removeChild(textArea);
  };

  // 3. Share Page Actions
  const shareButtons = document.querySelectorAll('.btn-sidebar-share, .btn-manifesto-share');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const shareData = {
        title: 'The Principles We Live By | Lumi6',
        text: 'The 10 foundational principles and operating ethos of Lumi6.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyUrlToClipboard(window.location.href, 'Principles link copied to clipboard!');
          }
        }
      } else {
        copyUrlToClipboard(window.location.href, 'Principles link copied to clipboard!');
      }
    });
  });

  // 4. Individual Card Direct Anchor Copy Buttons
  const cardCopyButtons = document.querySelectorAll('.btn-card-copy-link');
  cardCopyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.principle-master-card');
      if (card && card.id) {
        const fullUrl = `${window.location.origin}${window.location.pathname}#${card.id}`;
        history.replaceState(null, '', `#${card.id}`);
        copyUrlToClipboard(fullUrl, `Link to Principle #${card.getAttribute('data-number') || ''} copied!`);
      }
    });
  });

  // 5. Precision Real-Time ScrollSpy for Sidebar Index
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-item');
  const cards = document.querySelectorAll('.principle-master-card');
  let isManualScrolling = false;
  let manualScrollTimeout;

  const getActiveCardId = () => {
    if (!cards.length) return '';
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    // Trigger zone is 30% from the top of the viewport
    const triggerLine = scrollY + (viewportHeight * 0.3);

    let activeId = '';
    
    // Check if we are above the first card
    const firstCardTop = cards[0].getBoundingClientRect().top + scrollY;
    if (triggerLine < firstCardTop) {
      return cards[0].id;
    }

    // Check each card boundaries
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = card.getBoundingClientRect().top + scrollY;
      const cardBottom = cardTop + card.offsetHeight;

      if (triggerLine >= cardTop && triggerLine < cardBottom) {
        activeId = card.id;
        break;
      }
    }

    // If beyond the last card
    if (!activeId) {
      const lastCard = cards[cards.length - 1];
      const lastCardTop = lastCard.getBoundingClientRect().top + scrollY;
      if (triggerLine >= lastCardTop) {
        activeId = lastCard.id;
      }
    }

    return activeId || cards[0].id;
  };

  const updateActiveSidebarItem = (targetId) => {
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Optimized Scroll Listener using RequestAnimationFrame
  let ticking = false;
  const onScroll = () => {
    updateProgress();
    
    if (isManualScrolling) return;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const activeId = getActiveCardId();
        if (activeId) {
          updateActiveSidebarItem(activeId);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial sync on page load
  onScroll();

  // Smooth Click Handling for Sidebar Links
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetCard = document.getElementById(targetId);
      
      if (targetCard) {
        isManualScrolling = true;
        updateActiveSidebarItem(targetId);
        
        const cardTop = targetCard.getBoundingClientRect().top + window.scrollY;
        // Scroll with clearance for top navbar
        window.scrollTo({
          top: cardTop - 110,
          behavior: 'smooth'
        });

        history.replaceState(null, '', `#${targetId}`);

        clearTimeout(manualScrollTimeout);
        manualScrollTimeout = setTimeout(() => {
          isManualScrolling = false;
        }, 700);
      }
    });
  });
});
