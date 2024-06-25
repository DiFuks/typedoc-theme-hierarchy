import fse from 'fs-extra';
import path from 'path';
import { DefaultTheme, type PageEvent, type Reflection, RendererEvent } from 'typedoc';
import { type Renderer } from 'typedoc/dist/lib/output/renderer';

import { OverrideThemeContext } from './OverrideThemeContext';

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
		return new OverrideThemeContext(this, page, this.application.options);
	}
}
