'use strict';

var readFile = require('../common/read-file');

/**
 * Exctract values from a given content using regular expressions.
 * @private
 * @function extractValues
 * @param {String} content
 * @param {Object} patterns
 * @return {Object}
 */
function extractValues(content, patterns) {
  return Object.keys(patterns).reduce(function reduce(values, key) {
    values[key] = patterns[key].exec(content)[1].trim();
    return values;
  }, {});
}

/**
 * Get the application project config values like id and name.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 * @return {String}
 */
module.exports = function getProjectConfig(context) {
  var util = context.requireCordovaModule('cordova-lib/src/cordova/util');
  var configPath = util.projectConfig(context.opts.projectRoot);
  return extractValues(readFile(configPath), {
    iosCFBundleIdentifier: /\s+ios-CFBundleIdentifier="(.*?)"/i,
    androidPackageName: /\s+android-packageName="(.*?)"/i,
    name: /<name>(.*?)<\/name>/i,
    id: /\s+id="(.*?)"/i
  });
};
