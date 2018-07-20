<template>
  <div class="Cat">
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
    <!-- 底部导航 end-->
    <!-- 搜索 -->
    <Search @search-data="getSearchData"></Search>
    <!-- 搜索 end-->
    <div class="title">{{data.title}}</div>
    <div class="cat-more">
      <a :href="data.tolink[0]"><i :class="data.tolink[1]"></i>{{data.tolink[2]}}<i :class="data.tolink[3]">&#160;</i></a>
    </div>
    <!-- list -->
    <div class="mgb5rem">&#160;</div>
  <!-- 结构 -->
  <div class="cat-list2">
    <div  v-for="(item,index) in catlist"  class="cat-list-item"><div class="pic"><a :href="'#/catlist/'+item.id"><img :src="npimg(item.pictureUrl)" :alt="item.name" :onerror="nopic"><span>{{item.name}}</span></a></div></div>
  </div>
<!-- {{catitem1}} -->
<div class="cat-list2">
   <div class="cat-title" >风格</div>
    <div  v-for="(item,index) in catitem1"  class="cat-list-item"><div class="pic"><a :href="'#/catlistquery?pageNo=1&pageSize=100&styleid='+item.id"><img :src="item.pictureUrl" :alt="item.name" :onerror="nopic"><span>{{item.name}}</span></a></div></div>
  </div>
<div class="cat-list2">
   <div class="cat-title" >题材</div>
    <div  v-for="(item,index) in catitem2"  class="cat-list-item"><div class="pic"><a :href="'#/catlistquery?pageNo=1&pageSize=100&themeid='+item.id"><img :src="item.pictureUrl" :alt="item.name" :onerror="nopic"><span>{{item.name}}</span></a></div></div>
  </div>
  <div class="cat-list2">
   <div class="cat-title" >其他</div>
    <div  v-for="(item,index) in catitem3"  class="cat-list-item"><div class="pic"><a :href="'#/catlistquery?pageNo=1&pageSize=100&colorid='+item.id"><img :src="item.pictureUrl" :alt="item.name" :onerror="nopic"><span>{{item.name}}</span></a></div></div>
    <div  v-for="(item,index) in catitem4"  class="cat-list-item"><div class="pic"><a :href="'#/catlistquery?pageNo=1&pageSize=100&shapeid='+item.id"><img :src="item.pictureUrl" :alt="item.name" :onerror="nopic"><span>{{item.name}}</span></a></div></div>
  </div>
    <div class="mgb5rem">&#160;</div>
    <!-- list end-->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue"
import Search from "comps/Search.vue";
import { cats,nopic,nopics} from "js/config"
export default {
  name: 'Cat',
  data() {
    return {
      data:cats||{},
      nopic:nopic,
      catitem:'',
      catitem1:'',
      catitem2:'',
      catitem3:'',
      catitem4:'',
    }
  },
  created: function() {
    this.$store.dispatch('getCategory','');
    this.$store.dispatch('getDictionarycategory','');
    // this.$store.dispatch('getTree');
  },
 mounted: function() {
  console.log(this.$store.state.good.category)
 },
    computed: {
    ...mapState({
      catlist: state =>state.good.category.list
    }),
    ...mapGetters(['getDictionarycategoryInfo'])
  },
  methods: {
    npimg(v){
      if(!v){
      return nopics;
      }else{
      return v;
      }
    },
    getSearchData(v) {
      console.log(v)
    }
  },
  watch:{
    getDictionarycategoryInfo:function(v){
      var _that=this;
      if(v && v.code==='200'){
        var dd=v.result,item1=[],item2=[],item3=[],item4=[],item=[];
        for (var i = 0; i < dd.length; i++) {
          (function(d){
            if(d.category==='风格'){
              item1.push(d);
            }else if (d.category==='题材') {
              item2.push(d);
            }else if (d.category==='颜色') {
              item3.push(d);
            }else if (d.category==='形状') {
              item4.push(d);
            }else{
              item.push(d)
            }
          })(dd[i])
        }
        this.catitem=item;
        this.catitem1=item1;
        this.catitem2=item2;
        this.catitem3=item3;
        this.catitem4=item4;
      }
      console.log(v)
    }
  },
  components: {
    Tabbar,
    Search
  }

}

</script>
<style scoped lang="less">
.Cat { background: #fff; min-height: 100%; overflow: hidden; }
.title { font-size: 2.25rem; line-height: 4rem; text-align: center; font-family: HiraginoSansGB; color: rgba(27, 27, 27, 1);box-shadow:-0.1rem 0 1rem #eee; }
.cat-more { text-align: right; background: #F2F2F2; line-height: 4rem;
  a { font-size: 1.75rem; font-family: HiraginoSansGB; color: rgba(249, 115, 0, 1); }
}
.cat-list { .cat-title { font-size: 1.88rem; font-family: HiraginoSansGB; color: rgba(27, 27, 27, 1); line-height: 3.25rem; padding-left: 1.2rem; }
  .weui-flex { padding: 0.8rem 1rem 2rem 1rem; }
  .weui-flex1 { padding-top: 3rem }
  .pic { padding: 0.5rem; position: relative; overflow: hidden;
    a { display: block; border: 1px dashed #999; overflow: hidden; }
    img { width: 100%; }
    span { position: absolute; z-index: 9;width: 100%;height: 100%;overflow: hidden;left: 0;top: 0; font-size: 1.75rem;color: #fff;text-align: center;padding-top:2.5rem }
  }
}
.mgb5rem { margin-bottom: 5rem; }

.cat-list2{
  position: relative;
  overflow: hidden;
   .cat-title { font-size: 1.88rem; font-family: HiraginoSansGB; color: rgba(27, 27, 27, 1); line-height: 3.25rem; padding-left: 1.2rem; }
   .cat-list-item{
    display: inline-block;
    *display: inline;
    *zoom: 1;
    float: left;
    width: 25%;
   }
    .pic { padding: 0.5rem; position: relative; overflow: hidden;
    a { display: block; border: 1px dashed #999; overflow: hidden; }
    img { width: 100%; }
    span { position: absolute; z-index: 9;width: 100%;height: 100%;overflow: hidden;left: 0;top: 0; font-size: 1.75rem;color: #fff;text-align: center;padding-top:2.5rem }
  }
}
</style>
