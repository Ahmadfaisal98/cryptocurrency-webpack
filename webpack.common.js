const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

// replace accordingly './.env' with the path of your .env file
require('dotenv').config({ path: './.env' });

module.exports = {
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 30kb
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    hot: true,
  },
};
