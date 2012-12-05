/**
 * @method isEventSupported
 * @param {String} eventName
 * @param {HTMLElement} element optional
 * @return {Boolean} true if event is supported
 *
 * Note that `isEventSupported` can give false positives when passed augmented host objects, e.g.:
 *
 *     someElement.onfoo = function(){ };
 *     isEventSupported('foo', someElement); // true (even if "foo" is not supported)
 *
 * Also note that in Gecko clients (those that utilize `setAttribute` -based detection) -
 *
 *     `isEventSupported('foo', someElement)`;
 *
 * - might create `someElement.foo` property (if "foo" event is supported) which apparently can not be deleted
 * `isEventSupported` sets such property to `undefined` value, but can not fully remove it
 *
 */

var tagnames = require('./tagnames');

var cache = {};

var isSupported = function (cacheable, event, supported) {
  if(cacheable) return cache[event] = supported;
  else return supported;
};

module.exports = function (event, element) {
  var cacheable = (arguments.length === 1);
  
  // only return cached result when no element is given
  if(cacheable && cache[event]) return cache[event];
  
  if(!element) element = document.createElement(tagnames[event] || 'div');
  event = 'on' + event;
  
  // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
  var supported = (event in element);
  
  if(supported) return isSupported(cacheable, event, supported);
  
  // if it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
  if(!element.setAttribute) element = document.createElement('div');
  
  if(!(element.setAttribute && element.removeAttribute)) return isSupported(cacheable, event, supported);
  
  element.setAttribute(event, '');
  supported = typeof element[event] == 'function';
  
  // if property was created, "remove it" (by setting value to `undefined`)
  if(typeof element[event] != 'undefined') element[event] = undefined;
  element.removeAttribute(event);
  
  if(supported) return isSupported(cacheable, event, supported);
};