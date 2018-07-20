<template>
  <div class="Goods">
    <!-- 选项卡 -->
    <GoodsBar @gbinfos="getinfos"></GoodsBar>
    <!-- 选项卡 end-->
    <!-- tab1 -->
    <div class="tabns tabns1" v-if="tabn==3">
      <div class="pic"><img :src="good.pictures" :alt="good.name" :onerror="nopic"/></div>
      <div class="good-info gbox">
        <span class="name" v-text="good.artistName"></span>
        <span v-text="good.name"></span>
        <span>{{good.categoryName}} {{good.width|no}}x{{good.length|no}}&#160;cm</span>
        <span class="tou"><img :src="art.headimg" :alt="good.name" :onerror="nopic"/><a :href="'#/artdd/'+art.id" class="icon-tiaozhuan2"></a></span>
      </div>
      <div class="line">&#160;</div>
      <div class="good-price gbox">
        <span v-if="good.price" class="price">{{good.price|money('元')}}</span>
        <span >运费：{{good.freight|money('元')}}&#160;&#160; 
        <!-- <em v-for="item in framed" v-if="item.framed_id===framedselected">装裱费: {{item.price|money('元')}}</em> </span> -->
        <em v-for="item in framed" v-if="item.framed_id===framedselected">装裱费: {{item.price|money('元')}}</em> </span>
      </div>
      <div class="line">&#160;</div>
      <div class="good-tag gbox">
        <span v-if="good.original"><i class="icon icon-right1" ></i>{{good.original}}</span>
        <span v-if="good.goodsstatus"><i class="icon icon-right1" ></i>{{good.goodsstatus}}</span>
        <span v-if="good.recommend"><i class="icon icon-right1"></i>编辑推荐</span>
        <span v-if="good.isdecorate==='0'"><i class="icon icon-right1"></i>无边框</span>
      </div>
      <div class="line">&#160;</div>
      <div class="good-mount gbox" v-if="framed.length">
        <span>选择画框装裱</span>
        <span class="mount-select">
            <em>已选择</em>
            <em v-text="decorateTxt">无边框</em>
            <em v-text="paperJamIdTxt">无卡纸</em>
        <!--  <select class="weui-select" name="select2" v-model="framedselected">
              <option value="0">选择画框装裱</option>
              <option :value="item.framed_id" v-for="item in framed">{{item.name}}({{item.comment}})&#160;&#160;价格:{{item.price|money('元')}}</option>
          </select> -->
        </span>
      </div>
       <div class="line">&#160;</div>
       <div class="good-kaung" v-if="framed.length">
         <div class="picf" @click="sel('无边框',0,1)" :class="{gons:don===0}">无边框</div>
         <div class="picf" v-for="(item,index) in framed" :class="{gons:don===index+1}" @click="sel(item,index+1,1)"><img :src="item.picture" :alt="item.name"></div>
      </div>
      <div class="line">&#160;</div>
       <div class="good-kazhi"  v-if="framed2.length">
          <a  @click="sel('无卡纸',0,2)" :class="{gons:pon===0}">无卡纸</a>
         <a v-for="(item,index)  in framed2" :class="{gons:pon===index+1}" v-if="item.name" v-text="item.name" @click="sel(item,index+1,2)"></a>
      </div>
      <div class="bdline">&#160;</div>
      <div class="good-edit gbox" v-if="good.recommendMsg">
        <span>编辑推荐</span>
        <p v-text="good.recommendMsg">
          &#160;
        </p>
      </div>
    </div>
    <!-- tab2 -->
    <div class="tabns tabns2" v-if="tabn==4">
      <div class="line">&#160;</div>
        <div class="tabs gbox">
            <a :class="{tabson:tabsons===0}" @click="getinfos(0,'tabsons')">作品细节</a>
            <a>|</a>
            <a :class="{tabson:tabsons===1}" @click="getinfos(1,'tabsons')">详细信息</a>
        </div>
      <div class="line">&#160;</div>
        <!-- 详情 -->
        <div class="details">
          <div class="d-text" v-if="tabsons===0" v-html="good.particulars">
          </div>
          <div class="d-info gbox" v-if="tabsons===1">
            <span v-if="good.name"><em>作品名称：</em>{{good.name}}</span>
            <span v-if="good.categoryName"><em>作品类型：</em>{{good.categoryName}}</span>
            <span v-if="good.artistName"><em>艺术家：</em>{{good.artistName}}</span>
            <span v-if="good.styleName"><em>风格：</em>{{good.styleName|no}}</span>
            <span v-if="good.salestatus"><em>销售状态：</em>{{good.salestatus|no}}</span>
            <span v-if="good.material"><em>材质：</em>{{good.material|no}}</span>
            <!-- <span v-if="good.name"><em>材质：</em>布面油画</span> -->
            <span v-if="good.themeName"><em>题材：</em>{{good.themeName|no}}</span>
            <span v-if="good.width"><em>尺寸：</em>{{good.width|no}}x{{good.length|no}} cm</span>
            <span v-if="good.placeName"><em>摆放空间：</em>{{good.placeName|no}}</span>
            <span v-if="good.createtime"><em>创作时间：</em>{{good.createtime|formatDate}}</span>
          </div>
        </div>
        <!-- 详情 end-->
      <div class="line">&#160;</div>
    </div>
    <!-- tab3 -->
    <div class="tabns tabns3" v-if="tabn==5">
      <div class="bdline">&#160;</div>
      <!-- 评论 -->
      <div class="comment">
        <div class="com-hd">
        作品评论 <span v-if="comt.recordsFiltered">1532</span>
        </div>
        <div class="line">&#160;</div>
        <div class="com-bd" v-if="comt.data.length" v-for="item in comt.data">
          <i class="icon icon-head"></i>
          <span v-if="item.nickname" v-text="item.nickname">&#160;</span>
          <span class="time">{{item.createtime|fromatTime}}</span>
          <p v-if="item.comment" v-html="item.comment">&#160;</p>
        </div>
        <div class="com-bd">
        <p>&#160;</p>
          <a @click="allComt" v-text="cmits">查看全部评论</a>
        </div>
      </div>
      <div class="bdline">&#160;</div>
      <!-- 艺术家 -->
      <div class="gbox art">
        <div class="pic"><img :src="art.headimg" :alt="art.name" :onerror="nopic"/></div>
        <span>{{art.name}}</span>
        <span class="info">共{{art.goodsCount}}件作品</span>
        <a :href="'#/artist/'+art.id">艺术家完整资料</a>
      </div>
      <!-- 猜你喜欢 -->
      <div class="guess">
      <div class="bdline">&#160;</div>
        <fieldset>
          <legend align="center">猜你喜欢</legend>
        </fieldset>
      <div class="bdline">&#160;</div>
        <div class="gbox">
          <ul class="boxs-bd boxs-bd-list1" v-if="goodrec.length">
            <li v-for="item in goodrec">
              <a :href="'#/goods/'+item.id">
              <span class="pic">
                <img :src="item.pictures" :alt="item.name" :onerror="nopic"/>
              </span>
              <span class="title">{{item.artistName}}<em>《{{item.name}}》</em></span>
              <span class="price">{{item.price|money('元')}}</span>
              </a>
            </li>
          </ul>
          <div class="clear">&#160;</div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div class="mgb5rem">&#160;</div>
    <!-- 预览 -->
    <div class="view" id="view" v-if="yu">
      <div class="topbar"> <span v-text="good.name"></span><onego class="arr"></onego></div>
      <!-- 预览box -->
      <div class="v-box">
        <div class="picgood" v-drag ><img :src="good.pictures" :alt="good.name" id="drag"  :onerror="nopic"/></div>
        <div class="pic">
          <div class="picmax"><img :src="viewpic" alt="默认背景"></div>
        </div>
        <div class="itempic">
          <div class="picmin" v-for="item in view" @click="viewpic=item.url"><img :src="item.url" :alt="item.name" ></div>
        </div>
      </div>
      <!-- 预览box end-->
    </div>
    <!-- 预览 ens-->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue"
