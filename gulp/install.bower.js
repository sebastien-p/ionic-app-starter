'use strict';

var bower = require('bower');

function gulpInstallBower(gulp, plugins) {
  return bower.commands.install().on('log', function onBowerLog(data) {
    plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
  });
}

module.exports = [['git.check'], gulpInstallBower];
