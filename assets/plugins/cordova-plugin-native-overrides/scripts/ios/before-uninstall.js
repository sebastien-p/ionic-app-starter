#!/usr/bin/env node

'use strict';

var replaceInPlist = require('./replace-in-plist');

/**
 * Do things before the plugin is uninstalled.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function beforeUninstall(context) {
  replaceInPlist(/"\s*FPAppDelegate\s*"/, '"AppDelegate"', context);
};
