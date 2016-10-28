'use strict';

var format = require('util').format;
var replaceInFile = require('../common/replace-in-file');
var getProjectConfig = require('../common/get-project-config');
var MAIN_PATH = require('../common/constants').ios.MAIN_PATH;

/**
 * Replace a given pattern with a given value in the iOS plist file.
 * @method exports
 * @param {RegExp} pattern
 * @param {String} value
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function replaceInPlist(pattern, value, context) {
  var path = format(MAIN_PATH, getProjectConfig(context).name);
  replaceInFile(path, pattern, value);
};
