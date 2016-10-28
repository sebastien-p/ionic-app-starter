'use strict';

var writeFileSync = require('fs').writeFileSync;
var readFile = require('./read-file');
var log = require('./log');

/**
 * Replace a given pattern with a given value in a file at a given path.
 * @method exports
 * @param {String} path
 * @param {RegExp} pattern
 * @param {String} value
 * @param {Object} [opt]
 * @param {String} [opt.encoding='utf8']
 * @param {String} [opt.dest] - Alternate path where to write the replacement.
 */
module.exports = function replaceInFile(path, pattern, value, opt) {
  if (!opt) { opt = {}; }
  var dest = opt.dest || path;
  var content = readFile(path, opt.encoding).replace(pattern, value);
  writeFileSync(dest || path, content, opt.encoding || 'utf8');
  log('Replaced %s with %s in %s (to %s)', pattern, value, path, dest);
};
