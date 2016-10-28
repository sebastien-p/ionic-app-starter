#!/usr/bin/env node

'use strict';

var replaceInManifest = require('./replace-in-manifest');
var removeSource = require('./remove-source');

/**
 * Do things before the plugin is uninstalled.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function beforeUninstall(context) {
  replaceInManifest(/"\s*FPActivity\s*"/, '"MainActivity"');
  removeSource(context);
};
