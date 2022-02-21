const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: './imgs/[name].[hash].[ext]',
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css' }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader, // 4. Extract css into files
          'css-loader', // 3. Turns css into commonjs
          'postcss-loader', // 2. add auto prefix
          'sass-loader', // 1. Turns sass into css
        ],
      },
    ],
  },
});
