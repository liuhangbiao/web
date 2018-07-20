<template>
  <div class="reg">
	<p class="info-bar">
		<router-link :to="data.listRf[0]['url']" class="icon icon-tiaozhuan"></router-link>
		{{data.listRf[0]['text']}}
	</p>
	<div class="weui-flex tac">
		<p class="info-bar m0a">{{timertext}}</p>
	</div>
	<!-- <p class="info-bar info-bar1">{{timer+'S后'+data.from[0][0]}}</p> -->
	<div class="weui-cell">
            <input class="weui-input" v-model.trim ='msgCode' type="number" :placeholder="data.from[1][0]"/>
    </div>
	<div class="weui-cell">
            <input class="weui-input"v-model.trim ='password' type="password" :placeholder="data.from[2][0]"/>
    </div>
      <div class="msg" v-text="msg">
        {{message}}
     </div>
    <div class="weui-flex">
      <a class="w-btn weui-btn w-btnok" @click="addReg()">{{data.from[3][0]}}</a>
			<!-- <router-link to="#" class="w-btn weui-btn w-btnok">{{data.from[3][0]}}</router-link> -->
	</div>
	 <div class="weui-flex infos infos-sub">
			<a :href="data.from[4][2]" :class="data.from[4][0]" class="m0a">&#160;{{data.from[4][1]}}</a>
	</div>
 </div>
</template>
<script>
import {regok} from 'js/config';
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {layer} from 'js/lib/layer'
export default {
  name: 'reg',
  data () {
    return {
      data:regok,
      timert:regok.from[0][0],
      timer:regok.from[0][1],
      msg:'',
      timertext:'',
      mobile:'',
      msgCode:'',
      password:''
    }
  },
  created: function() {
    this.mobile = this.$route.params.mobile;
  },
    computed:{
    ...mapState({
        message:state => state.user.regs.message
    }),
    ...mapGetters([
        'getRegsInfo'
    ]),
  },
  methods: {
  	send(){
        let me = this;
        // me.sendMsgDisabled = true;
        let interval = window.setInterval(function() {
          if ((me.timer--) <= 0) {
            me.timer = 0;
            me.timertext="验证码已发送,请注意查收"
            // me.sendMsgDisabled = false;
            window.clearInterval(interval);
          }else{
          	me.timertext=me.timer+"S后"+me.timert;
          }
        }, 1000);
    },
    addReg(){
      var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
      if (!pass.test(this.password)) {
        layer.open({
           content:'密码由6-21字母和数字组成，不能是纯数字或纯英文',
           skin:'footer'
        })
        // this.msg="密码由6-21字母和数字组成，不能是纯数字或纯英文！"
      }else{
          this.$store.dispatch('addReg',{'mobile':this.mobile,'msgCode':this.msgCode,'password':this.password});
          // this.msg=this.$store.state.user.codes.message;
      }
    }
  },
   watch:{
    'getRegsInfo':function(d){
      if(d.code==="200"){
        this.$router.push({path:'/home'});
      }else if (d.code==="500") {
        // this.msg=d.message
         layer.open({
           content:d.message||'未知信息！',
           skin:'footer'
        })
         this.$router.push({path:'/home'});
      }else{
         layer.open({
           content:'注册失败！',
           skin:'footer'
        })
        // this.msg="注册失败！"
      }
    }
  },
   mounted () {
   	 this.send();
   }
}
</script>
<style scoped lang="less" src='less/loginReg.less'></style>