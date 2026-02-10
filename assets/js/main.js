/**
 * Enhanced & Polished JS for Sinekhaya Advocate Portfolio
 * Maintains full compatibility while improving UX & animations
 */

(function() {
  "use strict";

  /* Helper Functions */
  const select = (el, all = false) => all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (!elements) return;
    all ? elements.forEach(e => e.addEventListener(type, listener)) : elements.addEventListener(type, listener);
  };

  /* Header toggle */
  const header = select('#header');
  const headerToggleBtn = select('.header-toggle');
  const toggleHeader = () => {
    header?.classList.toggle('header-show');
    headerToggleBtn?.classList.toggle('bi-list');
    headerToggleBtn?.classList.toggle('bi-x');
  };
  on('click', '.header-toggle', toggleHeader);

  /* Close mobile nav on link click */
  on('click', '#navmenu a', () => {
    if (header?.classList.contains('header-show')) toggleHeader();
  }, true);

  /* Dropdown toggle for mobile nav */
  on('click', '.navmenu .toggle-dropdown', function(e) {
    e.preventDefault();
    this.parentNode.classList.toggle('active');
    this.parentNode.nextElementSibling?.classList.toggle('dropdown-active');
    e.stopImmediatePropagation();
  }, true);

  /* Preloader */
  const preloader = select('#preloader');
  window.addEventListener('load', () => preloader?.remove());

  /* Scroll top button */
  const scrollTop = select('.scroll-top');
  const toggleScrollTop = () => scrollTop?.classList.toggle('active', window.scrollY > 100);
  on('click', '.scroll-top', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('load', toggleScrollTop);

  /* AOS animations */
  window.addEventListener('load', () => {
    if (window.AOS) AOS.init({ duration: 700, easing: 'ease-in-out', once: true, mirror: false });
  });

  /* Typed.js */
  const typedEl = select('.typed');
  if (typedEl && window.Typed) {
    new Typed('.typed', {
      strings: typedEl.dataset.typedItems.split(','),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* PureCounter */
  if (window.PureCounter) new PureCounter();

  /* Skills animation (Waypoint) */
  select('.skills-animation', true).forEach(skill => {
    new Waypoint({
      element: skill,
      offset: '80%',
      handler: () => skill.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('aria-valuenow') + '%';
      })
    });
  });

  /* GLightbox */
  if (window.GLightbox) GLightbox({ selector: '.glightbox' });

  /* Isotope with smooth scroll to filtered items */
  select('.isotope-layout', true).forEach(layout => {
    const container = layout.querySelector('.isotope-container');
    let iso;
    const layoutMode = layout.dataset.layout || 'masonry';

    imagesLoaded(container, () => {
      iso = new Isotope(container, { itemSelector: '.isotope-item', layoutMode });
    });

    layout.querySelectorAll('.portfolio-filters li').forEach(filter => {
      filter.addEventListener('click', () => {
        layout.querySelectorAll('.portfolio-filters li').forEach(f => f.classList.remove('filter-active'));
        filter.classList.add('filter-active');
        iso?.arrange({ filter: filter.dataset.filter });

        // Smooth scroll to first visible item in filtered portfolio
        const firstItem = container.querySelector('.isotope-item:not(.isotope-hidden)');
        firstItem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });

  /* Swiper sliders */
  window.addEventListener('load', () => {
    select('.init-swiper', true).forEach(swiperEl => {
      const configEl = swiperEl.querySelector('.swiper-config');
      const config = configEl ? JSON.parse(configEl.innerHTML.trim()) : {};
      new Swiper(swiperEl, config);
    });
  });

  /* Portfolio details fade-in animation (if using portfolio-details.html) */
  const portfolioInfo = select('#portfolio-info');
  const portfolioDesc = select('#portfolio-description');
  if (portfolioInfo && portfolioDesc) {
    const fadeInElements = () => {
      portfolioInfo.classList.add('show');
      portfolioDesc.classList.add('show');
    };
    window.addEventListener('load', fadeInElements);
  }

  /* Scrollspy navigation */
  const navLinks = select('.navmenu a', true);
  const updateNav = () => {
    const scrollPos = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      const isActive = scrollPos >= section.offsetTop && scrollPos <= (section.offsetTop + section.offsetHeight);
      link.classList.toggle('active', isActive);
    });
  };
  window.addEventListener('scroll', updateNav);
  window.addEventListener('load', updateNav);

  /* Correct hash scrolling offset */
  window.addEventListener('load', () => {
    if (!window.location.hash) return;
    const section = select(window.location.hash);
    if (!section) return;
    setTimeout(() => {
      const offset = parseInt(getComputedStyle(section).scrollMarginTop || 0);
      window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
    }, 100);
  });

})();