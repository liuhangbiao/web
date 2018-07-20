<template>
    <!-- 搜索 -->
    <div class="weui-flex search-box">
          <!-- <router-link to="/cat" class="icon icon-tiaozhuan"></router-link> -->
          <a @click="goone" class="icon icon-tiaozhuan"></a>
          <div class="weui-flex__item">
            <div class="placeholder search-ipt">
              <i class="icon-search"></i>
              <input type="text" v-model="searchTxt" :placeholder="data.from.placeholder" @focus="searchInput()">
              <a class="search-del" v-if="del" @click="searchClear()">{{data.from.clear}}</a>
            </div>
          </div>
    </div>
    <!-- 搜索 end-->
</template>
<script>
import {search} from 'js/config'
export default {
  data () {
    return {
      data:search,
      del:false,
      searchTxt:''
    }
  },
  methods: {
    goone(){
      this.$router.go(-1)
    },
    searchInput(){
      this.$router.push({path:'/search'})
      this.del=true;
    },
    searchClear(){
       this.del=false;
       this.searchTxt=''
    }
  },
 watch:{
  'searchTxt':function(v){
    this.$emit('search-data',v);//这里的this指的是当前子组件
    // console.log(v)
  }
 }
}
</script>
<style scoped lang="less">
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
</style>
