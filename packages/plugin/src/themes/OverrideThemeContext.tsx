import { DefaultThemeRenderContext, JSX, type PageEvent, type Reflection } from 'typedoc';

import { navigation } from '../partials/navigation.js';

export class OverrideThemeContext extends DefaultThemeRenderContext {
	override navigation = (context: PageEvent<Reflection>): JSX.Element => {
		return navigation(this)(context);
	}
}
