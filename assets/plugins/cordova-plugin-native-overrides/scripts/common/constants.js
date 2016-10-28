'use strict';

var join = require('path').join;

/**
 * Define some platforms-specific constants.
 * @property {Object} exports
 */
module.exports = {
  android: {
    MANIFEST_PATH: join('platforms', 'android', 'AndroidManifest.xml'),
    SOURCE_DEST: join('platforms', 'android', 'src', '%s', 'FPActivity.java'),
    SOURCE_PATH: join('%s', 'src', 'android', 'FPActivity.java')
  },
  ios: {
    MAIN_PATH: join('platforms', 'ios', '%s', 'main.m')
  }
};
