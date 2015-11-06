'use strict';

function gulpBump(gulp, plugins, config, done) {
  var stream = plugins.cordovaBump();
  if (stream) { return stream; }
  process.exit(1);
  done();
}

module.exports = [gulpBump];