import GoodsBar from "comps/GoodsBar.vue";
import { goods,nopic} from "js/config";
import { common,put} from "js/api";
import {layer} from 'js/lib/layer'
export default {
  name: 'Goods',
  data() {
    return {
      viewpic:'',
      yu:false,
      nopic:nopic,
      data: goods,
      gid: 0,
      tabn: 3,
      tabsons:0,
      framedprice:0,
      framedprice1:0,
      framedselected: 0,
      decorateTxt:'无边框',
      paperJamIdTxt:'无卡纸',
      decorate:0,//装裱框id
      paperJamId:0,//卡纸id
      don:0,
      pon:0,
      cmits:'查看全部评论',
      view:''
    }
  },
  created: function() {
    var self = this.fetchData();
    var gid=this.$route.params.gid;
    this.gid = gid;
    this.$store.dispatch('getGid',{ id:gid});
    this.$store.dispatch('getFramed',{ id:gid,type:1});
    this.$store.dispatch('getFramed',{ id:gid,type:2});
    this.$store.dispatch('getRecommendid',{ id:gid,pageNo:1,pageSize:4});
    this.$store.dispatch('getCommentgid',{ goodsId:gid,pageNo:1,pageSize:1});
    this.$store.dispatch('getScenario');
    // this.$store.dispatch('postRracegoodsId',{ goodsId:gid,type:0});//浏览
    // this.$store.dispatch('postRracegoodsId',{ goodsId:gid},{type:1});//收藏
  },
 mounted: function(){
  // this.$nextTick(function(v){
    
  // })
  // console.log(this.$store.state.good.gid)
  // console.log(this.$store.state.good.framed)
  // console.log(this.$store.state.good.recommendid)
  // console.log(this.$store.state.good.commentgid)
 },
 computed: {
    ...mapState({
      good: state => state.good.gid.list,
      framed:state => state.good.framed.list,
      framed2:state => state.good.framed.list2,
      art:state => state.artist.artistid.list,
      goodrec:state=>state.good.recommendid.list,
      comt:state=>state.good.commentgid.list
    }),
    ...mapGetters(['getShopcarInfo','postPlaceOrderInfo','postRracegoodsIdInfo','getScenarioInfo'])
  },
  methods: {
    // drag:function(event){
    //    dom = event.currentTarget
    // },
    // drop:function(event){
    //   event.preventDefault();
    //   event.target.appendChild(dom);
    // },
    // allowDrop:function(event){
    //   event.preventDefault();
    // },
    hs(id){
      var obj=document.getElementById(id);
       // transform 强制横屏
        var conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        obj.setAttribute('style','transform:rotate(90deg) translate('+((conH-conW)/2)+'px,'+((conH-conW)/2)+'px);width:'+conH+'px;height:'+conW+'px;transform-origin:center center 0px;-webkit-transform-origin: center center 0px')
    },
    getinfos(v, i, m) {
      console.log(v,i,m)
      if (m === 'tab') this.tabn = i;
      if(i==="tabsons") this.tabsons=v;
      //收藏
      if(m==="bar" && i===2){
        this.$store.dispatch('postRracegoodsId',{ goodsId:this.gid,type:1,token:sessionStorage.getItem('ukey')});
        // racegoodsId
        // var msg=this.$store.getters.postRracegoodsIdInfo.message;
        // layer.open({
        //   content:msg||'添加收藏',
        //   skin:'footer'
        // })
      }
      //返回上一页
      if(m==="icon" && i===0){
        this.$router.go(-1)
      }
      //我的购物车
      if(m==="icon" && i===2){
        this.$router.push({name:'Cart'})
      }
      //加入购物车
      // if((m==='icon' && i===2) || (m==='btn' && i===0)){
      if(m==='btn' && i===0){
        this.addCart();
        console.log('加入购物车:商品id=>',this.gid,i,m);
      }
      //立即购买
      if(m==='btn' && i===1){
        this.addBuy()
         console.log('加入购物车:商品id=>',this.gid,i,m);
      }
      //预览
      if(m==='bar' && i===0){
        console.log(screen.orientation)
        var _this=this;
        _this.yu=!(_this.yu);
        console.log( _this.yu)
        // this.hs('app')
      }
    },
    addCart(){
      var gid=parseInt(this.$route.params.gid),that=this;
     var k={
        "decorate": this.decorate,
        "editionNo": 0,
        "goodsId": gid||0,
        "num": 1,
        "paperJamId": this.paperJamId
      }
      this.$store.dispatch('putShopcar',{token:sessionStorage.getItem('ukey'),data:k});
    },
    addBuy(){
       var gid=parseInt(this.$route.params.gid),that=this;
       var k=[{
          "decorate": this.decorate,
          "editionNo": 0,
          "goodsId": gid||0,
          "num": 1,
          "paperJamId": this.paperJamId
        }]
        // sessionStorage.setItem('buydata',JSON.stringify(k))
        localStorage.setItem('buydata',JSON.stringify(k))
        this.$store.dispatch('postPlaceOrder',{token:sessionStorage.getItem('ukey'),data:k});
    },
    allComt(){
        var gid=this.$route.params.gid;
       this.$store.dispatch('getCommentgid',{goodsId:gid,pageNo:1,pageSize:20});
       this.cmits="已经是全部评论！"
    },
    framedChg(v){
      console.log(v)
    },
    fetchData(){
           // console.log(this.$route.path)
           console.log('路由发送变化doing...');
           // this.$router.push({path: this.$route.path})
     },
     sel(item,idx,type){
        var _this=this;
        if(type===1){
          console.log('装裱框')
          if(idx!==0){
            _this.don=idx;
            _this.decorate=item.framed_id;
            _this.decorateTxt=item.name+"("+item.comment+")";
          }else{
            _this.don=0;
            _this.decorate=0;
            _this.decorateTxt=item;
          }
        }
        if(type===2){
          console.log('卡纸')
           if(idx!==0){
            _this.pon=idx;
            _this.paperJamId=item.framed_id;
            _this.paperJamIdTxt=item.name;
          }else{
            _this.pon=0;
            _this.paperJamId=0;
            _this.paperJamIdTxt=item;
          }
        }
      // console.log(item,idx,type)
     }
  },
  filters: {
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
       return new Date(parseInt(v)).toLocaleString()
    }
  },
  watch: {
    good:function(v){
      this.$store.dispatch('getArtistid',{ id:v.artistid});
    },
    '$route':function(v){
        this.$router.go(0)
       // this.$router.push({path: v.path})
      // console.log(v.path)
      // console.log(v)
    },
    'getShopcarInfo':function(v){
      if(v&&v.code==="200"){
       this.$router.push({name: 'Cart'})
     }else if (v.code==="500") {
       layer.open({
          content:v.message||'未知详信息！',
          skin:'footer',
          time:3
        })
     }else{
       this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
     }
    },
    'postPlaceOrderInfo':function(v){
      if(v&&v.code==="200"){
        localStorage.setItem('buyinfo',JSON.stringify(v.result))
        // sessionStorage.setItem('buyinfo',JSON.stringify(v.result))
        this.$router.push({name: 'Attbuy'})
    }else if (v.code==="500") {
       layer.open({
          content:v.message||'未知详信息！',
          skin:'footer',
          time:3
        })
      }else{
        this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
      }
    },
    postRracegoodsIdInfo:function(v){
      // console.log(v)
      if(v && (v.code==="200" || v.code==="500")){
        layer.open({
          content:v.message||'操作成功！',
          skin:'footer',
           time:3
        })
      }else{
        this.$router.push({path:'/login',query:{ redirect:this.$route.path}})
      }
    },
    getScenarioInfo:function(v){
      if(v.code==='200'){
        this.view=v.result;
      }
    },
    view:function(v){
      // console.log(v[0]['url'])
      this.viewpic=v[0]['url']
    }
  },
  components: {
    Tabbar,
    GoodsBar
  }

}

