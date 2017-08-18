'use strict';

var _ = require('lodash');

/**
 * Get "locator" values from platform and plugin objects.
 * @private
 * @param {Object|String} object - Cordova platform/plugin object or a string.
 * @return {String} `'id@spec'` formatted string.
 */
function getLocator(object) {
  return _.isPlainObject(object) ? object.locator : object;
}

/**
 * Parse `'id@spec'` and `'path/id'` formatted strings.
 * @private
 * @param {String} id - The plugin id or path.
 * @return {Array} First item being the id and second one being the spec.
 */
function parseIdAndSpec(id) {
  if (/@/.test(id)) { return _.take(id.split('@'), 2); }
  // Remove path and extension (if any) to only keep the plugin name.
  return [id.split('/').pop().split('.')[0], id];
}

/**
 * Transform Cordova platforms listed in package.json into Cordova XML tags.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Array} May be empty.
 */
function getPlatformTags(config) {
  // Transform platform ids into Cordova XML tags.
  return _.map(config.INFOS.cordovaPlatforms, function map(platform) {
    var parsed = parseIdAndSpec(getLocator(platform));
    return '<engine name="' + parsed[0] + '" spec="' + parsed[1] + '"/>';
  });
}

/**
 * Transform Cordova plugins variables listed in package.json into XML tags.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Object} plugin - Plugin definition object.
 * @return {Array} May be empty.
 */
function getVariableTags(config, plugin) {
  if (!_.isPlainObject(plugin.variables)) { return []; }
  var prefix = plugin.constantPrefix || '';
  return _.map(plugin.variables, function map(value, name) {
    if (!value) { value = _.get(config.CONSTANTS, prefix + name); }
    return '<variable name="' + name + '" value="' + value + '"/>';
  });
}

/**
 * Transform Cordova plugins listed in package.json into Cordova XML tags.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Array} May be empty.
 */
function getPluginTags(config) {
  var plugins = config.INFOS.cordovaPlugins;
  // Allow to define exclusions at build, app and target levels.
  var exclusions = _.chain().union(
    config.BUILD.excludePlugins,
    config.APP.excludePlugins,
    config.TARGET.excludePlugins
  ).map(function map(id) {
    // Extract plugin ids as regular expressions.
    return new RegExp('^' + _.escapeRegExp(id) + '(?:@|$)', 'i');
  }).value();

  // Maybe exclude some plugins.
  return _.chain(plugins).mapKeys(getLocator).pick(function pick(plugin, id) {
    // Keep the plugin if it's not matching any exclusion rule.
    return !_.some(exclusions, function some(exclusion) {
      return exclusion.test(id);
    });
  // Transform remaining plugin ids into Cordova XML tags.
  }).map(function map(plugin, id) {
    var parsed = parseIdAndSpec(id);
    return '<plugin name="' + parsed[0] + '" spec="' + parsed[1] + '">'
      + getVariableTags(config, plugin).join('')
      + '</plugin>';
  // Get the result by lazily evaluating previous methods.
  }).value();
}

/**
 * Build the access tag to whitelist the `API_SERVER_URL` target constant.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {String|null}
 */
function getAccessTag(config) {
  if (!config.CONSTANTS.API_SERVER_URL) { return null; }
  return '<access origin="' + config.CONSTANTS.API_SERVER_URL + '"/>';
}

/**
 * Normalize the application id.
 * @private
 * @param {String|Object} id - If an object, must have an ios and
 *   an android key and both values must be strings.
 * @return {Object} - With an ios and an android key.
 */
function normalizeAppId(id) {
  // eslint-disable-next-line max-statements-per-line
  if (_.isString(id)) { id = { ios: id, android: id }; }
  if (_.isPlainObject(id) && id.ios && id.android) { return id; }
  throw new Error('The app id is missing!');
}

/**
 * Get the application id.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Object} - With an ios and an android key.
 */
function getAppId(config) {
  // Use the target id by default.
  if (config.TARGET.id) { return normalizeAppId(config.TARGET.id); }
  // If no target id provided, try to use the global app id value.
  var id = normalizeAppId(config.APP.id);
  function appendBuildId(id) { return id + '.' + config.BUILD_ID; }
  // If the build isn't prod, append its id to the global id so that
  // multiple versions of the app can be installed on the device.
  return config.BUILD_ID === 'prod' ? id : _.mapValues(id, appendBuildId);
}

/**
 * Get the application name.
 * @private
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {String}
 */
function getName(config) {
  // Use the target name by default.
  if (config.TARGET.name) { return config.TARGET.name; }
  // If no target name provided, try to use the global app name value.
  if (!config.APP.name) { throw new Error('The app name is missing!'); }
  if (config.BUILD_ID === 'prod') { return config.APP.name; }
  // If the build isn't prod, append its id to the global name so
  // that the app will be easier to find on the device springboard.
  return config.APP.name + ' ' + config.BUILD_ID.toUpperCase();
}

/**
 * Copy the source config.xml at the root of the project, adding stuff to it.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpSetupConfig(gulp, plugins, config) {
  var task = config.tasks['setup.config'];
  var id = getAppId(config);

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.cheerio({
      parserOptions: { xmlMode: true, normalizeWhitespace: config.IS_PROD },
      // eslint-disable-next-line max-statements
      run: function run($, file, done) {
        var $widget = $('widget');
        $widget.attr('android-packageName', id.android);
        $widget.attr('ios-CFBundleIdentifier', id.ios);
        $widget.attr('id', id.ios);
        $widget.attr('version', config.INFOS.version);
        $widget.find('name').text(getName(config));
        $widget.find('description').text(config.INFOS.description);
        $widget.append(getPlatformTags(config));
        $widget.append(getPluginTags(config));
        $widget.append(getAccessTag(config));
        $widget.find('icon,splash').each(function each(index, element) {
          var $element = $(element);
          var src = $element.attr('src');
          $element.attr('src', src.replace(/\$APP/g, config.APP_ID));
        });
        done();
      }
    }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [['clean'], gulpSetupConfig];
