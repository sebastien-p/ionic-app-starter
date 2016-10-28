'use strict';

var format = require('util').format;
var replaceInFile = require('../common/replace-in-file');
var constants = require('../common/constants').android;
var getProjectNativePath = require('./get-project-native-path');
var getPackageId = require('./get-package-id');

/**
 * Copy the Java source file where it should be copied, replacing stuff in it.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function addSource(context) {
  var packageId = getPackageId(context);
  var nativePath = getProjectNativePath(packageId);
  var sourcePath = format(constants.SOURCE_PATH, context.opts.plugin.dir);
  var opt = { dest: format(constants.SOURCE_DEST, nativePath) };
  replaceInFile(sourcePath, /PACKAGE_ID/, packageId, opt);
};
