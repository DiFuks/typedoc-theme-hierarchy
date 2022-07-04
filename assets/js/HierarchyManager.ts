import { StateManager } from './StateManager';

export class HierarchyManager {
  private readonly stateManager = new StateManager();

  private readonly titleSelector = '.js-category-title';

  private readonly titleOpenedClass = 'category__title--open';

  private readonly listSelector = '.js-category-list';

  /**
   * Инициализирует иерархию.
   */
  public init(): void {
    this.addListeners();
    this.initSaved();
    this.openCurrentPath();
  }

  private openPathAndSave(id: string): void {
    this.openPath(id);

    this.stateManager.addOpenedPath(id);
  }

  private openPath(id: string): void {
    const list = document.querySelector(
      `${this.listSelector}[data-id="${id}"]`,
    );

    if (!list) {
      return;
    }

    list.classList.add('_open');
    list.parentNode
      ?.querySelector(this.titleSelector)
      ?.classList.add(this.titleOpenedClass);
  }

  private closePath(id: string): void {
    const list = document.querySelector(
      `${this.listSelector}[data-id="${id}"]`,
    );

    if (!list) {
      return;
    }

    list.classList.remove('_open');
    list.parentNode
      ?.querySelector(this.titleSelector)
      ?.classList.remove(this.titleOpenedClass);

    this.stateManager.removeOpenedPath(id);
  }

  private closePathWithChildren(id: string): void {
    this.closePath(id);

    const list = document.querySelector(
      `${this.listSelector}[data-id="${id}"]`,
    );

    if (!list) {
      return;
    }

    const childLists = list.querySelectorAll<HTMLElement>(this.listSelector);

    for (const item of childLists) {
      this.closePath(item.dataset.id || '');
    }
  }

  private togglePath(id: string): void {
    const list = document.querySelector(
      `${this.listSelector}[data-id="${id}"]`,
    );

    if (!list) {
      return;
    }

    if (list.classList.contains('_open')) {
      this.closePathWithChildren(id);

      return;
    }

    this.openPathAndSave(id);
  }

  private addListeners(): void {
    const items = document.querySelectorAll<HTMLElement>(
      '.js-category-title:not([data-id="root"])',
    );

    for (const item of items) {
      item.addEventListener('click', () => {
        const id = item.dataset.id || '';

        this.togglePath(id);
      });
    }

    this.addExpandListener();
    this.addCollapseListener();
    this.addTargetListener();
  }

  private addExpandListener(): void {
    const expandButton = document.querySelector('.js-tree-expand');

    expandButton?.addEventListener('click', () => {
      const items = document.querySelectorAll<HTMLElement>(this.listSelector);

      for (const item of items) {
        const id = item.dataset.id || '';

        this.openPathAndSave(id);
      }
    });
  }

  private addCollapseListener(): void {
    const collapseButton = document.querySelector('.js-tree-collapse');

    collapseButton?.addEventListener('click', () => {
      const items = document.querySelectorAll<HTMLElement>(this.listSelector);

      for (const item of items) {
        const id = item.dataset.id || '';

        this.closePath(id);
      }
    });
  }

  private addTargetListener(): void {
    const targetButton = document.querySelector('.js-tree-target');

    targetButton?.addEventListener('click', () => {
      const targetElement = this.openCurrentPath();

      targetElement?.scrollIntoView();
    });
  }

  private initSaved(): void {
    const savedPaths = this.stateManager.getOpenedPaths();

    for (const id of savedPaths) {
      this.openPath(id);
    }
  }

  private openCurrentPath(): Element | null {
    const pathnameSplit = window.location.pathname.split('/');
    const pathname = `/${pathnameSplit[pathnameSplit.length - 2] || ''}/${
      pathnameSplit[pathnameSplit.length - 1] || ''
    }`;

    const activeElement = document.querySelector(
      `.js-category-link[data-id="${pathname}"]`,
    );

    if (!activeElement) {
      return null;
    }

    activeElement.classList.add('_active');

    let parent = activeElement.closest<HTMLElement>(this.listSelector);

    // eslint-disable-next-line no-constant-condition,@typescript-eslint/no-unnecessary-condition
    while (true) {
      if (!parent) {
        break;
      }

      const id = parent.dataset.id || '';

      this.openPath(id);

      parent = (parent.parentNode as HTMLElement).closest<HTMLElement>(
        this.listSelector,
      );
    }

    return activeElement;
  }
}
