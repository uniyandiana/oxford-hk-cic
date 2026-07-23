// Scroll-reveal: fades/lifts key blocks into view as the user scrolls.
// Respects prefers-reduced-motion by revealing everything immediately.
(function () {
  const targets = document.querySelectorAll(
    '.hero-content, .about, .section-title, .event-card, .benefit-card, .membership-card, .membership-notes, .contact-inner'
  );

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  targets.forEach((el) => el.classList.add('reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();
