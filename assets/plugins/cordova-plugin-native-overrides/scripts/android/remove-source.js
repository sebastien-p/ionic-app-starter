'use strict';

var format = require('util').format;
var deleteFile = require('../common/delete-file');
var SOURCE_DEST = require('../common/constants').android.SOURCE_DEST;
var getProjectNativePath = require('./get-project-native-path');

/**
 * Remove the Java source file from where it was copied.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function removeSource(context) {
  deleteFile(format(SOURCE_DEST, getProjectNativePath(context)));
};
