<template>
  <div class="Dong">
     <!-- 底部导航 -->
    <Tabbar></Tabbar>
    <!-- 底部导航 end-->
    <div class="topbar">互动</div>
    <div class="mgn3rem"></div>
    <div class="dslide">
      <div class="pic">
        <a href="#/hd"><img src="../assets/img/3dbg.png" alt="互动美术馆"></a>
      </div>
      <div class="info">
        <span class="i1">互动美术馆</span>
        <span class="i2">VIRTUAL MUSEUM</span>
        <span class="i3">虚拟现实，在线观展</span>
      </div>
    </div>
  </div>
</template>
<script>
import Tabbar from "comps/Tabbar.vue"
export default {
  name: 'Dong',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  created: function() {
  },
  mounted() {
    // console.log(Mock);
    // console.log('ssss');
  },
  methods: {},
  watch: {
  },
   components: {
    Tabbar
  }
}
</script>
<style scoped lang="less">
.Dong{
  position: relative;overflow: hidden;height: 100%;background: #333;
}
.topbar{
  background: #fff;height: 6rem;text-align: center;font-size: 2.5rem;color: #1b1b1b;line-height:6rem
}
.dslide{
  position: relative;
  background: #161515;
  /*margin:5rem auto 0 auto;*/
  margin: 0 auto;
  width: 80%;
  height: 65%;
  background:rgba(22,21,21,1);
  border-radius: 1.14rem;
  overflow: hidden;
  .pic{
    width: 80%;margin: 0 auto;padding-top: 2.5rem;overflow: hidden;
  }
  .info{
    background: #fff;position: absolute;padding:1rem 0;bottom: 0;width: 100%;
    span{
      display: block;text-align: center;color: #333;
    }
    .i1{font-size: 2.5rem;}
    .i2{font-size: 2rem;}
    .i3{font-size: 1.8rem;line-height: 3.5rem;}
  }

}
.mgn3rem{margin-bottom: 3rem;}
</style>
