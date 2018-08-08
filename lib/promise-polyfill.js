!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],f(e,this)}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(f){return void r(t.promise,f)}o(t.promise,i)}else(1===e._state?o:r)(t.promise,e._value)})):e._deferreds.push(t)}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var o=t.then;if(t instanceof n)return e._state=3,e._value=t,void i(e);if("function"==typeof o)return void f(function(e,n){return function(){e.apply(n,arguments)}}(o,t),e)}e._state=1,e._value=t,i(e)}catch(u){r(e,u)}}function r(e,n){e._state=2,e._value=n,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var o=0,r=e._deferreds.length;r>o;o++)t(e,e._deferreds[o]);e._deferreds=null}function f(e,n){var t=!1;try{e(function(e){t||(t=!0,o(n,e))},function(e){t||(t=!0,r(n,e))})}catch(i){if(t)return;t=!0,r(n,i)}}var u=function(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},c=setTimeout;n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(n,o){var r=new this.constructor(e);return t(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(n,o,r)),r},n.prototype["finally"]=u,n.all=function(e){return new n(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(n){n(e)})},n.reject=function(e){return new n(function(n,t){t(e)})},n.race=function(e){return new n(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},n._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();l.Promise?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=u):l.Promise=n});


// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
// 	typeof define === 'function' && define.amd ? define(factory) :
// 	(factory());
// }(this, (function () { 'use strict';

// var promiseFinally = function(callback) {
//   var constructor = this.constructor;
//   return this.then(
//     function(value) {
//       return constructor.resolve(callback()).then(function() {
//         return value;
//       });
//     },
//     function(reason) {
//       return constructor.resolve(callback()).then(function() {
//         return constructor.reject(reason);
//       });
//     }
//   );
// };

// // Store setTimeout reference so promise-polyfill will be unaffected by
// // other code modifying setTimeout (like sinon.useFakeTimers())
// var setTimeoutFunc = setTimeout;

// function noop() {}

// // Polyfill for Function.prototype.bind
// function bind(fn, thisArg) {
//   return function() {
//     fn.apply(thisArg, arguments);
//   };
// }

// function Promise(fn) {
//   if (!(this instanceof Promise))
//     throw new TypeError('Promises must be constructed via new');
//   if (typeof fn !== 'function') throw new TypeError('not a function');
//   this._state = 0;
//   this._handled = false;
//   this._value = undefined;
//   this._deferreds = [];

//   doResolve(fn, this);
// }

// function handle(self, deferred) {
//   while (self._state === 3) {
//     self = self._value;
//   }
//   if (self._state === 0) {
//     self._deferreds.push(deferred);
//     return;
//   }
//   self._handled = true;
//   Promise._immediateFn(function() {
//     var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
//     if (cb === null) {
//       (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
//       return;
//     }
//     var ret;
//     try {
//       ret = cb(self._value);
//     } catch (e) {
//       reject(deferred.promise, e);
//       return;
//     }
//     resolve(deferred.promise, ret);
//   });
// }

// function resolve(self, newValue) {
//   try {
//     // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
//     if (newValue === self)
//       throw new TypeError('A promise cannot be resolved with itself.');
//     if (
//       newValue &&
//       (typeof newValue === 'object' || typeof newValue === 'function')
//     ) {
//       var then = newValue.then;
//       if (newValue instanceof Promise) {
//         self._state = 3;
//         self._value = newValue;
//         finale(self);
//         return;
//       } else if (typeof then === 'function') {
//         doResolve(bind(then, newValue), self);
//         return;
//       }
//     }
//     self._state = 1;
//     self._value = newValue;
//     finale(self);
//   } catch (e) {
//     reject(self, e);
//   }
// }

// function reject(self, newValue) {
//   self._state = 2;
//   self._value = newValue;
//   finale(self);
// }

