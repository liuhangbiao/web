<template>
<div class="tabbar">
   <div class="weui-flex">
   		<div class="weui-flex__item" v-for="(item,index) in liData" :class="{active:$route.matched[0].path===item.label}" >
   			<router-link :to="item.label">
   				<i class="tb-icon" :class="{active:$route.matched[0].path===item.label}">
	   				<img :src="($route.matched[0].path===item.label)?item.src1:item.src">
	   			</i>
				<i class="tb-link">
   					{{item.name}}
				</i>
   			</router-link>
   		</div>
   </div>
</div>

</template>
<script>
import {navbar} from 'js/config'
export default {
	data () {
		return {
		  active:0,
		  liData:navbar
		}
	}
}
</script>
<style scoped lang="less">
.tabbar{
   box-shadow:-1rem 0 1rem #ddd;
	position: fixed;
	width: 100%;
	height: 5rem;
	padding-top: 1rem;
	background:rgba(255,255,255,1);
	bottom: 0;
	text-align: center;
	z-index: 99;
	.tb-icon{
		margin: 0 auto;
		width:3.1rem;
		height:2.8rem;
		/*background:rgba(136,136,136,1);*/
		display: block;
		overflow: hidden;
		img{max-width: 100%;width: 100%;}
	}
	.tb-link{
		display: block;
		font-size:1.22rem;
		font-family:HiraginoSansGB;
		color:rgba(51,51,51,1);
	}
	.router-link-active{
		color:rgba(249,115,0,1);
		.tb-link{
			color:rgba(249,115,0,1);
		}
	}
}
</style>