const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader', // 3. Inject style into dom
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turn sass into css
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
