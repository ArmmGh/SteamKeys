/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
/* eslint-enable */
require('dotenv').config();

const { TITLE } = process.env;

const PATHS = require('./PATHS');

exports.setMode = mode => ({
  mode,
});

exports.sourceMaps = method => ({
  devtool: method,
});

exports.buildSetup = env => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.TEMPLATE,
      filename: 'index.html',
      title: TITLE,
      inject: 'body',
      minify:
        env === 'development'
          ? false
          : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            html5: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: PATHS.TEMPLATE_404,
    }),
    new BaseHrefWebpackPlugin({
      baseHref:
        env === 'development'
          ? 'https://keyforu.net/'
          : 'https://keyforu.net/',
    }),
  ],
});

exports.extractLess = new ExtractTextPlugin({
  filename: 'style.[hash].css',
});

exports.styleLoader = options => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: options.use,
      },
    ],
  },
});
