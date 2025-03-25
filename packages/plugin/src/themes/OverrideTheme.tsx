import fse from 'fs-extra';
import path from 'path';
import { DefaultTheme, type PageEvent, type Reflection, Renderer, RendererEvent } from 'typedoc';

import { OverrideThemeContext } from './OverrideThemeContext.js';

export class OverrideTheme extends DefaultTheme {
	public constructor(renderer: Renderer) {
		super(renderer);

		this.owner.on(RendererEvent.END, event => {
			fse.copySync(
				path.join(require.resolve(`typedoc-theme-hierarchy`), `../assets`),
				path.join(event.outputDirectory, `assets`),
			);
		});
	}

	public override getRenderContext(page: PageEvent<Reflection>): OverrideThemeContext {
		return new OverrideThemeContext(this.router, this, page, this.application.options);
	}
}
