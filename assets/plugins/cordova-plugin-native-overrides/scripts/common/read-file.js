'use strict';

var readFileSync = require('fs').readFileSync;

/**
 * Get the content a of file at a given path.
 * @method exports
 * @param {String} path
 * @param {String} [encoding='utf8']
 * @return {String}
 */
module.exports = function readFile(path, encoding) {
  return readFileSync(path, encoding || 'utf8').toString();
};
