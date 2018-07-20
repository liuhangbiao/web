<template>
<div class="Artdd">
    <div class="banner">
        <div class="info"> <a @click="goone" class="icon-tiaozhuan fl">&#160;</a>
            <a href="#" class="icon-fenxiang fr">&#160;</a>
        </div>
        <div class="pic">
            <img :src="artinfo.headimg" :alt="artinfo.name">
        </div>
        <div class="name" v-text="artinfo.name"></div>
        <div class="like" @click="like(artinfo.id)"><a><i class="icon-love1xxx" :class="{'icon-love1':artinfo.isLiked==='NO','icon-love2':artinfo.isLiked==='YES'}">&#160;</i><em>喜欢</em><em v-text="artinfo.beLiked">10</em></a>
        </div>
    </div>
    <div class="bartab"> <a @click="tabFun(2)" :class="{bton:atab===2}">作品<em v-text="artinfo.goodsCount">5</em><i>&#160;</i></a>
        <a @click="tabFun(1)" :class="{bton:atab===1}">关注<em>3</em><i>&#160;</i></a>
        <a @click="tabFun(0)" :class="{bton:atab===0}">关于TA<em>&#160;</em><i>&#160;</i></a>
    </div>
    <div class="barbox barbox0" v-if="atab===0">
        <p v-html="no(artstory)"></p>
    </div>
    <div class="barbox barbox1" v-if="atab===1">
      <ul>
          <li>
            <div class="pic">
              <!-- <a href="#">  <img src="../assets/img/list1.png"></a> -->
            </div>
            <div class="desc">
              <span class="title">模块暂时未开放</span>
              <!-- <span class="title">山水·可居者也</span> -->
              <!-- <span class="info">话题 <em>1598</em> 关注 <em>2984</em></span> -->
            </div>
          </li>
      </ul>
    </div>
    <div class="barbox barbox2" v-if="atab===2">
        <ul>
            <li v-for="item in artgood">
                <div class="pic">
                    <a :href="'#/goods/'+item.id">
                        <img :src="item.pictures" :alt="item.name">
                    </a>
                </div> <span class="name" v-text="item.artistName">夏侯仪</span>
                <span class="title" v-text="item.name">酒后的芬芳</span>
                <span class="dd"><em v-text="item.categoryName"></em>&#160;&#160;<em v-text="no(item.width)"></em>x<em v-text="no(item.length)"></em>cm</span>
                <span class="price" v-text="formatMoney(item.price)"></span>
                <span class="info">
                 <a><i class="icon-liulan2"></i><em v-text="item.viewnumber">210</em>浏览</a>
                 <a><i class="icon-love2"></i><em v-text="item.collectnumber">16</em>喜欢</a>
               </span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import {layer} from 'js/lib/layer'
