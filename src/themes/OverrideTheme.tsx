import path from 'path';

import fse from 'fs-extra';
import { DefaultTheme, PageEvent, Reflection, RendererEvent } from 'typedoc';
import { Renderer } from 'typedoc/dist/lib/output/renderer';

import { OverrideThemeContext } from './OverrideThemeContext';

export class OverrideTheme extends DefaultTheme {
  public constructor(renderer: Renderer) {
    super(renderer);

    this.listenTo(this.owner, RendererEvent.END, (event: RendererEvent) => {
      fse.copySync(
        // eslint-disable-next-line unicorn/prefer-module
        path.join(require.resolve('typedoc-theme-hierarchy'), '../assets'),
        path.join(event.outputDirectory, 'assets'),
      );
    });
  }

  /**
   * Переопределяет стандартный контекст.
   */
  public override getRenderContext(
    page: PageEvent<Reflection>,
  ): OverrideThemeContext {
    return new OverrideThemeContext(this, page, this.application.options);
  }
}
