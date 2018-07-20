<template>
  <div class="Order">
    <div class="obox top-info">
      <a href="#/my"> <i class="icon-tiaozhuan"></i>我的订单</a>
    </div>
    <div class="line">&#160;</div>
    <div class="obox otab">
      <a :class="{ton:isTab===0}" @click="isTab=0">全部订单</a>
      <a :class="{ton:isTab===1}" @click="isTab=1">待支付</a>
      <a :class="{ton:isTab===2}" @click="isTab=2">已完成</a>
      <a :class="{ton:isTab===3}" @click="isTab=3">已取消</a>
    </div>
    <div class="bline">&#160;</div>
    <!-- all -->
    <div class="all otabs" v-if="isTab===0">
    <!-- {{this.$store.state.order.order.list0}} -->
      <!-- <div class="obox" v-if="this.$store.state.order.order.list0" v-for="item in this.$store.state.order.order.list0"> -->
      <div class="obox"  v-for="item in this.$store.state.order.order.list0">
        <span class="ob-oid">订单号：{{item.orderno}} <i class="icon-delete fr" @click="delOrder(item.id)">&#160;</i><em class="fr">{{item.status}}</em></span>
        <div class="g-bd" v-for="im in item.orderItems">
          <div class="g-sd">
            <div class="pic"><a :href="'#/goods/'+im.itemid"><img :src="im.picture_url" :art="im.categoryName" :onerror="nopic"></a></div>
          </div>
          <div class="g-mn">
            <div class="g-mnc">
              <span class="name" v-text="im.artistName"></span>
              <span class="title" v-text="im.itemname"></span>
              <span class="info"><em v-text="im.categoryName"></em> <em v-text="im.width"></em>x<em v-text="no(im.length)"></em>cm</span>
            </div>
          </div>
        </div>
        <span class="total">共{{item.orderItems.length}}件作品 合计：<em>{{(item.totalmoney+item.totalIsdecorate+item.totalFreight)|formatMoney}}</em></span>
        <div class="line">&#160;</div>
        <span class="oplay"><a href="#" class="goPlay" @click="goPlay(item.orderno,item.totalmoney+item.totalIsdecorate+item.totalFreight)">去支付</a></span>
      </div>
    </div>
    <!-- tab1 -->
    <div class="tab1 otabs" v-if="isTab===1">
        <div class="obox"  v-for="item in this.$store.state.order.order.list1">
        <span class="ob-oid">订单号：{{item.orderno}} <i class="icon-delete fr" @click="delOrder(item.id)">&#160;</i><em class="fr">{{item.status}}</em></span>
        <div class="g-bd" v-for="im in item.orderItems">
          <div class="g-sd">
            <div class="pic"><a :href="'#/goods/'+im.itemid"><img :src="im.picture_url" :art="im.categoryName" :onerror="nopic"></a></div>
          </div>
          <div class="g-mn">
            <div class="g-mnc">
              <span class="name" v-text="im.artistName"></span>
              <span class="title" v-text="im.itemname"></span>
              <span class="info"><em v-text="im.categoryName"></em> <em v-text="im.width"></em>x<em v-text="no(im.length)"></em>cm</span>
            </div>
          </div>
        </div>
        <span class="total">共{{item.orderItems.length}}件作品 合计：<em>{{(item.totalmoney+item.totalIsdecorate+item.totalFreight)|formatMoney}}</em></span>
        <div class="line">&#160;</div>
        <span class="oplay"><a href="#" class="goPlay" @click="goPlay(item.orderno,item.totalmoney+item.totalIsdecorate+item.totalFreight)">去支付</a></span>
      </div>
    </div>
    <!-- tab2 -->
    <div class="tab2 otabs" v-if="isTab===2">
       <div class="obox"  v-for="item in this.$store.state.order.order.list4">
        <span class="ob-oid">订单号：{{item.orderno}} <i class="icon-delete fr" @click="delOrder(item.id)">&#160;</i><em class="fr">{{item.status}}</em></span>
        <div class="g-bd" v-for="im in item.orderItems">
          <div class="g-sd">
            <div class="pic"><a :href="'#/goods/'+im.itemid"><img :src="im.picture_url" :art="im.categoryName" :onerror="nopic"></a></div>
          </div>
          <div class="g-mn">
            <div class="g-mnc">
              <span class="name" v-text="im.artistName"></span>
              <span class="title" v-text="im.itemname"></span>
              <span class="info"><em v-text="im.categoryName"></em> <em v-text="im.width"></em>x<em v-text="no(im.length)"></em>cm</span>
            </div>
          </div>
        </div>
        <span class="total">共{{item.orderItems.length}}件作品 合计：<em>{{(item.totalmoney+item.totalIsdecorate+item.totalFreight)|formatMoney}}</em></span>
        <div class="line">&#160;</div>
        <span class="oplay"><a href="#" class="goPlay">已完成</a></span>
      </div>
    </div>
    <!-- tab3 -->
    <div class="tab3 otabs" v-if="isTab===3">
 <div class="obox"  v-for="item in this.$store.state.order.order.list5">
        <span class="ob-oid">订单号：{{item.orderno}} <i class="icon-delete fr" @click="delOrder(item.id)">&#160;</i><em class="fr">{{item.status}}</em></span>
        <div class="g-bd" v-for="im in item.orderItems">
          <div class="g-sd">
            <div class="pic"><a :href="'#/goods/'+im.itemid"><img :src="im.picture_url" :art="im.categoryName" :onerror="nopic"></a></div>
          </div>
          <div class="g-mn">
            <div class="g-mnc">
              <span class="name" v-text="im.artistName"></span>
              <span class="title" v-text="im.itemname"></span>
              <span class="info"><em v-text="im.categoryName"></em> <em v-text="im.width"></em>x<em v-text="no(im.length)"></em>cm</span>
            </div>
          </div>
        </div>
        <span class="total">共{{item.orderItems.length}}件作品 合计：<em>{{(item.totalmoney+item.totalIsdecorate+item.totalFreight)|formatMoney}}</em></span>
        <div class="line">&#160;</div>
        <span class="oplay"><a href="#" class="goPlay">已取消</a></span>
      </div>
    </div>
    <!-- <div class="bline">&#160;</div> -->
    <!-- <div class="mgb5rem">&#160;</div> -->
    <!-- list end-->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { cats,nopic } from "js/config"
