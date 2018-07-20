<template>
  <div class="Attbuy">
    <!-- topbar -->
    <div class="weui-flex cartbar">
      <div class="weui-flex__item">
        <!-- <a class="icon-tiaozhuan fl" href="#/catlist" @click="goone"></a> -->
        <a class="icon-tiaozhuan fl"  @click="goone"></a>
        <a>下单</a>
      </div>
    </div>
    <!-- list -->
    <div class="Attbuy-box">
      <div class='ps'>配送至</div>
      <div class='gbox abaddr'>
        <span><em v-text="addrinfo.receiver"></em>&#160;<em v-text="addrinfo.mobile">晓晓 18312345678</em></span>
        <span class="ab-addr"><em v-if="addrinfo.province" v-text="addrinfo.province"></em><em v-if="addrinfo.city" v-text="addrinfo.city"></em><em v-if="addrinfo.area" v-text="addrinfo.area"></em><em v-if="addrinfo.address" v-text="addrinfo.address"></em></span>
        <a href="#/addr"><i class="icon-tiaozhuan2"></i></a>
      </div>
      <div class="bline">&#160;</div>
      <div class="gbox attbuy-info" v-if="buyinfo.artGoodss" v-for="item in buyinfo.artGoodss">
        <div class="pic"><a :href="'#/goods/'+item.goods.id"><img :src="item.goods.pictures" :alt="item.goods.name" :onerror="nopic"/></a></div>
        <span class="name" v-text="item.goods.artistName">高磊</span>
        <span class="title" v-text="item.goods.name">迷彩No.7</span>
        <span class="info" v-text="item.goods.categoryName">布面油画</span>
        <span class="price">{{item.goods.price|formatMoney}}</span>
      </div>
      <div class="bline">&#160;</div>
      <div class="gbox attbuy-mj">
        <span>
          留言备注：<input type="text" value="" v-model="remark" placeholder="如有特殊需求，请留言给我们">
        </span>
        <div class="line">&#160;</div>
   <!--      <span>
          代金券<a href="#">1张可用 <i class="icon-tiaozhuan2"></i></a>
       </span> -->
      </div>
      <div class="bline">&#160;</div>
      <div class="gbox attbuy-pc">
        <span>商品总价：<em v-if="buyinfo.totalMoney">{{buyinfo.totalMoney|formatMoney}}</em></span>
        <span>总装裱费：<em >{{buyinfo.totalIsdecorate|formatMoney}}</em></span>
        <span>运费合计：<em >{{buyinfo.totalFreight|formatMoney}}</em></span>
        <!-- <span>代金券抵扣：<em>￥3</em></span> -->
        <!-- <span>活动优惠：<em>￥3</em></span> -->
        <div class="line">&#160;</div>
        <span>订单合计：<em>{{buyinfo.total|formatMoney}}</em></span>
      </div>
    </div>
    <!-- buttombar -->
    <div class="weui-flex cartbarfix">
      <div class="weui-flex__item">
        <span>待支付：<em>{{buyinfo.total|formatMoney}}</em></span>
      </div>
      <div class="weui-flex__item">
        <a class="addOrder" @click="submitOrder">
          提交订单
          </a>
      </div>
    </div>
    <div class="mgb5rem">&#160;</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { nopic} from "js/config";
