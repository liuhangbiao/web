<template>
  <div class="Quan">
    <!-- topbar -->
    <div class="weui-flex quanbar">
      <div class="weui-flex__item">
        <a class="icon-tiaozhuan fl" href="#/my"></a>
        <a>代金券</a>
      </div>
    </div>
    <!-- list -->
   <div class="quanbox">
     
   </div>
    <!-- <div class="mgb5rem">&#160;</div> -->
  </div>
</template>
<script>
export default {
  name: 'Quan',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
    // console.log(Mock);
    // console.log('ssss');
  },
  methods: {},
  watch: {
  }
}
</script>
<style scoped lang="less">
.quanbar {
  background: #fff;
  text-align: center;
  height: 5rem;
  box-shadow: 0.1rem 0 1rem #ccc;
  a {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    line-height: 5rem;
    font-size: 2rem;
    font-family: HiraginoSansGB;
    color: #1b1b1b;
    margin: 0 1rem;
  }
  .icon {
    font-weight: bold;
  }
  .weui-flex__item {
    padding: 0 1rem
  }
}
.mgb5rem {
  margin-bottom: 5rem;
}
.quanbox{
  padding: 1rem;
  .qpic{
    
  }
}
</style>
