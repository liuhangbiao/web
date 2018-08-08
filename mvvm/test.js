"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Watcher.js 文件
var Watcher = function () {
    function Watcher(vm, exp, callback) {
        _classCallCheck(this, Watcher);

        this.vm = vm;
        this.exp = exp;
        this.callback = callback;

        // 更改前的值
        this.value = this.get();
    }

    _createClass(Watcher, [{
        key: "get",
        value: function get() {
            // 将当前的 watcher 添加到 Dep 类的静态属性上
            Dep.target = this;

            // 获取值触发数据劫持
            var value = CompileUtil.getVal(this.vm, this.exp);

            // 清空 Dep 上的 Watcher，防止重复添加
            Dep.target = null;
            return value;
        }
    }, {
        key: "update",
        value: function update() {
            // 获取新值
            var newValue = CompileUtil.getVal(this.vm, this.exp);
            // 获取旧值
            var oldValue = this.value;

            // 如果新值和旧值不相等，就执行 callback 对 dom 进行更新
            if (newValue !== oldValue) {
                this.callback();
            }
        }
    }]);

    return Watcher;
}();




'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Observer.js 文件
var Observer = function () {
    function Observer(data) {
        _classCallCheck(this, Observer);

        this.observe(data);
    }
    // 添加数据监听


    _createClass(Observer, [{
        key: 'observe',
        value: function observe(data) {
            var _this2 = this;

            // 验证 data
            if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
                return;
            }

            // 要对这个 data 数据将原有的属性改成 set 和 get 的形式
            // 要将数据一一劫持，先获取到 data 的 key 和 value
            Object.keys(data).forEach(function (key) {
                // 劫持（实现数据响应式）
                _this2.defineReactive(data, key, data[key]);
                _this2.observe(data[key]); // 深度劫持
            });
        }
        // 数据响应式

    }, {
        key: 'defineReactive',
        value: function defineReactive(object, key, value) {
            var _this = this;
            // 每个变化的数据都会对应一个数组，这个数组是存放所有更新的操作
            var dep = new Dep();

            // 获取某个值被监听到
            Object.defineProperty(object, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    // 当取值时调用的方法
                    Dep.target && dep.addSub(Dep.target);
                    return value;
                },
                set: function set(newValue) {
                    // 当给 data 属性中设置的值适合，更改获取的属性的值
                    if (newValue !== value) {
                        _this.observe(newValue); // 重新赋值如果是对象进行深度劫持
                        value = newValue;
                        dep.notify(); // 通知所有人数据更新了
                    }
                }
            });
        }
    }]);

    return Observer;
}();


"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Compile.js 文件
var Compile = function () {
    function Compile(el, vm) {
        _classCallCheck(this, Compile);

        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        // 如过传入的根元素存在，才开始编译
        if (this.el) {
            // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
            var fragment = this.node2fragment(this.el);
            // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
            this.compile(fragment);

            // 3、把编译好的 fragment 再塞回页面中
            this.el.appendChild(fragment);
        }
    }

    /* 辅助方法 */
    // 判断是否是元素节点


    _createClass(Compile, [{
        key: "isElementNode",
        value: function isElementNode(node) {
            return node.nodeType === 1;
        }
        // 判断属性是否为指令

    }, {
        key: "isDirective",
        value: function isDirective(name) {
            return name.includes("v-");
        }
        /* 核心方法 */
        // 将根节点转移至文档碎片

    }, {
        key: "node2fragment",
        value: function node2fragment(el) {
            // 创建文档碎片
            var fragment = document.createDocumentFragment();
            // 第一个子节点
            var firstChild = void 0;

            // 循环取出根节点中的节点并放入文档碎片中
            while (firstChild = el.firstChild) {
                fragment.appendChild(firstChild);
            }
            return fragment;
        }
        // 解析文档碎片

    }, {
        key: "compile",
        value: function compile(fragment) {
            var _this = this;

            // 当前父节点节点的子节点，包含文本节点，类数组对象
            var childNodes = fragment.childNodes;

            // 转换成数组并循环判断每一个节点的类型
            Array.from(childNodes).forEach(function (node) {
                if (_this.isElementNode(node)) {
                    // 是元素节点
                    // 递归编译子节点
                    _this.compile(node);

                    // 编译元素节点的方法
                    _this.compileElement(node);
                } else {
                    // 是文本节点
                    // 编译文本节点的方法
                    _this.compileText(node);
                }
            });
        }
        // 编译元素

    }, {
        key: "compileElement",
        value: function compileElement(node) {
            var _this2 = this;

            // 取出当前节点的属性，类数组
            var attrs = node.attributes;
            Array.form(attrs).forEach(function (attr) {
                // 获取属性名，判断属性是否为指令，即含 v-
                var attrName = attr.name;

                if (_this2.isDirective(attrName)) {
                    // 如果是指令，取到该属性值得变量在 data 中对应得值，替换到节点中
                    var exp = attr.value;

                    // 取出方法名

                    var _attrName$split = attrName.split("-"),
                        _attrName$split2 = _slicedToArray(_attrName$split, 2),
                        type = _attrName$split2[1];

                    // 调用指令对应得方法


                    CompileUtil[type](node, _this2.vm, exp);
                }
            });
        }
        // 编译文本

    }, {
        key: "compileText",
        value: function compileText(node) {
            // 获取文本节点的内容
            var exp = node.contentText;

            // 创建匹配 {{}} 的正则表达式
            var reg = /\{\{([^}+])\}\}/g;

            // 如果存在 {{}} 则使用 text 指令的方法
            if (reg.test(exp)) {
                CompileUtil["text"](node, this.vm, exp);
            }
        }
    }]);

    return Compile;
}();

