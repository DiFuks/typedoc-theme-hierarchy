import { defineConfig } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig([
	{
		entry: [`src/index.tsx`],
		format: [`cjs`, `esm`],
		dts: true,
		external: [`typedoc-theme-hierarchy`, `typedoc`],
		banner: ({ format }) => {
			if (format === `esm`) {
				return {
					js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
				};
			}

			return {};
		},
	},
]);
