/**
 * [isPromise 判断是否是Promise]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 * @example
 * {
 * 	var isPromise = require('is-promise'); //var {isPromise} = require('./tool.js')
 *	isPromise({then:function () {...}});//=>true
 *	isPromise(null);//=>false
 *	isPromise({});//=>false
 *	isPromise({then: true})//=>false
 * }
 */
function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * [isNumber 判断是否是Number]
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 * @example
 * {
 * 	const isNumber = require('is-number');
 *   isNumber(5e3);               // true
 *   isNumber(0xff);              // true
 *   isNumber(-1.1);              // true
 *   isNumber(0);                 // true
 *   isNumber(1);                 // true
 *   isNumber(1.1);               // true
 *   isNumber(10);                // true
 *   isNumber(10.10);             // true
 *   isNumber(100);               // true
 *   isNumber('-1.1');            // true
 *   isNumber('0');               // true
 *   isNumber('012');             // true
 *   isNumber('0xff');            // true
 *   isNumber('1');               // true
 *   isNumber('1.1');             // true
 *   isNumber('10');              // true
 *   isNumber('10.10');           // true
 *   isNumber('100');             // true
 *   isNumber('5e3');             // true
 *   isNumber(parseInt('012'));   // true
 *   isNumber(parseFloat('012')); // true
 *   isNumber(Infinity);          // false
 *   isNumber(NaN);               // false
 *   isNumber(null);              // false
 *   isNumber(undefined);         // false
 *   isNumber('');                // false
 *   isNumber('   ');             // false
 *   isNumber('foo');             // false
 *   isNumber([1]);               // false
 *   isNumber([]);                // false
 *   isNumber(function () {});    // false
 *   isNumber({});                // false
 * }
 */
function isNumber(num){
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}

/**
 * [isOdd 判断是否是基数]
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 * @example
 * {
 * 	const isOdd = require('is-odd');
 * 	console.log(isOdd('1')); //=> true
 * 	console.log(isOdd('3')); //=> true
 * 	console.log(isOdd(0)); //=> false
 *  console.log(isOdd(2)); //=> false
 * }
 */
function isOdd(value) {
  const n = Math.abs(value);
  if (!isNumber(n)) {
    throw new TypeError('expected a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('expected an integer');
  }
  if (!Number.isSafeInteger(n)) {
    throw new Error('value exceeds maximum safe integer');
  }
  return (n % 2) === 1;
}


/**
 * [isObj 检查值是否为对象]
 * @param  {[type]}  x [description]
 * @return {Boolean}   [description]
 * @example
 * {
 * 	const isObj = require('is-obj');
 * 	isObj({foo: 'bar'});//=> true
 * 	isObj([1, 2, 3]);//=> true
 * 	isObj('foo');//=> false
 * }
 */
function isObj(x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

/**
 * [isPlainObj 检查值是否为普通对象]
 * @param  {[type]}  x [description]
 * @return {Boolean}   [description]
 * @example
 * {
 * var isPlainObj = require('is-plain-obj');
 * isPlainObj({foo: 'bar'});//=> true
 * isPlainObj([1, 2, 3]);//=> false
 * }
 */
var toString = Object.prototype.toString;
function isPlainObj(x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


module.exports = {
	isPromise,
	isNumber,
	isOdd,
	isPlainObj,
	isObj
}
// var isWindows = require('is-windows');
// console.log(isWindows());
// function isWindows(){
// 		(function(factory) {
// 		  if (exports && typeof exports === 'object' && typeof module !== 'undefined') {
// 		    module.exports = factory();
// 		  } else if (typeof define === 'function' && define.amd) {
// 		    define([], factory);
// 		  } else if (typeof window !== 'undefined') {
// 		    window.isWindows = factory();
// 		  } else if (typeof global !== 'undefined') {
// 		    global.isWindows = factory();
// 		  } else if (typeof self !== 'undefined') {
// 		    self.isWindows = factory();
// 		  } else {
// 		    this.isWindows = factory();
// 		  }
// 		})(function() {
// 		  'use strict';
// 		  return function isWindows() {
// 		    return process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE));
// 		  };
// 		});
// }