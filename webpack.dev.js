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
  target: 'web',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          {
            loader: 'style-loader', // 3. Inject style into dom
          },
          {
            loader: 'css-loader', // 2. Turns css into commonjs
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // 1. Turn sass into css
            options: {
              sassOptions: {
                importer: globImporter(),
              },
              sourceMap: true,
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
