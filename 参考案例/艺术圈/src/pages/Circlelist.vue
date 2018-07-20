<template>
  <div class="circlelist">
    <!-- bar -->
    <div class="cirBar">
        <div class="barinfo">
          群组<onego class="fl"></onego>
        </div>
        <div class="quanitem">
            <div class="pic"><a>
                <img :src="cgiddata.img" :onerror="nopic">
            </a></div>
              <div class="desc">
                <div class="title"><a>{{cgiddata.name|no}}</a></div>
                <div class="info">话题<em v-if="cgiddata.topicCount">{{cgiddata.topicCount}}</em><em v-else>0</em>关注<em v-if="cgiddata.followCount">{{cgiddata.followCount}}</em><em v-else>0</em></div>
              </div>
              <div class="atten">
                 <em v-if="cgiddata.isFollow===0" class="aon"><i class="icon-jia">&#160;</i>关注</em>
                 <em v-if="cgiddata.isFollow===1"><i class="icon-right3">&#160;</i>已关注</em>
              </div>
        </div>
    </div>
    <!-- 热点 -->
    <div class="chot" v-if="topdata.length">
      <a  v-for="item in topdata" :href="'#/circledd/'+item.id"><i class="icon icon-hot"></i>{{item.title|no}}</a>
    </div>
    <!-- 列表 -->
      <div class="topic" v-if="ctopdata.length" v-for="item in ctopdata">
        <!-- 信息 -->
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
        <!-- 主体 -->
        <div class="desc">
          <div class="title"><a :href="'#/circledd/'+item.id" v-if="item.title" v-text="item.title"></a></div>
         <div class="content" v-if="item.content" v-html="strSub(item.content,0,120)"></div>
          <div class="content" v-else>
            目前没有信息！
          </div>
          <div class="piclist" v-if="item.imgs">
            <img v-if="item.imgs" :onerror="nopic" :src="item.imgs" :alt="item.title">
          </div>
        </div>
        <!-- 来源数量 -->
        <div class="more">
          <div class="weui-flex">
            <div class="weui-flex__item"><i class="icon-zan1"></i><em v-if="item.praise_count">{{item.praise_count}}</em><em v-else>0</em></div>
            <div class="weui-flex__item"><i class="icon-pinglun"></i><em v-if="item.comment_count">{{item.comment_count}}</em><em v-else>0</em></div>
            <div class="weui-flex__item"><a :href="'#/circledd/'+item.id"><i class="icon-more"></i></a></div>
          </div>
        </div>
    </div>
    <!-- 列表 end-->
    <div class="mgb5rem"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue";
import {nopic} from "js/config"
export default {
  name: 'circlelist',
  data () {
    return {
      nopic:nopic,
      gid:0,
      topdata:'',
      ctopdata:'',
      cgiddata:''
    }
  },
  created: function() {
    var gid=this.$route.params.id;
    this.gid = gid;
      // this.$store.dispatch('getTopic',{pageNo:1,pageSize:5,token:sessionStorage.getItem('ukey')})
      this.$store.dispatch('getToplimit',{limit:5,groupId:gid})
      this.$store.dispatch('getCtopic',{pageNo:1,pageSize:15,groupId:gid})
      this.$store.dispatch('getCgid',{id:gid,token:sessionStorage.getItem('ukey')})

      // this.$store.dispatch('getGroup',{token:sessionStorage.getItem('ukey')})
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getCtopicInfo','getToplimitInfo','getCgidInfo'])
  },
  methods: {
      strSub(str,s,e){
        if(str.length>=60) return str.chinesesubstr(s, e)+'...';
        return str.chinesesubstr(s, e)
      }
    },
  watch:{
    getToplimitInfo:function(v){
       if(v.code==='200'){
          this.topdata=v.result;
        }
    },
    getCtopicInfo:function(v){
       if(v.code==='200'){
          this.ctopdata=v.result.datas;
        }
    },
    getCgidInfo:function(v){
      console.log(v)
      if(v.code==='200'){
          this.cgiddata=v.result;
        }
    }
  },
  components:{
    Tabbar
  }

}
</script>
<style type="text/css" lang="less" scoped>
  .circlelist{
    position: relative;
  }
  .cirBar{
    background:url('../assets/img/abg.jpg') top center no-repeat;
    background-size: 100% 100%;
      padding:2rem;
    .barinfo{
      text-align: center;color: #fff;font-size: 2.4rem;
    }
  }
  .quanitem{
    padding-top: 4rem;
  position: relative;
  overflow: hidden;
  .pic,.desc{float: left;}
  .atten{
    float: right;
    color: #fff;
    font-size: 1.8rem;
    padding-top: 1.5rem;
    .aon{
      color: #fff;
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
    .title{padding-top: 0.5rem;}
    .title a{
      font-size: 2rem;
      color: #fff;
    }
    .info{
      color: #fff;
      padding-top: 0.2rem;
      font-size: 1.5rem;
      em{padding:0 1.2rem 0  0.4rem;}
    }
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
      .pic{padding: 3px;overflow: hidden;img{max-width:100%;}}
    }
    .more{
      text-align: center;
      color: #999;font-size: 1.7rem;position: relative;overflow: hidden;padding:0.5rem 0;
      a{padding: 0 0.5rem;color: #999;cursor: pointer;}
      em{padding-left: 0.5rem;}
      .weui-flex__item{height: 2.4rem;line-height: 2.4rem;border-right: 2px solid #ddd;}
      .weui-flex__item:last-child{border-right: 2px solid #fff;}
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
