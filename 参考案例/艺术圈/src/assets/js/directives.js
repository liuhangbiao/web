import Vue from 'vue';
// 注册一个全局自定义指令 `v-focus`
let focus ={
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 默认聚焦元素
    el.focus()
  }
}
// 拖拽
let drag ={
	bind: function(el) { //被绑定
       let oDiv = el
		oDiv.onmousedown= function (e) {
		  let disX = e.clientX - oDiv.offsetLeft
		  let disY = e.clientY - oDiv.offsetTop
		  console.log(e,disX,disY)
		  document.onmousemove = function (e) {
		    let l = e.clientX - disX
		    let t = e.clientY - disY
		    oDiv.style.left = l + 'px'
		    oDiv.style.top = t + 'px'
		  }
		  document.onmouseup = function (e) {
		    document.onmousemove = null
		    document.onmouseup = null
		  }
	   }

	  	// 获取节点
		var oW, oH;
		// 绑定touchstart事件
		el.addEventListener("touchstart", function(e) {
		    console.log(e);
		    var touches = e.touches[0];
		    oW = touches.clientX - el.offsetLeft;
		    oH = touches.clientY - el.offsetTop;
		    //阻止页面的滑动默认事件
		    document.addEventListener("touchmove", defaultEvent, false);
		}, false)
		el.addEventListener("touchmove", function(e) {
		    var touches = e.touches[0];
		    var oLeft = touches.clientX - oW;
		    var oTop = touches.clientY - oH;
		    if (oLeft < 0) {
		        oLeft = 0;
		    } else if (oLeft > document.documentElement.clientWidth - el.offsetWidth) {
		        oLeft = (document.documentElement.clientWidth - el.offsetWidth);
		    }
		    el.style.left = oLeft + "px";
		    el.style.top = oTop + "px";
		}, false);
		el.addEventListener("touchend", function() {
		    document.removeEventListener("touchmove", defaultEvent, false);
		}, false);
		function defaultEvent(e) {
		    e.preventDefault();
		}
    },
    inserted: function(e,b) { //绑定到节点
        console.log('2 - inserted');
    },
    update: function() { //组件更新
        console.log('3 - update');
    },
    componentUpdated: function() { //组件更新完成
        console.log('4 - componentUpdated');
    },
    unbind: function() { //解绑
        console.log('5 - bind');
    }
}
export { focus,drag}