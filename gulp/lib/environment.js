'use strict';

var _ = require('lodash');
var utils = require('./utilities');
var packageJson = require('../../package.json');
var projectJson = require('../../project.json');

var infos = _.extend(
  _.pick(
    packageJson,
    'name',
    'version',
    'description',
    'cordovaPlatforms',
    'cordovaPlugins'
  ),
  projectJson
);

/**
 * Get environment variables.
 * @param {Object} extraEnvironment - Extra variables.
 * @return {Object}
 */
function environment(extraEnvironment) {
  var env = _.extend(_.pick(process.env, 'build', 'app'), extraEnvironment);
  var build = utils.getValueOrDefault(infos.builds, env.build, 'dev');
  var app = utils.getValueOrDefault(infos.apps, env.app, 'default');
  var buildId = utils.findKeyForExactValue(infos.builds, build);
  var target = app.builds[buildId];

  var constants = _.merge(
    // Define some default constants.
    {
      APP_NAME: target.name || app.name,
      APP_VERSION: infos.version
    },
    // Merge common constants with build, app and target-related ones.
    infos.common.constants,
    build.constants,
    app.constants,
    target.constants
  );

  return {
    APP_ID: utils.findKeyForExactValue(infos.apps, app),
    IS_PROD: build !== infos.builds.dev,
    CONSTANTS: constants,
    BUILD_ID: buildId,
    TARGET: target,
    INFOS: infos,
    BUILD: build,
    APP: app,
    ENV: env
  };
}

module.exports = environment;
