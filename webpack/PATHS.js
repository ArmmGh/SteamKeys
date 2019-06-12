const path = require('path');

module.exports = {
  SRC: path.resolve('client/src'),
  DIST: path.resolve('dist'),
  APP: path.resolve('client/src/index'),
  TEMPLATE: path.resolve('webpack/template.html'),
  POSTCSS: path.resolve('postcss.config.js'),
};
