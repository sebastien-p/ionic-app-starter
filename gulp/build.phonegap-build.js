'use strict';

var ghPages = require('gh-pages');
var sh = require('shelljs');

function gulpBuildPhoneGapBuild(gulp, plugins, config, done) {
  // http://stackoverflow.com/a/19585361
  var branch = sh.exec('git status | head -1').output.replace(/[^\S ]+/g, '');
  var context = config.PACKAGE.version + ' - ' + branch;
  var task = config.TASKS['build.phonegap-build'];
  ghPages.publish(task.src, {
    logger: plugins.util.log.bind(plugins.util, task.dest),
    message: task.commit + ' (' + context + ')',
    push: plugins.util.env.push !== false,
    branch: task.dest,
    clone: task.cache,
    dotfiles: true
  }, done);
}

module.exports = [['build.clean.unused'], gulpBuildPhoneGapBuild];
