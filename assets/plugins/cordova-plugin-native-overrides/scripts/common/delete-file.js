'use strict';

var unlinkSync = require('fs').unlinkSync;
var log = require('./log');

/**
 * Delete the file at a given path.
 * @method exports
 * @param {String} path
 */
module.exports = function deleteFile(path) {
  unlinkSync(path);
  log('Removed the file at %s', path);
};
