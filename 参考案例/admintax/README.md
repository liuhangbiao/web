# tax

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 安装步骤

1, 初始化项目

λ vue init webpack tax

? Project name tax

? Project description A Vue.js project

? Author 道心

? Vue build standalone

? Install vue-router? Yes

? Use ESLint to lint your code? No

? Set up unit tests No

? Setup e2e tests with Nightwatch? No

? Should we run `npm install` for you after the project has been created? (recommended) npm

   vue-cli · Generated "tax".


2, 修改配置

```
  # config/index.js
  build: {
    assetsPublicPath: '',
    productionSourceMap: false,
    ...
   }
  #build/units.js
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath:'../../'
      })
```

```
# 打包压缩zip
  npm install --save-dev compression-webpack-plugin

  productionGzip: true

```


```
# 配置代理

## config/index.js

// 自定义代理配置
var proxyConfig = require('./proxyConfig')
module.exports = {
  dev: {
    ...
    //自定义代理
    proxyTable: proxyConfig.proxy,
    ....
  }
}


## 新建config/proxyConfig.js
module.exports = {
 proxy: {
    '/api': {  //将www.exaple.com印射为/api
      target: 'http://192.168.3.4:8080', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }
    }
 }
}


## 修改直接的文件：
/*配置文件*/
export const config={
    // baseURI:'http://localhost:8123/'
    baseURI:'/api'
}
```


  3, Git 配置

```
//.git/config
[core]
    repositoryformatversion = 0
    filemode = false
    bare = false
    logallrefupdates = true
    symlinks = false
    ignorecase = true
[remote "origin"]
    url = https://gitee.com/xitongdt/ShuiWuXinYongYunQianDuan.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
```

4. 支持less

```
#首选，安装 less 和 less-loader ，在项目目录下运行如下命令
npm install less less-loader --save-dev

#当然也可用yarn代替
yarn add less less-loader --dev

#修改 build/webpack.base.conf.js 
{
  test: /\.less$/,
  loader: "style-loader!css-loader!less-loader",
}

#在代码中的 style 标签中 加上 lang="less" 属性
<style scoped lang="less">...</style>
```

5. css引入
```
# js文件中：
import '../static/css/global.css' /*引入公共样式*/


# vue/html文件
<style scoped lang="less"  src="../assets/iconfont/iconfont.css">
  ...
</style>

<style scoped lang="less">
  @import '../assets/iconfont/iconfont.css';
</style>

```


============= 税务信用云 ===========

简易的命令行入门教程:
Git 全局设置:
```
git config --global user.name "道心"
git config --global user.email "liuhangbiaoo@163.com"
```
创建 git 仓库:
```
mkdir ShuiWuXinYongYunQianDuan
cd ShuiWuXinYongYunQianDuan
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/xitongdt/ShuiWuXinYongYunQianDuan.git
git push -u origin master
```
已有项目?
```
cd existing_git_repo
git remote add origin https://gitee.com/xitongdt/ShuiWuXinYongYunQianDuan.git
git push -u origin master
```

=============== 税务信用云 end===========


===============  代码 ==================
```
<!-- 方法调用 -->
 created(){
      //get类型 info/a-level?current=15
      this.$store.dispatch('getaLevel',{params: {'current': 15 }});
      //post类型 this.$store.dispatch('postSave',{user:123});
  },
```

```
<!-- vuex状态管理 -->
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
 computed:{
    ...mapState({
        aLevel:state => state.pubinfo.aLevel,
        data:state=>{
          return state.pubinfo.aLevel
        }
    }),
    ...mapGetters([
        'getaLevelInfo'
    ])
  }
<!-- 监听数据 -->
  watch:{
  'getaLevelInfo':function(v){
    console.log(v)
  },
```


<!-- 组件内嵌 -->
```
// <Tooltip content="这里是提示文字">
//     当鼠标经过这段文字时，会显示一个气泡框
// </Tooltip>
 render: (h, params) => {
    return h('Tooltip', {
      props:{content:params.row.xzxksqrmc}
    },[
      h('span', params.row.xzxksqrmc)
    ])
})
```


