import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import {meta} from 'js/base'
import store from './store/'
/* ================= 自定义 ========================= */
import * as custom from 'js/filters'
import * as dt from 'js/directives'
import * as comp from 'js/component'
//自定义过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
//自定义指令
Object.keys(dt).forEach(key => {
  Vue.directive(key, dt[key])
})
//自定义组件
Object.keys(comp).forEach(key => {
  Vue.component(key, comp[key])
})
/* ================= 自定义 ========================= */
Vue.prototype.$http = axios;
Vue.config.productionTip = false
// 路由拦截器
router.beforeEach((to, from, next) => {
	//设置title
	meta(to.meta.title||'艺术圈 | 默认信息！');
	console.log(to.meta.requiresAuth)
	if(!to.meta.requiresAuth){
	  next()
	}else{
		var ukey=sessionStorage.getItem('ukey');
		if(!ukey || ukey===''){
  			 next({
		        path: '/login',
		        query: { redirect: to.fullPath }
		      })
		}else{
			next()
		}
	}
});
// 路由拦截器 end
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})