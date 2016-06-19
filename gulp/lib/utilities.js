'use strict';

var _ = require('lodash');

function getValueOrDefault(object, key, fallback) {
  return _.has(object, key) && object[key] || object[fallback];
}

function findKeyForExactValue(object, value) {
  function forExactValue(current) { return current === value; }
  return _.findKey(object, forExactValue);
}

module.exports = {
  getValueOrDefault: getValueOrDefault,
  findKeyForExactValue: findKeyForExactValue
};
