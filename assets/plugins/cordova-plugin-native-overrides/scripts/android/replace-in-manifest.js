'use strict';

var MANIFEST_PATH = require('../common/constants').android.MANIFEST_PATH;
var replaceInFile = require('../common/replace-in-file');

/**
 * Replace a given pattern with a given value in the Android manifest file.
 * @method exports
 * @param {RegExp} pattern
 * @param {String} value
 */
module.exports = function replaceInManifest(pattern, value) {
  replaceInFile(MANIFEST_PATH, pattern, value);
};
