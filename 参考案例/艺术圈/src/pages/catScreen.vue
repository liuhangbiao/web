<template>
  <div class="screen">
    <!-- 搜索 -->
    <Search @search-data="getSearchData"></Search>
    <!-- 搜索 end-->
    <div class="tag clearfix">
      <a v-for="item in searchTag" @click="RmsearchTag(item)">{{item.on}}<i class="icon-close1">&#160;</i></a>
    </div>
    <!-- {{ctds[0].list}} -->
    <!-- 筛选区 -->
    <div class="cat-tab mgb5rem">
      <div class="cat-tab-hd">
            <a v-for="(item,index) in cstab" :class="{con: cstabon == item}"  @click="selt(item,'cstabon')">{{item}}</a>
      </div>
      <div class="cat-tab-bds">
        <div class="cat-tab-bd">
          <!-- 艺术家 -->
          <div class="ctd-list ctd-list1" :class="{clon: cstabon == cstab[0]}">
            <div class="letter">
              <a v-for="(item,index) in artListTag" :class="{lon:letteron == item}" @click="sltLetter(item,'letteron')">{{item}}</a>
            </div>
            <ul>
              <li v-for="item in artList" :data-lr="item.py" :class="{lion: ctds[0].on == item.name}" v-if="item.src" @click="selected(item.name,0,item.id)"><span>{{item.name}}</span><img :src="item.src" /></li>
              <li v-else>{{item}}</li>
            </ul>
          </div>
          <!-- 价格 -->
          <div class="ctd-list ctd-list2"  :class="{clon: cstabon == cstab[1]}">
            <ul>
            <li v-for="(im,index) in ctds[1].list" :class="{lion: ctds[1].on == im}" @click="selected(im,1,index+1)">{{im}}</li>
            </ul>
          </div>
          <!-- 尺寸 -->
          <div class="ctd-list ctd-list3"  :class="{clon: cstabon == cstab[2]}">
            <ul>
            <li v-for="(im,index) in ctds[2].list" :class="{lion: ctds[2].on == im}" @click="selected(im,2,index+1)">{{im}}</li>
            </ul>
          </div>
          <!-- 作品类别 -->
          <div class="ctd-list ctd-list4"  :class="{clon: cstabon == cstab[3]}">
            <ul>
              <li v-for="im in ctds[3].list" :class="{lion: ctds[3].on == im.name}" @click="selected(im.name,3,im.id)">{{im.name}}</li>
            </ul>
          </div>
          <!-- 风格 -->
          <div class="ctd-list ctd-list5"  :class="{clon: cstabon == cstab[4]}">
            <ul>
               <li v-for="im in ctds[4].list" :class="{lion: ctds[4].on == im.name}" @click="selected(im.name,4,im.id)">{{im.name}}</li>
            </ul>
          </div>
          <!-- 题材 -->
          <div class="ctd-list ctd-list6"  :class="{clon: cstabon == cstab[5]}">
            <ul>
             <li v-for="im in ctds[5].list" :class="{lion: ctds[5].on == im.name}" @click="selected(im.name,5,im.id)">{{im.name}}</li>
            </ul>
          </div>
          <!-- 颜色 -->
          <div class="ctd-list ctd-list7"  :class="{clon: cstabon == cstab[6]}">
            <ul>
            <li v-for="im in ctds[6].list" :class="{lion: ctds[6].on == im.name}" @click="selected(im.name,6,im.id)">
            <div class="icon-img fl"><img :src="im.pictureUrl"/></div>
            <em>{{im.name}}</em>
            </li>
            </ul>
          </div>
          <!-- 形状 -->
          <div class="ctd-list ctd-list8"  :class="{clon: cstabon == cstab[7]}">
            <ul>
            <li v-for="im in ctds[7].list" :class="{lion: ctds[6].on == im.name}" @click="selected(im.name,6,im.id)">
            <div class="icon-img fl"><img :src="im.pictureUrl"/></div>
            <em>{{im.name}}</em>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选区 end-->
    <!-- 确认 -->
    <div class="okbtn" @click="catScreenBtn()">确认</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Search from "comps/catSearch.vue";
