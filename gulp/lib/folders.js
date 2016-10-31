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
  SAME: same,
  ROOT: root,
  ASSETS: root + 'assets/',
  PLATFORMS: root + 'platforms/',
  PLUGINS: root + 'plugins/',
  TEST: root + 'test/',
  WWW: root + 'www/',
  SRC: src,
  IMAGES: src + 'images/',
  MODULES: src + 'modules/',
  RESOURCES: src + 'resources',
  STYLES: src + 'styles/'
};
