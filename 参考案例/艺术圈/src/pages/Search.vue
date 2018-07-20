<template>
  <div class="Search">
      <!-- 搜索 -->
       <!-- 搜索 -->
    <div class="weui-flex search-box">
          <onego></onego>
          <div class="weui-flex__item">
            <div class="placeholder search-ipt">
              <i class="icon-search"></i>
              <input type="text" v-model="key" placeholder="作品名称/艺术家/关键" @focus="searchInput()" @keyup.13="getSearch($event)">
              <a class="search-del" v-if="del" @click="searchClear()">取消</a>
            </div>
          </div>
    </div>
    <!-- 搜索 end-->
    <!-- tab -->
    <div class="stab" v-if="del">
      <a :class="{ton:son===0}" @click="son=0">艺术品</a>
      <a style="padding: 0 5rem"></a>
      <a :class="{ton:son===1}" @click="son=1">艺术家</a>
    </div>
    <!-- tab end-->
    <!-- 艺术品 -->
    <div class="sgood" v-if="son===0 && del===true">
      <div class="info">共<em v-if="goods.recordsFiltered">{{goods.recordsFiltered}}</em><em v-else>0</em>条结果</div>
      <div class="sbox" v-if="goods.recordsFiltered">
        <div class="item" v-for="item in goods.data">
          <div class="pic">
            <a :href="'#/goods/'+item.id" >
              <img :src="item.pictures" :alt="item.name" :onerror="nopic"/>
            </a>
          </div>
          <div class="desc">
            <span class="name">{{item.artistName|no}}</span>
            <span class="title"><a :href="'#/goods/'+item.id">{{item.name|no}}</a></span>
            <span class='size'>{{item.width|no}}x{{item.length|no}}&#160;cm</span>
            <span class="price">{{item.price|money('元')}}</span>
          </div>
        </div>
      </div>
      <div class="sbox" v-else>
        还没有艺术品！
      </div>
    </div>
    <!-- 艺术品 end-->
    <!-- 艺术家 -->
    <div class="sart" v-if="son===1 && del===true">
      <div class="info">共<em v-if="artcircle.recordsFiltered">{{artcircle.recordsFiltered}}</em><em v-else>0</em>条结果</div>
      <div class="sbox" v-if="artcircle.recordsFiltered">
        <div class="item" v-for="item in artcircle.data">
           <div class="pic">
            <a :href="'#/artdd/'+item.id" >
              <img :src="item.headimg" :alt="item.name" :onerror="nopic"/>
            </a>
          </div>
          <div class="desc">
            <span class="name"><a :href="'#/artdd/'+item.id" >{{item.name|no}}</a></span>
            <span class="count">共{{item.goodsCount|num}}件作品</span>
            <span class="dd">{{item.introduce|no}}</span>
          </div>
        </div>
      </div>
      <div class="sbox" v-else>
        还没有艺术家！
      </div>
    </div>
    <!-- 艺术家 end-->
    <!-- 历史记录 -->
     <div class="sinfo" v-if="!del">
       <div class="shd">人工智能搜索,试试这些词<a @click="aiOK">换一换</a></div>
       <div class="hbd">
         <!-- <a @click="tag('国家')">国家</a>
         <a @click="tag('张')">张</a>
         <a @click="tag('国画')">国画</a>
         <a @click="tag('成人')">成人</a>
         <a @click="tag('山水')">山水</a>
         <a @click="tag('国家')">国家</a>
         <a @click="tag('张')">张</a>
         <a @click="tag('国画')">国画</a>
         <a @click="tag('成人')">成人</a>
         <a @click="tag('山水')">山水</a> -->
         <a v-if="ai" v-for="item in ai" @click="tag(item)">{{item}}</a>
         <span  v-if="!ai">还没有热词哦,点击切换试试！</span>
       </div>
    </div>
    <div class="mgb2rem"></div>
    <div class="sinfo" v-if="!del">
       <div class="shd">搜索历史记录<a @click="clearSo">清除</a></div>
       <div class="sbd">
          <!-- <a v-if="hh" v-for="item in hh" @click="tag(item)"><i>x</i>{{item}}</a> -->
          <a v-if="hh" v-for="item in hh" @click="tag(item)">{{item}}</a>
          <a v-else>还没有哦,点击切换试试！</a>
         <!-- <a @click="tag('国画')"><i>x</i>国画</a> -->
       </div>
    </div>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Ser from "comps/catSearch.vue";
