import { DefaultThemeRenderContext, type PageEvent, type Reflection } from 'typedoc';

import { navigation } from '../partials/navigation.js';

export class OverrideThemeContext extends DefaultThemeRenderContext {
	override navigation = (context: PageEvent<Reflection>) => {
		return navigation(this)(context);
	}
}