<!-- tip提示 -->
```
{
title:"处罚事项",
key: "xzcfsy",
// ellipsis:true,
render: (h, params) => {
    // return h('span',{
    //   class:'f-txt',
    //   attrs:{
    //     title:params.row.xzcfsy
    //   }
    // },params.row.xzcfsy)
    let _t=this;
    return h('Tooltip', {
      props:{content:params.row.xzcfsy}
    },[
      h('span',_t.util.subString2(params.row.xzcfsy,16))
    ])
}
```

<!-- 全局扩展 -->
```
import {meta,util} from 'js/config';
Vue.prototype.util=util;
```
===============  代码 end ==============


<!-- 状态码返回 -->
```
/** 200请求成功 */
OK(200),
/** 207频繁操作 */
MULTI_STATUS(207),
/** 400请求参数出错 */
BAD_REQUEST(400),
/** 401没有登录 */
UNAUTHORIZED(401),
/** 402登录失败 */
LOGIN_FAIL(402),
/** 403没有权限 */
FORBIDDEN(403),
/** 404找不到页面 */
NOT_FOUND(404),
/** 405请求方法不能被用于请求相应的资源 */
METHOD_NOT_ALLOWED(405),
/** 406内容特性不满足 */
NOT_ACCEPTABLE(406),
/** 408请求超时 */
REQUEST_TIMEOUT(408),
/** 409发生冲突 */
CONFLICT(409),
/** 410已被删除 */
GONE(410),
/** 411没有定义长度 */
LENGTH_REQUIRED(411),
/** 412条件不满足 */
PRECONDITION_FAILED(412),
/** 413数据太大 */
ENTITY_TOO_LARGE(413),
/** 415不是服务器中所支持的格式 */
UNSUPPORTED_MEDIA_TYPE(415),
/** 421连接数过多 */
TOO_MANY_CONNECTIONS(421),
/** 423已被锁定 */
LOCKED(423),
/** 451法律不允许 */
UNAVAILABLE_LEGAL(451),
/** 500服务器出错 */
INTERNAL_SERVER_ERROR(500),
/** 501不支持当前请求所需要的某个功能 */
NOT_IMPLEMENTED(501),
/** 503服务器升级中,暂时不可用 */
SERVICE_UNAVAILABLE(503),
/** 501获取资源所需要的策略并没有被满足 */
NOT_EXTENDED(510);
```

```
|—— dist （部署文件）
  |—— css （页面引用 css 样式表）
  |—— js （页面引用 js 脚本）
  |—— plugins （非 ch233 原生的插件，如 jQuery 脚本等）
  |—— img （页面引用的图片）
  |—— fonts （页面引用 webFonts 字体以及 webFonts 图标）
  |—— *.html （各种界面 html）
|—— src （生产文件）
  |—— sass （sass 集合）
    |—— core （ch233 sass 核心模块）
      |—— _mixins.scss （mixin 的集合）
      |—— _colors.scss （配色表）
      |—— _extend.scss （备用样式集合）
      |—— _layout.scss （布局）
    |—— components （组件集合，按需加载）
      |—— _format.scss （初始化格式化样式表，默认 html 的 font-size: 20px）
      |—— _material-icons.scss （material icons 样式表）
      |—— _table.scss
      |—— _grid.scss
      |—— _button.scss
      |—— _form.scss
      |—— _alert.scss
    |—— theme （自定义样式集合）
      |—— _*.scss （有关项目的样式文件）
    |—— output （最终输出样式表的源）
      |—— ch233.mini.scss （核心输出调用集合）
  |—— js （js 脚本集合）
    |—— ch233.js （整合文件）
    |—— _*.js （组件文件）
  |—— fonts （webFonts 字体以及 webFonts 图标库）
|—— releases-zip（发行包存放文件夹）
  |—— ch233-`$npm_package_version`-dist.zip （含有版本号的 zip 文件）
|—— node_modules （node.js 环境 Library root）
|—— _guide— （ch233 的指引文档）
|—— _doc— （关于项目的文档存放文件夹）
|—— _psd— （关于项目的设计原稿存放文件夹）
|—— _ued— （关于项目的原型设计存放文件夹）
|—— README.md （项目版本以及说明文档）
|—— .gitignore （git 忽略文件）
|—— package.json （node.js 环境配置文件）
```



```
230303195305106617

520000_yszh
123456abc
5173
```