export default {
  name: 'Artdd',
  data () {
    return {
      msg: 'Welcome to Your 艺术家',
      atab:0,
      artinfo:'',
      artgood:'',
      artstory:''
    }
  },
   created: function() {
    var id=this.$route.params.id;
    // var query=this.$route.query;
    //艺术家信息
    this.$store.dispatch('getArtistid',{id:id})

  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getArtistidInfo','getGoodsInfo','putLikeInfo'])
  },
  mounted(){
  },
  methods: {
    goone(){
      this.$router.go(-1)
    },
    tabFun(v) {
      this.atab=v;
    },
    no(v){
      if(!v || v==='' || v==='undefined') return '未知';
      return v;
    },
    formatMoney: function(value) {
      // return "￥"+value.toFixed(2)
      return "￥" + value
    },
    like(id){
      this.$store.dispatch('putLike',{id:id,token:sessionStorage.getItem('ukey')})
    }
  },
  filter:{
  },
  watch:{
    getArtistidInfo:function(v){
      if(v && v.code==="200")
      this.artinfo=v.result;
    // console.log(JSON.parse(v.result.story)[0])
      this.artstory=JSON.parse(v.result.story)[0]['content']||JSON.parse(v.result.story)[0]['time']||'无';
      //艺术家作品
      this.$store.dispatch('getGoods',{name:v.result.name,pageNo:1,pageSize:20});
    },
    getGoodsInfo(v){
      if(v && v.code==="200"){
        this.artgood=v.result.data;
      }
    },
    putLikeInfo(v){
      if(v && v.code==="200"){
       layer.open({
          content:v.message||'未知信息',
          skin:'footer'
       })}else{
        this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
       }
    }
  }

}
</script>
<style lang="less" scoped>
.Artdd{.banner{text-align:center;position:relative;padding:2rem 0;height:24rem;background:#999aa0;
    .info{overflow:hidden;padding:0 2rem;
      a{font-weight:bold;color:#fff;}
    font-size:2rem;}
    .pic{margin:0 auto;width:12rem;height:12rem;position:relative;overflow:hidden;border-radius:50%;background:#fff;border:3px solid #fff;
      img{width:100%;}
    }
    .name{font-size:2.4rem;color:#fff;padding-top:1rem;line-height:2.5rem}
    .like{padding-top:1rem;line-height:2.5rem;position:relative;
      a{display:block;
        /*height:3.7em;*/
        /*padding-top: 2rem;*/
        width:12rem;background:#fff;margin:0 auto;border-radius:20px;
        line-height:3.7rem;
        position:relative;}
      i{font-size:1.8rem;color:#666;color:#EF5350;padding-top:2rem;}
      em{font-size:1.7rem;color:#666;padding-right:1rem}
    }
  }
  .bartab{height:6rem;background:#fff;position:relative;width:100%;border-bottom:1px solid #eee;
    a{display:inline-block;*display:inline;*zoom:1;float:left;width:33%;text-align:center;line-height:5.5rem;color:#666;font-size:2rem;
      em{color:#888;font-size:1.4rem;padding:0 0.4rem;}
      i{display:none;}
    }
    .bton{color:#F97300;
      i{display:block;width:50%;margin:0 auto;height:2px;background:#F97300;}
    }
  }
  .barbox{position:relative;}
  .barbox0{padding:4rem 3rem;color:#666;font-size:1.7rem;line-height:3rem;background:#fff;}
  .barbox1{
    background: #fff;
    ul{display:block;overflow:hidden;width:100%;position:relative;}
    li{
      position: relative;overflow: hidden;padding-top: 1.4rem;
      .pic{
        position: absolute;left: 0;top: 1rem;
        float: left;width: 5.7rem;height: 5.7rem;overflow: hidden;border: 1.5rem solid #fff;
      }
      .desc{
        margin-left: 9rem;border-bottom: 1px solid #eee;height: 6.5rem;padding-top: 1rem;
        .title{
          display: block;
          font-size: 2rem;color: #1B1B1B;line-height: 2.8rem;
        }
        .info{
          font-size: 1.57rem;color: #888;line-height: 2rem;
        }
      }
      .tag{
        position: absolute;right: 1rem;top: 3rem;font-size: 1.8rem;color: #999;
        i{padding-right: 0.3rem;}
      }
    }
  }
  .barbox2{ul{display:block;overflow:hidden;width:100%;position:relative;}
    li{position:relative;overflow:hidden;background:#fff;margin-bottom:2rem;padding:3rem 5rem;text-align:center;
      .pic{position:relative;overflow:hidden;width:100%;
        img{width:100%;}
      }
      span{color:#333;font-size:1.7rem;display:block;}
      .name{padding-top:1rem;}
      .dd{padding-bottom:1rem;color:#888;}
      .price{font-size:2.2rem;color:#1B1B1B;line-height:3rem;}
      .info{padding-top:1rem;
        a{font-size:1.4rem;color:#888;
          i{padding:0 0.3rem 0 1rem;}
        }
      }
    }
  }
}
</style>
