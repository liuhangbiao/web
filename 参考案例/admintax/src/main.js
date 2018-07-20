import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false



//自定义
import axios from 'axios'
Vue.prototype.$http = axios;

import store from './store/'
import {meta,util} from 'js/config';
Vue.prototype.util=util;

import { locale, Page, Table,Button,Select,Option,Icon,Tooltip,Modal,Sider,Layout,MenuItem,Menu,Header,Content,Submenu,Breadcrumb,BreadcrumbItem,Card,Row,Col} from 'iview';
const components = [
    Page,
    Table,
    Button,
    Select,
    Option,
    Icon,
    Tooltip,
    Modal,
    Sider,
    Layout,
    MenuItem,
    Menu,
    Header,
    Content,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col
];
components.map(component => {
    Vue.component(component.name, component);
});




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



/* 复制保留版权 */
// base.copyright()
// 路由拦截器
router.beforeEach((to, from, next) => {
  let { auth = true } = to.meta;
  let { title = '税务信用云' }  =  to.meta.metaInfo || {title:'税务信用云 | 描述添加'};
  const isLogin = Boolean(JSON.parse(sessionStorage.getItem('user'))) //true用户已登录， false用户未登录
  //设置title
  meta(title);
  if(auth && !isLogin && to.path !== '/login') {
     return next({ path: '/login',query: { redirect: to.fullPath }})
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
