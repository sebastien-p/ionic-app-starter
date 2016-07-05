/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function dateFilterDecorator($delegate, i18nService) {
    return _.extend(function (date, format, timezone) {
      // Set a default timezone for all displayed values.
      if (!timezone) { timezone = i18nService.getDefaultTimezone().abbr; }
      return $delegate(date, format, timezone);
    }, $delegate, { $stateful: true });
  }

  module.decorator('dateFilter', [
    '$delegate',
    'i18nService',
    dateFilterDecorator
  ]);

}(angular.module('app.i18n')));
