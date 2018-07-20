<template>
  <div id="app" style="height:100%;overflow:auto">
      <router-view :key="key"/>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }
}
</script>
<style src="less/base.less">
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  animation:fadein 3s linear;
  -webkit-animation:fadein 3s linear; /*Safari and Chrome*/
}
/* 淡入 */
@-webkit-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@-moz-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@-ms-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
</style>