import { pinyin } from "js/lib/pinyin";
import { catscreen } from "js/config"
import {layer} from 'js/lib/layer'
export default {
  name: 'screen',
  data() {
    return {
      cstabon:'艺术家',
      cstab:['艺术家','价格','尺寸','类别','风格','题材','颜色','形状'],
      ctds:[{
          on: '',
          id: '',
          name: '艺术家',
          list: []
        }, {
          on: '',
          id: '',
          name: '价格',
          list: ['￥2000以下','￥2000-￥8000','￥8000-￥15000','￥15000-￥30000','￥30000以上']
          // list: [1,2,3,4,5]
        }, {
          on: '',
          id: '',
          name: '尺寸',
          list: ['50cm以下','50cm-100cm','100cm-150cm','150cm-200cm','200以上']
          // list: [1,2,3,4,5]
        }, {
          on: '',
          id: '',
          name: '类别',
          list: []
        }, {
          on: '',
          id: '',
          name: '风格',
          list: []
        }, {
          on: '',
          id: '',
          name: '题材',
          list: []
        }, {
          on: '',
          id: '',
          name: '颜色',
          list: [],
        }, {
          on: '',
          id: '',
          name: '形状',
          list: []
        }],
      letteron:'',
      artList: [],
      artListTag: [],
      searchTag:['未筛选'],
    }
  },
  created: function() {
    //滚动艺术家
    this.$store.dispatch('getArtist');
    //类别分类
     this.$store.dispatch('getCategory','');
    //筛选分类
    this.$store.dispatch('getDictionarycategory','');
  },
  mounted: function() {
  },
  computed: {
    ...mapGetters([
      'getArtistInfo','getDictionarycategoryInfo','getCategoryInfo'
    ]),
  },
  methods: {
    getSearchData(v) {
      // console.log(v)
    },
    catScreenBtn(){
      var dd=this.searchTag;
      if(dd.length){
        var obj={pageNo:1,pageSize:100};
        for (var i = 0; i < dd.length; i++) {
          (function(e,i){
            if(e.index===0){
              obj['name']=e.on;
            }else if (e.index===1) {
              obj['price']=e.id;
            }else if (e.index===2) {
              obj['size']=e.id;
            }else if (e.index===3) {
              obj['categoryid']=e.id;
            }else if (e.index===4) {
              obj['styleid']=e.id;
            }else if (e.index===5) {
              obj['themeid']=e.id;
            }else if (e.index===6) {
              obj['colorid']=e.id;
            }else if (e.index===7) {
              obj['shapeid']=e.id;
            }
          })(dd[i],i)
        }
        this.$router.push({name: 'CatListQuery',  params: {data:this.searchTag},query: obj})
      }else{
        layer.open({
          content:'你还未选择！',
          skin:'footer'
        })
      }
    },
    sctop(v) {
      var that = this;
      var ula = document.querySelectorAll('.cat-tab-bd ul li');
      that.forEh(ula, function(i, e) {
        var txt = e.innerText;
        if (txt == v) {
          let curr_top = e.offsetTop;
          let time_id = setInterval(() => {
            curr_top -= 55;
            that.scrollTop(document.querySelectorAll('.ctd-list1 ul')[0], e.offsetTop)
            if (curr_top <= 0) {
              clearInterval(time_id);
            }
          }, 100);
        }
      })
    },
    selt(v,t){
      this[t]=v
    },
    sltLetter(v,t){
       this[t]=v;
       this.sctop(v)
    },
    selected(im, v,id) {
      console.log(im, v,id)
      this['ctds'][v]['on'] = im;
      this['ctds'][v]['id'] = id;
    },
    RmsearchTag(v){
      this.searchTag = this.searchTag.filter(t => t != v)
    },
    artsList(obj, arr) {
      var pp = [];
      for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (obj[i]['py'] == arr[j]) {
            pp.push(obj[i]['py'])
          }
        }
        pp.push({ name: obj[i]['name'], src: obj[i]['src'], py: obj[i]['py'], id: obj[i]['id']})
      }
      return pp;
    },
    hasClass(ele, cls) {
      return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    },
    addClass(ele, cls) {
      if (!this.hasClass(ele, cls)) ele.className += " " + cls;
    },
    removeClass(ele, cls) {
      if (this.hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
      }
    },
    forEh(d, fn) {
      for (var i = 0; i < d.length; i++) {
        fn(i, d[i])
      }
    },
    scrollTop(obj, len) {
      if (typeof len === 'undefined') {
        return obj.scrollTop;
      } else {
        obj.scrollTop = len;
      }
    },
    sortBy(attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = (rev) ? 1 : -1;
      }
      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    },
    unique(arr, bl) {
      var res = [];
      var json = {};
      for (var i = 0; i < arr.length; i++) {
        if (bl == true) {
          if (Object.prototype.toString.call(arr[i]) == "[object Object]") {
            if (!json[arr[i]]) {
              res.push(arr[i]);
            }
          } else {
            if (!json[arr[i]]) {
              res.push(arr[i]);
              json[arr[i]] = 1;
            }
          }
        } else {
          if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
          }
        }
      }
      return res;
    },
    pinying(v){
      return pinyin(v)[0][0]
    }
  },
  filters:{
    list2(v){
      var str='';
      if(v===1){
        str='0-2000'
      }else if (v===2) {
         str='2000-8000'
      }else if (v===3) {
         str='8000-15000'
      }else if (v===4) {
         str='15000-30000'
      }else if (v===5) {
         str='30000以上'
      }
      return '￥'+str;
    },
    list3(v){
      var str='';
      if(v===1){
        str='0-50'
      }else if (v===2) {
         str='50-100'
      }else if (v===3) {
         str='100-150'
      }else if (v===4) {
         str='150-200'
      }else if (v===5) {
         str='200以上'
      }
      return '￥'+str;
    },
    pinying(v){
      return pinyin(v)[0][0]
    }
  },
  watch: {
    'searchTxt': function(v) {
      // console.log(v)
    },
    ctds: {　
      handler(curVal, oldVal) {
        // console.log(curVal, oldVal);
        var tags=[];
        for (var i = 0; i < curVal.length; i++) {
          if(curVal[i]['on']){
            tags.push({on:curVal[i]['on'],id:curVal[i]['id'],index:i})
          }
        }
          this.searchTag=tags;
      },
      　deep: true
    },
    getArtistInfo:function(v){
      if(v && v.code==="200"){
          this.ctds[0].list=v.result.data;
          var arts = [],artTag = [], dd = v.result.data;
          for (var i = 0; i < dd.length; i++) {
            arts.push({name: dd[i]['name'], src: dd[i]['headimg'], py: pinyin(dd[i]['name'])[0][0],id:dd[i]['id']});
            artTag.push(pinyin(dd[i]['name'])[0][0])
          }
          this.artListTag = this.unique(artTag.sort());
          this.artList = this.unique(this.artsList(arts.sort(this.sortBy("py", true)), this.unique(artTag.sort())), true);

      }else{
        console.log('获取艺术家失败！')
      }
    },
    getCategoryInfo:function(v){
       if(v && v.code==="200"){
         var dd=v.result;
         this.ctds[3].list=dd;
       }else{
        console.log('获取分类(类别)失败！')
       }
    },
    getDictionarycategoryInfo:function(v){
     if(v && v.code==="200"){
        var dd=v.result;
         var dd=v.result,item1=[],item2=[],item3=[],item4=[],item5=[],item=[];
        for (var i = 0; i < dd.length; i++) {
          (function(d){
            if(d.category==='风格'){
              item1.push(d);
            }else if (d.category==='题材') {
              item2.push(d);
            }else if (d.category==='颜色') {
              item3.push(d);
            }else if (d.category==='形状') {
              item4.push(d);
            }else{
              item.push(d)
            }
          })(dd[i])
        }
        this.ctds[4].list=item1;
        this.ctds[5].list=item2;
        this.ctds[6].list=item3;
        this.ctds[7].list=item4;
     }else{
        console.log('字典获取失败！')
     }
    }
  },
  components: {
    Search
  }
}

