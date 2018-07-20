<template>
  <div class="circle">
    <!-- 底部导航 -->
    <Tabbar></Tabbar>
    <div class="ctab">
      <span>
        <a :class="{con:active===0}" @click="active=0">话题</a>
        <a :class="{con:active===1}" @click="active=1">群组</a>
      </span>
    </div>
    <div class="line"></div>
    <!-- 话题 -->
    <div class="chot" v-if="active===0 && topdata">
      <a  v-for="item in topdata" :href="'#/circledd/'+item.id"><i class="icon icon-hot"></i>{{item.title|no}}</a>
    </div>
    <div class="topic" v-if="active===0 && cirdata!=''" v-for="item in cirdata">
        <div class="info">
          <div class="pic">
            <img v-if="item.headimg" :src="item.headimg">
            <i v-else class="icon icon-head"></i>
          </div>
          <div class="name-time">
            <span class="name" v-if="item.nickname" v-text="item.nickname"></span>
            <span class="name" v-else >未知</span>
            <span class="time" v-if="item.create_time">{{item.create_time|getDateDiff}}</span>
            <span class="time" v-else >未知</span>
          </div>
          <div class="view">
            <i class="icon-liulan"></i><em v-if="item.view_count" v-text="item.view_count">0</em>
            <em v-else>0</em>
          </div>
        </div>
        <div class="desc">
          <div class="title"><a :href="'#/circledd/'+item.id" v-if="item.title" v-text="item.title"></a></div>
          <div class="content" v-if="item.content" v-html="strSub(item.content,0,120)"></div>
          <div class="content" v-else>
            目前没有信息！
          </div>
          <div class="piclist" v-if="item.imgs">
          <img :src="item.imgs" :alt="item.title" :onerror="nopic">
          </div>
        </div>
        <div class="more">
          <a class="fl"><i class="icon-zan1"></i><em v-if="item.praise_count">{{item.praise_count}}</em><em v-else>0</em></a>
          <a class="fl"><i class="icon-pinglun"></i><em v-if="item.comment_count">{{item.comment_count}}</em><em v-else>0</em></a>
          <a class="fr" v-if="item.group_name" v-text="'来自：'+item.group_name" :href="'#/circlelist/'+item.group_id"></a>
        </div>
    </div>
    <!-- 话题 end-->
    <!-- 群组 -->
    <div class="qtab" v-if="active===1">
      <a :class="{ton:isTab===0}" @click="isTab=0">全部群组</a>
      <a :class="{ton:isTab===1}" @click="isTab=1">已关注</a>
      <a :class="{ton:isTab===2}" @click="isTab=2">未关注</a>
    </div>
    <div class="bline"></div>
    <div class="qun" v-if="isTab===0 && active===1 && gdata.length">
      <ul class="quanitem">
          <li v-for="item in gdata">
              <div class="pic"><a href="'#/circlelist/'+item.id">
                <img v-if="item.img" :src="item.img" :onerror="nopic">
                <img v-else :src="nopic">
              </a></div>
              <div class="desc">
                <div class="title"><a :href="'#/circlelist/'+item.id">{{item.name|no}}</a></div>
                <div class="info">话题<em v-if="item.topic_count">{{item.topic_count}}</em>关注<em v-if="item.follow_count">{{item.follow_count}}</em></div>
              </div>
              <div @click="like(item.id,item.focus)" class="atten">
                 <em class="aon" v-if="item.focus==='未关注'"><i class="icon-jia">&#160;</i>关注</em>
                 <em v-if="item.focus==='已关注'"><i class="icon-right3">&#160;</i>已关注</em>
              </div>
          </li>
      </ul>
    </div>
    <div class="qun" v-if="isTab===1 && active===1">
      <ul class="quanitem">
         <li v-if="gdata.length && item.focus==='已关注'" v-for="item in gdata">
              <div class="pic"><a href="'#/circlelist/'+item.id"><img v-if="item.img" :src="item.img" :onerror="nopic">
                <img v-else :src="nopic"></a></div>
              <div class="desc">
                <div class="title"><a :href="'#/circlelist/'+item.id">{{item.name|no}}</a></div>
                <div class="info">话题<em v-if="item.topic_count">{{item.topic_count}}</em>关注<em v-if="item.follow_count">{{item.follow_count}}</em></div>
              </div>
              <div @click="like(item.id,item.focus)" class="atten">
                 <em v-if="item.focus==='已关注'"><i class="icon-right3">&#160;</i>已关注</em>
              </div>
          </li>
      </ul>
    </div>
        <div class="qun" v-if="isTab===2 && active===1">
      <ul class="quanitem">
        <li v-if="gdata.length && item.focus==='未关注'" v-for="item in gdata">
              <div class="pic"><a href="'#/circlelist/'+item.id"><img v-if="item.img" :src="item.img" :onerror="nopic">
                <img v-else :src="nopic"></a></div>
              <div class="desc">
                <div class="title"><a :href="'#/circlelist/'+item.id">{{item.name|no}}</a></div>
                <div class="info">话题<em v-if="item.topic_count">{{item.topic_count}}</em>关注<em v-if="item.follow_count">{{item.follow_count}}</em></div>
              </div>
              <div @click="like(item.id,item.focus)" class="atten">
                 <em  class="aon" v-if="item.focus==='未关注'"><i class="icon-jia">&#160;</i>关注</em>
              </div>
          </li>
      </ul>
    </div>
    <!-- 群组 end-->
    <div class="mgb5rem"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue";
