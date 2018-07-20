<template>
  <div class="reg">
	<p class="info-bar">
		<router-link :to="data.listRf[0]['url']" class="icon icon-tiaozhuan"></router-link>
		{{data.listRf[0]['text']}}
	</p>
	<div class="weui-flex tac">
		<p class="info-bar m0a">{{data.from[0][0]}}</p>
	</div>
	<div class="weui-cell">
		<div class="weui-cell__hd">+86</div>
		<div class="weui-cell__bd">
			<!-- <input class="weui-input" type="number"  v-model.trim ='mobile' pattern="[0-9]*" :placeholder="data.from[1][0]"/> -->
			<input class="weui-input" type="number"  v-model.trim ='mobile' pattern="[0-9]*" :placeholder="data.from[1][0]"/>
		</div>
	</div>
	<div class="msg" v-text="msg">
        {{message}}
     </div>
	<div class="weui-flex">
    <a  class="w-btn weui-btn w-btnok" @click="getPhonCode()">{{data.from[2][0]}}</a>
    <!-- <router-link :to="data.from[2][1]"  class="w-btn weui-btn w-btnok">{{data.from[2][0]}}</router-link> -->
   </div>
	<!-- 登录 -->
	<div class="weui-flex infos">
		<div class="weui-flex__item tac">
			<router-link :to="data.listRf[1]['url']">{{data.listRf[1]['text']}}</router-link>
		</div>
	</div>
	<!-- 分享 -->
	<Share></Share>
	<!-- 分享 end-->
 </div>
</template>
<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
import {reg} from 'js/config'
import Share from "comps/Share.vue"
import {layer} from 'js/lib/layer'
export default {
  name: 'reg',
  data () {
    return {
      data:reg,
      mobile:'',
      msg:''
    }
  },
   computed:{
    ...mapState({
        message:state => state.user.codes.message
    }),
    ...mapGetters([
        'getCodeInfo'
    ]),
  },
  methods:{
    getPhonCode(){
    	var reg=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
    	if (!reg.test(this.mobile)) {
        layer.open({
           content:'请正确输入手机号！',
           skin:'footer'
        })
    		// this.msg="请正确输入手机号！"
    	}else{
      		this.$store.dispatch('getCode',{'mobile':this.mobile});
    	}
    }
  },
  watch:{
    'getCodeInfo':function(d){
    	if(d.code==="200"){
    		 this.$router.push({name:'reg',params: {mobile:this.mobile}});
    	}else{
          layer.open({
             content:'发送失败！',
             skin:'footer'
          })
    		// this.msg="发送失败！"
    	}
    }
  },
  components:{
    Share
  }
}
</script>
<style scoped lang="less" src='less/loginReg.less'></style>