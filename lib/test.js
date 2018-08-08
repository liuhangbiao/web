function Toast(option){
  if(!(this instanceof Toast)){
    throw new Error('Toast instantiation error');
  }
  this.prompt = '';
  this.elem = null;
  this.init(option);
}

Toast.prototype = {
  // 构造器
  constructor: Toast,
  // 初始化方法
  init: function(option){
    this.prompt = option.prompt || '';
    this.render();
    this.bindEvent();
  },
  // 显示
  show: function(){
    this.changeStyle(this.elem, 'display', 'block');
  },
  // 隐藏
  hide: function(){
    this.changeStyle(this.elem, 'display', 'none');
  },
  // 画出dom
  render: function(){
    var html = '';
    this.elem = document.createElement('div');
    this.changeStyle(this.elem, 'display', 'none');

    html += '<a class="J-close" href="javascript:;">x</a>'
    html += '<p>'+ this.prompt +'</p>';
    
    this.elem.innerHTML = html;

    return document.body.appendChild(this.elem);
  },
  // 绑定事件
  bindEvent: function(){
    var self = this;
    
    this.addEvent(this.elem, 'click', function(e){
      if(e.target.className.indexOf('J-close') != -1){
        console.log('close Toast!');
        self.hide();
      }
    });
  },
  // 添加事件方法
  addEvent: function(node, name, fn){
    var self = this;
    
    node.addEventListener(name, function(){
      fn.apply(self, Array.prototype.slice.call(arguments));
    }, false);
  },
  // 改变样式
  changeStyle: function(node, key, value){
      node.style[key] = value;
  }
};

// var T = new Toast({prompt:'I\'m Toast!'});
// T.show();
// -----------------------------------------
;(function(global,undefined) {
    "use strict" //使用js严格模式检查，使语法更规范
    var _global;
    var plugin = {
        add: function(n1,n2){...}
        ...
    }
    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    !('plugin' in _global) && (_global.plugin = plugin);
}());

// ----------------------------------
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));


// ----------------------------

;// JavaScript弱语法的特点,如果前面刚好有个函数没有以";"结尾,那么可能会有语法错误
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

  // polyfill
  var EventUtil = {
    addEvent: function(element, type, handler) {
      // 添加绑定
      if (element.addEventListener) {
        // 使用DOM2级方法添加事件
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        // 使用IE方法添加事件
        element.attachEvent("on" + type, handler);
      } else {
        // 使用DOM0级方法添加事件
        element["on" + type] = handler;
      }
    },
    // 移除事件
    removeEvent: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.datachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },
    getEvent: function(event) {
      // 返回事件对象引用
      return event ? event : window.event;
    },
    // 获取mouseover和mouseout相关元素
    getRelatedTarget: function(event) {
      if (event.relatedTarget) {
        return event.relatedTarget;
      } else if (event.toElement) {
        // 兼容IE8-
        return event.toElement;
      } else if (event.formElement) {
        return event.formElement;
      } else {
        return null;
      }
    },
    getTarget: function(event) {
      //返回事件源目标
      return event.target || event.srcElement;
    },
    preventDefault: function(event) {
      //取消默认事件
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    stoppropagation: function(event) {
      //阻止事件流
      if (event.stoppropagation) {
        event.stoppropagation();
      } else {
        event.canceBubble = false;
      }
    },
    // 获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
    getButton: function(event) {
      if (document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
      } else {
        //将IE模型下的button属性映射为DOM模型下的button属性
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            //按下的是鼠标主按钮（一般是左键）
            return 0;
          case 2:
          case 6:
            //按下的是中间的鼠标按钮
            return 2;
          case 4:
            //鼠标次按钮（一般是右键）
            return 1;
        }
      }
    },
    //获取表示鼠标滚轮滚动方向的数值
    getWheelDelta: function(event) {
      if (event.wheelDelta) {
        return event.wheelDelta;
      } else {
        return -event.detail * 40;
      }
    },
    // 以跨浏览器取得相同的字符编码，需在keypress事件中使用
    getCharCode: function(event) {
      if (typeof event.charCode == "number") {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    }
  };

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


// ---------------------------------------


