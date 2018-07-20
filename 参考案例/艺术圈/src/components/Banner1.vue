<template>
    <!-- banner -->
<div class="swiper-containerxx">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data">
        <div class="pic">
          <a :href="item.sourse_url">
          <img :src="item.picture_url" :alt="item.name">
          </a>
        </div>
        </div>
    </div>
</div>
    <!-- banner end-->
</template>
<script>
import {Swiper} from "js/lib/swiper.min"
export default {
  props:['data'],
  updated:function(){
       var sp=new Swiper('.swiper-containerxx', {
               loop: true,
            slidesPerView: 0,
            centeredSlides: true,
            spaceBetween: 0,
            autoplay:true,//等同于以下设置
        })
  }
 }
</script>
<style   src='less/swiper.min.css'></style>
<style scoped lang="less">
.swiper-containerxx{
  color: #888;
  width: 100%;
  overflow: hidden;
  position: relative;
  .pic{
      display: block;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        width: 100%;
        overflow: hidden;
        img{
          margin: 0 auto;
          border-radius:5px;
          max-width:100%;
          box-shadow: 1px 0 1.5rem #eee;
        }
  }
  /*padding:0.2rem 0;*/
/*  img{
    text-align: center;
    margin: 0 auto;
    width: 100%;
    box-shadow: 1px 0 1.5rem #eee;
  }*/
}
</style>

