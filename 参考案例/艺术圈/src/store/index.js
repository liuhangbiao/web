import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import home from './modules/home';
import goods from './modules/goods';
import artist from './modules/artist';
import order from './modules/order';
import circle from './modules/circle';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        user: user,
        home:home,
        good:goods,
        artist:artist,
        order:order,
        circle:circle
    },
});
