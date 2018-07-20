<style type="text/css">
::-webkit-input-placeholder { /* WebKit browsers */
  color:#999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:#999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color:#999;
}
</style>
<template>
  <div class="Seting">
   <!-- topbar -->
  <div class="weui-flex setbar">
    <div class="weui-flex__item">
      <a class="icon-tiaozhuan fl" href="#/my"></a>
      <a>账户设置</a>
      </a>
    </div>
  </div>
  <!-- 主体 -->
  <div class="bline">&#160;</div>
  <div class="sbox">
    <!-- <a href="#"><em>账户设置</em><i class="icon-head"></i><i class="icon-tiaozhuan2"></i></a> -->
    <a @click="setUser('headimg')">
        <em>账户设置</em>
        <img class="upic" :src="userinfo.headimg"/>
        <i class="icon-tiaozhuan2"></i>
    </a>
    <div class="line">&#160;</div>
    <a  @click="setUser('nickname')">
        <em>昵称</em>
        <!-- <input type="text" v-model.trim="userinfo.nickname"> -->
        <strong  v-text.trim="userinfo.nickname"></strong>
        <!-- <strong v-text="no(userinfo.nickname)">风中的雨</strong> -->
        <i class="icon-tiaozhuan2"></i>
    </a>
    <div class="line">&#160;</div>
    <a @click="setUser('realname')">
        <em>真实姓名</em>
        <!-- <input type="text" v-model.trim="userinfo.realname"> -->
        <strong  v-text.trim="userinfo.realname"></strong>
        <!-- <strong v-text="no(userinfo.realname)">夏佩根</strong> -->
        <i class="icon-tiaozhuan2"></i>
    </a>
    <div class="line">&#160;</div>
    <a  @click="setUser('sex')">
        <em>性别</em>
        <strong  v-text.trim="userinfo.sex"></strong>
        <i class="icon-tiaozhuan2"></i>
    </a>
    <div class="line">&#160;</div>
    <a  @click="setUser('birthday')">
        <em>出生日期</em>
          <strong v-if="userinfo.birthday!=='未设置'">{{userinfo.birthday|formatDate}}</strong>
          <strong v-else>未设置</strong>
        <!-- <strong  v-text.trim="date.formatterDate(new Date(userinfo.birthday))"></strong> -->
        <i class="icon-tiaozhuan2"></i>
    </a>
  </div>
  <div class="bline">&#160;</div>
  <div class="sbox">
      <a  @click="setUser('password')">
          <em>登录密码</em>
          <strong  v-text.trim="userinfo.password" v-show="false"></strong>
          <i class="icon-tiaozhuan2"></i>
      </a>
      <div class="line">&#160;</div>
      <a  @click="setUser('mobile')">
          <em>手机号</em>
          <strong  v-text.trim="userinfo.mobile"></strong>
          <i class="icon-tiaozhuan2"></i>
      </a>
  </div>
  <div class="bline">&#160;</div>
  <div class="sbox clearCath">
    <a @click="clearCatch">清除缓存</a>
  </div>
  <!-- 主体 end-->
  <!-- <div class="mgb5rem">&#160;</div> -->
</div>

