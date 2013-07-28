/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define(function(require, exports, module) {

'use strict';

var Promise = require('util/promise');
var l10n = require('util/l10n');

var types = require('gcli/types');
var Type = require('gcli/types').Type;
var Status = require('gcli/types').Status;
var Conversion = require('gcli/types').Conversion;


function DateType(typeSpec) {
  // ECMA 5.1 §15.9.1.1
  // @see http://stackoverflow.com/questions/11526504/minimum-and-maximum-date
  typeSpec = typeSpec || {};

  this._step = typeSpec.step || 1;
  this._min = new Date(-8640000000000000);
  this._max = new Date(8640000000000000);

  if (typeSpec.min != null) {
    if (typeof typeSpec.min === 'string') {
      this._min = toDate(typeSpec.min);
    }
    else if (isDate(typeSpec.min) || typeof typeSpec.min === 'function') {
      this._min = typeSpec.min;
    }
    else {
      throw new Error('date min value must be a string a date or a function');
    }
  }

  if (typeSpec.max != null) {
    if (typeof typeSpec.max === 'string') {
      this._max = toDate(typeSpec.max);
    }
    else if (isDate(typeSpec.max) || typeof typeSpec.max === 'function') {
      this._max = typeSpec.max;
    }
    else {
      throw new Error('date max value must be a string a date or a function');
    }
  }
}

DateType.prototype = Object.create(Type.prototype);

/**
 * Helper for stringify() to left pad a single digit number with a single '0'
 * so 1 -> '01', 42 -> '42', etc.
 */
function pad(number) {
  var r = String(number);
  return r.length === 1 ? '0' + r : r;
}

DateType.prototype.stringify = function(value) {
  if (!isDate(value)) {
    return '';
  }

  var str = pad(value.getFullYear()) + '-' +
            pad(value.getMonth() + 1) + '-' +
            pad(value.getDate());

  // Only add in the time if it's not midnight
  if (value.getHours() !== 0 || value.getMinutes() !== 0 ||
      value.getSeconds() !== 0 || value.getMilliseconds() !== 0) {

    // What string should we use to separate the date from the time?
    // There are 3 options:
    // 'T': This is the standard from ISO8601. i.e. 2013-05-20T11:05
    //      The good news - it's a standard. The bad news - it's weird and
    //      alien to many if not most users
    // ' ': This looks nicest, but needs escaping (which GCLI will do
    //      automatically) so it would look like: '2013-05-20 11:05'
    //      Good news: looks best, bad news: on completion we place the cursor
    //      after the final ', so repeated increment/decrement doesn't work
    // '\ ': It's possible that we could find a way to use a \ to escape the
    //      space, so the output would look like: 2013-05-20\ 11:05
    //      This would involve changes to a number of parts, and is probably
    //      too complex a solution for this problem for now
    // In the short term I'm going for ' ', and raising the priority of cursor
    // positioning on actions like increment/decrement/tab.

    str += ' ' + pad(value.getHours());
    str += ':' + pad(value.getMinutes());

    // Only add in seconds/milliseconds if there is anything to report
    if (value.getSeconds() !== 0 || value.getMilliseconds() !== 0) {
      str += ':' + pad(value.getSeconds());
      if (value.getMilliseconds() !== 0) {
        str += '.' + String((value.getUTCMilliseconds()/1000).toFixed(3)).slice(2, 5);
      }
    }
  }

  return str;
};

DateType.prototype.getMin = function(context) {
  if (typeof this._min === 'function') {
    return this._min(context);
  }
  if (isDate(this._min)) {
    return this._min;
  }
  return undefined;
};

DateType.prototype.getMax = function(context) {
  if (typeof this._max === 'function') {
    return this._max(context);
  }
  if (isDate(this._max)) {
    return this._max;
  }
  return undefined;
};

DateType.prototype.parse = function(arg, context) {
  var value;

  if (arg.text.replace(/\s/g, '').length === 0) {
    return Promise.resolve(new Conversion(undefined, arg, Status.INCOMPLETE, ''));
  }

  // Lots of room for improvement here: 1h ago, in two days, etc.
  // Should "1h ago" dynamically update the step?
  if (arg.text === 'now') {
    value = new Date();
  }
  else if (arg.text === 'yesterday') {
    value = new Date().setDate(new Date().getDate() - 1);
  }
  else if (arg.text === 'tomorrow') {
    value = new Date().setDate(new Date().getDate() + 1);
  }
  else {
    var millis = Date.parse(arg.text);

    if (isNaN(millis)) {
      var msg = l10n.lookupFormat('typesDateNan', [ arg.text ]);
      return Promise.resolve(new Conversion(undefined, arg, Status.ERROR, msg));
    }

    value = new Date(millis);
  }

  return Promise.resolve(new Conversion(value, arg));
};

DateType.prototype.decrement = function(value, context) {
  if (!isDate(value)) {
    return new Date();
  }

  var newValue = new Date(value);
  newValue.setDate(value.getDate() - this._step);

  if (newValue >= this.getMin(context)) {
    return newValue;
  }
  else {
    return this.getMin(context);
  }
};

DateType.prototype.increment = function(value, context) {
  if (!isDate(value)) {
    return new Date();
  }

  var newValue = new Date(value);
  newValue.setDate(value.getDate() + this._step);

  if (newValue <= this.getMax(context)) {
    return newValue;
  }
  else {
    return this.getMax();
  }
};

DateType.prototype.name = 'date';


/**
 * Utility to convert a string to a date, throwing if the date can't be
 * parsed rather than having an invalid date
 */
function toDate(str) {
  var millis = Date.parse(str);
  if (isNaN(millis)) {
    throw new Error(l10n.lookupFormat('typesDateNan', [ str ]));
  }
  return new Date(millis);
}

/**
 * Is |thing| a valid date?
 * @see http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
 */
function isDate(thing) {
  return Object.prototype.toString.call(thing) === '[object Date]'
          && !isNaN(thing.getTime());
};


/**
 * Registration and de-registration.
 */
exports.startup = function() {
  types.addType(DateType);
};

exports.shutdown = function() {
  types.removeType(DateType);
};



});
