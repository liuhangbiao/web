function Toast(option){
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

var T = new Toast({prompt:'I\'m Toast!'});
T.show();
