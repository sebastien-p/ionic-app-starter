var _ = require('lodash');
var utils = require('./utilities');
var package = require('../../package.json');
var project = require('../../project.json');

var PACKAGE = _.extend(_.pick(
  package,
  'name',
  'version',
  'description',
  'cordovaPlatforms',
  'cordovaPlugins'
), project);

function environment(extraEnvironment) {
  var env = _.extend(_.pick(process.env, 'build', 'app'), extraEnvironment);
  var build = utils.getValueOrDefault(package.builds, env.build, 'dev');
  var app = utils.getValueOrDefault(package.apps, env.app, 'default');
  var locales = app.constants.I18N.locales;

  return {
    I18N: locales.length > 1 ? '{' + locales.join(',') + '}' : locales[0],
    TARGET: app.builds[utils.findKeyForExactValue(package.builds, build)],
    BUILD: build,
    APP: app,
    ENV: env
  };
}

module.exports = environment;
