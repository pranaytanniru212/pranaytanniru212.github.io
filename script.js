
(function () {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    };

    menuButton.addEventListener('click', () => {
      const shouldOpen =
        menuButton.getAttribute('aria-expanded') !== 'true';

      menuButton.setAttribute('aria-expanded', String(shouldOpen));
      menuButton.setAttribute(
        'aria-label',
        shouldOpen ? 'Close navigation' : 'Open navigation'
      );
      nav.classList.toggle('open', shouldOpen);
    });

    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', closeMenu)
    );

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', event => {
      if (!nav.contains(event.target) &&
          !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(other => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });

      projects.forEach(project => {
        project.hidden =
          filter !== 'all' &&
          !project.dataset.category.split(' ').includes(filter);
      });
    });
  });

  const year = document.getElementById('year');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
