<template>
  <!-- artist 艺术家 -->
  <div class="artist">
    <ul class="swiper-wrapper">
      <li class="swiper-slide" v-for="item in data">
        <div class="bg">&#160;</div>
        <div class="pic"><a :href="'#/artdd/'+item.id"><img :src="item.headimg" :alt="item.name" :onerror="nopic"></a></div>
        <div class="name">{{item.name}}</div>
        <div class="dd">
          {{item.introduce}}
          <!-- {{item.story}} -->
        </div>
        <div class="btnabox">
        <div class="art-btn">
          <a :href="'#/catlistquery?pageNo=1&pageSize=100&name='+item.name">艺术家作品</a>
        </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- artist 艺术家 end-->
</template>
<script>
import { Swiper } from "js/lib/swiper.min"
export default {
  props:['data','nopic'],
  updated:function(){
       var sp=new Swiper('.artist', {
            loop: true,
            slidesPerView: 1,
            // slidesPerView: 'auto',
            autoplay:true,//等同于以下设置
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 15,
            on: {
              slideChangeTransitionStart: function(){
                //  this.slides.each(function(i, e) {
                //     e.style.webkitTransform="scale(0.9)";
                //  })
                // this.slides[this.activeIndex].style.webkitTransform="scale(1)";
              },
            },
          });
  }
}
</script>
<!-- <style scoped src='less/swiper.min.css'></style> -->
<style scoped lang="less">
.artist{position:relative;padding:1rem;
  li{position:relative;border-radius:0.75rem;-webkit-box-shadow:0.1rem 0 2rem #ddd;-moz-box-shadow:0.1rem 0 2rem #ddd;box-shadow:0.1rem 0 2rem #ddd;padding:0 0 1rem 0;height:48rem;
    .bg{border-top-left-radius:0.75rem;border-top-right-radius:0.75rem;width:100%;overflow:hidden;height:14.38rem;background:url('~img/ys.png') center center;z-index:0}
    .pic{width:10rem;height:10rem;margin:0 auto;position:absolute;left:50%;margin-left:-5rem;top:8rem;border-radius:50%;overflow:hidden;
      img{width:100%}
      a{
        display: block;
      }
    }
    .dd{padding:1rem}
    .name{padding:5rem 0 1rem 0;text-align:center;font-size:1.75rem;font-family:HiraginoSansGB;color:rgba(0,0,0,1)}
    .dd{font-size:1.38rem;font-family:HiraginoSansGB;color:rgba(102,102,102,1);line-height:2.2rem}
    .btnabox{position:absolute;width:100%;bottom:2rem;text-align:center}
    .art-btn{width:16.25rem;height:4.5rem;margin:1rem auto;text-align:center;border-radius:2.25rem;-webkit-box-shadow:0.1rem 0 1rem #F98700;-moz-box-shadow:0.1rem 0 1rem #F98700;box-shadow:0.05rem 0 0.6rem #F98700;background-image:-webkit-linear-gradient(left,#f96900,#f98700);background-image:-moz-linear-gradient(left,#f96900,#f98700);background-image:-ms-linear-gradient(left,#f96900,#f98700);background-image:-o-linear-gradient(left,#f96900,#f98700);background-image:linear-gradient(left,#f96900,#f98700);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F96900',endColorstr='#F98700');
      a{color:#fff;font-size:2rem;font-family:HiraginoSansGB;line-height:4.5rem}
    }
  }
}
</style>
