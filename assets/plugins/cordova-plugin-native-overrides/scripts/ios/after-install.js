#!/usr/bin/env node

'use strict';

var afterPrepare = require('./after-prepare');

/**
 * Do things after the plugin is installed.
 * @method exports
 * @param {Object} context
 *   https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/index.html
 */
module.exports = function afterInstall(context) {
  afterPrepare(context);
};
