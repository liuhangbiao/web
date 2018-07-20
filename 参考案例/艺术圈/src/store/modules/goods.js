import {good,users} from '@/assets/js/api'
/**
 * [商品模块]
 * @time 2017-11-24 17:17:23
 */
export const GID_SUC = 'GID_SUC';//根据ID查询商品详情
export const CATEGORY_SUC = 'CATEGORY_SUC';//获取分类
export const DICTIONARYCATEGORY_SUC = 'DICTIONARYCATEGORY_SUC';//字典下一级获取分类
// export const CATEGORY_SUCa = 'CATEGORY_SUCa';//获取分类
// export const CATEGORY_SUCb = 'CATEGORY_SUCb';//获取分类
// export const CATEGORY_SUCc = 'CATEGORY_SUCc';//获取分类
// export const CATEGORY_SUCd = 'CATEGORY_SUCd';//获取分类
export const CATEGORYID_SUC = 'CATEGORYID_SUC';//根据分类ID查询子分类
export const GOODS_SUC = 'GOODS_SUC';//根据分类ID查询商品列表
export const FRAMED_SUC = 'FRAMED_SUC';//根据分类ID查询商品装裱框
export const FRAMED2_SUC = 'FRAMED2_SUC';//根据分类ID查询商品卡纸
export const RECOMMENDID_SUC = 'RECOMMENDID_SUC';//根据分类商品ID查询喜欢或推荐商品
export const COMMENTGID_SUC = 'COMMENTGID_SUC';//根据分类商品ID查询评论
export const SHOPCAR_SUC = 'SHOPCAR_SUC';//加入购物车
export const GSHOPCAR_SUC = 'GSHOPCAR_SUC';//获取购物车
export const SHOPCARIDS_SUC = 'SHOPCARIDS_SUC';//删除购物车商品
export const TRACEGOODSID_SUC = 'TRACEGOODSID_SUC';//添加浏览记录或收藏
export const TREE_SUC = 'TREE_SUC';//获取数形分类
export const SCENARIO_SUC = 'SCENARIO_SUC';//获取场景
export default {
    state: {
        gid:{
            info:'',
            message:'',
            list:''
        },
        category:{
            info:'',
            message:'',
            list:''
        },
        dictionarycategory:{
            info:'',
            message:'',
            list:''
        },
        categoryid:{
            info:'',
            message:'',
            list:''
        },
        goods:{
            info:'',
            message:'',
            list:''
        },
        framed:{
            info:'',
            message:'',
            list:'',
            info2:'',
            list2:'',
            message2:''
        },
        recommendid:{
            info:'',
            message:'',
            list:''
        },
        commentgid:{
            info:'',
            message:'',
            list:''
        },
        shopcar:{
            info:'',
            message:'',
            list:''
        },
        gshopcar:{
            info:'',
            message:'',
            list:''
        },
        shopcarids:{
            info:'',
            message:'',
            list:''
        },
        tracegoodsId:{
            info:'',
            message:'',
            list:''
        },
        scenario:{
            info:'',
            message:''
        },
        // tree:{
        //     info:'',
        //     message:'',
        //     list:''
        // }
    },
    actions: {
        getGid({commit},info){
             const su=this.state.good.gid;
            good.gid(info).then(function(d){
                commit(GID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCategory({commit},info){
             const su=this.state.good.category;
            good.category(info).then(function(d){
                commit(CATEGORY_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getDictionarycategory({commit},info){
             const su=this.state.good.dictionarycategory;
            good.dictionarycategory(info).then(function(d){
                commit(DICTIONARYCATEGORY_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCategoryid({commit},info){
             const su=this.state.good.categoryid;
            good.categoryid(info).then(function(d){
                commit(CATEGORYID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
       getGoods({commit},info){
             const su=this.state.good.goods;
            good.goods(info).then(function(d){
                commit(GOODS_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getFramed({commit},info){
             const su=this.state.good.framed;
            good.framed(info).then(function(d){
                if(info.type===2){
                     commit(FRAMED2_SUC,d);
                }else{
                    commit(FRAMED_SUC,d);
                }
            }).catch(function(error){
                throw error;
            })
        },
        getRecommendid({commit},info){
             const su=this.state.good.recommendid;
            good.recommendid(info).then(function(d){
                commit(RECOMMENDID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCommentgid({commit},info){
             const su=this.state.good.commentgid;
            good.commentgid(info).then(function(d){
                commit(COMMENTGID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        putShopcar({commit},info){
             const su=this.state.good.shopcar;
            good.shopcar({token:info.token},info.data).then(function(d){
                commit(SHOPCAR_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getShopcar({commit},info){
             const su=this.state.good.gshopcar;
            good.gshopcar(info).then(function(d){
                commit(GSHOPCAR_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        postRracegoodsId({commit},info){
            const su=this.state.good.tracegoodsId;
            good.tracegoodsId(info).then(function(d){
                console.log(d)
                commit(TRACEGOODSID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getScenario({commit},info){
             users.scenario(info).then(function(d){
                commit(SCENARIO_SUC,d);
            }).catch(function(error){
                throw error;
            })
        }
        // getTree({commit},info){
        //      const su=this.state.good.tree;
        //     good.tree(info).then(function(d){
        //         commit(TREE_SUC,d);
        //     }).catch(function(error){
        //          su.message="出现严重错误！"
        //     })
        // }

    },
    mutations: {
        [GID_SUC] (state , info) {
            state.gid.info=info;
            state.gid.list=info.result;
            state.gid.message=info.message;
        },
        [CATEGORY_SUC] (state , info) {
            state.category.info=info;
            state.category.list=info.result;
            state.category.message=info.message;
        },
        [DICTIONARYCATEGORY_SUC] (state , info) {
            state.dictionarycategory.info=info;
            state.dictionarycategory.list=info.result;
            state.dictionarycategory.message=info.message;
        },
        [CATEGORYID_SUC] (state , info) {
            state.categoryid.info=info;
            state.categoryid.list=info.result;
            state.categoryid.message=info.message;
        },
        [GOODS_SUC](state , info) {
            state.goods.info=info;
            state.goods.list=info.result.data;
            state.goods.message=info.message;
        },
        [FRAMED_SUC](state , info) {
            state.framed.info=info;
            state.framed.list=info.result;
            state.framed.message=info.message;
        },
        [FRAMED2_SUC](state , info) {
            state.framed.info2=info;
            state.framed.list2=info.result;
            state.framed.message2=info.message;
        },
        [RECOMMENDID_SUC](state , info) {
            state.recommendid.info=info;
            state.recommendid.list=info.result.data;
            state.recommendid.message=info.message;
        },
        [COMMENTGID_SUC](state , info) {
            state.commentgid.info=info;
            state.commentgid.list=info.result;
            state.commentgid.message=info.message;
        },
        [SHOPCAR_SUC](state , info) {
            state.shopcar.info=info;
            state.shopcar.list=info.result;
            state.shopcar.message=info.message;
        },
        [GSHOPCAR_SUC](state , info) {
            state.gshopcar.info=info;
            state.gshopcar.list=info.result;
            state.gshopcar.message=info.message;
        },
        [TRACEGOODSID_SUC](state , info) {
            // console.log(info)
            state.tracegoodsId.info=info;
            state.tracegoodsId.list=info.result;
            state.tracegoodsId.message=info.message;
        },
        [SCENARIO_SUC](state , info) {
            state.scenario.info=info;
            state.scenario.message=info.message;
        }
        // [TREE_SUC] (state , info) {
        //     state.tree.info=info;
    //         state.tree.list=info.result;
    //         state.tree.message=info.message;
        // }
    },
    getters: {
        getGidInfo: state => state.gid.info,
        getCategoryInfo: state => state.category.info,
        getDictionarycategoryInfo: state => state.dictionarycategory.info,
        getCategoryidInfo: state => state.categoryid.info,
        getGoodsInfo: state => state.goods.info,
        getFramedInfo: state => state.framed.info,
        getCommendidInfo: state => state.recommendid.info,
        getCommentgidInfo: state => state.commentgid.info,
        getShopcarInfo: state => state.shopcar.info,
        getGshopcarInfo: state => state.gshopcar.info,
        postRracegoodsIdInfo: state => state.tracegoodsId.info,
        getScenarioInfo: state => state.scenario.info,
        // getTreeInfo: state => state.tree.info
    }
};
