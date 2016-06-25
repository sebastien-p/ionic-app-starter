'use strict';

var root = './';
var src = root + 'src/';

/**
 * Get same file path.
 * @param {File} file - A file object.
 * @return {String}
 */
function same(file) { return file.base; }

/**
 * Common folders constants.
 * @type {Object}
 */
module.exports = {
  same: same,
  root: root,
  assets: root + 'assets/',
  platforms: root + 'platforms/',
  plugins: root + 'plugins/',
  test: root + 'test/',
  www: root + 'www/',
  src: src,
  images: src + 'images/',
  modules: src + 'modules/',
  resources: src + 'resources',
  styles: src + 'styles/'
};