"use strict";

// CompileUtil.js 文件
var CompileUtil = {};

// 更新节点数据的方法
CompileUtil.updater = {
    // 文本更新
    textUpdater: function textUpdater(node, value) {
        node.textContent = value;
    },

    // 输入框更新
    modelUpdater: function modelUpdater(node, value) {
        node.value = value;
    }
};

// 获取 data 值的方法
CompileUtil.getVal = function (vm, exp) {
    // 将匹配的值用 . 分割开，如 vm.data.a.b
    exp = exp.split(".");

    // 归并取值
    return exp.reduce(function (prev, next) {
        return prev[next];
    }, vm.$data);
};

// 获取文本 {{}} 中变量在 data 对应的值
CompileUtil.getTextVal = function (vm, exp) {
    var _this = this;

    // 使用正则匹配出 {{ }} 间的变量名，再调用 getVal 获取值
    return exp.replace(/\{\{([^}]+)\}\}/g, function () {
        return _this.getVal(vm, arguments.length <= 1 ? undefined : arguments[1]);
    });
};

// 设置 data 值的方法
CompileUtil.setVal = function (vm, exp, newVal) {
    exp = exp.split(".");
    return exp.reduce(function (prev, next, currentIndex) {
        // 如果当前归并的为数组的最后一项，则将新值设置到该属性
        if (currentIndex === exp.length - 1) {
            return prev[next] = newVal;
        }

        // 继续归并
        return prev[next];
    });
};

// 处理 v-model 指令的方法
CompileUtil.model = function (node, vm, exp) {
    var _this2 = this;

    // 获取赋值的方法
    var updateFn = this.updater["modelUpdater"];

    // 获取 data 中对应的变量的值
    var value = this.getVal(vm, exp);

    // 添加观察者，作用与 text 方法相同
    new Watcher(vm, exp, function (newValue) {
        updateFn && updateFn(node, newValue);
    });

    // v-model 双向数据绑定，对 input 添加事件监听
    node.addEventListener('input', function (e) {
        // 获取输入的新值
        var newValue = e.target.value;

        // 更新到节点
        _this2.setVal(vm, exp, newValue);
    });

    // 第一次设置值
    updateFn && updateFn(vm, value);
};

// 处理文本节点 {{}} 的方法
CompileUtil.text = function (node, vm, exp) {
    // 获取赋值的方法
    var updateFn = this.updater["textUpdater"];

    // 获取 data 中对应的变量的值
    var value = this.getTextVal(vm, exp);

    // 通过正则替换，将取到数据中的值替换掉 {{ }}
    exp.replace(/\{\{([^}]+)\}\}/g, function () {
        // 解析时遇到了模板中需要替换为数据值的变量时，应该添加一个观察者
        // 当变量重新赋值时，调用更新值节点到 Dom 的方法
        new Watcher(vm, arg[1], function (newValue) {
            // 如果数据发生变化，重新获取新值
            updateFn && updateFn(node, newValue);
        });
    });

    // 第一次设置值
    updateFn && updateFn(vm, value);
};



"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dep.js 文件
var Dep = function () {
    function Dep() {
        _classCallCheck(this, Dep);

        this.subs = [];
    }
    // 添加订阅


    _createClass(Dep, [{
        key: "addSub",
        value: function addSub(watcher) {
            this.subs.push(watcher);
        }
        // 通知

    }, {
        key: "notify",
        value: function notify() {
            this.subs.forEach(function (watcher) {
                return watcher.update();
            });
        }
    }]);

    return Dep;
}();



"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Dep.js 文件
var Dep = function () {
    function Dep() {
        _classCallCheck(this, Dep);

        this.subs = [];
    }
    // 添加订阅


    _createClass(Dep, [{
        key: "addSub",
        value: function addSub(watcher) {
            this.subs.push(watcher);
        }
        // 通知

    }, {
        key: "notify",
        value: function notify() {
            this.subs.forEach(function (watcher) {
                return watcher.update();
            });
        }
    }]);

    return Dep;
}(); // MVVM.js 文件


var MVVM = function () {
    function MVVM(options) {
        _classCallCheck(this, MVVM);

        // 先把 el 和 data 挂在 MVVM 实例上
        this.$el = options.el;
        this.$data = options.data;

        // 如果有要编译的模板就开始编译
        if (this.el) {
            // 数据劫持，就是把对象所有的属性添加 get 和 set
            new Observer(this.$data);

            // 将数据代理到实例上
            this.proxyData(this.$data);

            // 用数据和元素进行编译
            new Compile(this.el, this);
        }
    }

    _createClass(MVVM, [{
        key: "proxyData",
        value: function proxyData(data) {
            var _this = this;

            // 代理数据的方法
            Object.keys(data).forEach(function (key) {
                Object.defineProperty(_this, key, {
                    get: function get() {
                        return data[key];
                    },
                    set: function set(newVal) {
                        data[key] = newVal;
                    }
                });
            });
        }
    }]);

    return MVVM;
}();