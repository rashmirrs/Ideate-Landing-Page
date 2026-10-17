(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
        menuButton.focus();
      }
    });
  }

  const filterButtons = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.challenge-card')];
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach(card => {
        card.hidden = selected !== 'all' && card.dataset.category !== selected;
      });
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('is-visible'));
  }
})();