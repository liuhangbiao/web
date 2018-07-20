<template>
  <div class="Hd">
  <div class="topbar">互动<onego class="arr"></onego></div>
   <iframe src="http://192.168.13.155:8091/"></iframe>
  </div>
</template>
<script>
export default {
  name: 'Hd',
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
  }
}
</script>
<style scoped lang="less">
.Hd{
  position: relative;overflow: hidden;height: 100%;
  iframe{
    position: relative;width: 100%;height:100%
  }
  .arr{
    position: absolute;left:1.5rem;top: 2.5rem;z-index: 99;
  }
}
.topbar{position: absolute;left: 0;top: 0;z-index: 99;width: 100%;background: #fff;height: 6rem;text-align: center;font-size: 2.5rem;color: #1b1b1b;line-height:6rem;padding-left: -2rem;}
</style>
