 /**
  * [my_clock 始终]
  * @return {[type]} [description]
  */
 function my_clock() {
     var el = this;
     var today = new Date();
     var h = today.getHours();
     var m = today.getMinutes();
     var s = today.getSeconds();
     m = m >= 10 ? m : ('0' + m);
     s = s >= 10 ? s : ('0' + s);
     el.innerHTML = h + ":" + m + ":" + s;
     setTimeout(function() { my_clock.call(el) }, 1000);
 }
 /**
  * [search 搜索]
  * @return {[type]} [description]
  */
function search(){
   var el = this;
   el.onclick=function(){
     window.open('https://www.baidu.com/s?ie=utf-8&wd='+document.getElementById('search').value)
   }
}
 my_clock.call(document.getElementById('clock_div'));
 search.call(document.getElementById('so'));
 // var clock_div = document.getElementById('clock_div');
 // my_clock(clock_div);