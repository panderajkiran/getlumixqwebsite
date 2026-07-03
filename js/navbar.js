export const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) {
    console.error('Navbar element not found');
    return;
  }

  // Handle navbar transition on scroll
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollTop > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Run scroll check on load in case the page is already scrolled
  handleScroll();

  // Listen to scroll events on both window and document to ensure it fires in all environments
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('scroll', handleScroll, { passive: true });
  console.log('Navbar scroll interaction initialized (modular version).');
};
