/**
 * Lumi6 Principles Interactive Engine
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
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

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
  const shareButtons = document.querySelectorAll('.btn-manifesto-share');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const shareData = {
        title: 'The Principles We Live By | Lumi6',
        text: 'The 11 foundational principles and operating ethos of Lumi6.',
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
});
