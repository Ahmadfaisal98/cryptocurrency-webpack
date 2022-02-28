const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: './imgs/[name].[hash].[ext]',
    publicPath: '/',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css',
      ignoreOrder: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 4. Extract css into files
          },
          {
            loader: 'css-loader', // 3. Turns css into commonjs
          },
          {
            loader: 'postcss-loader', // 2. add auto prefix
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
});
