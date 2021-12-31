import '../css/custom.css';

for (const item of document.querySelectorAll<HTMLElement>(
  '.js-category-title:not([data-id="root"])',
)) {
  item.addEventListener('click', () => {
    const id = item.dataset.id || '';

    const list = document.querySelector<HTMLElement>(
      `.js-category-list[data-id="${id}"]`,
    );

    const icon = document.querySelector(`.js-category-icon[data-id="${id}"]`);

    list?.classList.toggle('_open');
    icon?.classList.toggle('fa-folder-open');
  });
}

(() => {
  const pathname = window.location.pathname.replace('/docs', '');

  let activeElement = document.querySelector<HTMLElement>(
    `.js-category-link[data-id="${pathname}"]`,
  );

  if (!activeElement) {
    return;
  }

  activeElement.classList.add('_active');

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const parent: HTMLDivElement | null | undefined =
      activeElement?.closest<HTMLDivElement>('.js-category-list');

    if (!parent) {
      break;
    }

    parent.classList.add('_open');
    parent.parentNode
      ?.querySelector('.js-category-icon')
      ?.classList.add('category__folder--open');

    activeElement = parent.parentNode as HTMLElement;
  }
})();
