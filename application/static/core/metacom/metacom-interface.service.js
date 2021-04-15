'use strict';

angular.module('core.metacom').factory('MetacomInterface', () => {
  class MetacomInterface {
    constructor() {
      this._events = new Map();
    }

    on(name, fn) {
      const event = this._events.get(name);
      if (event) event.add(fn);
      else this._events.set(name, new Set([fn]));
    }

    emit(name, ...args) {
      const event = this._events.get(name);
      if (!event) return;
      for (const fn of event.values()) fn(...args);
    }
  }

  return MetacomInterface;
});
