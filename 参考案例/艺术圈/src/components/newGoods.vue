<template>
    <!-- banner -->
<div class="swiper-container1">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in data">
          <a :href="'#/goods/'+item.id">
          <span class="pic">
             <img :src="item.pictures" :alt="item.artistName+'《'+item.name+'》'" :onerror="nopic"/>
          </span>
          </a>
          <div class="dd">
              <span class="name">{{item.artistName|no}}</span>
              <span class="title">{{item.name}}</span>
              <span class="price">{{item.price|formatMoney}}</span>
          </div>
        </div>
    </div>
    <div class="swpinfo" id="swpinfo"></div>
</div>
    <!-- banner end-->
</template>
<script>
import {Swiper} from "js/lib/swiper.min"
export default {
  props:['data','ByTag','nopic'],
  updated:function(){
       var sp=new Swiper('.swiper-container1', {
            loop: true,
            slidesPerView: 1.2,
            centeredSlides: true,
            // height:300,
            spaceBetween: 0,
            autoplay:true,//等同于以下设置
            on: {
              // slideChangeTransitionStart: function(){
              slideChange: function(){
                let sd=document.getElementById('swpinfo');
                // console.log(this.slides)
                let idx=(this.activeIndex==0||this.activeIndex==(parseInt(this.slides.length)-1))?1:this.activeIndex;
                sd.innerHTML=idx+"/"+(parseInt(this.slides.length)-2)
                 this.slides.each(function(i, e) {
                    e.style.webkitTransform="scale(0.9)";
                    e.getElementsByClassName('dd')[0].style.display='none';
                 })
                this.slides[this.activeIndex].style.webkitTransform="scale(1)";
                // this.slides[this.activeIndex].getElementsByClassName('dd')[0].style.display='block';
                // console.log( this.slides[this.activeIndex].getElementsByClassName('dd')[0].style.display='block')
              },
            },
          })
  },
    filters:{
    formatMoney:function (value) {
        // return "￥"+value.toFixed(2)
        return "￥"+parseInt(value).toFixed(2)
    },
    no:function(v){
      if(!v){
        return '未知'
      }else{
        return v;
      }
    }
  },
}
</script>
<style   src='less/swiper.min.css'></style>
<style scoped lang="less">
.swiper-container1 {
  position: relative;
  color: #888;
  width: 100%;
  padding:0;
  overflow: hidden;
  .pic{
      display: block;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        height: 26rem;
        width: 100%;
        overflow: hidden;
        img{
          margin: 0 auto;
          border-radius:5px;
          max-width:100%;
          box-shadow: 1px 0 1.5rem #eee;
        }
  }
/*  img{
    text-align: center;
    margin: 0 auto;
    width: 100%;
    border-radius:5px;
    box-shadow: 1px 0 1.5rem #eee;
  }*/
  .dd{
    display: none;
    position: absolute;
    bottom: -1px;
    z-index: 9;
    width: 100%;
    background: #fff;
    padding: 1rem 0;
     box-shadow: 1px 0 1.5rem #eee;
    span{
      display: block;
      text-align: center;
      font-size:1.75rem;
      line-height: 2.5rem;
      font-family:HiraginoSansGB;
      color:rgba(102,102,102,1);
    }
    .name{
      color: #1B1B1B;
    }
    .price{
      color: #F97300;
    }
  }
}

.swpinfo{
  position: relative;
  display: block;
  width: 100%;
  height: 4rem;
  color: #555;
  font-size: 1.7rem;
  line-height: 4rem;
  text-align: center;
}
</style>

