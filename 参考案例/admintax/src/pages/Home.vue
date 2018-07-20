<template>
  <div class="home">
    {{msg}}
    <h1>Hello World! <a href="#">are you ok?</a></h1>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Home'
    }
  },
  created(){
      this.$store.dispatch('getUser',{params: {'current': 1 }});
  },
  computed:{
    ...mapGetters([
        'getUserInfo'
    ])
  },
  methods: {
    submit: function() {
      this.search['current']=1;
      let _t=this.search;
      // var formData = JSON.stringify(this.search); // 这里才是你的表单数据
       this.$store.dispatch('getaLevel',{params: _t});
    },
    changePage:function(v){
      this.search['current']=v;
       let _t=this.search;
       this.$store.dispatch('getaLevel',{params: _t});
       // this.$store.dispatch('getaLevel',{params: {'current': v }});
    }
  },
   watch:{
    'getUserInfo':function(v){
        console.log(v)
    }
  },

}
</script>

<style scoped lang="less">
h1{
	a{font-size: 12px;}
}
</style>
