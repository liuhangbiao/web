<template>
  <div class="Artmore">
   <!-- 底部导航 -->
    <Tabbar></Tabbar>
    <!-- 底部导航 end-->
    <!-- 搜索 -->
    <Search @search-data="getSearchData"></Search>
    <!-- 搜索 end-->
    <div class="ambox">
      <ul>
          <li v-if="data" v-for="item in data">
            <div class="pic"><a :href="'#/artdd/'+item.id"><img :src="item.headimg" :alt="item.name"></a></div>
            <div class="name">{{item.name}}</div>
            <div class="dd" v-text="subString(item.introduce,65,'...')">{{item.introduce}}</div>
          </li>
      </ul>
    </div>
      <div class="mgb5rem">&#160;</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue";
import Search from "comps/Search.vue";
export default {
  name: 'Artmore',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:''
    }
  },
  created: function() {
    //滚动艺术家
    this.$store.dispatch('getArtist', { pageNo: 1, pageSize: 40 });
  },
  mounted(){
    // console.log(Mock);
    console.log('ssss');
  },
  computed: {
    ...mapGetters([
      'getArtistInfo'
    ])
  },
 methods: {
    getSearchData(v) {
      console.log(v)
    },
    subString(str, len, hasDot){//(串,长度,增加...) 
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex,"**").length;
        for(var i = 0;i < strLength;i++)
        {
            singleChar = str.charAt(i).toString();
            if(singleChar.match(chineseRegex) != null)
            {
                newLength += 2;
            }
            else
            {
                newLength++;
            }
            if(newLength > len)
            {
                break;
            }
            newStr += singleChar;
        }
        if(hasDot && strLength > len)
        {
            newStr += "...";
        }
        return newStr;
    }
  },
  watch: {
    getArtistInfo:function(v){
      if(v && v.code==="200"){
       var dd=v.result.data;
       this.data=dd;
      }
    }
  },
  components: {
    Tabbar,
    Search
  }
}
</script>
<style type="text/css" lang="less" scoped>
  .ambox{
    position: relative;
    display: block;
    overflow: hidden;
    ul{
      display: block;
      padding: 2%;
      padding-right: 0;
      overflow: hidden;
      position: relative;
      width: 100%;
    }
    li{
      display: inline-block;
      *display: inline;
      *zoom: 1;
      float: left;
      width: 47%;
      height: 24rem;
      background: #fff;
      padding-bottom:2rem;
      margin-bottom:1rem;
      margin-right: 2%;
    }
    .pic{
      position: relative;
      height: 16rem;
      overflow: hidden;
      img{
        position: relative;
        width: 100%;
      }
    }
    .name{
          padding: 0.4rem 0;
          text-align: center;
          font-size: 1.75rem;
          font-family: HiraginoSansGB;
          color: #000000;
    }
    .dd{
      font-size: 1.38rem;
      font-family: HiraginoSansGB;
      color: #666666;
      line-height: 1.6rem;
      padding: 0.5rem
    }
  }
  .mgb5rem{
    margin-bottom: 5rem;
  }
</style>
