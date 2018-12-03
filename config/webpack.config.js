const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  entry: {
    app: [
      join(__dirname, '../src/js/index.js')
    ],
    oldNewspaper: join(__dirname, '../src/js/oldNewspaper/index.js')
  },
  resolve: {
    alias: {
      lib: '../lib'
    },
    extensions: ['.js', '.c', '.cpp']
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
        test: /\.(c|cpp)$/,
        use: {
          loader: 'cpp-wasm-loader'
        }
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
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, '../index.html'),
      title: 'bookOfDragon',
      chunks: ['app'],
      cache: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    })
  ],
};
