import {cir} from '@/assets/js/api'
/**
 * [圈子&群组模块]
 * @time 2017-12-18 15:17:24
 */
export const TOPIC_SUC = 'TOPIC_SUC';//关注群组的话题
export const TOPLIMIT_SUC = 'TOPLIMIT_SUC';//查询置顶话题列表
export const GROUP_SUC = 'GROUP_SUC';//分组查询群组列表
export const GROUPLIKE_SUC = 'GROUPLIKE_SUC';//关注&取消关注
export const CTOPIC_SUC = 'CTOPIC_SUC';//群组id查询的话题
export const CGID_SUC = 'CGID_SUC';//群组id查询的详细
export const TOPPICID_SUC = 'TOPPICID_SUC';//id查询的详细
export const COMMENTID_SUC = 'COMMENTID_SUC';//id查询的评论
export const ADDCOMMENT_SUC = 'ADDCOMMENT_SUC';//单个话题评论
export const VIEW_SUC = 'VIEW_SUC';//单个话题浏览
export const ZAN_SUC = 'ZAN_SUC';//单个话题点赞

export default {
    state: {
        topic:{
            info:'',
            message:''
        },
        toplimit:{
            info:'',
            message:''
        },
        group:{
            info:'',
            message:''
        },
        grouplike:{
            info:'',
            message:''
        },
        ctopic:{
            info:'',
            message:''
        },
        cgid:{
            info:'',
            message:''
        },
        toppicid:{
            info:'',
            message:''
        },
        commentid:{
            info:'',
            message:''
        },
        addcomment:{
            info:'',
            message:''
        },
        view:{
            info:'',
            message:''
        },
        zan:{
            info:'',
            message:''
        }
    },
    actions: {
        getTopic({commit},info){
            cir.topic(info).then(function(d){
                commit(TOPIC_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getToplimit({commit},info){
            cir.toplimit(info).then(function(d){
                commit(TOPLIMIT_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getGroup({commit},info){
            cir.group(info).then(function(d){
                commit(GROUP_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getGrouplike({commit},info){
            cir.grouplike(info).then(function(d){
                commit(GROUPLIKE_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCtopic({commit},info){
            cir.ctopic(info).then(function(d){
                commit(CTOPIC_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCgid({commit},info){
            cir.cgid(info).then(function(d){
                commit(CGID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getToppicid({commit},info){
            cir.toppicid(info).then(function(d){
                commit(TOPPICID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getCommentid({commit},info){
            cir.commentid(info).then(function(d){
                commit(COMMENTID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        postAddcomment({commit},info){
            cir.addcomment(info).then(function(d){
                commit(ADDCOMMENT_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        putView({commit},info){
            cir.view(info).then(function(d){
                commit(VIEW_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        putZan({commit},info){
            cir.zan(info).then(function(d){
                commit(ZAN_SUC,d);
            }).catch(function(error){
                throw error;
            })
        }
    },
    mutations: {
        [TOPIC_SUC] (state , info) {
            state.topic.info=info;
            state.topic.message=info.message;
        },
        [TOPLIMIT_SUC] (state , info) {
            state.toplimit.info=info;
            state.toplimit.message=info.message;
        },
        [GROUP_SUC] (state , info) {
            state.group.info=info;
            state.group.message=info.message;
        },
        [GROUPLIKE_SUC] (state , info) {
            state.grouplike.info=info;
            state.grouplike.message=info.message;
        },
        [CTOPIC_SUC] (state , info) {
            state.ctopic.info=info;
            state.ctopic.message=info.message;
        },
        [CGID_SUC] (state , info) {
            state.cgid.info=info;
            state.cgid.message=info.message;
        },
        [TOPPICID_SUC] (state , info) {
            state.toppicid.info=info;
            state.toppicid.message=info.message;
        },
        [COMMENTID_SUC] (state , info) {
            state.commentid.info=info;
            state.commentid.message=info.message;
        },
        [ADDCOMMENT_SUC] (state , info) {
            state.addcomment.info=info;
            state.addcomment.message=info.message;
        },
        [VIEW_SUC] (state , info) {
            state.view.info=info;
            state.view.message=info.message;
        },
        [ZAN_SUC] (state , info) {
            state.zan.info=info;
            state.zan.message=info.message;
        },
    },
    getters: {
        getTopicInfo: state => state.topic.info,
        getToplimitInfo: state => state.toplimit.info,
        getGroupInfo: state => state.group.info,
        getGrouplikeInfo: state => state.grouplike.info,
        getCtopicInfo: state => state.ctopic.info,
        getCgidInfo: state => state.cgid.info,
        getToppicidInfo: state => state.toppicid.info,
        getCommentidInfo: state => state.commentid.info,
        postAddcommentInfo: state => state.addcomment.info,
        putViewInfo: state => state.view.info,
        putZanInfo: state => state.zan.info
    }
};
