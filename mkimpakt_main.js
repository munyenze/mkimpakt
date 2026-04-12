// MK Impakt Advisory — main.js
// Progressive enhancement: mark body as JS-enabled first,
// so .reveal elements only hide once we know JS is working.

document.addEventListener('DOMContentLoaded', function () {

  // Step 1: Signal to CSS that JS is active
  document.body.classList.add('js-loaded');

  // Step 2: Scroll-reveal with IntersectionObserver
  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback: no IntersectionObserver — just show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Step 3: Active nav highlight on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) { link.style.color = ''; });
          var activeLink = document.querySelector('.nav__links a[href="#' + entry.target.id + '"]');
          if (activeLink) activeLink.style.color = '#EB4F1C';
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

});
