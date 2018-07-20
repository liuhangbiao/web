<template>
  <div class="Home">
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
    <!-- 底部导航 end-->
    <!-- 搜索 -->
    <Search @search-data="getSearchData"></Search>
    <!-- 搜索 end-->
    <!-- Banner -->
    <!--PC首页===> //PC/APP==>1 (PC首页) 2 (PC藏艺术) 3 (PC藏艺术3d入口) -->
    <Banner class="banner" :data='banner1'></Banner>
    <!-- Banner -->
    <!-- 为你推荐 -->
    <div class="boxs" v-if="this.$store.state.home.recommend.recList">
      <div class="boxs-hd">
        为你推荐
      </div>
      <ul class="boxs-bd boxs-bd-list1">
        <li v-for="item in this.$store.state.home.recommend.recList">
          <a :href="'#/goods/'+item.id">
             <span class="pic">
               <img :src="item.pictures" :alt="item.artistName+'《'+item.name+'》'" :onerror="nopic"/>
             </span>
             <span class="title">{{item.artistName}}<em v-if="item.name">《{{item.name}}》</em></span>
              <span class="price">{{item.price|money('元')}}</span>
           </a>
        </li>
      </ul>
      <div class="clear">&#160;</div>
    </div>
    <!-- 为你推荐 end-->
    <!-- 热卖单品 -->
    <div class="boxs" v-if="this.$store.state.home.getbytags.taglist5.length">
      <div class="boxs-hd">
        热卖单品
      </div>
      <ul class="boxs-bd boxs-bd-list2">
        <!-- // 应该为taglist5 ==>通过标签查询：1（新作）、3(艺术野)、4(藏艺)、5（热卖单品） -->
        <li calss="clearfix" v-for="item in this.$store.state.home.getbytags.taglist5">
          <a :href="'#/goods/'+item.id">
            <div class="pic">
              <img :src="item.pictures" :alt="item.artistName+'《'+item.name+'》'" :onerror="nopic" />
            </div>
            <div class="des">
              <div class="desc">
                <span class="name">{{item.artistName|no}}</span>
                <span class="title">{{item.name}}</span>
                <span class="price">{{item.price|money}}</span>
                <span class="atten">关注度<em>{{item.collectnumber}}</em></span>
                <!-- <span class="atten">关注度<em>{{getGoodsByTag((item.id))}}</em></span> -->
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div class="clear">&#160;</div>
    </div>
    <!-- 热卖单品 end-->
    <!-- 新品推荐 -->
    <div class="boxs" v-if="this.$store.state.home.getbytags.taglist1.length">
      <div class="boxs-hd">
        新品推荐
      </div>
      <div class="boxs-bd boxs-bd-list3">
        <!-- 滚动 -->
        <ngoods class="ngoods" :data='this.$store.state.home.getbytags.taglist1' :ByTag="getGoodsByTag" :nopic="nopic"></ngoods>
        <!-- 滚动 end-->
      </div>
      <div class="clear">&#160;</div>
    </div>
    <!-- 新品推荐 end-->
    <!-- 艺术臻品 -->
    <div class="boxs">
      <div class="boxs-hd boxs-hd1">
        艺/术/臻/品
      </div>
      <div class="boxs-bd boxs-bd-list4">
        <!--PC藏艺术===> //PC/APP==>1 (PC首页) 2 (PC藏艺术) 3 (PC藏艺术3d入口) -->
        <Banner1 class="banner1" :data='this.$store.state.home.banner.list2'></Banner1>
        <div class="boxs-bd-list-hd"><em>VIP</em>专享，每周专家推荐</div>
        <ul class="boxs-bd-list-bd">
          <!-- <li v-for="item in this.$store.state.home.getbytags.taglist1"> -->
          <li v-for="item in this.$store.state.home.recommendc.list">
            <a :href="'#/goods/'+item.id">
             <span class="picimg">
                  <img :src="item.pictures" :alt="item.artistName+'《'+item.name+'》'" :onerror="nopic"/>
              </span>
             <span class="title">{{item.artistName}}<em>《{{item.name}}》</em></span>
              <span class="vipprice"><i class="icon-password">&#160;</i>{{item.price}}</span>
         </a>
          </li>
        </ul>
      </div>
      <div class="clear">&#160;</div>
    </div>
    <!-- 艺术臻品 end-->
    <!-- 艺术之星 -->
    <div class="boxs mgb5rem">
      <div class="boxs-hd boxs-hd1">
        艺/术/之/星
      </div>
      <div class="boxs-bd boxs-bd-list5">
        <Artist class="artist-box" :data='this.$store.state.artist.artist.list' :nopic="nopic"></Artist>
        <span class="artist-more"><a href="#/artmore">认识更多艺术家></a></span>
      </div>
      <div class="clear">&#160;</div>
    </div>
    <!-- 艺术之星 end-->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue";
