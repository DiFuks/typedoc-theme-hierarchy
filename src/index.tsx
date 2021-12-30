import { Application, JSX } from 'typedoc';

import { OverrideTheme } from './themes/OverrideTheme';

/**
 * Инициализирует плагин с темой.
 */
export const load = (app: Application): void => {
  app.renderer.hooks.on(
    'head.end',
    (context): JSX.Element => (
      <link rel='stylesheet' href={context.relativeURL('assets/custom.css')} />
    ),
  );

  app.renderer.hooks.on(
    'body.end',
    (context): JSX.Element => (
      <script src={context.relativeURL('assets/custom.js')} />
    ),
  );

  app.renderer.defineTheme('hierarchy', OverrideTheme);
};
