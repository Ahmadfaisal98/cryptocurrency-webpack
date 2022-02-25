const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

const plugins = [];
if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: 'style-loader', // 3. Inject style into dom
          },
          {
            loader: 'css-loader', // 2. Turns css into commonjs
          },
          {
            loader: 'sass-loader', // 1. Turn sass into css
            options: {
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: true,
  },
});
