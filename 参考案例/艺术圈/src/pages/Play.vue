<template>
  <div class="Play">
   <!-- topbar -->
  <div class="weui-flex paybar">
    <div class="weui-flex__item">
      <a class="icon-tiaozhuan fl" href="#/order"></a>
      <a>支付</a>
      </a>
    </div>
  </div>
  <!-- 主体 -->
  <div class="line">&#160;</div>
  <div class="sbox play-price">
      <a href="#">支付金额<em class="fr">{{palyinfo.price|formatMoney}}</em></a>
  </div>
  <div class="bline">&#160;</div>
  <div class="sbox">
    <a href="#"><i class="icon-weixinpay">&#160;</i>微信支付<label><input type="radio" value="weixinplay"  v-model="checked"><span><i class="icon1 icon-right2"></i><i class="icon2 icon-right2"></i></span></label></a>
    <div class="line">&#160;</div>
    <a href="#"><i class="icon-zhipay">&#160;</i>支付宝支付<label><input type="radio"  value="aliplay"  v-model="checked"><span><i class="icon1 icon-right2"></i><i class="icon2 icon-right2"></i></span></label></a>
  </div>
  <!-- <div class="bline">&#160;</div> -->
  <!-- <div class="sbox" v-html="submitForm"> -->
  <!-- <img src="http://43.254.3.68:8380/api/wx/pay/getQrcodeImg?url=v.result.codeUrl"> -->
  <!-- </div> -->
  <div class="btn-box">
  <div class="art-btn" v-if="alion===true">
    <!-- <a @click="savePay()">去支付</a> -->
    <!-- <a :href="" v-if="pt===1">去支付</a> -->
    <a :href="'http://api.ysqart.com/api/ali/pay/web/app?orderNo='+palyinfo.id" >去支付</a>
    <!-- <a @click="savePay()">去支付</a> -->
  </div>
  <div class="art-btn" v-if="weion===true">
    <!-- <a :href="'http://api.ysqart.com/api/wx/pay/wx/web?orderNo='+palyinfo.id" >去支付</a> -->
    <!-- <a :href="'http://56f955a4.ngrok.io/api/wx/pay/wx/web?orderNo='+palyinfo.id" >去支付</a> -->
    <!-- <a :href="'http://4bb81754.ngrok.io/ap/wx/pay/wx/web?orderNo='+palyinfo.id" >去支付</a> -->
    <a :click="wxpayok()">去支付</a>
  </div>

  <!-- <div class="art-btn  btn-no" v-if="alion===false"> -->
  <div class="art-btn  btn-no" v-if="alion===false && weion===false">
   <a>未选择支付或支付功能不可用</a>
  </div>
  </div>
  <!-- 主体 end-->
  <!-- <div class="mgb5rem">&#160;</div> -->
</div>
<!-- $.getJSON("http://4bb81754.ngrok.io/ap/wx/pay/wx/web?orderNo=LF20180118143552973000", function (d) {
        if (d.code == '200') {
console.log(d);
          location.href=d.result
        } else {
          alert(d.errmsg);
        }

      }); -->

