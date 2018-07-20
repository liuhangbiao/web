import {good,users} from '@/assets/js/api'
/**
 * [登录模块]
 * @time 2017-11-22 16:32:45
 */
export const SHOPCARIDS_SUC = 'SHOPCARIDS_SUC';//删除购物车商品
export const TRACEGOODSID_SUC = 'TRACEGOODSID_SUC';//加入收藏
export const SHOPCAR_SUC = 'SHOPCAR_SUC';//购物车加入订单
export const ORDER_SUC = 'ORDER_SUC';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUCa = 'ORDER_SUCa';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUC1 = 'ORDER_SUC1';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUC2 = 'ORDER_SUC2';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUC3 = 'ORDER_SUC3';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUC4 = 'ORDER_SUC4';//状态值(待支付、已发货，已退货，已完成、已取消)
export const ORDER_SUC5 = 'ORDER_SUC5';//状态值(待支付、已发货，已退货，已完成、已取消)
export const PLACEORDER_SUC = 'PLACEORDER_SUC';//立即购买
export const POSTORDER_SUC = 'POSTORDER_SUC';//提交订单
export const DELETE_SUC = 'DELETE_SUC';//删除订单
export const ADDRESSDEF_SUC = 'ADDRESSDEF_SUC';//默认地址
export default {
    state: {
        shopcarids:{
            info:'',
            message:'',
            istrue:false
        },
        tracegoodsId:{
            info:'',
            message:''
        },
        shopCar:{
            info:'',
            message:''
        },
        order:{
            info:'',
            message:'',
            list:'',
            list0:'',
            list1:'',
            list2:'',
            list3:'',
            list4:'',
            list5:''
        },
        placeOrder:{
            info:'',
            message:'',
            list:''
        },
        postOrder:{
            info:'',
            message:'',
            list:''
        },
        delete:{
            info:'',
            message:'',
            list:''
        },
        addressdef:{
            info:'',
            message:'',
            list:''
        }
    },
    actions: {
        delShopcarids({commit},info){
             const su=this.state.order.shopcarids;
            good.shopcarids(info).then(function(d){
                commit(SHOPCARIDS_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        postTracegoodsId({commit},info){
             const su=this.state.order.tracegoodsId;
            good.tracegoodsId(info).then(function(d){
                commit(TRACEGOODSID_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        postShopCar({commit},info){
             const su=this.state.order.shopCar;
            good.shopCar(info).then(function(d){
                commit(SHOPCAR_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        getOrder({commit},info){
             const su=this.state.order.order;
            good.order(info).then(function(d){
                // 待支付、已发货，已退货，已完成、已取消
                if (info.status==='') {
                    commit(ORDER_SUCa,d);
                }else if (info.status==='待支付') {
                    commit(ORDER_SUC1,d);
                }else if (info.status==='已发货') {
                    commit(ORDER_SUC2,d);
                }else if (info.status==='已退货') {
                    commit(ORDER_SUC3,d);
                }else if (info.status==='已完成') {
                    commit(ORDER_SUC4,d);
                }else if (info.status==='已取消') {
                    commit(ORDER_SUC5,d);
                }else{
                    commit(ORDER_SUC,d);
                }
            }).catch(function(error){
                 throw error;
            })
        },
        postPlaceOrder({commit},info){
             const su=this.state.order.placeOrder;
            good.placeOrder({token:info.token},info.data).then(function(d){
                commit(PLACEORDER_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        postOrder({commit},info){
             const su=this.state.order.postOrder;
            good.postOrder({token:info.token},info.data).then(function(d){
                commit(POSTORDER_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        putDelete({commit},info){
             const su=this.state.order.delete;
            good.delete(info).then(function(d){
                commit(DELETE_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },
        getAddressdef({commit},info){
             const su=this.state.order.addressdef;
            users.addressdef(info).then(function(d){
                commit(ADDRESSDEF_SUC,d);
            }).catch(function(error){
                 throw error;
            })
        },

    },
    mutations: {
        [SHOPCARIDS_SUC](state ,info) {
            state.shopcarids.info=info;
            state.shopcarids.istrue=true;
            state.shopcarids.message=info.message;
        },
        [TRACEGOODSID_SUC](state ,info) {
            state.tracegoodsId.info=info;
            state.tracegoodsId.message=info.message;
        },
        [SHOPCAR_SUC](state ,info) {
            state.shopCar.info=info;
            state.shopCar.message=info.message;
        },
        [ORDER_SUC](state ,info) {
            state.order.info=info;
            state.order.message=info.message;
            state.order.list=info.result.data;
        },
        [ORDER_SUCa](state ,info) {
            state.order.list0=info.result.data;
        },
        [ORDER_SUC1](state ,info) {
            state.order.list1=info.result.data;
        },
        [ORDER_SUC2](state ,info) {
            state.order.list2=info.result.data;
        },
        [ORDER_SUC3](state ,info) {
            state.order.list3=info.result.data;
        },
        [ORDER_SUC4](state ,info) {
            state.order.list4=info.result.data;
        },
        [ORDER_SUC5](state ,info) {
            state.order.list5=info.result.data;
        },
        [PLACEORDER_SUC](state ,info) {
            state.placeOrder.info=info;
            state.placeOrder.message=info.message;
            state.placeOrder.list=info.result;
        },
        [POSTORDER_SUC](state ,info) {
            state.postOrder.info=info;
            state.postOrder.message=info.message;
            state.postOrder.list=info.result;
        },
        [DELETE_SUC](state ,info) {
            state.delete.info=info;
            state.delete.message=info.message;
            state.delete.list=info.result;
        },
        [ADDRESSDEF_SUC](state ,info) {
            state.addressdef.info=info;
            state.addressdef.message=info.message;
            state.addressdef.list=info.result;
        },
    },
    getters: {
        delShopcaridsInfo: state => state.shopcarids.info,
        postShopCarInfo: state => state.shopCar.info,
        getOrderInfo: state => state.order.list,
        postPlaceOrderInfo: state => state.placeOrder.info,
        postOrderInfo: state => state.postOrder.info,
        putDeleteInfo: state => state.delete.info,
        getAddressdefInfo: state => state.addressdef.info,
        postTracegoodsIdInfo: state => state.tracegoodsId.info
    }
};