import Search from "comps/Search.vue";
import Banner from "comps/Banner.vue";
import Banner1 from "comps/Banner1.vue";
import ngoods from "comps/newGoods.vue";
import Artist from "comps/Artist.vue";
import { banner, newgoods, artist } from "js/config"
import { home } from '@/assets/js/api'
export default {
  name: 'Home',
  data() {
    return {
      nopic: 'this.src="' + require('img/list1.png') + '"',
      bannerList: banner,
      newGoodsList: newgoods,
      artistList: artist,
      banner1:''
    }
  },
  beforeCreate: function() {
    // console.log('beforeCreate')
  },
  created: function() {
    //banner
    //PC/APP==>1 (PC首页) 2 (PC藏艺术) 3 (PC藏艺术3d入口)
    this.$store.dispatch('getBanner', { category: 'APP', value: '1' });
    this.$store.dispatch('getBanner', { category: 'APP', value: '2' });
    //为你推荐
    this.$store.dispatch('getRecommend', { pageNo: 1, pageSize: 4 });
    //通过标签查询：1（新作）、3(艺术野)、4(藏艺)、5（热卖单品）
    this.$store.dispatch('getByTag', { tagid: 1, pageNo: 1, pageSize: 4 });
    this.$store.dispatch('getByTag', { tagid: 3, pageNo: 1, pageSize: 4 });
    this.$store.dispatch('getByTag', { tagid: 4, pageNo: 1, pageSize: 4 });
    this.$store.dispatch('getByTag', { tagid: 5, pageNo: 1, pageSize: 4 });
    //每周专家推荐
    // this.$store.dispatch('getCollect', { pageNo: 1, pageSize: 2 });
    this.$store.dispatch('getRecommendc', { pageNo: 1, pageSize: 2 });
    //滚动艺术家
    this.$store.dispatch('getArtist', { pageNo: 1, pageSize: 6 });
    // console.log('created')
  },
  beforeMount: function() {
    // console.log('beforeMount')
  },
  mounted: function() {
    // console.log(this.$store.state.home.todos)
    // console.log(this.$store.state.home.banner)
    // this.$nextTick(function () {
    //        this.cartView();
    //  })
  },
  updated: function() {
    // console.log('updated')
  },
  computed: {
    ...mapState({
      bannerlist1: state => state.home.banner.list1,
      bannerlist2: state => state.home.banner.list2,
      recList: state => state.home.recommend.recList,
      bb: state => state.home.getbytags.bb,
      taglist: state => state.home.getbytags.taglist,
      taglist1: state => state.home.getbytags.taglist1,
      taglist3: state => state.home.getbytags.taglist3,
      taglist4: state => state.home.getbytags.taglist4,
      taglist5: state => state.home.getbytags.taglist5,
      getGoodsByTag: (state, getters) => (id) => getters.getGoodsByTag(id)
    }),
    ...mapGetters([
      'getBannerInfo'
    ]),
  },
  methods: {
    getSearchData(v) {
      // console.log(v)
    }
  },
  filters: {
    formatMoney: function(value) {
      // return "￥"+value.toFixed(2)
      return "￥" + value
    },
    no: function(v) {
      if (!v) {
        return '未知'
      } else {
        return v;
      }
    }
  },
  watch: {
    'searchTxt': function(v) {
      console.log(v)
    },
    'bannerlist1':function(v){
      if(v.length){
        // console.log(v)
        this.banner1=v
      }
    },
    'recList':function(d){
      // console.log(d)
    },
    'getBannerInfo': function(d) {
    }
  },
  components: {
    Tabbar,
    Search,
    Banner,
    Banner1,
    ngoods,
    Artist
  }
}
</script>
<style scoped lang="less">
.Home{background:#fff;min-height:100%;}
.banner{margin-bottom:1rem;border-radius:5px;}
.banner1{position:relative;width:100%;overflow:hidden;max-height:26rem;}
.ngoods{margin-bottom:1rem;border-radius:5px;}
.boxs{border-top:1.1rem solid #f6f6f6;padding:1rem 0;margin-bottom:1rem;
  .boxs-hd{height:2.2rem;line-height:2.2rem;font-size:2.25rem;font-family:HiraginoSansGB;color:rgba(27,27,27,1);text-indent:1.6rem;border-left:0.4rem solid #1b1b1b;}
  .boxs-hd1{border:0;text-align:center;line-height:3rem;}
}
.boxs-bd{position:relative;display:block;padding:0.8rem;}
/*推荐*/
.boxs-bd-list1{li{width:50%;float:left;overflow:hidden;margin-bottom:1rem;
    a{display:block;padding:0.5rem;}
    span{display:block;text-indent:1rem;font-size:1.5rem;line-height:1.8rem;white-space:nowrap;text-overflow:ellipsis;}
    .pic{position:relative;overflow:hidden;border-radius:5px;      /*max-height:10rem;*/      /*min-height:7rem;*/
    height:16rem;text-indent:0;text-align:center;}
    img{box-shadow:1px 0 1.5rem #eee;}
    .title{padding-top:0.8rem;font-family:HiraginoSansGB;color:rgba(27,27,27,1);
      em{color:#666;}
    }
    .price{font-family:Roboto-Regular;color:rgba(249,115,0,1);}
    &:hover{opacity:.8;filter:alpha(opacity=80);}
  ;}
}
/*热卖单品*/
.boxs-bd-list2{border-radius:0.75rem;box-shadow:1px 0 1.5rem #eee;margin:1.5rem;
  li{padding:1.4rem 0;    /*height: 12.5rem;*/border-bottom:1px solid #f6f6f6;overflow:hidden;
    .pic{position:relative;float:left;height:12rem;overflow:hidden;border-radius:5px;      /*width: 16.25rem;*/width:40%;      /*margin-right: -16.25rem;*/margin-right:-40%;
      img{box-shadow:1px 0 1.5rem #eee;border-radius:5px;width:100%;        /*height: 100%;*/}
    }
    .des{float:right;width:100%;
      .desc{position:relative;        /*margin-left: 17rem;*/margin-left:42%;        /*padding-top: 1.75rem;*/padding-top:0.2rem;
        span{display:block;          /*line-height: 3rem;*/line-height:2.7rem;font-size:1.75rem;}
        .name{font-family:HiraginoSansGB;color:rgba(27,27,27,1);line-height:2rem;}
        .title{font-family:HiraginoSansGB;color:rgba(102,102,102,1);white-space:nowrap;text-overflow:ellipsis;}
        .price{font-family:Roboto-Regular;color:rgba(51,51,51,1);}
        .atten{position:absolute;top:35%;text-align:center;right:0rem;font-size:1.5rem;font-family:HiraginoSansGB;color:rgba(153,153,153,1);line-height:1.7rem;
          em{display:block;}
        }
      }
    }
    &:last-child{border-bottom:0;}
    ;
    &:nth-child(1n){.atten em{color:#EF3C38}
    }
    &:nth-child(2n){.atten em{color:#F97300;}
    }
    &:nth-child(3n){.atten em{color:#2DBDEC;}
    }
    &:nth-child(4n){.atten em{color:#2FC6AF;}
    }
  }
}
.boxs-bd-list3{margin:0;overflow:hidden;width:100%;padding:2rem 0 0 0;}
.boxs-bd-list4{padding:2rem 0;
  .pic{img{width:100%;margin:0 auto;
      &:hover{opacity:.8;filter:alpha(opacity=80);}
    ;}
  }
  .boxs-bd-list-hd{padding:0 2rem;font-size:2rem;line-height:4rem;font-family:HiraginoSansGB;color:rgba(249,115,0,1);
    em{font-family:Roboto-Medium;}
  }
  .boxs-bd-list-bd{padding:0 1rem;
    li{width:50%;float:left;overflow:hidden;margin-bottom:1rem;
      a{display:block;padding:0.5rem;}
      span{display:block;line-height:2rem;text-indent:1rem;font-size:1.5rem;white-space:nowrap;text-overflow:ellipsis;text-align:center;}
      .picimg{height:15rem;overflow:hidden;position:relative;border-radius:5px;
        img{box-shadow:1px 0 1.5rem #eee;border-radius:5px;min-height: 100%;width: 100%;}
      }
      .title{font-family:HiraginoSansGB;color:rgba(27,27,27,1);padding-top:0.8rem;
        em{color:#666;}
      }
      .price{font-family:Roboto-Regular;color:rgba(249,115,0,1);}
      .vipprice{color:rgba(102,102,102,1);}
      &:hover{opacity:.8;filter:alpha(opacity=80);}
    ;}
  }
}
.boxs-bd-list5{margin:1.5rem 3rem;padding:0;overflow:hidden;
  .pic{width:10rem;height:10rem;overflow:hidden;position:relative;border-radius:50%;
    img{width:100%;border-radius:50%}
  }
  .artist-more{text-align:center;display:block;padding-top:2rem;
    a{font-size:1.5rem;font-family:HiraginoSansGB;color:rgba(136,136,136,1);}
  }
}
.mgb5rem{margin-bottom:5rem;}
</style>
