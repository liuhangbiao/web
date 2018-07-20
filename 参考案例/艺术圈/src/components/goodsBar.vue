<template>
<div>
	<div class="weui-flex goodsbar">
		<div class="weui-flex__item">
			<!-- <a vs-for="(item,index) in data.totab" @click="info(item.text,index)" :href="item.href"  :class="[item.clasz,{gon:ggon == index && !item.clasz}]">{{item|iconfilters}}</a> -->
			<a v-for="(item,index) in data.totab" v-if="item.text" :class="{gon:ggon == index && !item.clasz}" @click.stop="info(item.text,index,'tab')">{{item.text}}</a>
			<a v-for="(item,index) in data.totab" v-if="item.clasz" :class="item.clasz" :href="item.href"  @click.stop="info('',index,'icon')"></a>
		</div>
	</div>
   <div class="weui-flex goodsbarfix">
   		<div v-for="(item,index) in data.bottombar.link"  class="weui-flex__item"  @click.stop="info(item[1],index,'bar')">
   			<a>
   				<i class="tb-icon" :class="item[0]"></i>
				<i class="tb-link">
   					{{item[1]}}
				</i>
   			</a>
   		</div>
   		<div class="weui-flex__item2" v-for="(item,index) in data.bottombar.btn"  @click.stop="info(item[1],index,'btn')">
   			<a class="addCart" :class="item[0]">
   				{{item[1]}}
   			</a>
   		</div>
   </div>
</div>
</template>
<script>
import {goodsbar} from 'js/config'
export default {
	data () {
		return {
		  data:goodsbar,
		  ggon:3
		}
	},
	 methods: {
	   info(v,i,m,e){//顶部
	   	// console.log(this)
	   	// e.preventDefault();
	   	this.$emit('gbinfos',v,i,m);
	   	if(m==='tab') 	this.ggon=i;
	   }
  },
    //自定义在实例
    filters: {
        // iconfilters: function(v, t) {
        // 	if(v.clasz){
        // 		return ''
        // 	}else{
        // 		return v.text
        // 	}
        // }
    }
}
</script>
<style scoped lang="less">
.goodsbar{
	background:#fff;text-align:center;height:5rem;box-shadow:0.1rem 0 1rem #ccc;
	a{display:inline-block;*display:inline;*zoom:1;line-height:5rem;font-size:2rem;font-family:HiraginoSansGB;color:#888;margin: 0 1rem;}
	.gon{
		border-bottom: 2px solid #1b1b1b;
	}
	.icon{font-weight: bold;}
	.weui-flex__item{
		padding:0 1rem
	}
}

.weui-flex__item2{
	-webkit-box-flex: 2;
    -webkit-flex: 2;
    flex: 2;
}

.goodsbarfix{
   	box-shadow:-0.1rem 0 1rem #ccc;
	position: fixed;
	width: 100%;
	height: 6rem;
	/*padding-top: 1rem;*/
	background:rgba(255,255,255,1);
	bottom: 0;
	text-align: center;
	z-index: 99;
	color:rgba(102,102,102,1);
	.tb-icon{
		padding-top:1rem;
		margin: 0 auto;
		width:3.1rem;
		/*height:3rem;*/
		display: block;
		overflow: hidden;
		font-size: 3rem;
	}
	.tb-link{
		display: block;
		font-size:1.38rem;
		line-height: 2rem;
		font-family:HiraginoSansGB;
	}
	.addCart,.attBuy{
		line-height: 6rem;
		background: #1b1b1b;display: block;
		font-size:2rem;
		font-family:HiraginoSansGB;
		color:rgba(255,255,255,1);
	}
	.attBuy{
		background: #F97300;
	}
}
</style>