</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import {layer} from 'js/lib/layer'
import { cats } from "js/config"
import { baseURL,qs} from "js/api"
// palyinfo
export default {
  name: 'Play',
  data() {
    return {
      data:cats||{},
      checked:'',
      palyinfo:'',
      submitForm:'',
      alion:false,
      weion:false
    }
  },
  created: function() {
    var info=JSON.parse(sessionStorage.getItem('palyinfo')||{});
    if(info){
      this.palyinfo=info;
    }
    this.gid = this.$route.params.gid;
    // this.$store.dispatch('getShopcar');
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getAlipayInfo','getWxpayInfo','getWxgetQrcodeImgInfo'])
  },
  methods: {
    getSearchData(v) {
      console.log(v)
    },
    wxpayok(){
      var _this=this;
      var id=_this.palyinfo.id
       // this.$http.get('http://4bb81754.ngrok.io/ap/wx/pay/wx/web?orderNo='+_this.palyinfo.id).then(function (d) {
       this.$http.get('http://api.ysqart.com/api/wx/pay/wx/web?orderNo='+_this.palyinfo.id).then(function (d) {
           if (d.code == '200') {
              // console.log(d);
              location.href=d.result
            } else {
               layer.open({
                content:d.message||'出现严重或未知错误！',
                skin:'footer',
                time:3
              })
            }
       })
      //  this.$http.post('http://api.ysqart.com/api/wx/pay/wx/web?orderNo='+_this.palyinfo.id).then(function (dd) {
      //     console.log(dd)
      //  })
    },
    savePay(){
      var type=this.checked,_that=this;
      console.log(type)
      if(type==='aliplay'){
        this.alion=true;
        this.weion=false;
        // alipayParams
        // https://docs.open.alipay.com/203/107090/
         // this.$router.push({name:'apay'});
          this.aliplay()
        // console.log('支付宝',this.palyinfo.id)
        // this.$store.dispatch('getAlipay',{orderNo:this.palyinfo.id});
      }else if (type==='weixinplay') {
          var _this=this;
          this.alion=false;
          this.weion=true;
          layer.open({
             // content:dd.message,
             content:'微信支付稍后开通！',
              skin:'footer',
              time:3
          })
           // this.$http.post('http://172.16.0.67:8011/api/wx/pay/wx/web?orderNo='+_this.palyinfo.id).then(function (dd) {
          //  this.$http.post('/api/wx/pay/wx/web?orderNo='+_this.palyinfo.id).then(function (dd) {
          //   if(dd.code==='200'){
          //     console.log(dd)
          //   }
          // })
          // /api/wx/pay/wx/web
          // this.$http.get('/api/ali/pay/wxpay/params').then(function (dd) {
          //     if(dd.code==="200"){
          //         // console.log(dd)
          //         let res=dd.result;
          //         let params={
          //           appid:res.app_id,
          //           mch_id:res.mch_id,
          //           nonce_str:'VRalV69C6WTeYzUaaD8P2seFICbBkO',
          //           sign:res.sign,
          //           body:'商品style',
          //           out_trade_no:_this.palyinfo.id,
          //           total_fee:_this.palyinfo.price,
          //           spbill_create_ip:'http://172.16.8.52/',
          //           notify_url:res.notify_url
          //         }
          //         _this.$http.post('https://api.mch.weixin.qq.com/pay/unifiedorder',params).then(function(d){
          //           console.log(d)
          //         })
          //     }
          // })
        // wxpayParams
         // this.$store.dispatch('getWxpay',{orderNo:this.palyinfo.id});
         // window.location.href="https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx20161110163838f231619da20804912345&package=1037687096"
          // console.log('微信支付',this.palyinfo.id)
      }else{
        console.log('未选中支付方式')
      }
      // console.log(this.checked,this.palyinfo)
    },
    aliplay(){
      var _this=this;
      window.location.href="http://api.ysqart.com/api/ali/pay/web/app?orderNo="+_this.palyinfo.id
      // // this.$http.post('http://172.16.0.67:8011/api/ali/pay/web/app?orderNo='+_this.palyinfo.id).then(function (dd) {
      // this.$http.get('/api/ali/pay/web/app?orderNo='+_this.palyinfo.id).then(function (dd) {
      //   console.log(dd)
      //   if(dd.code==='200'){
      //     // var d=JSON.parse(dd.result);
      //     var d=dd.result;
      //      layer.open({
      //           // content:d.replace(/\n/ig,'').replace(/\\\"/ig,'')||'未知信息！',
      //           // content:d.replace(/\\/ig,'').replace(/display:none/,'display:block')||'未知信息！',
      //           // content:JSON.parse(d.replace(/display:none/,'display:block'))||'未知信息！',
      //           content:d,
      //           // skin:'footer',
      //           // time:3
      //       })
      //     console.log(d)
      //   }else{
      //      var d=dd.result;
      //     layer.open({
      //        // content:dd.message,
      //        content:JSON.stringify(dd),
      //         skin:'footer',
      //         // time:3
      //     })
      //   }
      // //   // var reUrl='https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign=ErCRRVmW%2FvXu1XO76k%2BUr4gYKC5%2FWgZGSo%2FR7nbL%2FPU7yFXtQJ2CjYPcqumxcYYB5x%2FzaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6%2Fm0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k%2Fk%3D&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0';
      // //   //   console.log(reUrl)
      // })



      // this.$http.get('/api/ali/pay/alipay/params').then(function (dd) {
          // if(dd.code==="200"){
             // window.location.href='https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign='+dd.sign+'&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id='+dd.seller_id+'&method=alipay.trade.wap.pay.return&app_id='+dd.app_id+'&out_trade_no='+_this.palyinfo.id+'&version=1.0'
            // var res=dd.result,data={
            //   'total_amount':_this.palyinfo.price,
            //   'timestamp':'2017-12-23 12:14:43',
            //   'sign':res.sign,
            //   'trade_no':_this.palyinfo.id,//支付宝
            //   'sign_type':res.sign_type,
            //   'charset':res.charset,
            //   'seller_id':res.seller_id,
            //   'method':'alipay.trade.wap.pay.return',
            //   'app_id':res.app_id,
            //   'out_trade_no':_this.palyinfo.id,
            //   'version':'1.0'
            // }
            // console.log(dd,data)
           //  var params={
           //    "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
           //    "subject":"大乐透",
           //    "out_trade_no":_this.palyinfo.id,
           //    "timeout_express":"90m",
           //    "total_amount":9.00,
           //    "product_code":"QUICK_WAP_WAY"
           //  }
           //  _this.$http.get('https://openapi.alipay.com/gateway.do',{
           //    timestamp:'2017-12-23 12:50:51',
           //    method:'alipay.trade.wap.pay',
           //    app_id:res.app_id,
           //    sign_type:res.sign_type,
           //    sign:res.sign,
           //    version:'1.0',
           //    biz_content:params
           //  }).then(function (dd) {
           //  console.log(dd)
           // })
            // https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.trade.wap.pay&app_id=1990&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&biz_content=
            // {
            //   "body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。",
            //   "subject":"大乐透",
            //   "out_trade_no":"70501111111S001111119",
            //   "timeout_express":"90m",
            //   "total_amount":9.00,
            //   "product_code":"QUICK_WAP_WAY"
            // }
              // window.location.href='https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign=ErCRRVmW%2FvXu1XO76k%2BUr4gYKC5%2FWgZGSo%2FR7nbL%2FPU7yFXtQJ2CjYPcqumxcYYB5x%2FzaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6%2Fm0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k%2Fk%3D&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0'
              // https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11 19:36:01&sign=ErCRRVmW/vXu1XO76k+Ur4gYKC5/WgZGSo/R7nbL/PU7yFXtQJ2CjYPcqumxcYYB5x/zaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6/m0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k/k=&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0
            // console.log(dd)
          // }else{
          //    layer.open({
          //       content:dd.message||'未知信息！',
          //       skin:'footer',
          //       time:3
          //     })
          // }
          // console.log(dd)
          // console.log(JSON.stringify(dd))
      // })
       // window.location.href='https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign=ErCRRVmW%2FvXu1XO76k%2BUr4gYKC5%2FWgZGSo%2FR7nbL%2FPU7yFXtQJ2CjYPcqumxcYYB5x%2FzaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6%2Fm0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k%2Fk%3D&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0';
       // window.location.href='https://m.alipay.com/Gk8NF23?total_amount=9.00&timestamp=2016-08-11+19%3A36%3A01&sign=ErCRRVmW%2FvXu1XO76k%2BUr4gYKC5%2FWgZGSo%2FR7nbL%2FPU7yFXtQJ2CjYPcqumxcYYB5x%2FzaRJXWBLN3jJXr01Icph8AZGEmwNuzvfezRoWny6%2Fm0iVQf7hfgn66z2yRfXtRSqtSTQWhjMa5YXE7MBMKFruIclYVTlfWDN30Cw7k%2Fk%3D&trade_no=2016081121001004630200142207&sign_type=RSA2&charset=UTF-8&seller_id=2088111111116894&method=alipay.trade.wap.pay.return&app_id=2016040501024706&out_trade_no=70501111111S001111119&version=1.0';
    //   var url="https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.trade.wap.pay&app_id=1990&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0";
    //   this.$http.get(url+'&biz_content={"body":"对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。","subject":"大乐透","out_trade_no":"70501111111S001111119","timeout_express":"90m","total_amount":9.00,"product_code":"QUICK_WAP_WAY"}')
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
    }
  },
  watch:{
    checked:function(v){
      console.log(v)
       if(v==='aliplay'){
        this.alion=true;
        this.weion=false;
      }else if (v==='weixinplay') {
          this.alion=false;
          this.weion=true;
        }
    },
    getAlipayInfo:function(v){
      if(v&&v.code==="200"){
         sessionStorage.setItem('submitForm',v.result.submitForm)
          //页面层
        // layer.open({
        //   type: 1
        //   ,content: v.result.submitForm
        //   ,anim: 'up'
        //   // ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
        // });
        // layer.
        // alipay
         this.$router.push({name: 'alipay'})
       // this.submitForm=v.result.submitForm
      }else{
        console.log(v)
      }
    },
    getWxpayInfo:function(v){
      if(v&&v.code==="200"){
         layer.open({
          type: 1
          ,content: '<img src="'+baseURL+'/api/wx/pay/getQrcodeImg?url='+v.result.codeUrl+'" alt="微信支付">'
          ,anim: 'up'
          // ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
        });
        // this.$store.dispatch('getWxgetQrcodeImg','v.result.codeUrl')
        window.location.href=v.result.codeUrl;
      }else{
        console.log(v)
      }
    },
    getWxgetQrcodeImgInfo:function(v){
        // layer.open({
        //   type: 1
        //   ,content: '<img src="'+v+'" alt="微信支付">'
        //   ,anim: 'up'
        //   // ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
        // });
    }
  },
  components: {
  }

}

