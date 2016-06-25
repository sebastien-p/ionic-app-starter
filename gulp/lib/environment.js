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

function environment(extraEnvironment) {
  var env = _.extend(_.pick(process.env, 'build', 'app'), extraEnvironment);
  var build = utils.getValueOrDefault(infos.builds, env.build, 'dev');
  var app = utils.getValueOrDefault(infos.apps, env.app, 'default');
  var buildId = utils.findKeyForExactValue(infos.builds, build);
  var locales = app.constants.I18N.locales;

  return {
    I18N: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0],
    APP_ID: utils.findKeyForExactValue(infos.apps, app),
    IS_PROD: build !== infos.builds.dev,
    TARGET: app.builds[buildId],
    BUILD_ID: buildId,
    INFOS: infos,
    BUILD: build,
    APP: app,
    ENV: env
  };
}

module.exports = environment;