import {nopic} from "js/config"
import {layer} from 'js/lib/layer'
export default {
  name: 'circle',
  data () {
    return {
      active:0,
      isTab:0,
      topdata:'',
      cirdata:'',
      gdata:'',
      nopic:nopic
    }
  },
  created: function() {
      this.$store.dispatch('getTopic',{pageNo:1,pageSize:5,token:sessionStorage.getItem('ukey')})
      this.$store.dispatch('getToplimit',{limit:5})
      this.$store.dispatch('getGroup',{token:sessionStorage.getItem('ukey')})
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getTopicInfo','getToplimitInfo','getGroupInfo','getGrouplikeInfo'])
  },
  mounted(){
  },
  methods: {
    laymsg(v){
        layer.open({
          content:v||'未知信息！',
          skin:'footer',
          time:3
        })
    },
    like(id,v){
         var  _that=this;
      if(v==='已关注'){
          layer.open({
            content: '确认要取消关注？'
            ,btn: ['确认', '取消']
            ,skin: 'footer'
            ,yes: function(index){
              _that.$store.dispatch('getGrouplike',{id:id,status:'un',token:sessionStorage.getItem('ukey')})
            }
          })
      }else if(v==='未关注'){
        layer.open({
        content: '确认加入关注？'
        ,btn: ['确认', '取消']
        ,skin: 'footer'
        ,yes: function(index){
          _that.$store.dispatch('getGrouplike',{id:id,status:'on',token:sessionStorage.getItem('ukey')})
        }
      })
      }else{
         _that.laymsg('无法执行操作！')
      }
    },
    strSub(str,s,e){
      if(str.length>=60) return str.chinesesubstr(s, e)+'...';
      return str.chinesesubstr(s, e)
    }
  },
  watch:{
    getTopicInfo:function(v){
      if(v.code==="200"){
        this.cirdata=v.result.datas;
      }
    },
    getToplimitInfo:function(v){
      if(v.code==='200'){
        this.topdata=v.result;
      }
    },
    getGroupInfo:function(v){
      if(v.code==='200'){
        this.gdata=v.result.datas;
      }
    },
    getGrouplikeInfo:function(v){
      if(v.code==='200'){
         this.$store.dispatch('getGroup',{token:sessionStorage.getItem('ukey')})
       }else{
         this.laymsg(v.message);
       }
    }
  },
  components:{
    Tabbar
  }

}
</script>
<style type="text/css" lang="less" scoped>
  .circle{
    position: relative;
  }
  .ctab{
    position: relative;
    background: #fff;text-align: center;
    padding:1rem 0;
    span{
      position: relative;
      display: inline-block;
      border: 1px solid #1b1b1b;
      border-radius:3px;
    }
    a{
      font-size: 2rem;color: #1b1b1b;
      /*background: #f09;*/
      display: inline-block;
      *display: inline;
      *zoom: 1;
      padding:0.8rem 2.5rem;
    }
    .con{
      background: #1b1b1b;
      color: #fff;
    }
  }
  .chot{
    background: #fff;
    padding: 1.5rem 1rem;
    a{
      padding:0.5rem 0;
      display: block;
      font-size:1.86rem;
      color: #1b1b1b;
    }
    .icon{
      color: #F97300;
      font-size: 2.4rem;
    }
  }
  .topic{
    position: relative;
    margin-top: 1.8rem;
    background: #fff;
    padding: 1rem;
    .info{
      position: relative;
      overflow: hidden;
      .pic{
        float: left;
        width: 5.6rem;
        height: 5.6rem;
        border-radius:50%;
        overflow: hidden;
        text-align: center;
        img{
          width: 100%;
          min-height:100%;
          overflow: hidden;
        }
      }
      .name-time{
        float: left;
        padding: 0.5rem 2rem;
        span{
          display: block;
          text-align: left;
        }
        .name{
          color: #1b1b1b;
          font-size: 2rem;
        }
        .time{
          color: #888;
          font-size: 1.4rem;
        }
      }
      .view{
        float: right;
        font-size: 1.7rem;
        padding:1rem;
        i{
          color: #dcdcdc;
          font-size: 2.2rem;
          padding-top: 3px;float: left;
        }
        em{color: #999;float: right;padding-left: 0.5rem;}
      }
    }
    .desc{
      position: relative;overflow: hidden;
      .title{
        padding: 0.5rem 0;
        color: #1b1b1b;
        font-size: 2rem;
      }
       a{color: #1b1b1b;cursor: pointer; }
      .content{
        color: #666;
        font-size: 1.7rem;
      }
    }
    .piclist{
      position: relative;overflow: hidden;padding: 1rem 0;
      /*.pic{padding: 3px;overflow: hidden;img{max-width:100%;}}*/
    }
    .more{
      color: #999;font-size: 1.7rem;position: relative;overflow: hidden;padding:0.5rem 0;
      a{padding: 0 0.5rem;color: #999;}
      em{padding-left: 0.5rem;}
    }
  }
.qtab {
  background: #fff;
  padding: 1.4rem 1rem;
  text-align: center;
  a{
    padding:1.4rem 0;
    font-size:1.86rem;
    color: #666;
     border-bottom: 2px solid #fff;
    margin: 0 2.4rem
  }
  .ton {
    border-bottom: 2px solid #F97300;
    color: #F97300;
  }
}
.qun{
  position: relative;
  background: #fff;
}
.quanitem{
  position: relative;
  li{
    position: relative;
    overflow: hidden;
    padding:1rem;
    border-bottom: 1px solid #f6f6f6;
  }
  .pic,.desc{float: left;}
  .atten{
    float: right;
    color: #999;
    font-size: 1.8rem;
    padding-top: 1.5rem;
    .aon{
      color: #F97300;
    }
  }
  .pic{
    float: left;
    width: 5.8rem;
    height: 5.8rem;
    overflow: hidden;
    border-radius:3px;
    img{
      min-height: 5.8rem;
    }
  }
  .desc{
    padding-left: 2rem;
    .title{
      padding-top: 0.5rem;
      font-size: 2rem;
      color: #1b1b1b;
      a{
        color: #1b1b1b;
      }
    }
    .info{
      color: #888;
      padding-top: 0.2rem;
      font-size: 1.5rem;
      em{padding:0 1.2rem 0  0.4rem;}
    }
  }
}
  .line{
    width: 100%;
    height: 1px;
    background: #f6f6f6;
  }
  .mgb5rem { margin-bottom: 5rem; }
.bline{border-bottom: 1.8rem solid #f6f6f6;height: 0;}
.icon-head{
  position: absolute;
  left: 0;
  top: 0;
  width: 5.4rem;
  height: 5.4rem;
  line-height: 5.4rem;
  font-size: 4rem;color: #fff;
  background: #cdcdcd;
  border-radius:50%;
  border: 3px solid #fff;
  /*padding: 1rem;*/
}
</style>
