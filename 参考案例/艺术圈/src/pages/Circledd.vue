<template>
  <div class="circledd">
     <div class="barinfo">
      群组<onego class="fl"></onego>
    </div>
    <div class="line"></div>
    <!-- 详情 -->
    <div class="topic">
        <!-- 信息 -->
        <div class="info">
          <div class="pic">
             <img v-if="ti.headimg" :src="ti.headimg">
            <i v-else class="icon icon-head"></i>
          </div>
          <div class="name-time">
            <span class="name" v-if="ti.nickname" v-text="ti.nickname"></span>
            <span class="name" v-else >未知</span>
            <span class="time" v-if="ti.create_time">{{ti.create_time|formatDate('yyyy-MM-dd hh:mm:ss')}} <em>{{ti.group_name}}</em></span>
            <span class="time" v-else >未知</span>
          </div>
          <div class="view">
          <i class="icon-liulan"></i><em v-if="ti.view_count" v-text="ti.view_count">0</em>
            <em v-else>0</em>
          </div>
        </div>
        <!-- 主体 -->
        <div class="desc">

          <div class="title"  v-if="ti.title" v-text="ti.title"></div>
          <div class="content" v-if="ti.content" v-html="ti.content"></div>
          <div class="content" v-else>
            目前没有信息！
          </div>
          <div class="piclist" v-if="ti.imgs">
          <img :src="ti.imgs" :alt="ti.title" :onerror="nopic">
          </div>
        </div>
    </div>
    <!-- 详情 -->
    <div class="bline"></div>
    <!-- 评论 -->
    <div class="comment">
      <div class="com-hd">评论<em v-if="com.total_record" v-text="com.total_record"></em><em v-else>0</em></div>
      <div class="line"></div>
      <div class="com-bd" v-if="com.datas.length" v-for="item in com.datas">
        <div class="pic">
            <img v-if="item.headimg" :src="item.headimg">
            <i v-else class="icon icon-head"></i>
        </div>
        <div class="desc">
            <span class="name" v-if="item.nickname" v-text="item.nickname"></span>
            <span class="name" v-else >未知</span>
            <span class="time" v-if="item.create_time">{{item.create_time|getDateDiff}}</span>
            <span class="time" v-else >未知</span>
            <span class="dd" v-if="item.content" v-text="item.content"></span>
        </div>
      </div>
      <div class="com-bd" v-else>暂时还没有评论</div>
    </div>
    <!-- 评论 end-->
    <!-- 评论框 -->
    <div class="com-frame">
      <input type="text" class="com-fipt fl" v-model="comval" placeholder="发表评论" @keyup.13="putComm($event)">
      <span class="like fr" @click="izan()"><i class="icon-zan2"></i><em v-if="ti.praise_count" v-text="ti.praise_count"></em><em v-else>0</em></span>
    </div>
    <!-- 评论框 end-->
    <div class="mgb7rem"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue";
import {nopic} from "js/config"
import {layer} from 'js/lib/layer'
export default {
  name: 'circledd',
  data () {
    return {
      nopic:nopic,
      comval:'',
      ti:'',
      com:''
    }
  },
  mounted(){
  },
  created: function() {
    var gid=this.$route.params.id;
    this.gid = gid;
    this.$store.dispatch('getToppicid',{id:gid})
    this.$store.dispatch('putView',{id:gid,token:sessionStorage.getItem('ukey')})
    this.$store.dispatch('getCommentid',{id:gid,pageNo:1,pageSize:12})
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getToppicidInfo','getCommentidInfo','putZanInfo','postAddcommentInfo'])
  },
  methods: {
    strSub(str,s,e){
      if(str.length>=60) return str.chinesesubstr(s, e)+'...';
      return str.chinesesubstr(s, e)
    },
    izan(){
      this.$store.dispatch('putZan',{id:this.gid})
    },
    putComm(){
      if(this.comval!==''){
        this.$store.dispatch('postAddcomment',{id:this.gid,content:this.comval,token:sessionStorage.getItem('ukey')})
      }else{
        layer.open({
            content:'你还没有输入！',
            skin: 'footer',
            time:3
        })
      }
      // console.log('xxx',this.comval)
    }
  },
  watch:{
    getToppicidInfo:function(v){
      if(v.code==='200'){
        this.ti=v.result;
      }
    },
    getCommentidInfo:function(v){
      if(v.code==='200'){
        this.com=v.result
      }
    },
    putZanInfo:function(v){
      if(v!=='200'){
         layer.open({
            content: v.message || '未知详细！',
            skin: 'footer',
            time:3
        })
      }
    },
    postAddcommentInfo:function(v){
      if(v.code==="200"){
        this.comval='';
        this.$store.dispatch('getCommentid',{id:this.gid,pageNo:1,pageSize:12})
      }
      layer.open({
            content: v.message || '未知详细！',
            skin: 'footer',
            time:3
        })
    }
  },
  components:{
    Tabbar
  }

}
</script>
<style type="text/css" lang="less" scoped>
.circledd{
  position: relative;background: #fff;
}
.barinfo{
  padding:1rem;
  text-align: center;color: #1B1B1B;font-size: 2.4rem;
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
          em{
            color: #333;
            padding-left:0.4rem
          }
        }
      }
      .view{
        position: absolute;
        right: 1rem;
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
        img{
          margin:0.5rem 0;
        }
      }
    }
     .piclist{
      position: relative;overflow: hidden;padding: 1rem 0;
    }
  }
.comment{
  position: relative;
  .com-hd{
    color: #1B1B1B;
    font-size: 1.8rem;
    padding: 1rem;
    em{padding-left: 0.4rem;}
  }
  .com-bd{
    border-bottom: 1px solid #e5e5e5;
    margin:0 1.5rem;padding: 1.5rem 0;overflow: hidden;position: relative;
    .pic{position: absolute;width: 5rem;height: 5rem;overflow: hidden;border-radius: 50%;text-align: center;
      img{height: 100%;}
    }
    .icon-head{width: 4.5rem;height: 4.5rem;overflow: hidden;line-height: 4.5rem;}
    .desc{
      margin-left: 6rem;overflow: hidden;position: relative;
      span{
        display: block;
      }
      .name{color: #666;font-size: 1.8rem;}
      .time{color: #888;font-size: 1.4rem;}
      .dd{
        color: #1B1B1B;font-size: 1.7rem;
      }
    }
  }
  .com-bd:last-child{
    border: none;
  }
}
.com-frame{
  background: #EAECF0;
  /*height: 7rem;*/
  padding: 1.5rem 0;
  position: fixed;
  _position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  .com-fipt{
    position: relative;
    width: 70%;
    margin:0 1rem;
    background: #fff;
    font-size: 1.8rem;
    border: none;
    border-radius:2rem;
    text-indent: 1rem;
    height: 3rem;
    color: #888;  
  }
  .like{
    padding-right: 1rem;
    padding-top: 0.5rem;
    i{color: #F97300;padding-right: 5px;font-size: 3rem;}
    em{color: #888;font-size: 2rem;}
  }
}
.line{
  width: 100%;
  height: 1px;
  background: #f6f6f6;
}
.mgb5rem { margin-bottom: 5rem; }
.mgb7rem { margin-bottom: 7rem; }
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
