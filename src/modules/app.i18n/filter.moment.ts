/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  export interface IMomentFilterOptions {
    callParams?: any;
    parseParams?: moment.MomentFormatSpecification;
    timezone?: string;
  }

  export interface IMomentFilter {
    (
      date: any,
      format: moment.MomentFormatSpecification,
      opt: IMomentFilterOptions
    ): string;
    $stateful: boolean;
  }

  function momentFilterFactory(): IMomentFilter {
    const methods: object = _.chain(moment()).methods().object().value();
    return _.extend(function (
      date: any,
      format: moment.MomentFormatSpecification,
      opt: IMomentFilterOptions
    ) {
      if (!_.isPlainObject(opt)) { opt = {}; }
      const params: any[] = [date].concat(opt.parseParams, opt.timezone);
      date = moment.tz.apply(moment, params);
      if (!_.has(methods, format)) { return date.format(format); }
      return date[<string>format].apply(date, opt.callParams);
    }, { $stateful: true });
  }

  module.filter('moment', [
    momentFilterFactory
  ]);
}
