/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function translateFilterDecorator($delegate) {
    // Convert translation keys to NESTED.UPPER_SNAKE_CASE.
    function toUpperSnake(value) {
      var sep = $delegate.nestedObjectDelimeter();
      return value.split(sep).map(_.snakeCase).join(sep).toUpperCase();
    }
    // Decorate translations keys to normalize them.
    function decorateKey(method) { return _.modArgs(method, toUpperSnake); }
    // Decorate both `$tranlate` and `$translate.instant` methods and make
    // sure to keep all the properties and methods attached to `$translate`.
    var extra = { instant: decorateKey($delegate.instant) };
    return _.extend(decorateKey($delegate), $delegate, extra);
  }

  module.decorator('$translate', ['$delegate', translateFilterDecorator]);

}(angular.module('app.i18n')));
