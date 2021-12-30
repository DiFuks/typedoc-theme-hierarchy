import {
  DefaultTheme,
  DefaultThemeRenderContext,
  Options,
  RendererEvent,
} from 'typedoc';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { copy } from 'fs-extra';
import path from 'node:path';

import { navigation } from '@plugin/partials/navigation';

class OverrideThemeContext extends DefaultThemeRenderContext {
  public constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.navigation = navigation(this.urlTo.bind(this));
  }
}

export class OverrideTheme extends DefaultTheme {
  private _contextCache?: OverrideThemeContext;

  public constructor(renderer: Renderer) {
    super(renderer);

    this.listenTo(this.owner, RendererEvent.END, async () => {
      const out = this.application.options.getValue('out');

      await copy(
        path.join(
          process.cwd(),
          '/node_modules/typedoc-theme-hierarchy/dist/assets',
        ),
        path.join(out, '/assets'),
      );
    });
  }

  /**
   * Переопределяет стандартный контекст.
   */
  public override getRenderContext(): OverrideThemeContext {
    this._contextCache ||= new OverrideThemeContext(
      this,
      this.application.options,
    );

    return this._contextCache;
  }
}
