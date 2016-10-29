'use strict';

module.exports = function (config) {
  config.set({
    reporters: ['spec', 'coverage'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    preprocessors: {
      '../../www/modules/**/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcovonly',
      file: 'coverage.unit.lcov',
      dir: '../reports',
      subdir: '.'
    }
  });
};
