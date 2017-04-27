/**
 * Copy the source build.json at the root of the project, adding stuff to it.
 * @function gulpSetupConfig
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpSetupBuildJson(gulp, plugins, config) {
  var task = config.tasks['setup.build.json'];
  var build = config.TARGET.build;
  // The only action yet is to add android release key signing informations
  if (build && build.android && build.android.release) {
    return gulp.src(task.src)
      .pipe(plugins.replace(/RELEASE_PATH_TO_KEYSTORE/g, build.android.release.keystore))
      .pipe(plugins.replace(/RELEASE_STORE_PASSWORD/g, build.android.release.storePassword))
      .pipe(plugins.replace(/RELEASE_ALIAS/g, build.android.release.alias))
      .pipe(plugins.replace(/RELEASE_PASSWORD/g, build.android.release.password))
      .pipe(gulp.dest(task.dest));
  }
}

module.exports = [gulpSetupBuildJson];
