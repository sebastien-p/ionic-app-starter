'use strict';

var _ = require('lodash');

/**
 * Get the object value for a given key or for a fallback one if not found.
 * @param {Object} object - Should have the needed properties.
 * @param {String} key - The object property we want to query for value.
 * @param {[type]} fallback - The fallback property that should be present.
 * @return {*}
 */
function getValueOrDefault(object, key, fallback) {
  return _.has(object, key) && object[key] || object[fallback];
}

/**
 * Find the key for the given value, comparing by reference.
 * @param {Object} object - Should have a property with the given value.
 * @param {*} value - Value to find the associated key.
 * @return {String}
 */
function findKeyForExactValue(object, value) {
  function forExactValue(current) { return current === value; }
  return _.findKey(object, forExactValue);
}

module.exports = {
  getValueOrDefault: getValueOrDefault,
  findKeyForExactValue: findKeyForExactValue
};
