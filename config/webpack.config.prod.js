const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'src/js/[name].[chunkhash].js'
  },
  plugins: [
    // new UglifyJsPlugin({
    //   test: /\.js(\?.*)?$/i,
    //   exclude: /\.worker\.js$/,
    //   sourceMap: true
    // }),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
    })
  ]
});
