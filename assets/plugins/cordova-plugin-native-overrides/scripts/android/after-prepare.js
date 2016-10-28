#!/usr/bin/env node

'use strict';

var replaceInManifest = require('./replace-in-manifest');

/**
 * Do things after Cordova prepare.
 * @method exports
 */
module.exports = function afterPrepare() {
  replaceInManifest(/"\s*MainActivity\s*"/, '"FPActivity"');
};
