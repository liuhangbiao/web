import {user} from '@/assets/js/api'
/**
 * [用户模块]
 * @time 20180328
 */
export const USER_SUC = 'USER_SUC';//获取用户
export default {
    state: {
        userinfo:{
            info:'',
            message:''
        }
    },
    actions: {
        getUser({ commit } , info){
            user.getUser(info).then(function(d){
                commit(USER_SUC,d);
            }).catch(function(error){
                throw error;
            })
        }
    },
    mutations: {
        [USER_SUC] (state , info) {
            state.userinfo.info=info;
            state.userinfo.message=info.message;
        }
    },
    getters: {
       getUserInfo: state => state.userinfo.info
    }
};