// function finale(self) {
//   if (self._state === 2 && self._deferreds.length === 0) {
//     Promise._immediateFn(function() {
//       if (!self._handled) {
//         Promise._unhandledRejectionFn(self._value);
//       }
//     });
//   }

//   for (var i = 0, len = self._deferreds.length; i < len; i++) {
//     handle(self, self._deferreds[i]);
//   }
//   self._deferreds = null;
// }

// function Handler(onFulfilled, onRejected, promise) {
//   this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
//   this.onRejected = typeof onRejected === 'function' ? onRejected : null;
//   this.promise = promise;
// }

// *
//  * Take a potentially misbehaving resolver function and make sure
//  * onFulfilled and onRejected are only called once.
//  *
//  * Makes no guarantees about asynchrony.
 
// function doResolve(fn, self) {
//   var done = false;
//   try {
//     fn(
//       function(value) {
//         if (done) return;
//         done = true;
//         resolve(self, value);
//       },
//       function(reason) {
//         if (done) return;
//         done = true;
//         reject(self, reason);
//       }
//     );
//   } catch (ex) {
//     if (done) return;
//     done = true;
//     reject(self, ex);
//   }
// }

// Promise.prototype['catch'] = function(onRejected) {
//   return this.then(null, onRejected);
// };

// Promise.prototype.then = function(onFulfilled, onRejected) {
//   var prom = new this.constructor(noop);

//   handle(this, new Handler(onFulfilled, onRejected, prom));
//   return prom;
// };

// Promise.prototype['finally'] = promiseFinally;

// Promise.all = function(arr) {
//   return new Promise(function(resolve, reject) {
//     if (!arr || typeof arr.length === 'undefined')
//       throw new TypeError('Promise.all accepts an array');
//     var args = Array.prototype.slice.call(arr);
//     if (args.length === 0) return resolve([]);
//     var remaining = args.length;

//     function res(i, val) {
//       try {
//         if (val && (typeof val === 'object' || typeof val === 'function')) {
//           var then = val.then;
//           if (typeof then === 'function') {
//             then.call(
//               val,
//               function(val) {
//                 res(i, val);
//               },
//               reject
//             );
//             return;
//           }
//         }
//         args[i] = val;
//         if (--remaining === 0) {
//           resolve(args);
//         }
//       } catch (ex) {
//         reject(ex);
//       }
//     }

//     for (var i = 0; i < args.length; i++) {
//       res(i, args[i]);
//     }
//   });
// };

// Promise.resolve = function(value) {
//   if (value && typeof value === 'object' && value.constructor === Promise) {
//     return value;
//   }

//   return new Promise(function(resolve) {
//     resolve(value);
//   });
// };

// Promise.reject = function(value) {
//   return new Promise(function(resolve, reject) {
//     reject(value);
//   });
// };

// Promise.race = function(values) {
//   return new Promise(function(resolve, reject) {
//     for (var i = 0, len = values.length; i < len; i++) {
//       values[i].then(resolve, reject);
//     }
//   });
// };

// // Use polyfill for setImmediate for performance gains
// Promise._immediateFn =
//   (typeof setImmediate === 'function' &&
//     function(fn) {
//       setImmediate(fn);
//     }) ||
//   function(fn) {
//     setTimeoutFunc(fn, 0);
//   };

// Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
//   if (typeof console !== 'undefined' && console) {
//     console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
//   }
// };

// var globalNS = (function() {
//   // the only reliable means to get the global object is
//   // `Function('return this')()`
//   // However, this causes CSP violations in Chrome apps.
//   if (typeof self !== 'undefined') {
//     return self;
//   }
//   if (typeof window !== 'undefined') {
//     return window;
//   }
//   if (typeof global !== 'undefined') {
//     return global;
//   }
//   throw new Error('unable to locate global object');
// })();

// if (!globalNS.Promise) {
//   globalNS.Promise = Promise;
// } else if (!globalNS.Promise.prototype['finally']) {
//   globalNS.Promise.prototype['finally'] = promiseFinally;
// }

// })));