import {layer} from 'js/lib/layer'
import {nopic} from "js/config";
export default {
  name: 'Search',
  data () {
    return {
      nopic:nopic,
      key:'',
      del:false,
      goods:'',
      artcircle:'',
      son:0,
      ai:'',
      hh:''
    }
  },
  created: function() {
    var dd=sessionStorage.getItem('so')||'张,王,山水';
    var kk=dd.split(',').unique3().slice(-5);
    this.hh=kk;
  },
  methods: {
    searchInput(){
      this.del=true;
    },
    searchClear(){
      this.del=false
      this.key=''
      this.goods=''
      this.artcircle=''
    },
    getSearch(){
       if(this.key!==''){
         // console.log(dd,dd.split(','),dd.split(',').slice(-5))
          var dd=localStorage.getItem('so')||[],dd=(dd&&(dd+','+this.key))||this.key;
          // console.log(dd.split(',').removeNull())
          var kk=dd.split(',').removeNull().unique3().reverse().slice(-5);
          localStorage.setItem('so',kk)
          this.hh=kk;
          this.$store.dispatch('getGoodsOrArtist',{keyWords:this.key,type:1,pageNo:1,pageSize:12})
          this.$store.dispatch('getGoodsOrArtist',{keyWords:this.key,type:2,pageNo:1,pageSize:12})
        }else{
          layer.open({
              content:'你还没有输入！',
              skin: 'footer',
              time:3
          })
        }
    },
    tag(v){
        this.key=v;
        this.del=true;
        var dd=localStorage.getItem('so')||[],dd=(dd&&(dd+','+v))||v;
        var kk=dd.split(',').removeNull().unique3().reverse().slice(-5);
        localStorage.setItem('so',kk)
        this.hh=kk;
        this.$store.dispatch('getGoodsOrArtist',{keyWords:v,type:1,pageNo:1,pageSize:12})
        this.$store.dispatch('getGoodsOrArtist',{keyWords:v,type:2,pageNo:1,pageSize:12})
    },
    aiOK(){
      var data=['王','张','李','刘','山','水','国画'];
      this.ai=data.getRandomArrayElements(4);
    },
    clearSo(){
      localStorage.removeItem('so');
      this.hh=['张','王','山水']
    }
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getGoodsOrArtistAll','getGoodsOrArtistInfo1','getGoodsOrArtistInfo2'])
  },
  watch:{
    getGoodsOrArtistAll:function(v){
      // console.log(v)
    },
    getGoodsOrArtistInfo1:function(v){
      this.goods=v.result;
    },
    getGoodsOrArtistInfo2:function(v){
      this.artcircle=v.result;
    }
  },
  components: {
    Ser
  }
}
</script>
<!-- :style="img" -->
<style scoped lang="less">
.mgb2rem{margin-bottom: 2rem;}
.info{
  border-bottom: 1px solid #f6f6f6;
  padding-bottom:1rem;font-size: 1.2rem;color: #888;margin-bottom: 1rem;}
.stab{
  background: #fff;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  padding:0 1rem;
  a{
    display: inline-block;
    *display: inline;
    *zoom: 1;
    padding:1rem 0.3rem;
    /*margin: 0 4rem;*/
    color: #333;
    font-size: 1.4rem;
    border-bottom: 2px solid #fff;
  }
  .ton{
    border-bottom: 2px solid #333;
  }
}
.sart,.sgood{
  background: #fff;
  padding:1rem;
  position: relative;
  overflow: hidden;
  color: #666;
}
.sgood{
  .item{position: relative;overflow: hidden;margin-bottom: 1rem;border-bottom: 1px solid #f6f6f6;padding-bottom: 1rem;}
  .pic{
    position: relative;overflow: hidden;
    float: left;
    width: 40%;
    height: 10rem;
    border-radius:3px;
  }
  .desc{
    position: relative;overflow: hidden;float: right;width: 55%;padding-top: 0.5rem;
    span,a{
      display: block;
      line-height: 2rem;
      font-size: 1.4rem;
      color: #888;
      overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:80%;
    }
    .name{color: #333;}
    .price{
      color: #333;
      padding-top: 0.5rem;
    }
  }
}
.sart{
  .item{position: relative;overflow: hidden;}.item{position: relative;overflow: hidden;margin-bottom: 1rem;border-bottom: 1px solid #f6f6f6;padding-bottom: 1rem;}
  .pic{
    position: relative;overflow: hidden;
    float: left;
    width: 30%;
    height: 10rem;
    border-radius:50%;
  }
  .desc{
    position: relative;overflow: hidden;float: right;width: 65%;padding-top: 0.5rem;
    span{
      display: block;
      line-height: 2rem;
      font-size: 1.4rem;
      color: #888;
      /*overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:80%;*/
    }
    .name,a{color: #333;}
    .count{padding-bottom: 1rem;}
  }
}
.sinfo{
  background: #fff;padding: 0.3rem;position: relative;overflow: hidden;
  .shd{
    /*border-top: 1px solid #f6f6f6;*/
    border-bottom: 1px solid #f6f6f6;
    line-height: 3rem;padding:0 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    a{float: right;font-size: 1.3rem;color: #888;font-weight: normal;}
  }
  .sbd{
    position: relative;overflow: hidden;
    a{
      position: relative;overflow: hidden;
      display: block;
      line-height: 3rem;
      border-bottom: 1px solid #f6f6f6;
      text-indent: 1rem;font-size: 1.2rem;
      &:last-child{
        border: none;
      };
    }
    i{float: right;margin-right: 1rem;color: #fff;background: #ccc;text-align: center;height: 1.5rem;width: 1.5rem;border-radius:50%;text-indent: 0;margin-top: 0.7rem;line-height: 1.5rem;}
  }
  .hbd{
    position: relative;overflow: hidden;
    padding: 1rem;
    span{
      color: #888;
    }
    a{
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background: #f6f6f6;
      padding:0.5rem 1rem;
      border-radius:3px;
      text-align: center;
      margin:5px;
      font-size: 1.2rem;
  }
  }

}
.search-box{
  img{
    height: 4rem;
  }
  background: #fff;
  padding:1rem 2.5rem;
  box-shadow:0.1rem 0 1rem #ccc;
  .search-ipt{
    position: relative;
    margin: 0.4rem 0 0 0.8rem;
    padding:0.2rem;
    width:97%;
    height:3.2rem;
    background:rgba(242,243,246,1);
    border-radius: 1.88rem ;
  }
  .icon{
    font-size: 2rem;
    font-weight: bold;
    color: #888;
    padding-top:1.3rem;
  }
  .icon-search{
    position: absolute;
     top: 1rem;
     left: 1rem;
     font-size: 2rem;
     color:rgba(170,170,170,1);
  }
  .search-del{
    position: absolute;
     top: 0.5rem;
     right:1rem;
     font-size: 1.8rem;
     color:rgba(160,160,160,1);
    display: block;
    background: #fff;
    height: 2.6rem;
    line-height:2.6rem;
    padding:0rem 1rem;
    border-radius:3px;
  }
  input{
     background:rgba(242,243,246,1);
    text-indent: 2rem;
    border: 0;
    padding-top:0.2rem;
    position: absolute;
    left: 3rem;
    width: 75%;
    height: 3rem;
    font-size:1.75rem;
    font-family:HiraginoSansGB;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:rgba(170,170,170,1);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:rgba(170,170,170,1);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(170,170,170,1);
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:rgba(170,170,170,1);
  }
}
  .topbar{
    _position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding:0.4rem 0;
    .icon{
      position: absolute;
      left: 0.4rem;
      top: 1rem;
      color: #888;
      font-size: 2rem;
    }
    input{
      width: 75%;
      margin-left: 3rem;
      background: #f4f4f4;border: none;border-radius:3px;
      height: 3rem;line-height: 3rem;text-indent: 1rem;
      color: #888;
      font-size: 1.8rem;
    }
    a{
      position: absolute;
      right: 1rem;
      top: 0.7rem;
      color: #666;
      font-size: 2rem;
    }
  }
</style>
