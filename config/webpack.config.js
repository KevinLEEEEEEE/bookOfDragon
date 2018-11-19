const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  entry: {
    app: [
      resolve('src/js/index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          babelrc: true,
          extends: join(__dirname + '/../.babelrc'),
        }
      },
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          inline: true,
          publicPath: '/src/workers/',
          name: '/src/workers/[hash].worker.js'
        }
      },
      {
        test: /\.wasm$/,
        type: 'javascript/auto',
        loader: 'arraybuffer-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          },
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: join(__dirname, '../index.html'),
      title: 'bookOfDragon',
    })
  ],
};