</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Tabbar from "comps/Tabbar.vue"
import {layer} from 'js/lib/layer'
import { cats,nopics} from "js/config"
import {users,date,insertAfter} from '@/assets/js/api'
export default {
  name: 'Seting',
  data() {
    return {
      file:'',
      fileurl:'',
      date:date,
      regs:{
        nickname:[/^.{3,16}$/,'请输入长度为3-16的所有字符！'],
        realname:[/^[\u4e00-\u9fa5]{2,8}$/,'请输入长度为2-8的中文汉字！'],
        sex:[/[男|女]/,'请输入男或女！'],
        birthday:[/^(19|20)\d{2}(-)(0?[1-9]|1[0-2])(-)((0?[1-9])|((1|2)[0-9])|30|31)$/,'请输入格式为日期！'],
        password:[/^\w{5,18}$/,'请输入新的密码,长度6-18位字符！'],
        oldPwd:[/^\w{5,18}$/,'请输入原始密码！'],
        mobile:[/^1[34578]\d{9}$/,'请输入正确的手机号码！']
      },
      data:cats||{},
      id:0,
      userinfo:{
        headimg:nopics,
        nickname:'未设置',
        realname:'未设置',
        sex:'未设置',
        birthday:'未设置',
        password:'未设置',
        mobile:'未设置'
      }
    }
  },
  created: function() {
      this.$store.dispatch('getOnline')
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters(['getOnlineInfo'])
  },
  methods: {
    $(id){
      return document.getElementById(id);
    },
    reg(k,v,fn){
      var _that=this,regs=this.regs;
       if(!k){
           return '你还没有任何输入！';
       }
        if (new RegExp(regs[k][0]).test(v) && v!=regs[k][1]) {
            fn();
        } else {
             _that.laymsg(regs[k][1])
        }
    },
    ipt(id){
      var v=this.regs[id][1];
      return '<input id="'+id+'" type="text" style="background: none;border: none;height: 3rem;line-height: 3rem;padding:0 0.5rem;width: 89%;color: #888;"  value="'+v+'" onblur="if(value==\'\'){value=\''+v+'\'}" onfocus="if(value==\''+v+'\') {value=\'\'}"/>';
    },
    laymsg(v){
        layer.open({
          content:v||'未知信息！',
          skin:'footer',
          time:3
        })
    },
    laymsged(d){
      var _that=this;
       _that.laymsg(d.message);
      if(d.code==="200"){
        _that.$store.dispatch('getOnline')
      }
    },
    layermsg(id){
      var  _that=this,h=this.ipt(id)
       //底部对话框
      layer.open({
        content: h
        ,btn: ['确认', '取消']
        ,skin: 'footer'
        ,yes: function(index){
          // ------------------------
          var v=document.getElementById(id).value;
           _that.reg(id,v,function(){
               users.memberid({id:_that.id,token:sessionStorage.getItem('ukey')},{
                  [id]:v
                }).then(function(d){
                  console.log(d)
                  _that.laymsged(d)
                }).catch(function(err){
                    return err;
                })
            })
          // ------------------------
        }
      });
    },
    setUser(v){
      var _that=this;
      if(v==='headimg'){
          layer.open({
              content:'<div id="filemsg" style="position:relative;display:inline-block;background:#D0EEFF;border:1px solid #99D3F5;border-radius:4px;padding:4px 12px;overflow:hidden;color:#1E88C7;text-decoration:none;text-indent:0;line-height:20px;">选择文件<input type="file" id="headimg" style="position:absolute;font-size:100px;right:0;top:0;opacity:0;"/></div>'
              // content: '<form action="http://192.168.13.155:8380/api/common/upload" method="post"><input type="file" id="headimg" name="headimg"/><input type ="submit" value="上传"/> </form>'
              ,btn: ['确认', '取消']
              ,skin: 'footer'
              ,yes: function(index){
                // ------------------------
                let fimg=_that.fileurl;
                console.log(fimg)
                if(fimg){
                  users.memberid({id:_that.id,token:sessionStorage.getItem('ukey')},{
                    headimg:fimg
                  }).then(function(d){
                    console.log(d)
                    _that.laymsged(d)
                  }).catch(function(err){
                      return err;
                  })
                }else{
                  _that.laymsg('当前图片有误,请从新上传！')
                }
                // ------------------------
              }
            });
            document.getElementById('headimg').onchange=function(event){
                let file=event.target.files[0];
                let formData = new FormData();
                formData.append('fileList', file);
                let config = {
                  headers: {
                    // 'Content-Type': 'multipart/form-data'
                    'Content-Type': 'text/plain;charset=UTF-8'
                  }
                }
                _that.$http.post('/api/common/upload', formData, config).then(function (dd) {
                  if (dd.code=== "200") {
                    console.log(dd.result)
                    var filemsg =  _that.$('filemsg');
                    var img = document.createElement("img"); // 创建一个元素节点 
                    img.src=dd.result;
                    insertAfter(img, filemsg);
                    _that.fileurl=dd.result||''
                  }
                }).catch(function(err){
                    return err;
                })
          };
      }else if(v==='nickname'){
        this.layermsg('nickname');
      }else if(v==='realname'){
        this.layermsg('realname');
      }else if (v==='sex') {
        this.layermsg('sex');
      }else if (v==='birthday') {
       this.layermsg('birthday');
      }else if (v==='password') {
         let regv=this.regs[v][1];
         let regvo=this.regs['oldPwd'][1];
         layer.open({
              content:'<input type="text" id="oldPwd"  style="background: none;border: none;height: 3rem;line-height: 3rem;padding:0 0.5rem;width: 89%;color: #888;"  value="'+regvo+'" onblur="if(value==\'\'){value=\''+regvo+'\'}" onfocus="if(value==\''+regvo+'\') {value=\'\'}"/><input type="text" style="background: none;border: none;height: 3rem;line-height: 3rem;padding:0 0.5rem;width: 89%;color: #888;"  value="'+regv+'" onblur="if(value==\'\'){value=\''+regv+'\'}" onfocus="if(value==\''+regv+'\') {value=\'\'}" id="password"/>'
              // content: '<form action="http://192.168.13.155:8380/api/common/upload" method="post"><input type="file" id="headimg" name="headimg"/><input type ="submit" value="上传"/> </form>'
              ,btn: ['确认', '取消']
              ,skin: 'footer'
              ,yes: function(index){
                // ------------------------
                // regs[k][0]
                let oldPwd=_that.$('oldPwd').value,password=_that.$('password').value;
                  _that.reg('password',password,function(){
                          users.update({
                            password:password,
                            oldPwd:oldPwd,token:sessionStorage.getItem('ukey')
                          }).then(function(d){
                            _that.laymsged(d)
                          }).catch(function(err){
                              return err;
                          })
                  })
                // ------------------------
              }
            });
       // this.layermsg('password');
      }else if (v==='mobile') {
       this.layermsg('mobile');
      }
    },
    getSearchData(v) {
      console.log(v)
    },
    no(v){
      if(!v) return '未设置';
      return v;
    },
    nopic(v){
      if(!v) return nopics;
      return v;
    },
    clearCatch(){
      sessionStorage.removeItem('ukey');
      layer.open({
        content:'清除缓存成功！',
        skin:'footer',
         time:3
      })

    },
    formatterDate(v){
      console.log(new Date(v).getFullYear())
      return v+'xx';
    }
  },
  filter:{
  },
   watch:{
    getOnlineInfo:function(v){
      // console.log(v)
      if(v.code="200"){
        var dd=v.result;
        if(!dd.headimg){dd['headimg']=nopics;}
        if(!dd.nickname){dd['nickname']='未设置';}
        if(!dd.realname){dd['realname']='未设置';}
        if(!dd.sex){dd['sex']='未设置';}
        if(!dd.birthday){dd['birthday']='未设置';}
        if(!dd.password){dd['password']='未设置';}
        if(!dd.mobile){dd['mobile']='未设置';}
        // console.log(this.userinfo,dd)
        this.id=dd.id;
        this.userinfo=dd;
      }else{
        layer.open({
          content:v.message,
          skin:'footer',
           time:3
        })
      }
    }
  },
  components: {
    Tabbar
  }

}

