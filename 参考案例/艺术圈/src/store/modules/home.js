import {home,get,art} from '@/assets/js/api'
/**
 * [首页]
 * @time 2017-11-23 13:01:45
 */
export const BANNER_SUC = 'BANNER_SUC';//默认
export const BANNER_SUCa = 'BANNER_SUCa';//PC&APP首页
export const BANNER_SUCb = 'BANNER_SUCb';//PC&APP藏艺术
export const BANNER_SUCc = 'BANNER_SUCc';//PC&APP藏艺术3d入口
export const RECOMMEND_SUC = 'RECOMMEND_SUC';//为你推荐
export const GOODSBYTAG_SUC = 'GOODSBYTAG_SUC';//默认
export const GOODSBYTAG_SUCa = 'GOODSBYTAG_SUCa';//1（新作）
export const GOODSBYTAG_SUCc = 'GOODSBYTAG_SUCc';//3(艺术野)
export const GOODSBYTAG_SUCd = 'GOODSBYTAG_SUCd';//4(藏艺)
export const GOODSBYTAG_SUCe = 'GOODSBYTAG_SUCe';//5（热卖单品）
export const TODO_SUC = 'TODO_SUC';//浏览量&喜欢
export const COLLECT_SUC = 'COLLECT_SUC';//艺术推荐
export const RECOMMENDC_SUC = 'RECOMMENDC_SUC';//艺术推荐
export default {
    state: {
        todos:[],
        banner:{
            info:'',
            info1:'',
            info2:'',
            info3:'',
            message:'',
            bannerList:{},
            list1:'',
            list2:'',
            list2:''
        },
         recommend:{
            info:'',
            message:'',
            recList:{}
        },
        getbytags:{
            bb:sessionStorage.getItem('taglist1')||'',
            info:'',
            info1:'',
            info3:'',
            info4:'',
            info5:'',
            taglist:'',
            taglist1:'',
            taglist3:'',
            taglist4:'',
            taglist5:'',
        },
        collect:{
            info:'',
            message:'',
            list:''
        },
        recommendc:{
            info:'',
            message:'',
            list:''
        }
    },
    actions: {
        getBanner({commit},info){
             const su=this.state.home.banner;
             //PC/APP==>1 (PC首页) 2 (PC藏艺术) 3 (PC藏艺术3d入口)
             home.banner(info).then(function(d){
                   if (info.value==='1') {
                        commit(BANNER_SUCa,d);
                    }else if (info.value==='2') {
                        commit(BANNER_SUCb,d);
                     }else if (info.value==='3') {
                        commit(BANNER_SUCc,d);
                    }else{
                        commit(BANNER_SUC,d);
                    }
            }).catch(function(error){
                throw error;
            })
        },
        getRecommend({commit},info){
             const su=this.state.home.recommend;
             home.recommend(info).then(function(d){
                commit(RECOMMEND_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getByTag({commit},info){
             const su=this.state.home.getbytags;
             // 通过标签查询：1（新作）、3(艺术野)、4(藏艺)、5（热卖单品）
            home.getbytags(info).then(function(d){
                if (info.tagid===1) {
                    // commit(TODO_SUC,d);
                    commit(GOODSBYTAG_SUCa,d);
                }else if (info.tagid===3) {
                    // commit(TODO_SUC,d);
                    commit(GOODSBYTAG_SUCc,d);
                }else if (info.tagid===4) {
                    // commit(TODO_SUC,d);
                    commit(GOODSBYTAG_SUCd,d);
                }else if (info.tagid===5) {
                    // commit(TODO_SUC,d);
                    commit(GOODSBYTAG_SUCe,d);
                }else{
                    // commit(TODO_SUC,d);
                    commit(GOODSBYTAG_SUC,d);
                }
            }).catch(function(error){
                throw error;
            })
        },
        getCollect({commit},info){
             const su=this.state.home.collect;
             home.collect(info).then(function(d){
                commit(COLLECT_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getRecommendc({commit},info){
             const su=this.state.home.recommendc;
             home.recommendc(info).then(function(d){
                commit(RECOMMENDC_SUC,d);
            }).catch(function(error){
                throw error;
            })
        }
    },
    mutations: {
        [BANNER_SUC] (state , info) {
            state.banner.info=info;
            state.banner.bannerList=info.result.data;
            state.banner.message=info.message;

        },
        [BANNER_SUCa] (state , info) {
            state.banner.info1=info;
            state.banner.list1=info.result.data;
        },
        [BANNER_SUCb] (state , info) {
            state.banner.info2=info;
            state.banner.list2=info.result.data;
        },
        [BANNER_SUCc] (state , info) {
            state.banner.info3=info;
            state.banner.list3=info.result.data;
        },
        [RECOMMEND_SUC] (state , info) {
            state.recommend.info=info;
            state.recommend.recList=info.result.data;
            state.recommend.message=info.message;
        },
        [GOODSBYTAG_SUC] (state , info) {
            state.getbytags.info=info;
            state.getbytags.taglist=info.result.data;
        },
        [GOODSBYTAG_SUCa] (state , info) {
            state.getbytags.info1=info;
            state.getbytags.taglist1=info.result.data;
        },
        [GOODSBYTAG_SUCc] (state , info) {
            var info=info;
            state.getbytags.info3=info;
            state.getbytags.taglist3=info.result.data;
        },
        [GOODSBYTAG_SUCd] (state , info) {
            var info=info;
            state.getbytags.info4=info;
            state.getbytags.taglist4=info.result.data;
        },
        [GOODSBYTAG_SUCe] (state , info) {
            state.getbytags.info5=info;
            state.getbytags.taglist5=info.result.data;
        },
        [TODO_SUC](state ,info){
                var d=info.result.data;
                for (var i = 0; i < d.length; i++) {
                    (function(e,i){
                       get('api/member/trace/getGoodsTrace?goodsId='+e.id+'&'+sessionStorage.getItem('ukey')).then(function(gd){
                            if(gd.code==="200"){
                                var dd=gd.result;
                                state.todos.push({id:e.id,like:dd.like||0,browse:dd.browse||0});
                            }
                       })
                    })(d[i],i)
                }
        },
        [COLLECT_SUC] (state , info) {
            state.collect.info=info;
            state.collect.list=info.result.data;
            state.collect.message=info.message;
        },
        [RECOMMENDC_SUC] (state , info) {
            state.recommendc.info=info;
            state.recommendc.list=info.result.data;
            state.recommendc.message=info.message;
        }
    },
    getters: {
        getBannerInfo: state => state.banner,
        getRecommendInfo: state => state.recommend.info,
        getByTagInfo: state => state.getbytags,
        getGoodsByTag: (state, getters) => (id) => {
             return state.todos.find(todo => todo.id === id) && state.todos.find(todo => todo.id === id).like
        },
        getCollectInfo: state => state.collect.info,
        getRecommendcInfo: state => state.recommendc.info,
    }
};