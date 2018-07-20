<template>
  <div class="login">
	<p class="info-bar">
		<!-- <router-link :to="data.listRf[0]['url']" class="icon icon-tiaozhuan"></router-link> -->
    <onego></onego>
		{{data.listRf[0]['text']}}
	</p>
  <div class="weui-cell">
    <div class="weui-cell__hd">+86</div>
    <div class="weui-cell__bd">
        <input class="weui-input" type="number"  v-model.trim ='username' pattern="[0-9]*" :placeholder="data.from[0]"/>
    </div>
  </div>
   <div class="weui-cell ">
   		 <div class="weui-cell__hd">&#160;&#160;</div>
        <div class="weui-cell__bd">
            <input class="weui-input" type="password"  v-model.trim ='password' :placeholder="data.from[1][1]"/>
        </div>
    </div>
    <!-- 登录按钮 -->
     <div class="msg" v-text="msg">
        {{message}}
     </div>
   <div class="weui-flex ">
   <!-- <a href="javascript:void(0)" class="w-btn weui-btn">注册</a> -->
    <a  class="w-btn weui-btn " :class="{wbtnok:isNull===false}" @click="login()" v-text="data.from[2][0]"></a>
    <!-- <router-link to="#" class="w-btn weui-btn" @click="login()">{{data.from[2][0]}}</router-link> -->
   </div>
   <!-- 注册/忘记密码 -->
   <div class="weui-flex infos">
	   	<div class="weui-flex__item">
	   		<router-link :to="data.listRf[1]['url']">{{data.listRf[1]['text']}}</router-link>
	   	</div>
	   	<div class="weui-flex__item tar">
	   		<router-link :to="data.listRf[2]['url']">{{data.listRf[2]['text']}}</router-link>
	   	</div>
   </div>
   <!-- {{info}} -->
   <!-- 分享 -->
   <Share></Share>
   <!-- 分享 end-->
</div>
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {login} from 'js/config';
import Share from "comps/Share.vue";
import {layer} from 'js/lib/layer'
export default {
  name: 'login',
  data () {
    return {
      data:login,
      username:'17898179973',
      password:'123456',
      msg:'',
      isNull:true,
    }
  },
   computed:{
    ...mapState({
        token:state => state.user.login.token,
        message:state => state.user.login.message,
        isuser:state =>state.user.login.isuser
    }),
    ...mapGetters([
        'getLoginInfo'
    ]),
  },
  methods:{
    login(){
      var reg=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
      if (!reg.test(this.username)) {
        layer.open({
           content:'请正确输入手机号！',
           skin:'footer'
        })
        // this.msg="请正确输入手机号！"
      }else{
          // this.msg=this.$store.state.user.login.message;
          // layer.open({
          //    content:this.$store.state.user.login.message||'未知信息！',
          //    skin:'footer'
          // })
          this.$store.dispatch('postCode',{'username':this.username,'password':this.password});
      }
    }
  },
  mounted(){
    // console.log(infos)
  },
  watch:{
    'getLoginInfo':function(d){
      if(d && d.code==="200" && d.result){
          var _that=this;
          this.$nextTick(function(){
            var ru=_that.$route.query.redirect||'/home';
             _that.$router.push({path:ru});
             // _that.$router.go(0)
          })
      }else{
        layer.open({
           content:d.message||'未知信息！',
           skin:'footer'
        })
      }
    },
    'token':function(d){
      // if(d!=""){ localStorage.setItem('ukey',d||'');}
    },
    'message':function(v){
      layer.open({
           content:v||'未知信息！',
           skin:'footer'
        })
      // this.msg=v;
    },
    'username':function(d){
        this.isNull=(d!=='')?false:true;
    }
  },
  components:{
    Share
  }
}
</script>
<style scoped lang="less" src='less/loginReg.less'></style>