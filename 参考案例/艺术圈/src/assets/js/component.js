import Vue from 'vue';
/* 路由操作 返回-1,刷新0 */
let onego ={
  props: {
  	num: {
      type: Number,
      default: -1
    }
  },
  template: '<i class="icon icon-tiaozhuan" @click="goone()">&#160;</i>',
  methods: {
	  goone: function() {
	    return this.$router.go(this.num)
	  }
	}
}
export { onego }