import {layer} from 'js/lib/layer'
export default {
  name: 'Order',
  data() {
    return {
      nopic:nopic,
      data: cats || {},
      isTab: 0
    }
  },
  created: function() {
    this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:''});
    this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'待支付'});
    // this.$store.dispatch('getOrder',{pageNo:1,pageSize:10,status:'已发货'});
    // this.$store.dispatch('getOrder',{pageNo:1,pageSize:10,status:'已退货'});
    this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'已完成'});
    this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'已取消'});
  },
 computed: {
    ...mapState({
      order: state => state.order.order.list,
      order0: state => state.order.order.list0,
      order1: state => state.order.order.list1,
      order2: state => state.order.order.list2,
      order3: state => state.order.order.list3,
      order4: state => state.order.order.list4,
      order5: state => state.order.order.list5,
    }),
    ...mapGetters(['getOrderInfo','putDeleteInfo'])
  },
  methods: {
    goone(){
      this.$router.go(-1)
    },
    getSearchData(v) {
      console.log(v)
    },
    goPlay(v,p){
      sessionStorage.setItem('palyinfo',JSON.stringify({id:v,price:p}))
      // console.log(v,p)
     this.$router.push({name: 'Play', params: {token:sessionStorage.getItem('ukey'),data:'ok'}})
    },
    delOrder(v){
      // putDelete
      var _that=this;
        //底部对话框
      layer.open({
        content: '你确定要删除订单？'
        ,btn: ['删除', '取消']
        ,skin: 'footer'
        ,yes: function(index){
            _that.$store.dispatch('putDelete',{token:sessionStorage.getItem('ukey'),id:v});
        }
      });
    },
    no(v){
      if(!v){
        return '未知'
      }
      return v
    }
  },
  filters: {
    formatMoney: function(value) {
      // return "￥"+value.toFixed(2)
      return "￥" + value
    }
  },
  watch:{
    order:function(v){
      console.log(v)
    },
    putDeleteInfo:function(v){
      if(v && v.code==="200"){
          layer.open({
          content: '订单删除成功！'
          ,skin: 'footer'
          ,time: 3
        });
        // this.$router.go(0)
         this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:''});
          this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'待支付'});
          // this.$store.dispatch('getOrder',{pageNo:1,pageSize:10,status:'已发货'});
          // this.$store.dispatch('getOrder',{pageNo:1,pageSize:10,status:'已退货'});
          this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'已完成'});
          this.$store.dispatch('getOrder',{token:sessionStorage.getItem('ukey'),pageNo:1,pageSize:10,status:'已取消'});
      }
    }
  },
  components: {}

}

