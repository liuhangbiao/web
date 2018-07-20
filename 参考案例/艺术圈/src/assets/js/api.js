import axios from 'axios'
import qs from 'qs'
import {config,user,common,goods,artist,order,circle,Jajax,layer,date,insertAfter,ApiTool} from './base'
export const baseURL=config.baseURI;
axios.defaults.timeout = 5000;
axios.defaults.baseURL = config.baseURI;
// axios.defaults.headers ={'X-Requested-With': 'XMLHttpRequest'}
/*============= token ============*/
// if(info) token=info.token;token='';token=(info?info.token:'')
//#var info=JSON.parse(sessionStorage.getItem('info')),token=info&&info.token||'';
//#axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
// axios.defaults.withCredentials=true;
// var CancelToken =axios.CancelToken;
// var token={CancelToken:CancelToken.source().token}
/*============= token end==========*/
/*================  axios ===================*/
// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])
// axios.post(url,{},config).then(function(res){console.log(res);}).catch(function(err){console.log(err);})
//axios请求返回的也是一个promise,跟踪错误只需要在最后加一个catch就可以了。
//下面是关于同时发起多个请求时的处理
// axios.all([get1(), get2()]).then(axios.spread(function (res1, res2) {  /*只有两个请求都完成才会成功，否则会被catch捕获*/}));
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// //当然还可以这么配置
// var instance = axios.create({
//   baseURL: 'https://api.example.com'
// });
/*========  http请求拦截器 ========*/
axios.interceptors.request.use(config => {
    // config['headers']={
    // 	'X-Requested-With': 'XMLHttpRequest',
    // 	'Content-Type':'application/x-www-form-urlencoded'
    // 'Content-Type':'application/json;charset=UTF-8',
    // 'Content-Type':'text/plain'
    // Accept:'*/*'
    // }
    // if(config.method==='get'){
    // config['headers']={
    // 'Content-Type':'text/plain'
    // 'Content-Type':'application/x-www-form-urlencoded'
    // }
    // }
    // console.log('request==>config=>',config)
    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    return config;
}, error => {
    // console.log('request==>error=>',error)
    return Promise.reject(error)
})
/*========  http响应拦截器 ========*/
axios.interceptors.response.use(config => {
    // console.log('response==>config=>',config,config.data)
    if(config.data.code === '000002'){
        sessionStorage.removeItem('ukey');
        layer.open({
            content: config.data.message || 'token失效请从新登录!',
            skin: 'footer'
        })
        return {
            code:'000002',
            message: config.data.message || 'token失效请从新登录!',
            result: {}
        }
    }else if(config.data.code==='200') {
        //群组话题浏览(过滤)
        let uu=config.config.url,kk=uu.indexOf('/api/circle/topic/')>0&&uu.indexOf('/view')>0;
        if (config.config.method==='put' && kk!=true ) {
            layer.open({
                content: config.data.message || '操作成功！',
                skin: 'footer',
                time:3
            })
        }
        return config.data;
    }else{
        return {
            code:config.data.code,
            message: config.data.message || '发生严重错误!',
            result: {}
        }
    }
}, error => {
    // console.log(error,error.message)
    // console.log('response==>error=>',error,error.response)
    if (error && error.response && error.response.status === 200) {
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    } else {
        return {
            message: error || '发生严重错误!',
            result: {}
        }
    }
    // if (err && err.response) {
    //       switch (err.response.status) {
    //           case 400: err.message = '请求错误(400)' ; break;
    //           case 401: err.message = '未授权，请重新登录(401)'; break;
    //           case 403: err.message = '拒绝访问(403)'; break;
    //           case 404: err.message = '请求出错(404)'; break;
    //           case 408: err.message = '请求超时(408)'; break;
    //           case 500: err.message = '服务器错误(500)'; break;
    //           case 501: err.message = '服务未实现(501)'; break;
    //           case 502: err.message = '网络错误(502)'; break;
    //           case 503: err.message = '服务不可用(503)'; break;
    //           case 504: err.message = '网络超时(504)'; break;
    //           case 505: err.message = 'HTTP版本不受支持(505)'; break;
    //           default: err.message = `连接出错(${err.response.status})!`;
    //       }
    //   }else{
    //       err.message = '连接服务器失败!'
    //   }
})
/*================  axios end===================*/
/* ============常用公共方法============ */
/* 创建临时数据 */
const setpromise = data => {return new Promise((resolve, reject) => {resolve(data)})}
export const md5=(str) => md.md5(str);
export const bs64e=(str) => bs64.encode(str);
export const bs64d=(str) => bs64.decode(str);
export const get=(url) => axios(url);
export const del=(url) => axios.delete(url);
export const getParams=(url,params) => axios(url,{params: params});
//注意: fn及fn2如=>function fn(url){return axios.get(url);}  接收：getMrege(fn,fn2).then(axios.spread(function (acct, perms) {... }));
export const getMrege=(fn,fn2) => axios.all([fn,fn2]);
export const post=(url,data) => axios.post(url,data);
export const put=(url,data) => axios.put(url,data);
export const ajax=(type,url,data,rtnType)=>axios({method:type,url:url,data:data,responseType:rtnType});
export const $request=(config)=>axios.request(config);
export const $get=(url,config)=>axios.get(url,config);
export const $delete =(url,config)=>axios.delete(url,config);
export const $head =(url,config)=>axios.head(url,config);
export const $options =(url,config)=>axios.options(url,config);
export const $post =(url,data,config)=>axios.post(url,data,config);
export const $put =(url,data,config)=>axios.put(url,data,config);
export const $patch =(url,data,config)=>axios.patch(url,data,config);
export const querydata =(data)=> qs.stringify(data);
export const postquery=(url,data) => axios.post(url, qs.stringify(data));
export const getquery=(url,data) => axios.get(url, qs.stringify(data));
export const getquerys=(url,data) => axios.get(url+'?'+qs.stringify(data));
const users={
	login:(i)=>post(ApiTool(user.login,i)),
	phonecodeapp:(i)=>get(ApiTool(common.phonecodeapp,i)),
	register:(i)=>post(ApiTool(user.register,i)),
	alipay:(i)=>post(ApiTool(common.alipay,i)),
	wxpay:(i)=>post(ApiTool(common.wxpay,i)),
    alipayParams:()=>$get(common.alipayParams),
    wxpayParams:()=>$get(common.wxpayParams),
	wxgetQrcodeImg:(i)=>$get(ApiTool(common.wxgetQrcodeImg,i)),
    online:(i)=>get(ApiTool(user.online,i)),
	tracecount:(i)=>get(ApiTool(user.tracecount,i)),
	memberid:(id,data)=>put(ApiTool(user.memberid,id),data),
	update:(i)=>put(ApiTool(user.update,i)),
	address:(i,data)=>post(ApiTool(user.address,i),data),
	addressdef:(i)=>get(ApiTool(user.addressdef,i)),
	addressuser:(i)=>get(ApiTool(user.addressuser,i)),
	getaddressid:(id)=>get(ApiTool(user.addressid,id)),
	deladdressid:(id)=>del(ApiTool(user.addressid,id)),
    addressiddef:(id)=>get(ApiTool(user.addressiddef,id)),
	goodsOrArtist:(i)=>get(common.goodsOrArtist+'?'+qs.stringify(i)),
    scenario:(i)=>get(common.scenario)
}
const home={
	banner:(i)=>get(ApiTool(common.bannerones,i)),
	recommend:(i)=>get(ApiTool(goods.recommend,i)),
	getbytags:(i)=>get(ApiTool(goods.getByTag,i)),
    collect:(i)=>get(ApiTool(goods.collect,i)),
	recommendc:(i)=>get(ApiTool(goods.recommendc,i))
}
const good={
	gid:(id)=>get(ApiTool(goods.gid,id)),
	category:(i)=>get(ApiTool(goods.category,i)),
	dictionarycategory:(i)=>get(ApiTool(common.dictionarycategory,i)),
	categoryid:(id)=>get(ApiTool(goods.categoryid,id)),
	goods:(i)=>getquerys(goods.goods,i),
	framed:(i)=>get(ApiTool(user.framed,i)),
	recommendid:(i)=>get(ApiTool(goods.recommendid,i)),
	commentgid:(i)=>get(ApiTool(goods.commentgid,i)),
	shopcar:(i,obj)=>put(ApiTool(common.shopcar,i),obj),
	gshopcar:(i)=>get(ApiTool(common.shopcar,i)),
	shopcarids:(i)=>del(ApiTool(common.shopcarids,i)),
	shopCar:(i)=>post(ApiTool(order.shopCar,i)),
	order:(i)=>get(ApiTool(order.order,i)),
	placeOrder:(i,obj)=>post(ApiTool(order.placeOrder,i),obj),
	postOrder:(i,obj)=>post(ApiTool(order.order,i),obj),
	delete:(i)=>put(ApiTool(order.delete,i)),
	tracegoodsId:(i)=>post(ApiTool(user.tracegoodsId,i)),
}
const art={
	artist:(i)=>get(ApiTool(artist.artist,i)),
	artistid:(id)=>get(ApiTool(artist.artistid,id)),
	like:(i)=>put(ApiTool(artist.like,i))
}
const cir={
    topic:(i)=>get(ApiTool(circle.topic,i)),
    toplimit:(i)=>get(ApiTool(circle.toplimit,i)),
    group:(i)=>get(ApiTool(circle.group,i)),
    grouplike:(i)=>put(ApiTool(circle.grouplike,i)),
    ctopic:(i)=>get(ApiTool(circle.ctopic,i)),
    cgid:(i)=>get(ApiTool(circle.cgid,i)),
    toppicid:(i)=>get(ApiTool(circle.toppicid,i)),
    commentid:(i)=>get(ApiTool(circle.commentid,i)),
    addcomment:(i)=>post(ApiTool(circle.addcomment,i)),
    view:(i)=>put(ApiTool(circle.view,i)),
    zan:(i)=>put(ApiTool(circle.zan,i)),
}
export {users,home,good,art,cir,date,insertAfter,qs}