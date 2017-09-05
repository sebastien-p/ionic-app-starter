/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  function translateFilterDecorator(
    $delegate: ng.translate.ITranslateService
  ): ng.translate.ITranslateService {
    // Convert translation keys to NESTED.UPPER_SNAKE_CASE.
    function toUpperSnake(value: string): string {
      // Casted to `any` because the typings are outdated...
      const sep: string = (<any>$delegate).nestedObjectDelimeter();
      return value.split(sep).map(_.snakeCase).join(sep).toUpperCase();
    }
    // Decorate translations keys to normalize them.
    function decorateKey(
      method: IFunction<string | ng.IPromise<string>>
    ): IFunction<string | ng.IPromise<string>> {
      return _.modArgs(method, toUpperSnake);
    }
    // Decorate both `$tranlate` and `$translate.instant` methods and make
    // sure to keep all the properties and methods attached to `$translate`.
    const extra: object = { instant: decorateKey($delegate.instant) };
    return _.extend(decorateKey($delegate), $delegate, extra);
  }

  module.decorator('$translate', [
    '$delegate',
    translateFilterDecorator
  ]);
}
