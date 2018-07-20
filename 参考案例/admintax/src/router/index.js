import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

/* 自定义路由页面 */
import Home from 'page/Home'
/* 自定义路由页面 end*/


/* 页面meta信息 */
const meta={
  home:{title:"税务信用云 | 首页",titleTemplate:'%s | 大数据基础平台',meta:[{vmid:'keywords',name:'keywords',content:'大数据,云计算'},{vmid:'description',name:'description',content:'基于开源Hoodop开发'}],link:[{rel:'favicon',href:'favicon.ico'}]}
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
       meta:{auth:false,metaInfo:meta.home}
    },
     {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{auth:false,metaInfo:meta.home}
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{auth:false,metaInfo:meta.home}
    }
  ]
});