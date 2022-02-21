const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
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
};
