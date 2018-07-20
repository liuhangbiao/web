<template>
  <div class="Catlist">
    <!-- 搜索 -->
    <div class="searchCat" v-if="sctag!=''">
        <router-link to="/catscreen" class="icon icon-tiaozhuan fl"></router-link>
        <div class="sctag fl">
            <a v-for="(item,index) in sctag" v-if="index<2" @click="rmscTag(item)">{{item}}<i class="icon-close1">&#160;</i></a>
          <!-- <textarea name="xxx"></textarea> -->
        </div>
        <a class="icon icon-search fr"></a>
    </div>
    <div class="searchCat" v-else>
       <!-- 搜索 -->
        <Search @search-data="getSearchData"></Search>
        <!-- 搜索 end--> 
    </div>
    <!-- 搜索 end-->
    <!-- 瀑布流 -->
     <div class="falls" id="falls">
        <ul id="BoxLeft">
        </ul>
        <ul id="BoxRight" >
        </ul>
    </div>
    <!-- 瀑布流 end-->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Search from "comps/catSearch.vue";
import { catls } from "js/config";
export default {
  name: 'Catlist',
  data() {
    return {
      data:catls,
      sctag:[],
       nopic: 'this.src="' + require('img/list1.png') + '"',
    }
  },
  created: function() {
    let id=this.$route.params.id;
     this.$store.dispatch('getGoods',{categoryid:id,pageNo:1,pageSize:100});
    // this.sctag(this.$route.params.data)
    // console.log(this.$route.params.data)
    var dd=this.$route.params.data||[],sctag=[];
    for (var i = 0; i < dd.length; i++) {
      sctag.push(dd[i])
    }
    this.sctag=sctag;
  },
  mounted: function() {
    this.$nextTick(function () {
      this.falls()
    })
  },
   computed: {
    ...mapState({
      goodlist: state => this.$store.state.good.goods.list
    }),
  ...mapGetters([
      'getGoodsInfo'
    ]),
  },
  methods: {
    getSearchData(v) {
      console.log(v)
    },
    falls(){
      // console.log(data);
      document.getElementById('BoxLeft').innerHTML='';
      document.getElementById('BoxRight').innerHTML='';
      var that=this,data111=this.data,data=this.$store.state.good.goods.list;
      // console.log(data)
      for(var i=0;i<data.length;i++){
          var glh=this.getHeight('BoxLeft'),grh=this.getHeight('BoxRight');
          var str=[
                  '<li style="background:#fff;margin-bottom:1rem">',
                    '<div class="pic"><a href="#/goods/'+data[i].id+'"  style="display:block"><img style="width:100%" src="'+data[i].pictures+'"></a></div>',
                    '<div style="padding:1rem;color:#333;font-size:1.5rem;line-height:2.4rem">',
                    '<div class="name">'+data[i].artistName+'</div>',
                    '<div class="title">'+data[i].name+'</div>',
                    '<div class="details" style="color:#888888">'+data[i].categoryName+' '+data[i].width+'*'+data[i].length+'cm</div>',
                    '<div class="price" style="color:#F97300;font-size:1.8rem;padding-top:0.8rem">￥'+data[i].price+'</div>',
                    '<div>',
                  '</li>'
                ].join("");
            if(glh<grh){
              document.getElementById('BoxLeft').innerHTML+=str;
            }else{
              document.getElementById('BoxRight').innerHTML+=str;
            }
      }
    },
    getHeight(id){
      return document.getElementById(id).offsetHeight;
    },
    rmscTag(v){
      this.sctag = this.sctag.filter(t => t != v)
    },
  },
  watch: {
    'getGoodsInfo':function(v){
        if(v.code==="200"){
          // this.falls(v.result.data);
          this.falls();
        }
      // console.log(v)
    }
  },
  components: {
    Search
  }
}
</script>
<style scoped lang="less">
.Catlist { background: #F2F2F2; min-height: 100%; overflow: hidden;
 }
.mgb5rem { margin-bottom: 5rem; }

.searchCat{
  height:5.5rem;
  /*line-height:5.5rem;*/
  background:rgba(255,255,255,1);
  box-shadow: 1px 0 1.5rem #eee;
  .icon{
    color: #1b1b1b;
    font-size: 2rem;
    text-align: center;
    line-height: 5.5rem;
    /*padding: 0 2%;*/
   /*margin-left: 2%;*/
    font-weight: bold;
  }
  .icon-search{float: right;color: #aaa;margin-right: 3%;}
}
.falls{
    overflow: hidden;
    padding:0.8rem;
}
.falls ul{
    position: relative;
    overflow: hidden;
    width:49%;
    float: left;
    li{
      background: #090;
      a{position: relative;display: block;}
      .pic{
        position: relative;
        img{
          width: 100%;
        }
      }
    }
}
.falls ul:last-child{
    margin-left:2%;
}
 .sctag {
    text-align: center;
    width: 80%;
    overflow: hidden;
    padding-top:1rem;
    position: absolute;
    a { position: relative; display: inline-block; *display: inline; *zoom: 1;      /*float: left;*/ background: rgba(189, 189, 189, 1); border-radius: 0.25rem; font-size: 1.75rem; font-family: HiraginoSansGB; color: rgba(255, 255, 255, 1); margin-right: 0.5rem; margin-bottom: 0.5rem; padding: 0.6rem 0.1rem 0.6rem 1.2rem;
    }
  }
</style>
