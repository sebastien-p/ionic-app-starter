'use strict';

var _ = require('lodash');
var utils = require('./utilities');
var package = require('../../package.json');
var project = require('../../project.json');

var infos = _.extend(
  _.pick(
    package,
    'name',
    'version',
    'description',
    'cordovaPlatforms',
    'cordovaPlugins'
  ),
  project
);

function environment(extraEnvironment) {
  var env = _.extend(_.pick(process.env, 'build', 'app'), extraEnvironment);
  var build = utils.getValueOrDefault(infos.builds, env.build, 'dev');
  var app = utils.getValueOrDefault(infos.apps, env.app, 'default');
  var locales = app.constants.I18N.locales;

  return {
    I18N: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0],
    TARGET: app.builds[utils.findKeyForExactValue(infos.builds, build)],
    IS_PROD: build !== infos.builds.dev,
    INFOS: infos,
    BUILD: build,
    APP: app,
    ENV: env
  };
}

module.exports = environment;
