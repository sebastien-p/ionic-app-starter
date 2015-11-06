'use strict';

function gulpConfig(gulp, plugins, config) {
  var task = config.TASKS['build.config'];
  var tags = (config.PACKAGE.cordovaPlugins || []).map(function (plugin) {
    return '<gap:plugin name="' + plugin + '" source="npm"/>'; // TODO: version
  });
  return gulp.src(task.src).pipe(plugins.cordovaXml(tags));
}

module.exports = [['build.copy.config'], gulpConfig];
