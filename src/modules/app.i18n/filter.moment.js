/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function momentFilter() {
    var methods = _.chain(moment()).methods().invert().value();
    return _.extend(function (date, format, options) {
      if (!_.isPlainObject(options)) { options = {}; }
      var params = [date].concat(options.parseParams, options.timezone);
      date = moment.tz.apply(moment, params);
      if (!_.has(methods, format)) { return date.format(format); }
      return date[format].apply(date, options.callParams);
    }, { $stateful: true });
  }

  module.filter('moment', [momentFilter]);

}(angular.module('app.i18n')));
