/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export enum PollerInterval {
    SHORT = 5000,
    MEDIUM = 30000,
    LONG = 120000
  }

  export interface IPollerOptions {
    interval: number | PollerInterval;
    callback: IFunction<void>;
    polled: IFunction<ng.IPromise<any>>;
  }

  interface IPoller {
    start(): void;
    stop(): void;
  }

  class Poller implements IPoller {
    constructor(
      options: IPollerOptions,
      private $timeout: ng.ITimeoutService,
      private $q: ng.IQService
    ) {
      this.interval = options.interval || PollerInterval.MEDIUM;
      this.callback = options.callback;
      this.polled = options.polled;
      this.start();
    }

    private interval: number;
    private callback: IFunction<void>;
    private polled: IFunction<ng.IPromise<any>>;
    private deferred: ng.IDeferred<never>;
    private timeout: ng.IPromise<any>;

    private request(): ng.IPromise<void> {
      // Recover from network errors like nothing wrong happened...
      return this.polled().then(this.deferred.notify, this.$q.resolve);
    }

    private poll(): void {
      this.timeout = this.$timeout(() => this.request(), this.interval);
      // Do it this way because chaining breaks `$timeout.cancel`...
      this.timeout.then(() => this.poll());
    }

    stop(): void {
      if (!this.timeout) {
        return;
      }
      this.$timeout.cancel(this.timeout);
      this.deferred.reject();
      this.deferred = null;
      this.timeout = null;
    }

    start(): void {
      this.stop();
      this.deferred = this.$q.defer();
      // Incomplete typings = cast as any.
      (<any>this.deferred.promise).finally(null, this.callback);
      this.poll();
    }
  }

  export interface IPollerService {
    /**
      * Start or restart a given named polling task.
      * @param {string} name
      * @param {IPollerOptions} options
      * @param {number} [options.interval=POLLING_INTERVALS.MEDIUM] - In ms.
      * @param {Function} options.callback - Passing the polled value.
      * @param {Function} options.polled - Must return a promise.
      */
    startPolling(name: string, options: IPollerOptions): void;
    /**
      * Stop a given named polling task without removing it from the pool.
      * @param {String} name
      */
    pausePolling(name: string): void;
    /**
      * Stop a given named polling task and remove it from the pool.
      * @param {String} name
      */
    stopPolling(name: string): void;
    /**
      * Pause all current polling tasks.
      */
    pausePollings(): void;
    /**
      * Resume all current polling tasks.
      */
    resumePollings(): void;
  }

  class PollerService implements IPollerService {
    constructor(
      private $timeout: ng.ITimeoutService,
      private $q: ng.IQService
    ) {}

    private pool: IMap<IPoller> = {};

    startPolling(name: string, options: IPollerOptions): void {
      if (_.has(this.pool, name)) {
        this.pool[name].start();
      } else {
        this.pool[name] = new Poller(options, this.$timeout, this.$q);
      }
    }

    pausePolling(name: string): void {
      if (_.has(this.pool, name)) {
        this.pool[name].stop();
      }
    }

    stopPolling(name: string): void {
      this.pausePolling(name);
      this.pool[name] = null;
      delete this.pool[name];
    }

    pausePollings(): void {
      _.each(this.pool, (poller, name) => this.pausePolling(name));
    }

    resumePollings(): void {
      _.each(this.pool, (poller, name) => this.startPolling(name, null));
    }
  }

  module.service('pollerService', ['$timeout', '$q', PollerService]);
}
