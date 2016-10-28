#!/usr/bin/env node

'use strict';

var replaceInPlist = require('./replace-in-plist');

/**
 * Do things after Cordova prepare.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function afterPrepare(context) {
  replaceInPlist(/"\s*AppDelegate\s*"/, '"FPAppDelegate"', context);
};
