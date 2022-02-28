const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    'postcss-preset-env',
    // purgecss({
    //   content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
    //   defaultExtractor: (content) => content.match(/[A-Za-z0-9-/]+/g) || [],
    // }),
  ],
};