</script>
<style scoped lang="less">
.Play { background: #fff; min-height: 100%; overflow: hidden; }
.mgb5rem { margin-bottom: 5rem; }
.bline{border-bottom: 1.8rem solid #f6f6f6;height: 0;}
.line {
  height: 0;
  border-bottom: 1px solid #eee;
  margin:0.5rem 0
}
.paybar {
  background: #fff;
  text-align: center;
  height: 5rem;
  /*box-shadow: 0.1rem 0 1rem #ccc;*/
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
input[type="radio"]{appearance: none; -webkit-appearance: none;outline: none;display:none}
.sbox{
  background: #fff;
  display: block;
  padding: 1rem 2rem;
  a {
    display: block;
    line-height:3rem;
    font-size: 1.7rem;
    color: #333;
    position: relative;
    i{
      color: #b6b6b6;
      font-size: 2rem;
    }
  }
  label{
       float: right;
       input[type="radio"]+span{
            padding-top:0.3rem;
            width:1.7rem;height:1.7rem;display:inline-block;
           .icon1{display: block;font-size: 2.5rem;}
           .icon2{display: none;}
       }
       input[type="radio"]:checked+span{
          .icon1{display: none;}
          .icon2{display: block;color: #F9730F;font-size: 2.5rem;}
       }
  }
}

.play-price{
  a{
    em{color: #FB3601;}
  }
}
.btn-box{
  /*background: #f6f6f6;*/
  padding-top:2rem;
}
.art-btn{
    width:80%;
    height:4.5rem;
    margin: 0rem auto;
    text-align: center;
    /*background:rgba(249,115,0,1);*/
    border-radius: 2.25rem ; 
   -webkit-box-shadow:0.1rem 0 1rem #F98700;
    -moz-box-shadow:0.1rem 0 1rem #F98700;
    box-shadow:0.05rem 0 0.6rem #F98700;
    background-image: -webkit-linear-gradient(left,#f96900,#f98700);
    background-image:    -moz-linear-gradient(left,#f96900,#f98700);
    background-image:     -ms-linear-gradient(left,#f96900,#f98700);
    background-image:      -o-linear-gradient(left,#f96900,#f98700);
    background-image:         linear-gradient(left,#f96900,#f98700);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#F96900', endColorstr='#F98700');
    a{
      display: block;
      color: #fff;
      font-size:2rem;
      font-family:HiraginoSansGB;
      line-height:4.5rem
    }
}
.btn-no{
   -webkit-box-shadow:0.1rem 0 1rem #EEEEEE;
    -moz-box-shadow:0.1rem 0 1rem #EEEEEE;
    box-shadow:0.05rem 0 0.6rem #EEEEEE;
    background-image: -webkit-linear-gradient(left,#eeeeee,#f4f4f4);
    background-image:    -moz-linear-gradient(left,#eeeeee,#f4f4f4);
    background-image:     -ms-linear-gradient(left,#eeeeee,#f4f4f4);
    background-image:      -o-linear-gradient(left,#eeeeee,#f4f4f4);
    background-image:         linear-gradient(left,#eeeeee,#f4f4f4);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#F96900', endColorstr='#EEEEEE');
    a{color: #c4c4c4;}
}
</style>
