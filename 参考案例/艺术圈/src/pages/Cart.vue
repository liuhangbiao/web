<template>
  <div class="Cart">
    <!-- topbar -->
    <div class="weui-flex cartbar">
      <div class="weui-flex__item">
        <!-- <a class="icon-tiaozhuan fl" href="#/catlist" @click="goone"></a> -->
        <a class="icon-tiaozhuan fl"  @click="goone"></a>
        <a>购物车<em v-if="shopcar.length">({{shopcar.length}})</em></a>
        <a v-if="isEdit" class="fr" @click="isEdit=!isEdit">编辑</a>
        <a v-else class="fr" @click="isEdit=!isEdit">完成</a>
        <!-- <a class="fr" @click="isEdit=!isEdit"> -->
        </a>
      </div>
    </div>
    <!-- list -->
    <div class="weui-flex">
      <ul class="cartList">
        <li v-if="shopcar.length" v-for="item in shopcar">
          <span class="cart-time" v-if="item.createTime">{{item.createTime|fromatDate}}</span>
          <div class="clbox">
            <label><input type="checkbox" :value="item.id" v-model="checkedNames" :data-price="item.price" ><span><i class="icon icon-right2"></i></span></label>
            <div class="pic"><a :href="'#/goods/'+item.goodsId"><img :src="item.goodsImg" :art="item.artistName" :onerror="nopic"></a></div>
            <div class="desc">
              <div class="des">
                <span class="name" v-text="item.artGoods.artistName">夏培耀</span>
                <span class="title" v-text="item.goodsName">巍巍太行山（山花）</span>
                <span class="info" v-text="item.artGoods.categoryName+' '+item.width+'x'+item.length+'cm'">布面油画 60x80cm</span>
                <span class="price" v-if="item.price">{{item.price|formatMoney}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- buttombar -->
    <div class="weui-flex cartbarfix">
      <div class="weui-flex__item bba">
       <label @click="selAll"><input type="checkbox"  v-model="checked"><span><i class="icon icon-right2"></i></span></label>
       <span class="info">全选</span>
      </div>
      <div class="weui-flex__item  bbb" v-if="isEdit">
        <span>合计：<em>{{numprice|formatMoney}}</em></span>
        <span class="info">（不含运费及装裱费）</span>
      </div>
      <div class="weui-flex__item" v-if="!isEdit">
         <a class="rm" @click="rnCart">
          移到收藏夹
          </a>
      </div>
      <div class="weui-flex__item"  v-if="isEdit">
        <a class="an" @click="jiesuan">
        结算
        </a>
      </div>
      <div class="weui-flex__item"  v-if="!isEdit">
        <a class="del" @click="delCart">
        删除
        </a>
      </div>
    </div>
    <div class="mgb5rem">&#160;</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { nopic} from "js/config";
import {layer} from 'js/lib/layer'
export default {
  name: 'Cart',
  data() {
    return {
      nopic:nopic,
      msg: 'Welcome to Your Vue.js App',
      checkedNames: [],
      checked:false,
      isEdit:true,
      numprice:0,
      isCheckArr:[],
      goods:[]
    }
  },
  created: function() {
    this.gid = this.$route.params.gid;
    this.$store.dispatch('getShopcar',{token:sessionStorage.getItem('ukey')});
  },
 computed: {
    ...mapState({
      shopcar: state => state.good.gshopcar.list,
      istrue: state => state.order.shopcarids.istrue,
    }),
    ...mapGetters(['delShopcaridsInfo','postShopCarInfo','postTracegoodsIdInfo'])
  },
  mounted(){
    // console.log(Mock);
    // console.log('ssss');
  },
  methods:{
    goone(){
      this.$router.go(-1)
    },
    selAll(){
       if(this.checked===true){
           this.checkedNames=[]
       }
    },
    delCart(){
      var arr=this.checkedNames;
      if(arr && arr.length){
         this.$store.dispatch('delShopcarids',{token:sessionStorage.getItem('ukey'),ids:arr});
         this.$store.dispatch('getShopcar',{token:sessionStorage.getItem('ukey')});
      }else{
        layer.open({
          content:'你还没有选择商品!',
          skin:'footer'
        })
      }
    },
    rnCart(){
      // var arr=this.checkedNames;
      var arr=this.goods;
      if(arr && arr.length){
        for (var i = 0; i < arr.length; i++) {
          this.$store.dispatch('postTracegoodsId',{token:sessionStorage.getItem('ukey'),goodsId:arr[i]});
        }
      }else{
        layer.open({
          content:'你还没有选择商品!',
          skin:'footer'
        })
      }
      this.$store.dispatch('getShopcar',{token:sessionStorage.getItem('ukey')});
    },
    jiesuan(){
       var arr=this.checkedNames;
      if(arr && arr.length){
         this.$store.dispatch('postShopCar',{ids:arr.join(',')});
      }else{
        layer.open({
          content:'你还没有选择商品!',
          skin:'footer'
        })
      }
      // console.log('结算')
    }
  },
  filters: {
    formatMoney: function(value) {
      // return "￥"+value.toFixed(2)
      return "￥" + value
    },
    no:function(v){
      if(!v){
        return '未知'
      }
      return v;
    },
    fromatTime:function(v){
        return new Date(parseInt(v)).toLocaleString().replace(/:\d{1,2}$/,' ');
       // return new Date(parseInt(v) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
    fromatDate:function(v){
       return new Date(parseInt(v)).toLocaleString().slice(0,10).split('/').join('-')
       // .split('')
    }
  },
  watch:{
    checked:function(v){
      // console.log('checked',v)
      var issp=this.shopcar,ids=[],numprice=0;
        for (var i = 0; i < issp.length; i++) {
           ids.push(issp[i].id)
           numprice=numprice+issp[i].price;
        }
      if(v===true){
        this.checkedNames=ids;
        this.numprice=numprice;
      }else{
        this.numprice=0;
      }
    },
    checkedNames:function(v){
      if(this.shopcar.length===v.length){
        this.checked=true
      }else{
        this.checked=false
      }
      this.isCheckArr=v;
    },
    isCheckArr:function(v){
      var issp=this.shopcar,num=0,goods=[];
      for (var i = 0; i < v.length; i++) {
        for (var j = 0; j < issp.length; j++) {
          if(issp[j].id===v[i]){
            num=num+issp[j].price;
            goods.push(issp[j].goodsId)
          }
        }
      }
       this.numprice=num;
       this.goods=goods;
    },
    shopcar:function(v){
      // var that=this;
      // // if(v.length){
      // //   for (var i = 0; i < v.length; i++) {
      // //     // that.checkedNames.push(v[i].id)
      // //   }
      // // }
      // console.log(v)
    },
    istrue:function(v){
      if(v===true){
        this.$store.dispatch('getShopcar',{token:sessionStorage.getItem('ukey')});
      }
    },
    delShopcaridsInfo:function(v){
      if(v.code==='200'){
        // console.log(v)
        layer.open({
          content:v.message||'操作成功！',
          skin:'footer'
        })
      }
    },
    postTracegoodsIdInfo:function(v){
      if(v.code==='200'){
        // console.log(v)
        layer.open({
          content:v.message||'操作成功！',
          skin:'footer'
        })
      }
    },
    postShopCarInfo:function(v){
      if(v && v.code==="200"){
         // sessionStorage.setItem('buyinfo',JSON.stringify(v.result));
         localStorage.setItem('buyinfo',JSON.stringify(v.result));
         var dd=v.result.artGoodss,k=[];
         for (var i = 0; i < dd.length; i++) {
           k.push({
            "decorate": dd[i].framedId,
            "editionNo": dd[i].editionNo,
            "goodsId": dd[i].goods.id,
            "num": dd[i].number,
            "paperJamId": dd[i].paperId
          })
         }
        // sessionStorage.setItem('buydata',JSON.stringify(k))
        localStorage.setItem('buydata',JSON.stringify(k))
         this.$router.push({name: 'Attbuy'})
      }else{
        console.log('结算失败');
      }
    }
  }

}

</script>
<style scoped lang="less">
.mgb5rem{
  margin-bottom: 5rem;
}
.cartbar {
  background: #fff;
  text-align: center;
  height: 5rem;
  box-shadow: 0.1rem 0 1rem #ccc;
  a {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    line-height: 5rem;
    font-size: 2rem;
    font-family: HiraginoSansGB;
    color: #1b1b1b;
    margin: 0 1rem;
  }
  .gon {
    border-bottom: 2px solid #1b1b1b;
  }
  .icon {
    font-weight: bold;
  }
  .weui-flex__item {
    padding: 0 1rem
  }
}


.weui-flex__item2 {
  -webkit-box-flex: 2;
  -webkit-flex: 2;
  flex: 2;
}

.cartbarfix {
  box-shadow: -0.1rem 0 1rem #ccc;
  position: fixed;
  width: 100%;
  height: 6rem;
  /*padding-top: 1rem;*/
  background: rgba(255, 255, 255, 1);
  bottom: 0;
  text-align: center;
  z-index: 99;
  color: rgba(102, 102, 102, 1);

  .an,.rm,.del {
    line-height: 6rem;
    background: #F97300;
    display: block;
    font-size: 2rem;
    font-family: HiraginoSansGB;
    color: rgba(255, 255, 255, 1);
  }
  .rm{
    background: #1b1b1b;
  }
}

.icon{
  font-size: 2.5rem;
  color: #a0a0a0;
}
.icon-right2{
  color: #F97300;
  font-size: 3rem;
}
input[type="checkbox"]{appearance: none; -webkit-appearance: none;outline: none;display:none}
.cartList{
  position: relative;
  width: 100%;
  overflow: hidden;
  .cart-time{
    display: block;
    font-size:1.25rem;
    color: #999;
    line-height:3rem;
    text-align: center;
  }
  .clbox{
    position: relative;
    background: #fff;
    /*padding-left:5rem;*/
    overflow: hidden;
    padding:1rem 0  1rem 5rem;
    label{
        position: absolute;
        width: 2rem;
        height: 2rem;
       top: 5rem;
       left: 1.5rem;
         input[type="checkbox"]+span{
           width:1.7rem;height:1.7rem;display:inline-block;
           border: 2px solid #a0a0a0;
            border-radius:50%;
            i{display: none;}
         }
         input[type="checkbox"]:checked+span{
            border: none;
            i{display: block;}
         }
    }
    .pic{
        position:relative;float:left;width:15rem;margin-right:-15rem;max-height:15rem;
        overflow: hidden;
        a{display: block;}
    }
    .desc{
      float:right;width:100%;
      .des{
       margin-left:16rem;
       span{
        display: block;
        font-size:1.5rem;
        line-height:2.5rem;
        color: #333;
       }
       .name{
        font-size: 2rem;
       }
       .info{
        color: #999;
       }
       .price{
        padding-top: 1rem;
        color: #F97300;
        font-size: 1.7rem;
       }
      }
    }
  }
}

.bba{
   label{
        position: absolute;
        width: 2rem;
        height: 2rem;
       top: 1.7rem;
       left: 1.5rem;
         input[type="checkbox"]+span{
           width:1.7rem;height:1.7rem;display:inline-block;
           border: 2px solid #a0a0a0;
            border-radius:50%;
            i{display: none;}
         }
         input[type="checkbox"]:checked+span{
            border: none;
            i{display: block;}
         }
    }
  .info{
    /*padding-top: 1.7rem;*/
    position: absolute;
    top: 2rem;
    left: 4rem;
    font-size: 1.2rem;color: #333;
  }
}
.bbb{
  padding-top: 1.5rem;
  span{
    display: block;
    color: #999;
    font-size:1.75rem;
  }
  em{
    color: #FB3601;
  }
  .info{
    font-size: 1.4rem;
  }
}
</style>
