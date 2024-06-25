import { type DefaultTheme, DefaultThemeRenderContext, type Options, type PageEvent, type Reflection } from 'typedoc';

import { navigation } from '../partials/navigation';

export class OverrideThemeContext extends DefaultThemeRenderContext {
	public constructor(theme: DefaultTheme, page: PageEvent<Reflection>, options: Options) {
		super(theme, page, options);

		this.navigation = navigation(this);
	}
}
