import {art} from '@/assets/js/api'
/**
 * [艺术家模块]
 * @time 2017-11-24 17:17:23
 */
export const ARTISTID_SUC = 'ARTISTID_SUC';//根据ID艺术家详情
export const ARTIST_SUC = 'ARTIST_SUC';//艺术家列表
export const LIKE_SUC = 'LIKE_SUC';//艺术家点赞/喜欢&取消
export default {
    state: {
        artistid:{
            info:'',
            message:'',
            list:''
        },
        artist:{
            info:'',
            message:'',
            list:''
        },
        like:{
            info:'',
            message:'',
        }
    },
    actions: {
        getArtistid({commit},info){
             const su=this.state.artist.artistid;
            art.artistid(info).then(function(d){
                commit(ARTISTID_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        getArtist({commit},info){
            const su=this.state.artist.artist;
            art.artist(info).then(function(d){
                commit(ARTIST_SUC,d);
            }).catch(function(error){
                throw error;
            })
        },
        putLike({commit},info){
            const su=this.state.artist.like;
            art.like(info).then(function(d){
                // console.log(d)
                commit(LIKE_SUC,d);
            }).catch(function(error){
                throw error;
            })
        }
    },
    mutations: {
        [ARTISTID_SUC] (state , info) {
            state.artistid.info=info;
            state.artistid.list=info.result;
            state.artistid.message=info.message;
        },
        [ARTIST_SUC] (state , info) {
            state.artist.info=info;
            state.artist.list=info.result.data;
            state.artist.message=info.message;
        },
        [LIKE_SUC] (state , info) {
            state.like.info=info;
            state.like.list=info.result;
        }
    },
    getters: {
        getArtistidInfo: state => state.artistid.info,
        getArtistInfo: state => state.artist.info,
        putLikeInfo: state => state.like.info,
    }
};
