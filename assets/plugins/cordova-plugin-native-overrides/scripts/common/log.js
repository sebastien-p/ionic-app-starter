'use strict';

/**
 * An utility to log (formatted) messages.
 * @method exports
 * @param {String} message
 */
module.exports = function log(message) {
  var extra = Array.prototype.slice.call(arguments, 1);
  console.log.apply(console, ['*** ' + message + ' ***'].concat(extra));
};