</script>
<style scoped lang="less">
.Seting { background: #f6f6f6; min-height: 100%; overflow: hidden; }
.mgb5rem { margin-bottom: 5rem; }
.bline{border-bottom: 1.8rem solid #f6f6f6;height: 0;}
.line {
  height: 0;
  border-bottom: 1px solid #eee;
  margin:0.5rem 0
}
.setbar {
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

.sbox{
  background: #fff;
  display: block;
  padding: 1rem 2rem;
  a {
    display: block;
    line-height:3rem;
    font-size: 1.7rem;
    color: #333;
    text-align: right;
    em{float: left;}
    position: relative;
    height: 3rem;
    i{
      color: #b6b6b6;
      font-size: 2rem;
    }
    .icon-tiaozhuan2{
      margin-left: 0.5rem;
      /*float: right;*/
      /*padding-top:0.5rem*/
      /*position: relative;right: 0;top: 0.2rem;*/
    }
    strong{
      color: #888;font-weight: normal;
    }
    img,i,strong{
      vertical-align:middle;
      /*float: right;*/
    }
    input{
      width:16rem;
      text-align: right;
      line-height: 3rem;
      padding:0 0.4rem;
      color: #888;
      border: none;
      font-weight: normal;
    }
  }
}
.bar-info{
  text-align: center;
  a,em{
    color: #666;
    font-size: 1.75rem;
  }
  em{
    display: block;
  }
}
.clearCath{
  a{text-align: center;font-weight: bold;}
  }
.upic{width: 2rem;}

.lay-msg{
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:rgba(187,187,187,1);
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:rgba(187,187,187,1);
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(187,187,187,1);
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:rgba(187,187,187,1);
  }
}
.file{position:relative;display:inline-block;background:#D0EEFF;border:1px solid #99D3F5;border-radius:4px;padding:4px 12px;overflow:hidden;color:#1E88C7;text-decoration:none;text-indent:0;line-height:20px;}
.file input{position:absolute;font-size:100px;right:0;top:0;opacity:0;}
.file:hover{background:#AADFFD;border-color:#78C3F3;color:#004974;text-decoration:none;}
</style>
