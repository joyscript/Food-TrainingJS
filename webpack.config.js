let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    hot: true,
    compress: true,
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true,
    },
  },
  devtool: 'eval-source-map',
  module: {},
};
