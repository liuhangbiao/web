// ES5方式
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Plugin = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // tool
  function extend(o, n, override) {
    for (var p in n) {
      if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }

  // plugin construct function
  function Plugin(selector, userOptions) {
    // Plugin() or new Plugin()
    if (!(this instanceof Plugin)) return new Plugin(selector, userOptions);
    this.init(selector, userOptions)
  }
  Plugin.prototype = {
    constructor: Plugin,
    // default option
    options: {},
    init: function(selector, userOptions) {
      extend(this.options, userOptions, true);
    }
  };

  return Plugin;
}));


// ES6-代码重构
// ES6 插件模板
class Plugin {
  constructor(selector, options = {}) {
    this.options = {};
    Object.assign(this.options, options);
    this.init(selector, options);
  }

  init(selector, options) {}
}
export default Plugin;