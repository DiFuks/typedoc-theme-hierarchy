const path = require(`node:path`);

const { CleanWebpackPlugin } = require(`clean-webpack-plugin`);
const CssMinimizerPlugin = require(`css-minimizer-webpack-plugin`);
const TerserPlugin = require(`terser-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
/**
 * @typedef {import('webpack').Configuration} Configuration
 */

/**
 * @type {Configuration}
 */
const config = {
	mode: `production`,
	entry: `./assets/js/custom.ts`,
	output: {
		filename: `hierarchy-theme.js`,
		path: path.resolve(process.cwd(), `dist/assets`),
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `hierarchy.css`,
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: `ts-loader`,
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, `css-loader`],
			},
		],
	},
	resolve: {
		extensions: [`.tsx`, `.ts`, `.js`],
		extensionAlias: {
			'.js': ['.js', '.ts'],
		},
	},
};

/**
 * Описывает webpack-конфиг.
 */
module.exports = config;
