'use strict';

var getProjectConfig = require('../common/get-project-config');

/**
 * Get the Android package ID.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 * @return {String}
 */
module.exports = function getPackageId(context) {
  var config = getProjectConfig(context);
  return config.androidPackageName || config.id;
};
