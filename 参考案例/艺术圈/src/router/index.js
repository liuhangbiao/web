import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import TT from 'pages/test'
//公共
const Share = r => require.ensure([], () => r(require('comps/Share')), 'Share');
// 导入页面
const Start = r => require.ensure([], () => r(require('pages/Start')), 'Start');
const Login = r => require.ensure([], () => r(require('pages/Login')), 'Login');
const Register = r => require.ensure([], () => r(require('pages/Register')), 'Register');
const RegisterOk = r => require.ensure([], () => r(require('pages/RegisterOk')), 'RegisterOk');
const Home = r => require.ensure([], () => r(require('pages/Home')), 'Home');
const Cat = r => require.ensure([], () => r(require('pages/Cat')), 'Cat');
const catScreen = r => require.ensure([], () => r(require('pages/catScreen')), 'catScreen');
const CatList = r => require.ensure([], () => r(require('pages/CatList')), 'CatList');
const CatListQuery = r => require.ensure([], () => r(require('pages/CatListQuery')), 'CatListQuery');
const Goods = r => require.ensure([], () => r(require('pages/Goods')), 'Goods');
const Cart = r => require.ensure([], () => r(require('pages/Cart')), 'Cart');
const Attbuy = r => require.ensure([], () => r(require('pages/Attbuy')), 'Attbuy');
const My = r => require.ensure([], () => r(require('pages/My')), 'My');
const Order = r => require.ensure([], () => r(require('pages/Order')), 'Order');
const Seting = r => require.ensure([], () => r(require('pages/Seting')), 'Seting');
const Play = r => require.ensure([], () => r(require('pages/Play')), 'Play');
const About = r => require.ensure([], () => r(require('pages/About')), 'About');
const Quan = r => require.ensure([], () => r(require('pages/Quan')), 'Quan');
const alipay = r => require.ensure([], () => r(require('pages/alipay')), 'alipay');
const Artmore = r => require.ensure([], () => r(require('pages/Artmore')), 'Artmore');
const Artdd = r => require.ensure([], () => r(require('pages/Artdd')), 'Artdd');
const Addr = r => require.ensure([], () => r(require('pages/Addr')), 'Addr');
const Circle = r => require.ensure([], () => r(require('pages/Circle')), 'Circle');
const Circlelist = r => require.ensure([], () => r(require('pages/Circlelist')), 'Circlelist');
const Circledd = r => require.ensure([], () => r(require('pages/Circledd')), 'Circledd');
const Search = r => require.ensure([], () => r(require('pages/Search')), 'Search');
const Dong = r => require.ensure([], () => r(require('pages/Dong')), 'Dong');
const Hd = r => require.ensure([], () => r(require('pages/Hd')), 'Hd');
export default new Router({
    // history: mode,
    routes: [{
        path: '/',
        name: 'Hello',
        component: Start,
        meta: { requiresAuth: false,title:'艺术圈 | 启动页'}
        // redirect: '/Login'
    },{
        path: '/start',
        name: 'Start',
        component: Start,
        meta: { requiresAuth: false,title:'艺术圈 | 启动页'}
    },{
        path: '/login',
        name: 'Login',
        component: Login,
        // components:{
        //    default:Login,
        //    share:Share
        // },
        meta: { requiresAuth: false,title:'艺术圈 | 登录'}
     },{
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false,title:'艺术圈 | 注册' }
    },{
        path: '/registerok/:mobile',
        name: 'reg',
        component: RegisterOk,
        meta: { requiresAuth: false,title:'艺术圈 | 注册确认'}
    }
    ,{
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false,title:'艺术圈 | 首页'}
    },{
        path: '/cat',
        name: 'Cat',
        component: Cat,
        meta: { requiresAuth: false,title:'艺术圈 | 分类'}
    },{
        path: '/catscreen',
        name: 'catScreen',
        component: catScreen,
        meta: { requiresAuth: false,title:'艺术圈 | 分类筛选'}
    },{
        path: '/catlist/:id',
        name: 'CatList',
        component: CatList,
        meta: { requiresAuth: false,title:'艺术圈 | 分类列表'}
    },{
        path: '/artdd/:id',
        name: 'Artdd',
        component: Artdd,
        meta: { requiresAuth: false,title:'艺术圈 | 艺术家详情'}
    },{
        path: '/catlistquery',
        name: 'CatListQuery',
        component: CatListQuery,
        meta: { requiresAuth: false,title:'艺术圈 | 分类筛选列表'}
    },{
        path: '/goods/:gid',
        name: 'Goods',
        component: Goods,
        meta: { requiresAuth: false,title:'艺术圈 | 商品详情'}
    },{
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true,title:'艺术圈 | 购物车'}
    },{
        path: '/attbuy',
        name: 'Attbuy',
        component: Attbuy,
        meta: { requiresAuth: true,title:'艺术圈 | 立即购买&下单'}
    },{
        path: '/my',
        name: 'My',
        component: My,
        meta: { requiresAuth: true,title:'艺术圈 | 个人中心'}
    },{
        path: '/order',
        name: 'Order',
        component: Order,
        meta: { requiresAuth: true,title:'艺术圈 | 我的订单'}
    },{
        path: '/seting',
        name: 'Seting',
        component: Seting,
        meta: { requiresAuth: true,title:'艺术圈 | 账户设置'}
     },{
        path: '/addr',
        name: 'Addr',
        component: Addr,
        meta: { requiresAuth: true,title:'艺术圈 | 地址设置'}
     },{
        path: '/play',
        name: 'Play',
        component: Play,
        meta: { requiresAuth: true,title:'艺术圈 | 在线支付'}
    },{
        path: '/about',
        name: 'About',
        component: About,
        meta: { requiresAuth: false,title:'艺术圈 | 关于我们'}
    },{
        path: '/quan',
        name: 'Quan',
        component: Quan,
        meta: { requiresAuth: false,title:'艺术圈 | 代金券'}
    },{
        path: '/artmore',
        name: 'Artmore',
        component: Artmore,
        meta: { requiresAuth: false,title:'艺术圈 | 更多艺术家'}
    },{
        path: '/circle',
        name: 'Circle',
        component: Circle,
        meta: { requiresAuth: true,title:'艺术圈 | 圈子'}
    },{
        path: '/circlelist/:id',
        name: 'Circlelist',
        component: Circlelist,
        meta: { requiresAuth: true,title:'艺术圈 | 圈子群组'}
    },{
        path: '/circledd/:id',
        name: 'Circledd',
        component: Circledd,
        meta: { requiresAuth: true,title:'艺术圈 | 圈子群组详情'}
    },{
        path: '/search',
        name: 'Search',
        component: Search,
        meta: { requiresAuth: false,title:'艺术圈 | 搜索商品&艺术家'}
    },{
        path: '/dong',
        name: 'Dong',
        component: Dong,
        meta: { requiresAuth: false,title:'艺术圈 | 互动3D'}
    },{
        path: '/hd',
        name: 'Hd',
        component: Hd,
        meta: { requiresAuth: false,title:'艺术圈 | 互动3D-展示'}
    },{
        path: '/test',
        name: 'Test',
        component: TT,
        meta: { requiresAuth: false,title:'艺术圈 | 测试'}
    },
    {path: '/alipay',
        name: 'alipay',
        component: alipay,
        meta: { requiresAuth: false,title:'艺术圈 | 测试'}
    },
    {
        path:'/apay',
        name:'apay',
        redirect:'https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign=ErCRRVmW%2FvXu1XO76k%2BUr4gYKC5%2FWgZGSo%2FR7nbL%2FPU7yFXtQJ2CjYPcqumxcYYB5x%2FzaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6%2Fm0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k%2Fk%3D&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0',
        meta: { requiresAuth: false,title:'艺术圈 | 支付宝'}
    },
    {
        path: '*', //其他页面，强制跳转到登录页面
        redirect: '/home'
    }
    ]
})
