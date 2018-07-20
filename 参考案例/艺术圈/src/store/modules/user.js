import {users} from '@/assets/js/api'
/**
 * [登录模块]
 * @time 2017-11-22 16:32:45
 */
export const LOGIN_SUC = 'LOGIN_SUC';//登录
export const CODE_SUC = 'CODE_SUC';//验证码
export const REGISTER_SUC = 'REGISTER_SUC';//注册
export const ALIPAY_SUC = 'ALIPAY_SUC';//支付宝支付
export const WXPAY_SUC = 'WXPAY_SUC';//微信支付
export const WXGETQRCODEIMGSUC = 'WXGETQRCODEIMGSUC';//微信二维码
export const ONLINE_SUC = 'ONLINE_SUC';//当前用户信息
export const TRACECOUNT_SUC = 'TRACECOUNT_SUC';//当前用户 浏览/收藏/购买 记录总数
export const ADDRESSUSER_SUC = 'ADDRESSUSER_SUC';//当前用户 地址
export const GOODSORARTIST_SUC = 'GOODSORARTIST_SUC';//搜索商品&艺术家
export const GOODSORARTIST_SUC1 = 'GOODSORARTIST_SUC1';//搜索商品
export const GOODSORARTIST_SUC2 = 'GOODSORARTIST_SUC2';//搜索艺术家
export default {
    state: {
        login:{
            info:'',
            token:'',
            message:'',
            isuser:false
        },
        codes:{
            info:'',
            message:''
        },
        regs:{
            info:'',
            message:''
        },
        alipay:{
            info:'',
            message:''
        },
        wxpay:{
            info:'',
            message:''
        },
        wxgetQrcodeImg:{
            info:'',
            message:''
        },
        online:{
            info:'',
            message:''
        },
        tracecount:{
            info:'',
            message:''
        },
        addressuser:{
            info:'',
            message:''
        },
        goodsOrArtist:{
            info:'',
            message:'',
            info1:'',
            message1:'',
            info2:'',
            message2:''
        }
    },
    actions: {
        addLogin({ commit } , info){
            const su=this.state.user.login;
            users.login(info).then(function(d){
                commit(LOGIN_SUC,d);
            }).catch(function(error){
                throw error;
                //su.message="登录出现严重错误！"
            })
        },
        getCode({commit},info){
             const su=this.state.user.codes;
            users.phonecodeapp(info).then(function(d){
                commit(CODE_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        addReg({commit},info){
            const su=this.state.user.regs;
            users.register(info).then(function(d){
                commit(REGISTER_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getAlipay({commit},info){
            const su=this.state.user.alipay;
            users.alipay(info).then(function(d){
                commit(ALIPAY_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getWxpay({commit},info){
            const su=this.state.user.wxpay;
            users.wxpay(info).then(function(d){
                commit(WXPAY_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getWxgetQrcodeImg({commit},info){
            const su=this.state.user.wxgetQrcodeImg;
            users.wxgetQrcodeImg(info).then(function(d){
                commit(WXGETQRCODEIMGSUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getOnline({commit},info){
            const su=this.state.user.online;
            users.online({token:sessionStorage.getItem('ukey')}).then(function(d){
                    commit(ONLINE_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getTracecount({commit},info){
            const su=this.state.user.tracecount;
            users.tracecount({token:sessionStorage.getItem('ukey')}).then(function(d){
                    commit(TRACECOUNT_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getAddressuser({commit},info){
            const su=this.state.user.addressuser;
            users.addressuser({token:sessionStorage.getItem('ukey')}).then(function(d){
                    commit(ADDRESSUSER_SUC,d);
            }).catch(function(error){
                 throw error;
                 //su.message="出现严重错误！"
            })
        },
        getGoodsOrArtist({commit},info){
            users.goodsOrArtist(info).then(function(d){
                if (info.type===1) {
                    commit(GOODSORARTIST_SUC1,d);
                }else if (info.type===2) {
                    commit(GOODSORARTIST_SUC2,d);
                 }else{
                    commit(GOODSORARTIST_SUC,d);
                 }
            }).catch(function(error){
                 throw error;
            })
        },
    },
    mutations: {
        [LOGIN_SUC] (state , info) {
            state.login.info=info;
            if(info && info.code==='200'){
                // console.log(dd,dd.result.accessToken)
                sessionStorage.setItem('ukey',info.result.accessToken)
                sessionStorage.setItem('uis',true)
                state.login.token=info.result.accessToken;
                state.login.message='';
                state.login.isuser=true;
            }else{
                sessionStorage.removeItem('ukey')
                sessionStorage.removeItem('uis')
                state.login.token='';
                state.login.isuser=false;
                state.login.message=info.message
                // state.login.message=(info && info.message)||'登录失败，请检查后再试！'
            }
        },
        [CODE_SUC] (state , info) {
            state.codes.info=info;
            state.codes.message=info.message;
        },
        [REGISTER_SUC] (state , info) {
            state.regs.info=info;
            state.regs.message=info.message;
        },
        [ALIPAY_SUC] (state , info) {
            state.alipay.info=info;
            state.alipay.message=info.message;
        },
        [WXPAY_SUC] (state , info) {
            state.wxpay.info=info;
            state.wxpay.message=info.message;
        },
        [WXGETQRCODEIMGSUC] (state , info) {
            state.wxgetQrcodeImg.info=info;
            state.wxgetQrcodeImg.message=info.message;
        },
        [ONLINE_SUC] (state , info) {
            state.online.info=info;
            state.online.message=info.message;
        },
        [TRACECOUNT_SUC] (state , info) {
            state.tracecount.info=info;
            state.tracecount.message=info.message;
        },
        [ADDRESSUSER_SUC] (state , info) {
            state.addressuser.info=info;
            state.addressuser.message=info.message;
        },
        [GOODSORARTIST_SUC] (state , info) {
            state.goodsOrArtist.info=info;
            state.goodsOrArtist.message=info.message;
        },
        [GOODSORARTIST_SUC1] (state , info) {
            state.goodsOrArtist.info1=info;
            state.goodsOrArtist.message1=info.message;
        },
        [GOODSORARTIST_SUC2] (state , info) {
            state.goodsOrArtist.info2=info;
            state.goodsOrArtist.message2=info.message;
        }
    },
    getters: {
        getLoginInfo: state => state.login.info,
        getCodeInfo: state => state.codes.info,
        getRegsInfo: state => state.regs.info,
        getAlipayInfo: state => state.alipay.info,
        getWxpayInfo: state => state.wxpay.info,
        getWxgetQrcodeImgInfo: state => state.wxgetQrcodeImg.info,
        getOnlineInfo: state => state.online.info,
        getTracecountInfo: state => state.tracecount.info,
        getAddressuserInfo: state => state.addressuser.info,
        getGoodsOrArtistInfo: state => state.goodsOrArtist.info,
        getGoodsOrArtistInfo1: state => state.goodsOrArtist.info1,
        getGoodsOrArtistInfo2: state => state.goodsOrArtist.info2,
        getGoodsOrArtistAll: state => state.goodsOrArtist
    }
};
