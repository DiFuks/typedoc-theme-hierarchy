import { Configuration } from 'webpack';
import * as path from 'node:path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: Configuration = {
  mode: 'production',
  entry: './assets/js/custom.ts',
  output: {
    filename: 'custom.js',
    path: path.resolve(process.cwd(), 'dist/assets'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'custom.css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

/**
 * Описывает webpack-конфиг.
 */
export default config;