var api = {
  //插件参数设定
  config: function (opts) {
    if(!opts) return options;
    for(var key in opts) {
      options[key] = opts[key];
    }
    return this;
  },
  //插件监听
  listen: function listen(elem) {
    if (typeof elem === 'string') {
      var elems = document.querySelectorAll(elem),
        i = elems.length;
        while (i--) {
          listen(elems[i]);
        }
        return
    }
    //插件功能函数可以写在这
    return this;
  }
}
//将API赋值给插件名字
this.pluginName = api;

//test====
// 则用户使用该插件时，调用方式为：
pluginName.listen('#demo');


// 如需要自定义参数：
pluginName.config({key: 'para'}).listen('#demo');
//因为config和listen已经返回this，所有可以这样调用：
pluginName.listen('#demo').config({key: 'para'});
//还可以这样调用：
pluginName.config({key: 'para'}).listen('#demo');


// -------------------------------------------------
// plugin.js
;(function(undefined) {
    "use strict"
    var _global;

    function result(args,fn){
        var argsArr = Array.prototype.slice.call(args);
        if(argsArr.length > 0){
            return argsArr.reduce(fn);
        } else {
            return 0;
        }
    }
    var plugin = {
        add: function(){
            return result(arguments,function(pre,cur){
                return pre + cur;
            });
        },//加
        sub: function(){
            return result(arguments,function(pre,cur){
                return pre - cur;
            });
        },//减
        mul: function(){
            return result(arguments,function(pre,cur){
                return pre * cur;
            });
        },//乘
        div: function(){
            return result(arguments,function(pre,cur){
                return pre / cur;
            });
        },//除
        sur: function(){
            return result(arguments,function(pre,cur){
                return pre % cur;
            });
        } //余
    }

    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = plugin;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return plugin;});
    } else {
        !('plugin' in _global) && (_global.plugin = plugin);
    }
}());

// 输出结果为：
with(plugin){
    console.log(add()); // 0
    console.log(sub()); // 0
    console.log(mul()); // 0
    console.log(div()); // 0
    console.log(sur()); // 0

    console.log(add(2,1)); // 3
    console.log(sub(2,1)); // 1
    console.log(mul(2,1)); // 2
    console.log(div(2,1)); // 2
    console.log(sur(2,1)); // 0
}

// ------------------------------------
(function(window, document, undefined) {
    // 插件的默认参数
    var defaults = {
        messages: {
            required: 'The %s field is required.',
            matches: 'The %s field does not match the %s field.',
            "default": 'The %s field is still set to default, please change.',
            valid_email: 'The %s field must contain a valid email address.',
            valid_emails: 'The %s field must contain all valid email addresses.',
            min_length: 'The %s field must be at least %s characters in length.',
            max_length: 'The %s field must not exceed %s characters in length.',
            exact_length: 'The %s field must be exactly %s characters in length.',
            greater_than: 'The %s field must contain a number greater than %s.',
            less_than: 'The %s field must contain a number less than %s.',
            alpha: 'The %s field must only contain alphabetical characters.',
            alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
            alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
            numeric: 'The %s field must contain only numbers.',
            integer: 'The %s field must contain an integer.',
            decimal: 'The %s field must contain a decimal number.',
            is_natural: 'The %s field must contain only positive numbers.',
            is_natural_no_zero: 'The %s field must contain a number greater than zero.',
            valid_ip: 'The %s field must contain a valid IP.',
            valid_base64: 'The %s field must contain a base64 string.',
            valid_credit_card: 'The %s field must contain a valid credit card number.',
            is_file_type: 'The %s field must contain only %s files.',
            valid_url: 'The %s field must contain a valid URL.',
            greater_than_date: 'The %s field must contain a more recent date than %s.',
            less_than_date: 'The %s field must contain an older date than %s.',
            greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
            less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
        },
        callback: function(errors) {

        }
    };

    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

    ... //省略后面的代码
})(window,document);
/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}


// test-----

var validator = new FormValidator('example_form', [{
    name: 'req',
    display: 'required',
    rules: 'required'
}, {
    name: 'alphanumeric',
    rules: 'alpha_numeric'
}, {
    name: 'password',
    rules: 'required'
}, {
    name: 'password_confirm',
    display: 'password confirmation',
    rules: 'required|matches[password]'
}, {
    name: 'email',
    rules: 'valid_email'
}, {
    name: 'minlength',
    display: 'min length',
    rules: 'min_length[8]'
}, {
    names: ['fname', 'lname'],
    rules: 'required|alpha'
}], function(errors) {
    if (errors.length > 0) {
        // Show the errors
    }
});

// -------------------------------