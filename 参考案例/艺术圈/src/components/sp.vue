<template>
    <!-- banner -->
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in spList">
          <a :href="item.sourse_url">
          <img :src="item.picture_url" :alt="item.name">
          </a>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
    <!-- banner end-->
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {Swiper} from "js/lib/swiper.min"
export default {
  created: function() {
    this.$store.dispatch('getBanner',{category:'APP',value:'1'});
  },
   computed:{
    ...mapState({
        spList:state => state.home.banner.bannerList
    })
  },
  mounted:function(){
       var sp=new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
            slidesPerView: 1.2,
            autoplay:true,//等同于以下设置
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 0,
            on: {
              slideChangeTransitionStart: function(){
                 this.slides.each(function(i, e) {
                    e.style.webkitTransform="scale(0.9)";
                 })
                this.slides[this.activeIndex].style.webkitTransform="scale(1)";
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

