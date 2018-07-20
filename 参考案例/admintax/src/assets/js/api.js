import axios from 'axios'
import {config,common} from './config'
// import {layer} from './libs/layer'
export const baseURL=config.baseURI;
axios.defaults.timeout = 5000;
axios.defaults.baseURL = config.baseURI;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/*========  http请求拦截器 ========*/
axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error)
})
/*========  http响应拦截器 ========*/
axios.interceptors.response.use(config => {
    if(config.data.code ===200){
        return config.data;
    }
    else if(config.data.code ===400 ||config.data.code ===500){
        console.log(config.data['mes']||'未知信息！');
        return config.data;
    }else{
        return {
            code:config.data.code,
            message: config.data.message || '发生严重错误!',
            result: {}
        }
    }
}, error => {
    if (error && error.response && error.response.status === 200) {
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    } else {
        return {
            message: error || '发生严重错误!',
            result: {}
        }
    }
})
/*================  axios end===================*/
/* ============常用公共方法============ */
/* 创建临时数据 */
const setpromise = data => {return new Promise((resolve, reject) => {resolve(data)})}
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


const user={
    //GET 获取用户
    getUser:(i)=>$get(common.user,i),
}
export {user}