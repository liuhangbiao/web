<template>
  <div class="About">
    <!-- topbar -->
    <div class="weui-flex aboutbar">
      <div class="weui-flex__item">
        <a class="icon-tiaozhuan fl" href="#/my"></a>
        <a>关于我们</a>
      </div>
    </div>
    <!-- list -->
    <div class="v-about">
        <div class="pic">
            <img src="~img/logo.png">
        </div>
      <span>当前版本：v1.0</span>
    </div>
    <div class="abox">
      项目于 2015 入选为文化部中国文化产业重点项目。项目坐落于重庆九龙坡黄桷坪102艺术基地，毗邻四川美术学院，利用周边特有的艺术资源与团队，重庆云艺轩文化科技有限公司团队将其打造成国内最具影响力的文化艺术品互联网平台。

“艺术圈”将是实现原创艺术品线上线下 O2O 交易、专业运营艺术家、艺术家文化交流的平台。“艺术圈”网络交易平台包括线上艺术作品的电子商城，专业运营艺术家，线上 3D 艺术馆，线上艺术家圈子交流，线下艺术交流活动配合的 O2O 综合性艺术平台。“艺术圈”通过网络平台向市场公开信息，使大量原创作品资源在平台上聚集，形成庞大的艺术品资源库，吸引更多艺术家入驻。机构、个人都可以通过平台把艺术品“入驻进去、推广出来”。
    </div>
    <div class="acopy">
      <span class="cc">重庆云艺轩文化科技有限公司</span>
      <span>Copyright ©2016-2025</span>
    </div>
    <!-- <div class="mgb5rem">&#160;</div> -->
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  created: function() {
    this.gid = this.$route.params.gid;
  },
  mounted() {
    // console.log(Mock);
    // console.log('ssss');
  },
  methods: {},
  watch: {
  }
}
</script>
<style scoped lang="less">
.aboutbar {
  background: #fff;
  text-align: center;
  height: 5rem;
  box-shadow: 0.1rem 0 1rem #ccc;
  a {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    line-height: 5rem;
    font-size: 2rem;
    font-family: HiraginoSansGB;
    color: #1b1b1b;
    margin: 0 1rem;
  }
  .icon {
    font-weight: bold;
  }
  .weui-flex__item {
    padding: 0 1rem
  }
}
.mgb5rem {
  margin-bottom: 5rem;
}

.v-about,.acopy{
  text-align: center;
}
.v-about{
  padding:3rem 0;
  .pic{
    width: 9rem;
    margin: 1rem auto;
    img{width: 100%;}
  }
  span{
    font-size: 1.5rem;color: #999;
    line-height:2.5rem
  }
}

.abox{
  background: #fff;
  padding:1.5rem 2rem;
  font-size: 1.5rem;
  line-height:2.5rem;
  color: #666;
}

.acopy{
  padding:2rem 0;
  span{
    display: block;color: #999;
    font-size: 1.25rem;
  }
  .cc{font-size: 1.6rem;}
}
</style>