</script>
<style scoped lang="less">
.Order {
  background: #fff;
  min-height: 100%;
  overflow: hidden;
}

.mgb5rem {
  margin-bottom: 5rem;
}
.mgb2rem{
  margin-bottom: 2rem;
  background: #f00;
}



/* 两列右侧自适应布局 */

.g-bd {
  position: relative;
  overflow: hidden;
  background: #f8f8f8;
  padding: 1rem 0;
  margin:1rem 0
}

.g-sd {
  position: relative;
  float: left;
  width: 12rem;
  margin-right: -12rem;
  .pic {
    padding-left: 1rem;
    width: 12rem;
    height: 12rem;
    overflow: hidden;
    position: relative;
    img {
      width: 12rem;
    }
  }
}

.g-mn {
  float: right;
  width: 100%;
}

.g-mnc {
  margin-left: 13rem;
  overflow: hidden;
  .name{font-size: 2rem;color: #333;padding-top: 1rem;}
  .title{font-size:1.5rem;color: #333;}
  .info{font-size:1.5rem;color: #999;}
}

.obox {
  background: #fff;
  padding: 1rem 0;
  span {
    display: block;
    text-align: left;
    line-height: 3rem;
    color: #666;
    font-size: 1.6rem;
    padding: 0 2rem;
  }
}

.bline {
  border-bottom: 1.8rem solid #f6f6f6;
  height: 0;
}

.line {
  position: relative;
  height: 0;
  border-bottom: 1px solid #eee;
  margin: 0.7rem 0
}

.top-info {
  a {
    padding: 0 2rem;
    display: block;
    color: #1b1b1b;
    font-size: 2rem;
  }
  overflow: hidden;
  position: relative;
  text-align: center;
  i {
    float: left;
    padding-top: 0.5rem;
    font-weight: bold;
  }
}

.otab {
  text-align: center;
  position: relative;
  a {
    color: #666;
    font-size: 1.65rem;
    border-bottom: 2px solid #fff;
    padding: 1rem 0;
    margin: 0 2rem
  }
  .ton {
    border-bottom: 2px solid #F97300;
    color: #F97300;
  }
}
.otabs{
  background: #f2f2f2;
  overflow: hidden;position: relative;
  .obox{
    padding: 1rem 0;
    margin-bottom:2rem
  }
  .total{
    text-align: right;
    em{font-weight: bold;}
  }
  .oplay{
      padding:0.5rem 2rem;
      text-align: right;
      a{
          border: 1px solid #F97300;
          padding:0.6rem 2rem;
          border-radius:2rem;
          color: #F97300;
      }
  }
}

.ob-oid{
  position: relative;
  line-height:3rem;
  vertical-align:middle; /* 居中对齐， */ 
  i{
    font-size: 2rem;margin-left: 0.5rem;line-height:3rem;
  }
}
</style>