</script>
<style scoped lang="less">
.view{
  /*display: none;*/
  z-index: 99999;
  position: fixed;
  background: #F6F6F6;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /*padding-top: 5rem;*/
  overflow: hidden;
    .arr{
      position: absolute;left:1.5rem;top: 2rem;z-index: 99;
    }
  .topbar{position: absolute;left: 0;top: 0;z-index: 99;width: 100%;background: #fff;height: 5rem;text-align: center;font-size: 2rem;color: #1b1b1b;line-height:5rem;padding-left: -2rem;}
  .v-box{position: relative;overflow: hidden;height: 100%;}
  .itempic{
    position: absolute;bottom: 0;width: 100%;left: 0;height: 6rem;overflow: auto;z-index: 99;
  }
  .picgood{width: 40%;position: absolute;top: 6rem;left: 20%;z-index: 98;}
  .picmax{position: relative;width: 1200px;overflow: auto;}
  .picmin{
    width: 1200px;overflow: auto;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    width: 20%;
    height: 6rem;
    background: #333;
    img{
      /*height: 100%;*/
    height: 6rem;
    }
  }
  .pic{
    height: 100%;
    width: 100%;
    overflow-x: auto;
    img{
      /*height: 100%;*/
      /*max-width: auto;*/
    }
  }

}

.good-kaung{
  position: relative;overflow: hidden;background: #fff;padding:1rem;
  .picf{
    width:4rem;height: 3rem;position: relative;float: left;overflow: hidden;
    border: 1px solid #ddd;
    margin:3px;
    color: #888;
    line-height:2.5rem;
    padding:0.5rem 0 0 0.5rem
  }
  .gons{border: 1px solid #888;}
}
.good-kazhi{
  position: relative;overflow: hidden;background: #fff;padding: 1rem;
  a{border: 1px solid #ddd;padding: 0.4rem;margin: 3px;color: #888;}
  .gons{border: 1px solid #888;}
}
.Goods{min-height:100%;overflow:hidden;
  img{max-width:100%;}
}
.mgb5rem{margin-bottom:5rem;}
.tabns{  /*padding:1rem 0;*/
width:100%;overflow:hidden;}
.line{width:100%;height:0;border-bottom:1px solid #eee;}
.bdline{width:100%;height:1.25rem;background:#F6F6F6;}
.gbox{padding:2rem;position:relative;background:#fff;}
.tabns1{.pic{padding:2rem 0;display:block;width:100%;
    img{width:100%;}
  }
  span{display:block;font-size:1.5rem;font-family:HiraginoSansGB;color:#888;}
  .good-info{.name{color:#1b1b1b;padding-bottom:0.3rem;font-size:2rem;}
    .tou{margin:2rem;text-align:center;position:absolute;width:10rem;height:6.25rem;overflow:hidden;top:0;right:0;cursor:pointer;
      img{width:6.25rem;border-radius:50%;}
      a{line-height:6.25rem;padding-left:1rem;color:#666;}
    }
  }
  .good-price{.price{font-size:2.38rem;font-family:Roboto-Regular;color:rgba(249,115,0,1);}
  }
  .good-tag{span{display:inline-block;*display:inline;*zoom:1;padding:0 1rem 0 0;}
    .icon{color:#F97300;padding-right:0.2rem}
  }
  .good-mount{span{display:inline-block;*display:inline;*zoom:1;padding:0 1rem 0 0;color:#666;}
    .mount-select{color:#888;}
  }
  .good-edit{span{color:#1b1b1b;font-size:1.75rem;padding-bottom:1rem}
    p{font-size:1.5rem;color:#888;}
  }
}
.tabns2{.tabs{text-align:center;
    a{font-size:1.75rem;color:#666;padding:0 2.5rem}
    .tabson{color:#F97300;}
  }
  .details{background:#fff;padding-top:1rem;
    .d-text{position:relative;overflow:hidden;padding:1rem;font-size:1.5rem;color:#666;line-height:2rem;
      img{width:100%;display:block;position:relative;margin:1rem 0;}
    }
    .d-info{span{display:block;font-size:1.75rem;color:#333;line-height:3rem}
      em{color:#666;}
    }
  }
}
.tabns3{.comment{background:#fff;
    .com-hd{padding:1rem 1.5rem;font-size:1.75rem;color:#1b1b1b;}
    .com-bd{padding:1rem 1.5rem 2.5rem 1.5rem;padding-left:5.5rem;position:relative;text-align:center;
      span,
      p{text-align:left;font-size:1.5rem;line-height:2rem;display:block;color:#777;}
      p{color:#1b1b1b;padding-top:0.5rem;padding-bottom:2rem;}
      .time{font-size:1.2rem;}
      a{padding:0.8rem 1.8rem;color:#F97300;border-radius:2rem;border:1px solid #F97300;}
    }
    .icon{font-size:2rem;background:#d2d2d2;position:absolute;color:#fff;top:1rem;left:1rem;padding:1rem;border-radius:50%;}
  }
  .art{text-align:center;
    .pic{width:9rem;height:9rem;overflow:hidden;border:1px dashed #555;margin:0 auto;margin-bottom:1rem;
      img{width:100%;border-radius:50%;}
    }
    span,
    a{display:block;color:#1b1b1b;line-height:2.5rem;font-size:1.75rem;}
    .info{color:#999;font-size:1.4rem;}
    a{padding-top:1rem;font-size:1.6rem;}
  }
  .guess{fieldset{width:50%;margin:0 auto;border:0;border-top:1px solid #999;}
    .pic{position:relative;display:block;height:16rem;overflow:hidden;}
    legend{color:#999;        /* for IE */background-color:#f6f6f6;padding:0 1rem}
    .boxs-bd-list1{li{width:50%;float:left;overflow:hidden;margin-bottom:1rem;
        a{display:block;padding:0.5rem;}
        img{box-shadow:1px 0 1.5rem #eee;border-radius:0px;width:100%;}
        span{display:block;text-indent:1rem;font-size:1.5rem;white-space:nowrap;text-overflow:ellipsis;text-indent: 0;}
        .title{font-family:HiraginoSansGB;color:rgba(27,27,27,1);
          em{color:#666;}
        }
        .price{font-family:Roboto-Regular;color:rgba(249,115,0,1);}
        &:hover{opacity:.8;filter:alpha(opacity=80);}
      ;}
    }
  }
}
</style>
