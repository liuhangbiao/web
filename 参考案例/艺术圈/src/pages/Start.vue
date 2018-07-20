<template>
  <div class="start">
    <!-- <img class="bg-start" src="~img/start.jpg"> -->
    <img class="bg-start" :src="data.bgimg">
    <router-link :to="data.listRf[0]['url']" class="rf1">{{data.listRf[0]['text']}}&#160;<i class="icon-tiaozhuan2"></i></router-link>
    <div class="lr-box">
      <router-link :to="data.listRf[1]['url']" class="rf2 weui-btn">{{data.listRf[1]['text']}}</i></router-link>
      <router-link :to="data.listRf[2]['url']" class="rf3 weui-btn">{{data.listRf[2]['text']}}</i></router-link>
    </div>
  </div>
</template>

<script>
import {start} from 'js/config'
export default {
  name: 'start',
  data () {
    return {
      data:start
    }
  },
}
</script>
<!-- :style="img" -->
<style scoped lang="less">
.start{
  background: #f6f6f6;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
}
.bg-start{
  width:100%;height:auto;
  background-attachment: fixed;
}
.rf1{
  position: absolute;
  display: block;
  top:4.5rem;
  right:1.25rem;
  width:8.75rem;
  height:3.75rem;
  line-height:3.75rem;
  background:rgba(138,141,145,1);
  border-radius: 1.88rem ;
  font-size:2rem;
  font-family:HiraginoSansGB;
  color:rgba(255,255,255,1);
  border: 0.17rem solid #fff;
   animation:tiao 1s infinite;
  -webkit-animation:tiao 1s infinite; /*Safari and Chrome*/
}
.lr-box{
  position: absolute;;
  bottom: 9rem;
  text-align: center;
  width: 100%;
  z-index: 9
}
.rf2,.rf3{
  width: 80%;
  font-size:2.25rem;
  font-family:HiraginoSansGB;
  color:rgba(255,255,255,1);
  height:5.63rem;
  line-height: 5.36rem;
  background:rgba(27,27,27,1);
  border-radius: 2.81rem ; 
  box-shadow: 0.06rem  0rem 0.5rem rgba(27,27,27,0.55);
}
.rf3{
  background:rgba(255,255,255,1);
  color:rgba(27,27,27,1);
}

@-webkit-keyframes tiao {
  0% { right:1.35rem;opacity:0.8;}
  50% { right: 1.175rem; opacity:0.9;}
  100% { right: 1.05rem; opacity:1;}
}
@-moz-keyframes tiao {
  0% { right:1.35rem;opacity:0.8;}
  50% { right: 1.175rem; opacity:0.9;}
  100% { right: 1.05rem; opacity:1;}
}
@-ms-keyframes tiao {
  0% { right:1.35rem;opacity:0.8;}
  50% { right: 1.175rem; opacity:0.9;}
  100% { right: 1.05rem; opacity:1;}
}
@-o-keyframes tiao {
  0% { right:1.35rem;opacity:0.8;}
  50% { right: 1.175rem; opacity:0.9;}
  100% { right: 1.05rem; opacity:1;}
}
@keyframes tiao {
  0% { right:1.35rem;opacity:0.8;}
  50% { right: 1.175rem; opacity:0.9;}
  100% { right: 1.05rem; opacity:1;}
}
</style>