export default {
  name: 'Attbuy',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      checkedNames: [],
      checked: false,
      isEdit: true,
      buyinfo:{},
      nopic:nopic,
      subData:[],
      remark:'',
      addrinfo:'',
      addrid:0
    }
  },
  created: function() {
    this.gid = this.$route.params.gid;
    // var buyinfo=JSON.parse(sessionStorage.getItem('buyinfo'));
    // var buydata=JSON.parse(sessionStorage.getItem('buydata'));
    var buyinfo=JSON.parse(localStorage.getItem('buyinfo'));
    var buydata=JSON.parse(localStorage.getItem('buydata'));
    // console.log(buyinfo,buydata)
    if(buyinfo){
      // var goodArr=buyinfo.artGoodss,gArr=[];
      // for (var i = 0; i < goodArr.length; i++) {
      //   gArr.push({
      //       "decorate": 0,
      //       "editionNo": 0,
      //       "goodsId": goodArr[i].goods['id'],
      //       "num": 1,
      //       "paperJamId": 0
      //     })
      // }
      this.subData=buydata;
      this.buyinfo=buyinfo;
    }
    //默认地址
      this.$store.dispatch('getAddressdef',{token:sessionStorage.getItem('ukey')})
  },
  mounted() {
    // console.log(Mock);
    // console.log('ssss');
  },
   computed: {
    ...mapGetters(['postOrderInfo','getAddressdefInfo'])
  },
  methods: {
    goone(){
     this.$router.go(-1)
    },
    submitOrder(){
      var goods=this.subData;
      // console.log(this.subData)
      var k={
        "addressId": this.addrid,
        "goodss": goods,
        "points": 0,
        "remark": this.remark
      }
      // console.log(k)
      this.$store.dispatch('postOrder',{token:sessionStorage.getItem('ukey'),data:k});
    }
  },
  filters: {
    formatMoney: function(value) {
      // return "￥"+parseInt(value).toFixed(2)
      return "￥" + value
    }
  },
  watch: {
    checked: function(v) {
      if (v === true) {
        this.checkedNames = [1, 2, 3]
      } else {
        this.checkedNames = []
      }
    },
    checkedNames: function(v) {
      // console.log(v)
      if (v.length < 1) {
        this.checked = false
      }
      if (v.length > 2) {
        this.checked = true
      }
    },
    postOrderInfo:function(v){
       if(v&&v.code==="200"){
           // sessionStorage.removeItem('buyinfo');
           // sessionStorage.removeItem('buydata');
           // localStorage.removeItem('buyinfo');
           // localStorage.removeItem('buydata');
          this.$router.push({name:'Order'})
      }
    },
    getAddressdefInfo:function(v){
      if(v.code==='200'){
        this.addrinfo=v.result[0]
        this.addrid=v.result[0].id;
      }
    }
  }
}
</script>
<style scoped lang="less">
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
  .addOrder {
    line-height: 6rem;
    background: #F97300;
    display: block;
    font-size: 2rem;
    font-family: HiraginoSansGB;
    color: rgba(255, 255, 255, 1);
  }
  span {
    display: block;
    color: #999;
    line-height: 6rem;
    font-size: 1.75rem;
  }
  em {
    color: #FB3601;
  }
}
.gbox {
  background: #fff;
  display: block;
  padding: 1rem 2rem;
  span {
    display: block;
    line-height: 2.5rem;
    font-size: 1.7rem;
    color: #333;
  }
}
.line {
  height: 0;
  border-bottom: 1px solid #eee;
}
.Attbuy-box {
  .ps {
    padding:1rem;
  }
  .abaddr {
    position: relative;
    overflow: hidden;
    a {
      display: block;
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: 2rem;
      right: 1rem;
      z-index: 9;
      line-height: 3rem;
      text-align: center;
      i {
        color: #888;
        font-size: 2.5rem;
      }
    }
  }
  .ab-addr {
    font-size: 1.4rem;
    color: #999;
  }
  .attbuy-info {
    position: relative;
    text-align: center;
    overflow: hidden;
    .pic{
      width: 10rem;
      height: 10rem;overflow: hidden;
      display: inline-block;
      *display: inline;
      *zoom: 1;float: left;
    }
    span{
      position: relative;
      margin-left: 11rem;
      text-indent: 1rem;
      text-align: left;
    }
    .info,
    .title {
      font-size: 1.3rem;
      color: #888;
      line-height: 1.8rem
    }
    .price {
      color: rgba(249, 115, 0, 1);
    }
  }
  .attbuy-mj{
    .line{margin: 1rem 0}
    span{
    }
    input{
      height:2rem;
      color: #999;
      border: none;
    }
    a{
      float: right;
      color: #999;
    }
  }
  .attbuy-pc{
    span{
      color: #888;
      em{float: right;}
    }
  }
}
.mgb5rem {
  margin-bottom: 5rem;
}
</style>
