'use strict';

var sh = require('shelljs');

function gulpGitCheck(gulp, plugins, config, done) {
  if (!sh.which('git')) {
    var colors = plugins.util.colors;
    console.log(
      '  ' + colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Visit ' + colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once installed, run \'' + colors.cyan('gulp install') + '\'.'
    );
    process.exit(1);
  }
  done();
}

module.exports = [gulpGitCheck];
