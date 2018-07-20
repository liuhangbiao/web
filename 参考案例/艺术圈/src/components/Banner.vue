<template>
    <!-- banner -->
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data">
          <a :href="item.sourse_url">
          <img :src="item.picture_url" :alt="item.name">
          </a>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
<!--     <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
</div>
    <!-- banner end-->
</template>
<script>
import {Swiper} from "js/lib/swiper.min"
export default {
  props:['data'],
  updated:function(){
       var sp=new Swiper('.swiper-container', {
            loop: true,
            // autoHeight: true, //高度随内容变化
            pagination: {
              el: '.swiper-pagination',
            },
            slidesPerView: 1.2,
            autoplay:true,//等同于以下设置
             // slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 0,
            on: {
              slideChangeTransitionStart: function(){
                // console.log(this)
                // this.zoom.scale=1.2;
                // console.log(this,this.activeIndex,this.width)
                // console.log(parseInt(this.slides[this.activeIndex].style.width.slice(0,3)))
                // var picw=parseInt(this.slides[this.activeIndex].style.width.slice(0,3));
                 this.slides.each(function(i, e) {
                    e.style.webkitTransform="scale(0.9)";
                    // console.log(e)
                    // e.style.width=(picw-20)+"px";
                 })
                this.slides[this.activeIndex].style.webkitTransform="scale(1)";
                // this.slides[this.activeIndex].style.width=parseInt(picw+20)+"px";
                // console.log(this.width*1.0005)
                 // this.slides[this.activeIndex].className='zoomPic swiper-slide';
                // console.log(this.activeIndex);
                 // this.slides.each(function(i, e) {
                   // e.style.width=(e.style.width)*0.9
                   // e.style.width="80%"
                    // let imgList=e.getElementsByTagName('img');
                    // imgList[0].style.height="90%"
                    // console.log(imgList[0])
                 // });
                 // let thatimg=this.slides[this.activeIndex];
                 // thatimg.getElementsByTagName('img')[0].style.width=(thatimg.getElementsByTagName('img')[0].style.width)*0.7;
                // this.slides[this.activeIndex].style.width=(this.slides[this.activeIndex].style.width)*1.2;
                // console.log(this.slides[this.activeIndex])
              },
            },
          })
        .pagination.bullets.css('background','#fff').css('width','2.5rem').css('height','0.5rem').css('border-radius','3px');
  }
}
</script>
<style   src='less/swiper.min.css'></style>
<style scoped lang="less">
.swiper-container {
  color: #888;
  width: 100%;
  overflow: hidden;
  padding:0.2rem 0;
  img{
    text-align: center;
    margin: 0 auto;
    width: 100%;
    border-radius:8px;
    box-shadow: 1px 0 1.5rem #eee;
  }
}
.swiper-pagination{
  bottom: 1rem;
}
.zoomPic img{height: 80%;}
</style>

