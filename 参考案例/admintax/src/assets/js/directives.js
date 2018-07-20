import Vue from 'vue';

let focus ={
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 默认聚焦元素
    el.focus()
  }
}
export {focus}