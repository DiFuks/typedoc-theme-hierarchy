import { DefaultTheme, DefaultThemeRenderContext, Options } from 'typedoc';
import { navigation } from '../partials/navigation';

export class OverrideThemeContext extends DefaultThemeRenderContext {
  public constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.navigation = navigation(this);
  }
}
