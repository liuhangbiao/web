<template>
<div class="weui-flex share">
	<div class="weui-flex__item" v-for="item in data">
		<!-- <a :href="item[1]" :class="item[0]" data-id='x' class="share-icon" @click="share"></a> -->
		<a :class="item[0]" class="share-icon" @click="share(item[2])"></a>
		<!-- <router-link :to="item[1]" :class="item[0]" class="share-icon"></router-link> -->
	</div>
</div>
</template>
<script>
import {share} from 'js/config'
export default {
	data () {
		return {
		  data:share
		}
	},
	methods:{
		share(v){
			console.log(v)
		}
  	},
}
</script>
<style scoped lang="less">
.share{
	padding:8rem 0 15rem 0;
	text-align: center;
	.share-icon{
		border-radius: 50%;
		border: 1px solid rgba(53,205,53,1);
		color: rgba(53,205,53,1);
		padding: 1rem;
		font-size:1.82rem;
	}
	.share-icon1{
		border: 1px solid rgba(230,22,45,1);
		color: rgba(230,22,45,1);
	}
	.share-icon2{
		border: 1px solid rgba(59,89,152,1);
		color: rgba(59,89,152,1);
	}
}
</style>