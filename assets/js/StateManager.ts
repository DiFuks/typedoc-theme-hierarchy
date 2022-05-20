export class StateManager {
  private readonly openedPathLsKey = 'opened-path-state';

  private openedPaths: string[] = [];

  public constructor() {
    const lsOpenedPathState = localStorage.getItem('opened-path-state');

    this.openedPaths = lsOpenedPathState ? JSON.parse(lsOpenedPathState) : [];
  }

  /**
   * Добавляет path в стейт.
   */
  public addOpenedPath(path: string): void {
    this.openedPaths.push(path);
    this.updateState();
  }

  /**
   * Удаляет path из стейта.
   */
  public removeOpenedPath(path: string): void {
    this.openedPaths = this.openedPaths.filter(
      (savedPath) => savedPath !== path,
    );
    this.updateState();
  }

  /**
   * Получает все открытые paths.
   */
  public getOpenedPaths(): string[] {
    return this.openedPaths;
  }

  private updateState(): void {
    localStorage.setItem(
      this.openedPathLsKey,
      JSON.stringify(this.openedPaths),
    );
  }
}
