<template>
  <div class="My">
  <!-- 底部导航 -->
  <Tabbar></Tabbar>
  <!-- 底部导航 end-->
  <!-- 主体 -->
  <div class="banner">
    <div class="info">
      <a href="#/home" class="icon-tiaozhuan fl">&#160;</a>
      <a href="#/cart" class="icon-gouwuc fr">&#160;</a>
    </div>
    <div class="pic"><img v-if="userinfo.headimg" :src="userinfo.headimg" :onerror="nopic"><i v-if="!userinfo.headimg" class="icon icon-head"></i></div>
    <div class="name" v-text="userinfo.nickname">夏佩根</div>
  </div>
  <div class="mbox bar-info">
    <div class="weui-flex">
      <div class="weui-flex__item"><a><em v-text="userinfotc.trace">21</em>收藏夹</a></div>
      <div class="weui-flex__item"><a><em v-text="userinfotc.buy">41</em>购买记录</a></div>
      <div class="weui-flex__item"><a><em v-text="userinfotc.browse">232</em>足迹</a></div>
    </div>
  </div>
  <div class="bline">&#160;</div>
  <div class="mbox">
    <a href="#/seting"><i class="icon-set">&#160;</i>账户设置<i class="icon-tiaozhuan2"></i></a>
    <div class="line">&#160;</div>
    <a href="#/order"><i class="icon-order">&#160;</i>我的订单<i class="icon-tiaozhuan2"></i></a>
    <div class="line">&#160;</div>
    <a href="#/addr"><i class="icon-dingwei">&#160;</i>收货地址<i class="icon-tiaozhuan2"></i></a>
  </div>
  <div class="bline">&#160;</div>
  <div class="mbox">
    <a href="#"><i class="icon-jiefenbus">&#160;</i>积分商城<i class="icon-tiaozhuan2"></i></a>
    <div class="line">&#160;</div>
    <a href="#/quan"><i class="icon-coupons">&#160;</i>我的代金券<i class="icon-tiaozhuan2"></i></a>
  </div>
  <div class="bline">&#160;</div>
  <div class="mbox">
    <a href="#/artmore"><i class="icon-artist">&#160;</i>艺术家<i class="icon-tiaozhuan2"></i></a>
  </div>
  <div class="bline">&#160;</div>
  <div class="mbox">
    <a href="#"><i class="icon-hezhuo">&#160;</i>合作伙伴入住<i class="icon-tiaozhuan2"></i></a>
    <div class="line">&#160;</div>
    <a href="#/about"><i class="icon-me">&#160;</i>关于我们<i class="icon-tiaozhuan2"></i></a>
  </div>
  <div class="bline">&#160;</div>
  <div class="mbox">
    <a @click="logout"><i class="icon-quit">&#160;</i>退出登录<i class="icon-tiaozhuan2"></i></a>
  </div>
  <!-- 主体 end-->
  <div class="mgb5rem">&#160;</div>
</div>

</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue"
import { cats,nopic} from "js/config"
import {layer} from 'js/lib/layer'
export default {
  name: 'My',
  data() {
    return {
      nopic:nopic,
      data:cats||{},
      userinfo:'',
      userinfotc:''
    }
  },
  created: function() {
      this.$store.dispatch('getOnline')
      this.$store.dispatch('getTracecount');
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getOnlineInfo','getTracecountInfo'])
  },
  methods: {
    getSearchData(v) {
      console.log(v)
    },
    logout(){
      this.$router.push({name:'Login'})
    }
  },
  watch:{
    getOnlineInfo:function(v){
      if(v.code==="200"){
        this.userinfo=v.result;
      }else{
        this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
      }
    },
    getTracecountInfo:function(v){
       if(v.code==="200"){
        this.userinfotc=v.result;
      }else{
        this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
      }
    }
  },
  components: {
    Tabbar
  }

}
// getOnline
</script>
<style scoped lang="less">
.My { background: #fff; min-height: 100%; overflow: hidden; }
.mgb5rem { margin-bottom: 5rem; }
.bline{border-bottom: 1.8rem solid #f6f6f6;height: 0;}
.line {
  height: 0;
  border-bottom: 1px solid #eee;
  margin:0.5rem 0
}
.banner{
  background:#333 url('~img/mybg.jpg') top center no-repeat;
  position: relative;
  padding:2rem 0;
  /*background: #333;*/
  text-align: center;
  .pic{
      position: relative;
      margin: 0 auto;
      width: 8rem;
      height: 8rem;
      overflow: hidden;
      border-radius:50%;
      text-align: center;
      line-height: 8rem;
      img{
        border-radius:50%;
        height: 8rem;
        min-width:100%
        /*width:100%;*/
      }
  }
  .name{
    font-size: 1.8rem;
    color: #fff;
    padding-top:1rem;
  line-height:2.5rem
  }
  .info{
    overflow: hidden;
    padding: 0 2rem;
    a{
      font-weight: bold;
      color: #fff;
    }
    font-size:2rem;
  }
}
.mbox{
  background: #fff;
  display: block;
  padding: 1rem 2rem;
  a {
    display: block;
    line-height:3rem;
    font-size: 1.7rem;
    color: #333;
    position: relative;
    i{
      color: #b6b6b6;
      font-size: 2rem;
    }
    .icon-tiaozhuan2{
      float: right;
      padding-top:0.5rem
    }
  }
}
.bar-info{
  text-align: center;
  a,em{
    color: #666;
    font-size: 1.75rem;
  }
  em{
    display: block;
  }
}
.icon-head{
  position: absolute;
  left: 0;
  top: 0;
  width: 7.5rem;
  height: 7.5rem;
  line-height: 7.5rem;
  font-size: 6rem;color: #fff;
  background: #cdcdcd;
  border-radius:50%;
  border: 3px solid #fff;
  /*padding: 1rem;*/
}
</style>
