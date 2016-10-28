'use strict';

var getPackageId = require('./get-package-id');

/**
 * Get the path to where the main activity is located.
 * @method getProjectNativePath
 * @param {String|Object} from - If an object, must be a context object
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 * @return {String}
 */
module.exports = function getProjectNativePath(from) {
  if (typeof from !== 'string') { from = getPackageId(from); }
  return from.replace(/\./g, '/').replace(/-/g, '_');
};