</script>
<style scoped lang="less">
.screen{background:#fff;min-height:100%;
  .tag{border-top:1rem solid #F2F2F2;border-bottom:1px solid #F2F2F2;padding:.8rem;text-align:center;
    a{position:relative;display:inline-block;*display:inline;*zoom:1;      /*float: left;*/background:rgba(189,189,189,1);border-radius:0.25rem;font-size:1.75rem;font-family:HiraginoSansGB;color:rgba(255,255,255,1);margin-right:0.5rem;margin-bottom:0.5rem;padding:0.6rem 0.1rem 0.6rem 1.2rem;}
  }
}
.okbtn{position:fixed;bottom:0;width:100%;z-index:999;height:6.06rem;line-height:6.06rem;text-align:center;background:rgba(246,246,246,1);font-size:2.25rem;font-family:HiraginoSansGB;color:rgba(249,115,0,1);}
.mgb5rem{margin-bottom:5rem;}
.cat-tab{width:100%;overflow:hidden;}
.cat-tab-hd{position:relative;float:left;width:12.5rem;margin-right:-12.5rem;text-align:center;}
.cat-tab-hd a{display:block;height:7rem;background:#F6F6F6;border-left:2px solid #F6F6F6;border-top:1px solid #fff;font-size:1.75rem;font-family:HiraginoSansGB;color:rgba(27,27,27,1);line-height:7rem;}
.cat-tab-hd .con{background:#fff;color:#F97300;border-left:2px solid #F97300;}
.cat-tab-bds{width:100%;float:right}
.cat-tab-bd{margin-left:12.5rem;background:#fff;overflow:hidden;}
.cat-tab-bd .ctd-list{display:none;position:relative;
  li{margin:1rem 3rem;height:4rem;line-height:4rem;}
  .lion{color:#888;}
  .icon-colora,.iconshape{font-size:3rem;padding-right:1rem;line-height:4rem;text-shadow:1px 0 2px #ccc;color:#666;}
}
.cat-tab-bd .clon{display:block;}
.cat-tab-bd .ctd-list1 ul{height:56rem;overflow-y:auto;position:relative;}
.cat-tab-bd .ctd-list1 li{margin:1rem 3rem;height:5rem;line-height:5rem;}
.cat-tab-bd .ctd-list1 li img{float:left;width:5rem;height:5rem;overflow:hidden;border-radius:90%}
.cat-tab-bd .ctd-list1 li span{display:inline-block;*display:inline;*zoom:1;line-height:5rem;text-indent:1rem;  /*white-space: nowrap;text-overflow: ellipsis;*/}
.cat-tab-bd .ctd-list1 .letter{position:fixed;right:1rem;top:3rem;z-index:99;}
.cat-tab-bd .ctd-list1 .letter{position:absolute;}
.cat-tab-bd .ctd-list1 .letter a{display:block;font-size:1.4rem;color:#666;line-height:2rem}
.cat-tab-bd .ctd-list1 .letter a:hover,.cat-tab-bd .ctd-list1 .letter .lon{font-size:1.6rem;color:#333;font-weight:bold;}
.icon-img{position:relative;padding-right:1rem;width:6rem;height:4rem;float:left;overflow:hidden;
  img{width:100%;}
}
</style>
