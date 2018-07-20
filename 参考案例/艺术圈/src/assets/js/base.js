import {layer} from './lib/layer'
/*配置文件*/
const config={
    // baseURI:'http://43.254.3.68:8380/',
    // baseURI:'http://172.16.0.74:8011/'
    // baseURI:'http://192.168.13.155:8380'
    baseURI:'http://api.ysqart.com'
      // baseURI:'172.16.0.87:8011'
    // baseURI:'http://172.16.0.60:8011'
    // baseURI:"http://172.16.7.53:8081"
    // baseURI:'http://192.168.0.103:8081'
}
/*通用接口*/
const common={
    /**================== 系统通用接口 ================**/
    //GET /api/common/captcha  获取验证码
    captcha:'/api/common/captcha',
    //GET /api/common/code-mark 获取当前验证码标记
    codemark:'/api/common/code-mark',
    //GET /api/common/phone-code    获取手机验证码 [mobile*=>手机号 query string,code*=>验证码 query string,Captcha_UUID_Mark*=>当前验证码表示(每次刷新验证码之后都要重新获取/api/common/code-mark) header string]
    phonecode:'/api/common/phone-code',
    //GET /api/common/phone/code app获取手机验证码 [mobile*=>手机号 query string]
    phonecodeapp:'/api/common/phone/code',
    //POST /api/common/upload   单个文件上传  [*fileList=>formData    file]
    upload:'/api/common/upload',
    //POST /api/common/uploads 多文件上传
    uploads:'/api/common/uploads',
    /**================== 标签 ================**/
    //GET /api/tag  条件查询标签列表 [category=>(1艺术家2商品) query integer,name=>名称 query  string,pageNo*=>当前页 query   integer,pageSize*=>每页显示条数 query integer]
    //POST /api/tag  增加标签 [body*=>标签 body json==>{"category":"string","comment":"string","name":"string","nameen":"string"}]
    tag:'/api/tag',
    //DELETE /api/tag/{id}  删除商品标签 [id*=>标签id path  integer]
    //GET /api/tag/{id}  查询标签ById [id*=>id path integer]
    //PUT /api/tag/{id}  修改标签 [id*=>主键id path   integer,body=>标签 body json==>{"category":"string","comment":"string","name":"string","nameen":"string"}]
    tagid:'/api/tag/{id}',
    /**================== 场景/场景标签 ================**/
    //GET /api/scenario 主键查询场景
    //POST /api/scenario 新增通用场景 [artScenario*=>场景对象 body json==>{"createTime":"2017-11-22T01:57:53.312Z","height":"string","length":"string","name":"string","remark":"string","status":0,"url":"string"}]
    scenario:'/api/scenario',
    //DELETE /api/scenario/{id} 主键删除通用通用场景  [id*=>主键id path integer]
    //GET /api/scenario/{id} 主键查询场景 [id*=>主键id path integer]
    //PUT /api/scenario/{id} 修改通用场景 [id*=>主键id path integer,artScenario*=>场景对象 body json==>{"createTime":"2017-11-22T01:57:53.312Z","height":"string","length":"string","name":"string","remark":"string","status":0,"url":"string"}]
    scenarioid:'/api/scenario/{id}',
    //GET /api/scenario/tag 全部商品场景标签     [goodsName=>商品名称 query string,name =>场景名称 query string,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    //POST /api/scenario/tag 给商品添加场景标签  [artScenarioTag*=>artScenarioTag body json==>{ "comment": "string", "goodsId": 0, "id": 0, "position": "string", "scenarioId": 0}]
    tags:'/api/scenario/tag',
    //GET /api/scenario/tag/{goodsId}/scenario 据商品id查询场景标签 [goodsId*=>商品Id path integer]
    scenariogid:'/api/scenario/tag/{goodsId}/scenario',
    //DELETE /api/scenario/tag/{id} 删除商品场景标签  [id*=>场景标签主键id path   integer]
    //PUT /api/scenario/tag/{id} 修改场景标签  [id*=>id path  integer,body*=>artScenario body json==>{ "comment": "string", "goodsId": 0, "id": 0, "position": "string", "scenarioId": 0}]
    scenariotagid:'/api/scenario/tag/{id}',
    /**================== 轮播图设置  ================**/
    //GET /api/banner list   [pageNo*=>当前页 query    integer,pageSize*=>每页显示条数 query integer]
    //POST /api/banner 新建banner   [artBanner*=>banner body json==>{ "category": "string", "comment": "string", "name": "string", "pictureUrl": "string", "sourseUrl": "string", "value": "string", "weight": 0}]
    banner:'/api/banner',
    //GET /api/banner/ones 获取某一类banner 结果按权重排序 [category*=>分类：PC/APP query  string,value*=>值：(1 (PC首页) 2 (PC藏艺术) 3 (PC藏艺术3d入口)) query   string]
    bannerones:'/api/banner/ones',
    //DELETE /api/banner/{id} 主键删除banner [id*=>轮播图主键id path integer]
    //GET /api/banner/{id} 主键查询banner    [id*=>id path  integer]
    //PUT /api/banner/{id} 修改banner        [id*=>轮播图id path integer,body*=>轮播图 body json==>{ "category": "string", "comment": "string", "name": "string", "pictureUrl": "string", "sourseUrl": "string", "value": "string", "weight": 0}]
    bannerid:'/api/banner/{id}',
    /**================== 购物车  ================**/
    //GET /api/shopcar 当前用户的购物车列表
    shopcar:'/api/shopcar',
    //GET /api/shopcar/choose 查询选中商品信息  [ids*=>(选中购物车商品主键id逗号隔开:1,2,3) query Array===>689,690]
    choose:'/api/shopcar/choose',
    //DELETE /api/shopcar/{ids} 删除购物车商品  [ids*=>(主键ids(多个逗号隔开[1,2,3...])) path string===>689,690]
    shopcarids:'/api/shopcar/{ids}',
    //PUT /api/shopcar/{id} 加入购物车 [framedId*=>装裱id body===>{"decorate": 1,"editionNo": 0,"goodsId": 680,"num":1,"paperJamId": 0}]==>decorate (integer, optional): 是否装表(装表数据库id) ,editionNo (integer, optional): 版号 ,goodsId (integer): 商品id ,num (integer): 数量 ,paperJamId (integer, optional): 是否有卡纸(卡纸数据库id)
    // shopcarid:'/api/shopcar/{id}',
    //PUT /api/shopcar 加入购物车 [settlementGoods*=>body===>{"decorate": 1,"editionNo": 0,"goodsId": 680,"num":1,"paperJamId": 0}]==>decorate (integer, optional): 是否装表(装表数据库id) ,editionNo (integer, optional): 版号 ,goodsId (integer): 商品id ,num (integer): 数量 ,paperJamId (integer, optional): 是否有卡纸(卡纸数据库id)
    shopcarid:'/api/shopcar',
    /**================== 支付宝/微信 支付&退款  ================**/
    // POST /api/ali/pay 支付宝支付 [orderNo*=>订单号 query string]
    alipay:'/api/ali/pay',
    // POST /api/ali/pay/refund 支付宝退款 out_trade_no=>订单支付时传入的商户订单号,不能和 trade_no同时为空 query    string,trade_no=>支付宝交易号，和商户订单号不能同时为空 query  string,refund_amount*=>要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数  query    double,
    alirefund:'/api/ali/pay/refund ',
    //POST /api/wx/pay 微信支付  [orderNo*=>订单号 query   string]
    wxpay:'/api/wx/pay',
    //GET /api/wx/pay/getQrcodeImg 生成微信支付二维码 [url=>二维码url query string]
    wxgetQrcodeImg:'/api/wx/pay/getQrcodeImg',
    //POST /api/wx/pay/refund 微信退款 [out_refund_no*=>订单支付时传入的商户订单号 query string,totalFee*=>订单总金额 query   double,refundFee*=>退款金额 query   double]
    wxrefund:'/api/wx/pay/refund',
    //GET /api/ali/pay/alipay/params 支付宝 手机支付 必要参数获取
    alipayParams:'/api/ali/pay/alipay/params',
    //GET /api/ali/pay/wxpay/params 微信 手机支付 必要参数获取
    wxpayParams:'/api/ali/pay/wxpay/params',
    /**================== 字典 ================**/
    //GET /api/dictionary 查询除了分类外其他分类列表  [name=>分类下具体名称 query   string,category =>分类：风格、颜色、摆放空间、题材、形状 query string]
    //POST /api/dictionary 新增字典  [body*=>字典 body json==>{"category":"string","id": 0,"introduce":"string","name":"string","nameen":"string","pictureUrl":"string","weight": 0}]
    dictionary:'/api/dictionary',
    //GET /api/dictionary/category 查询一级分类下列表  [category => (分类：风格、颜色、摆放空间、题材、形状、其他[手机端 使用 不包括 （风格题材）]) query    string]
    dictionarycategory:'/api/dictionary/category',
    //DELETE /api/dictionary/{id} 删除除了分类外其他分类列表 [id*=>字典id path integer]
    //GET /api/dictionary/{id} 主键查询分类  [id*=>id path    integer]
    //PUT /api/dictionary/{id} 修改字典分类 [id*=>字典分类id path integer,body*=>字典 body json==>{"category":"string","id": 0,"introduce":"string","name":"string","nameen":"string","pictureUrl":"string","weight": 0}]
    dictionaryid:'/api/dictionary/{id}',
    //GET /api/goods/goodsOrArtist 关键字 查 商品 或 艺术家
    goodsOrArtist:'/api/goods/goodsOrArtist'
}
/* 用户模块 */
const user={
    /**================== 用户注册、重置密码&用户登录 ================**/
    //GET /api/register 重置密码 [mobile*=>手机号 query    string,msgCode*=>手机验证码 query    string,password*=>新密码 query string]
    //POST /api/register 用户注册 [mobile*=>手机号 query   string,msgCode*=>手机验证码 query    string,password*=>密码 query  string]
    register:'/api/register',
    //POST /admin/login 用户登录 [username*=>用户名 query  string,password*=>密码 query  string]
    login:'/api/login',
    /**================== 用户管理 ================**/
    // GET /api/member 查询所有用户、条件查询 [role=>角色:[管理员、艺术家、会员] query string,account=>账号 query    string,,realname=>真实姓名 query    string,,nickname=>昵称 query  string,,mobile=>手机 query    string,,status=>状态 0 删除 1 可用 2 冻结 query string,,type=>类型 1后台 2app/pc query  string,,pageNo*=>当前页 query  integer,,pageSize*=>每页显示条数 query    integer]
    // POST /api/member 新增用户 [body*=>用户 body json==>{"account":"string","activityId": 0,"address":"string","age":"string","agencyid": 0,"availablemoney": 0,"birthday":"2017-11-22T01:57:53.986Z","createUserId": 0,"email":"string","enterpriseAddr":"string","enterpriseContact":"string","enterpriseName":"string","enterprisePhone":"string","headimg":"string","isAffiliatedAgency": 0,"lastlogintime":"2017-11-22T01:57:53.986Z","levelid": 0,"managerLinkUserId": 0,"mobile":"string","nickname":"string","password":"string","points": 0,"realname":"string","registertime":"2017-11-22T01:57:53.986Z","role":"string","sex":"string","status": 0,"totalmoney": 0,"type": 0}]
    member:'/api/member',
    // GET /api/member/email/validate 邮箱验证 [vcode*=>验证码 query   string]
    validate:'/api/member/email/validate',
    // GET /api/member/online 查询当前用户信息
    online:'/api/member/online',
    // GET /api/member/online/level 查询当前用户等级
    level:'/api/member/online/level',
    // PUT /api/member/phone 绑定/修改手机号 [mobile*=>手机号 query   string,msgCode*=>手机验证码 query    string]
    phone:'/api/member/phone',
    // POST /api/member/send/email/code 发送邮箱验证验证码 [email*=>邮箱 query string]
    code:'/api/member/send/email/code',
    // PUT /api/member/update 修改密码 [oldPwd*=>旧密码 query  string,password*=>新密码 query string]
    update:'/api/member/update',
    // DELETE /api/member/{id} 删除用户 [id*=>主键id path integer]
    // GET /api/member/{id} 主键查询用户 [id*=>主键id path integer]
    // PUT /api/member/{id} 修改用户信息 [id*=>主键id path integer,body*=>用户 body josn ==> {"account":"string","activityId": 0,"address":"string","age":"string","agencyid": 0,"availablemoney": 0,"birthday"2017-11-22T01:57:54.069Z","createUserId": 0,"email":"string","enterpriseAddr":"string","enterpriseContact":"string","enterpriseName"string","enterprisePhone":"string","headimg":"string","isAffiliatedAgency": 0,"lastlogintime":"2017-11-22T01:57:54.069Z","levelid": 0,"managerLinkUserId0,"mobile":"string","nickname":"string","password":"string","points": 0,"realname":"string","registertime":"2017-11-22T01:57:54.069Z","role"string","sex":"string","status": 0,"totalmoney": 0,"type": 0}]
    memberid:'/api/member/{id}',
    /**================== 通用装裱框/卡纸相关&商品可选装裱框、卡纸 ================**/
    //GET /api/freamed 查询所有装裱框/卡纸列表  [name=>装裱框/卡纸名字 query string,status=>装裱框/卡纸状态 (0停用 1启用) query integer,type=>类型 (1装表框 2卡纸) query integer,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    //POST /api/freamed 新增装裱框/卡纸  [body*=>装裱框/卡纸 body json==>{ "comment": "string", "createTime": "2017-11-22T06:52:38.563Z", "name": "string", "picture": "string", "price": 0, "status": 0, "type": tring","user": "string"}]
    freamed:'/api/freamed',
    //DELETE /api/freamed/{id} 删除  [id*=>装裱框/卡纸id path  integer]
    //GET /api/freamed/{id} 主键查询装裱框/卡纸  [id*=>主键id path integer]
    //PUT /api/freamed/{id} 修改装裱框/卡纸/卡纸 信息 [id*=>装裱框/卡纸id path  integer,body*=>装裱框/卡纸 body json==>{ "comment": "string", "createTime": "2017-11-22T06:52:38.563Z", "name": "string", "picture": "string", "price": 0, "status": 0, "type": tring","user": "string"}]
    freamedid:'/api/freamed/{id}',
    //GET /api/framed/tag 查询所有装裱框、卡纸列表 [framedName=>装裱框、卡纸名字 query string，goodsName=> 商品名字 query string,type=>类型 (1（装表框） 2（卡纸）) query integer，pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    framedtag:'/api/framed/tag',
    //DELETE /api/framed/tag/{id} 取消商品的装裱框、卡纸  [id*=>装裱框、卡纸id path  integer]
    //GET /api/framed/tag/{id} 主键查询 装裱框、卡纸 标签 [id*=>id path integer]
    framedtagid:'/api/framed/tag/{id}',
    //POST /api/framed/tag/{id}/addFramed 给商品添加装裱框、卡纸  [id*=>商品id path  integer,framedId*=>装裱框、卡纸id path    integer]
    addFramed:'/api/framed/tag/{id}/addFramed',
    //GET /api/framed/tag/{id}/framed 查询某个商品可选装裱  [id*=>id path integer,type*=>类型 (1（装表框） 2（卡纸）) path   integer]
    framed:'/api/framed/tag/{id}/framed',
    /**================== 浏览记录、收藏 ================**/
    // GET /api/member/trace 查询全部收藏/浏览记录  [type*=>0查全部浏览/1全部收藏  query   integer,pageNo*=>当前页  query integer,pageSize*=>每页显示条数  query    integer]
    trace:'/api/member/trace',
    //GET /api/member/trace/count 当前用户 浏览/收藏/购买 记录总数
    tracecount:'/api/member/trace/count',
    // GET /api/member/trace/getGoodsTrace 查询商品浏览/收藏记录总数 type:0表示浏览，1表示收藏  [goodsId =>goodsId query integer]
    getGoodsTrace:'/api/member/trace/getGoodsTrace',
    // DELETE /api/member/trace/{goodsId} 删除收藏商品 [goodsId*=>goodsId  path   integer]
    // POST /api/member/trace/{goodsId} 新增收藏，浏览记录 [goodsId*=>goodsId path   integer,type=> 0浏览（不传默认0），1收藏   query   integer]
    tracegoodsId:'/api/member/trace/{goodsId}',
    // GET /api/member/trace/{id} 主键查询收藏、浏览记录 [id*=>收藏，浏览主键id path  integer]
    traceid:'/api/member/trace/{id}',
    /**================== 用户地址管理 ================**/
    //GET /api/member/address 查询所有用户地址  [pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    //POST /api/member/address 新增用户地址 [body*=>用户地址 body josn==>{"address":"string","alias":"string","area":"string","city":"string","country":"string","defaultAddr":"string","mobile":"string","postcode":"string","province":"string","receiver":"string","tel":"string"}]
    address:'/api/member/address',
    //GET /api/member/address/default/address 查询默认地址
    addressdef:'/api/member/address/default/address',
    //GET /api/member/address/user 查询登录用户地址
    addressuser:'/api/member/address/user',
    //DELETE /api/member/address/{id} 删除用户地址 [id*=>id path integer]
    //GET /api/member/address/{id} 主键查询用户地址 [id*=>id path integer]
    //PUT /api/member/address/{id} 修改用户地址信息 [id*=>id path integer,body*=>用户地址 body json==>{"address":"string","alias":"string","area":"string","city":"string","country":"string","defaultAddr":"string","mobile":"string","poscode":"string","province":"string","receiver":"string","tel":"string"}]
    addressid:'/api/member/address/{id}',
    //GET /api/member/address/{id}/default/address 设置默认地址 [id*=>id path integer,defaultAaddress*=>设为默认地址 1 为默认 query    string]
    addressiddef:'/api/member/address/{id}/default/address',
}
/* 商品模块 */
const goods={
    /**================== 商品分类 ================**/
    //GET /api/goods/category 获取分类列表 [name=>名称：油画、版画、水墨、水粉、雕塑、摄影、书法  query  string]
    //POST /api/goods/category 添加分类 [body*=>分类 body json==>{"comment":"string","level": 0,"name":"string","pid": 0,"weight": 0}]
    category:'/api/goods/category',
    //GET /api/goods/category/tree 获取树形分类
    tree:'/api/goods/category/tree',
    //DELETE /api/goods/category/{id} 删除分类 [id*=>id path integer]
    //GET /api/goods/category/{id} 获取分类ById [id*=>分类Id path integer]
    //PUT /api/goods/category/{id} 修改分类 [id*=>分类Id path integer,body*=>分类 body json==>{"comment":"string","level": 0,"name":"string","pid": 0,"weight": 0}]
    categoryid:'/api/goods/category/{id}',
    /**================== 商品 ================**/
    //GET /api/goods 查询商品列表  [categoryid=>类别id query    integer,price=> 价格 (0-2000，2000-8000，8000-15000，15000-30000，30000+,值：1，2，3，4，5) query   integer,size=>尺寸(0-50，50-100，100-150，150-200，200+，值：1，2，3，4，5) query    integer,colorid=>颜色id  query    integer,shapeid=>形状id query integer,themeid=>题材id query integer,styleid=>风格id query integer,placeid=>摆放位置id query   integer,salestatus=>销售状态：已售/未售 query    string,name=>商品名称/艺术家姓名 query   string,recommend=>是否是推荐作品 query integer,sortTime=>按上架时间排序：最新上架 值desc，最早上架/asc query string,sortprice=>按上价格排序：高到低 desc，低到高 asc query string,pageNo*=>当前页 query   integer,pageSize*=>每页显示条数 query integer]
    //POST /api/goods 增加商品 [tagId=>标签类选择的标签iD（1新作3艺术野4藏艺术）query integer,body*=>商品 body json==>{"artistid": 0,"audio":"string","auditStatus": 0,"autograph": 0,"categoryid": 0,"collectnumber": 0,"colorid": 0,"cost": 0,"createtime":"2017-11-22T01:57:52.752Z","discountprice": 0,"edition":"string","freight": 0,"goodsstatus":"string","height":"string","iscoupon":"string","isdecorate":"string","ispoints":"string","length":"string","levelid": 0,"material":"string","name":"string","original":"string","particulars":"string","pictures":"string","placeid": 0,"price": 0,"recommend": 0,"recommendMsg":"string","salestatus":"string","scenarioids":"string","shapeid": 0,"shelftime":"2017-11-22T01:57:52.753Z","styleid": 0,"themeid": 0,"video":"string","viewnumber": 0,"width":"string"}]
    goods:'/api/goods',
    //GET /api/goods/getByTag 通过标签查询：1（新作）、3(艺术野)、4(藏艺)、5（热卖单品）  [tagid*=>tagid query   integer,pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    getByTag:'/api/goods/getByTag',
    //GET /api/goods/recommend 查询普通推荐商品 [pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    recommend:'/api/goods/recommend',
    // GET /api/goods/collect/recommend  查询藏艺推荐商品  [pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    recommendc:'/api/goods/collect/recommend',
    //GET /api/goods/secommend/collect 查询藏艺推荐商品 [pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    collect:'/api/goods/secommend/collect',
    //DELETE /api/goods/{id} 删除商品 [id*=>id path integer]
    //GET /api/goods/{id} 普通查询商品ById [id*=>id path long]
    //PUT /api/goods/{id} 修改商品  [id*=>商品id path integer,body*=>商品 body json==>{"artistid":0,"audio":"string","auditStatus":0,"autograph":0,"categoryid":0,"collectnumber":0,"colorid":0,"cost":0,"createtime":"2017-11-22T01:57:52.828Z","discountprice":0,"edition":"string","freight":0,"goodsstatus":"string","height":"string","iscoupon":"string","isdecorate":"string","ispoints":"string","length":"string","levelid":0,"material":"string","name":"string","original":"string","particulars":"string","pictures":"string","placeid":0,"price":0,"recommend":0,"recommendMsg":"string","salestatus":"string","scenarioids":"string","shapeid":0,"shelftime":"2017-11-22T01:57:52.829Z","styleid":0,"themeid":0,"video":"string","viewnumber":0,"width":"string"}]
    gid:'/api/goods/{id}',
    //GET /api/goods/{id}/art 查询 藏艺术商品ById [id*=>id path long]
    artid:'/api/goods/{id}/art',
    //GET /api/goods/{id}/goods 查询某个艺术家的商品列表不包括藏艺  [id*=>艺术家id path integer,goodsId=>当查询除了选中作品外时传（不传查出所有） 当前goodsId query   long,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    gidgoods:'/api/goods/{id}/goods',
    //GET /api/goods/{id}/particulars 主键查询商品详情 [id*=>商品id path integer]
    particularsid:'/api/goods/{id}/particulars',
    //GET /api/goods/{id}/recommend 浏览时商品推荐 [id*=>商品id path integer,pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    recommendid:'/api/goods/{id}/recommend',
    //GET /api/goods/{id}/recommend/goods 查询 推荐 艺术家商品  [id*=>艺术家id path long,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    recommendidgoods:'/api/goods/{id}/recommend/goods',
    //PUT /api/goods/{id}/update 修改是否推荐 [id*=>商品id path integer,recommend=>是否推荐 ：0不推荐 1 推荐  query   integer,recommendMsg=>推荐理由（非必填）query    string]
    update:'/api/goods/{id}/update',
    /**================== 商品评论 ================**/
    //GET /api/goods/comment 查询商品评价列表 [goodsid=>商品编号 query  integer,memberid=>会员编号 query    integer,pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    comment:'/api/goods/comment',
    //GET /api/goods/comment/member 查询某会员的评价列表 [pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    member:'/api/goods/comment/member',
    //GET /api/goods/comment/{goodsId} 查询商品的 评价列表  [goodsId*=>商品 path   integer,pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    //POST /api/goods/comment/{goodsId} 添加商品评价 [goodsId*=>商品id path integer,artGoodsComment=>商品评价 body json==>{"comment":"string","commentId":0,"createtime":"2017-11-22T01:57:52.957Z","goodsid":0,"memberid":0,"thumbDown":0,"thumbUp":0}]
    commentgid:'/api/goods/comment/{goodsId}',
    //DELETE /api/goods/comment/{id} 删除商品评价列表 [id*=>id path integer]
    //PUT /api/goods/comment/{id} 1 点赞 0 取消赞 [id*=>评论id path    long,flag=>(1 点赞 0 取消赞) query integer]
    commentid:'/api/goods/comment/{id}',
    //POST /api/goods/comment/{id}/commment 回复 商品评价  [id*=>评论id path    long,artGoodsComment=>(回复商品评价 只需要传 回复内容) body json==>{"comment":"string","commentId":0,"createtime":"2017-11-22T01:57:52.981Z","goodsid":0,"memberid":0,"thumbDown":0,"thumbUp":0}]
    commment:'/api/goods/comment/{id}/commment',
    //GET /api/goods/comment/{id}/reply 查询商品的评价 回复 [id*=>商品评价id path    integer]
    reply:'/api/goods/comment/{id}/reply',
    //PUT /api/goods/comment/{id}/trample 1 踩 0 取消 [id*=>评论id path  long,flag=>(1 踩 0 取消) query integer]
    trample:'/api/goods/comment/{id}/trample',
    /**================== 商品等级 ================**/
    //GET /api/goods/level 查询商品等级列表 [name=>等级名称 query   string,pageNo*=>当前页 query   integer,pageSize*=>每页显示条数 query integer,]
    //POST /api/goods/level 增加商品等级 [body*=>商品等级 body json==>{"comment":"string","name":"string","value":0}]
    level:'/api/goods/level',
    //DELETE /api/goods/level/{id} 删除商品等级 [id*=>商品等级id path integer]
    //GET /api/goods/level/{id} 查询商品等级列表ByID [id*=>id path integer]
    //PUT /api/goods/level/{id} 修改商品等级信息 [id*=>商品等级id path integer,body*=>artist body json==>{"comment":"string","name":"string","value":0}]
    levelid:'/api/goods/level/{id}',
    /**================== 商品标签 ================**/
    //POST /api/goods/tag 增加商品标签 [body*=>标签 body json==>{ "goodsid": "string", "tagid": "string"}]
    tag:'/api/goods/tag',
    //DELETE /api/goods/tag/{id} 删除商品标签 [id*=>标签id path integer]
    //GET /api/goods/tag/{id} 查询商品标签ById [id*=>id path  integer]
    //PUT /api/goods/tag/{id} 修改商品标签 [id*=>标签id path    integer,body*=>标签 body json==>{ "goodsid": "string", "tagid": "string"}]
    tagid:'/api/goods/tag/{id}',
    //GET /api/goods/tag/{id}/goods 查询商品标签下的商品 [id*=>标签id path  long,pageNo*=>当前页 query integer,ageSize*=>每页显示条数 query integer]
    tagidgoods:'/api/goods/tag/{id}/goods',
    //GET /api/goods/tag/{id}/tagId 查询商品上的标签 [id*=>商品id path    long,pageNo*=>当前页 query integer,ageSize*=>每页显示条数 query integer]
    tagIdid:'/api/goods/tag/{id}/tagId',
    /**================== 藏艺术 商品 赏析/普通商品 评析 ================**/
    //GET /api/goods/appreciation 普通商品赏析列表 [pageNo*=>当前页 query  integer,pageSize*=>每页显示条数 query integer]
    appreciation:'/api/goods/appreciation',
    //GET /api/goods/appreciation/art 藏艺术赏析列表 [pageNo*=>当前页 query   integer,pageSize*=>每页显示条数 query integer]
    arta:'/api/goods/appreciation/art',
    //GET /api/goods/appreciation/{goodsId} 根据 goodsId 查询艺术评析/藏艺术赏析 [goodsId*=>商品Id path    integer]
    //POST /api/goods/appreciation/{goodsId} 新增艺术评析/藏艺术鉴赏，添加内容简介，添加艺术家评析，更新信息 [appreciation*=>(goodsId 必须传 其他需要什么传什么) body json==>{"artistId":0,"content":"string","createtime":"2017-11-22T01:57:53.188Z","describes":[{"comment":"string","pictureUrl":"string"}],"goodsId":0,"readme":[{"comment":"string"}]}]
    agid:'/api/goods/appreciation/{goodsId}',
    //DELETE /api/goods/appreciation/{id} 删除精品赏析 [id*=>主键id path    integer]
    //GET /api/goods/appreciation/{id} 主键查询艺术评析/藏艺术赏析 [id*=>商品Id path   integer]
    aid:'/api/goods/appreciation/{id}',
    /**================== 艺术品材质 ================**/
    //GET /api/goods/metarial 查询商品材质列表
    //POST /api/goods/metarial 增加商品材质 [body*=>商品材质 body json==>{"createTime":"2017-11-22T01:57:53.232Z","name":"string", "status": 0}]
    metarial:'/api/goods/metarial',
    //DELETE /api/goods/metarial/{id} 删除商品材质 [id*=>商品材质id path  integer]
    //GET /api/goods/metarial/{id} 查询商品材质ByID [id*=>材质主键id path integer]
    //PUT /api/goods/metarial/{id} 修改商品材质信息 [id*=>商品材质id path   integer,body*=>artist body json==>{"createTime":"2017-11-22T01:57:53.232Z","name":"string", "status": 0}]
    metarialid:'/api/goods/metarial/{id}',
    //PUT /api/goods/metarial/{id}/status 改变商品状态 [id*=>商品材质id path  integer,status*=>(状态 0停用 1启用) query integer]
    statusmid:'/api/goods/metarial/{id}/status',
}
/* 艺术家 */
const artist={
    /**================== 艺术家 ================**/
    //GET /api/artist 查询艺术家列表 [memberid=>会员id query integer,mobile=>手机 query    string,levelid=>等级id query  integer,name=>姓名 query  string,pageNo=>当前页 query    integer,pageSize=>每页显示条数 query  integer]
    //POST /api/artist 增加艺术家  [ArtArtist*=>艺术家 body json={"auditStatus":0,"beLiked":0,"birthday":"string","born":"string","comment":"string","createtime":"2017-11-22T06:52:38.623Z","doctorschool":"string","email":"string","graduateschool":"string","headimg":"string","introduce":"string","juniorschool":"string","levelid":0,"livepictures":"string","liveplace":"string","memberid":0,"mobile":"string","name":"string","primaryschool":"string","prize":"string","qq":"string","qqzone":"string","recommend":0,"seniorschool":"string","sex":"string","signType":0,"story":"string","top":"string","undergraduateschool":"string","wechat":"string","weibo":"string"}]
    artist:'/api/artist',
    //POST /api/artist/add/goods 添加作品信息  [artGoods*=>作品 body json=[{"artistid":0,"audio":"string","auditStatus":0,"autograph":0,"categoryid":0,"collectnumber":0,"colorid":0,"cost":0,"createtime":"2017-11-22T06:52:38.632Z","discountprice":0,"edition":"string","freight":0,"goodsstatus":"string","height":"string","iscoupon":"string","isdecorate":"string","ispoints":"string","length":"string","levelid":0,"material":"string","name":"string","original":"string","particulars":"string","pictures":"string","placeid":0,"price":0,"recommend":0,"recommendMsg":"string","salestatus":"string","scenarioids":"string","shapeid":0,"shelftime":"2017-11-22T06:52:38.632Z","styleid":0,"themeid":0,"video":"string","viewnumber":0,"width":"string"}]]
    addgoods:'/api/artist/add/goods',
    //GET /api/artist/condition 条件查询艺术家   [artArtist*=>artArtist body json={"auditStatus":0,"beLiked":0,"birthday":"string","born":"string","comment":"string","createtime":"2017-11-22T06:52:38.649Z","doctorschool":"string","email":"string","graduateschool":"string","headimg":"string","introduce":"string","juniorschool":"string","levelid":0,"livepictures":"string","liveplace":"string","memberid":0,"mobile":"string","name":"string","primaryschool":"string","prize":"string","qq":"string","qqzone":"string","recommend":0,"seniorschool":"string","sex":"string","signType":0,"story":"string","top":"string","undergraduateschool":"string","wechat":"string","weibo":"string"}]
    condition:'/api/artist/condition',
    //GET /api/artist/info 用户id查询艺术家 [memberid*=>艺术家id query   integer]
    info:'/api/artist/info',
    //GET /api/artist/recommend 查询推荐艺术家
    recommend:'/api/artist/recommend',
    //POST /api/artist/registerArt 注册艺术家信息  [artArtist*=>艺术家 body json={"auditStatus":0,"beLiked":0,"birthday":"string","born":"string","comment":"string","createtime":"2017-11-22T06:52:38.665Z","doctorschool":"string","email":"string","graduateschool":"string","headimg":"string","introduce":"string","juniorschool":"string","levelid":0,"livepictures":"string","liveplace":"string","memberid":0,"mobile":"string","name":"string","primaryschool":"string","prize":"string","qq":"string","qqzone":"string","recommend":0,"seniorschool":"string","sex":"string","signType":0,"story":"string","top":"string","undergraduateschool":"string","wechat":"string","weibo":"string"}]
    registerArt:'/api/artist/registerArt',
    //POST /api/artist/sign 查询是否是签约艺术家 [mobile*=>手机号 query string,msgCode*=>手机验证码 query string,realName*=>真实姓名 query string]
    sign:'/api/artist/sign',
    //DELETE /api/artist/{id} 删除艺术家   [id*=>艺术家id query   integer]
    //GET /api/artist/{id} 查询艺术家ByID  [id*=>主键id query   integer]
    //PUT /api/artist/{id} 修改艺术家信息  [id*=>艺术家id query   integer,body*=>artist body json==>{"auditStatus":0,"beLiked":0,"birthday":"string","born":"string","comment":"string","createtime":"2017-11-22T06:52:38.689Z","doctorschool":"string","email":"string","graduateschool":"string","headimg":"string","introduce":"string","juniorschool":"string","levelid":0,"livepictures":"string","liveplace":"string","memberid":0,"mobile":"string","name":"string","primaryschool":"string","prize":"string","qq":"string","qqzone":"string","recommend":0,"seniorschool":"string","sex":"string","signType":0,"story":"string","top":"string","undergraduateschool":"string","wechat":"string","weibo":"string"}]
    artistid:'/api/artist/{id}',
    //PUT /api/artist/{id}/like 点赞  [id*=>艺术家id path  integer,flag*=>1 点赞 query integer]
    like:'/api/artist/{id}/like',
    //PUT /api/artist/{id}/recommend 设置/取消 推荐艺术家  [id*=>艺术家id path  integer,recommend*=>是否推荐 0不推荐/1推荐 query integer]
    recommendid:'/api/artist/{id}/recommend',
    /**================== 艺术家等级 ================**/
    //GET /api/artist/level 查询艺术家等级列表  [name=>等级名称 query string,value=>等级值 query string,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    //POST /api/artist/level 新建艺术家等级  [body*=>等级 body json==>{ "name": "string", "value": 0}]
    level:'/api/artist/level',
    //DELETE /api/artist/level/{id} 删除艺术家等级   [id*=>id path integer]
    //GET /api/artist/level/{id} 查询艺术家等级Byid  [id*=>id path integer]
    //PUT /api/artist/level/{id} 修改艺术家等级      [id*=>id path integer,body*=>等级信息 body json==>{ "name": "string", "value": 0}]
    levelid:'/api/artist/level/{id}',
    //GET /api/artist/tag 查询艺术家标签列表   [artist=>艺术家Id query integer,tagid=>标签id query integer,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    //POST /api/artist/tag 新建艺术家标签      [body*=>标签 body json==>{ "artist": "string", "id": 0, "tagid": "string"}]
    tag:'/api/artist/tag',
    //DELETE /api/artist/tag/{id} 删除艺术家标签  [id*=>id  path   integer]
    //GET /api/artist/tag/{id} 查询艺术家标签Byid [id*=>id  path   integer]
    //PUT /api/artist/tag/{id} 修改艺术家标签     [id*=>id  path   integer,body*=>标签信息 body json==>{ "artist": "string", "id": 0, "tagid": "string"}]
    tagid:'/api/artist/tag/{id}',
    //GET /api/artist/tag/{id}/TagId 查询艺术家身上的标签 [id*=>艺术家id  path       long]
    tagidTagId:'/api/artist/tag/{id}/TagId',
    //GET /api/artist/tag/{id}/artist 查询艺术家标签下的艺术家 [id*=>艺术家id  path        long,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    tagidartist:'/api/artist/tag/{id}/artist',
}
/*订单*/
const order={
        //GET /api/order 当前用户全部订单详情，可通过状态(待支付、已发货，已退货，已完成、已取消)  [status=>状态值(待支付、已发货，已退货，已完成、已取消)  query    string,pageNo=>当前页 query    integer,pageSize=>每页显示条数 query  integer]
        //POST /api/order 商品订单结算/返回订单号  [orderSettlement*=>orderSettlement body josn==>{"addressId":0,"goodss": [{"decorate":0,"editionNo":0,"goodsId":0,"num":0,"paperJamId":0  }],"points":0,"remark": "string"}]
        order:'/api/order',
        //POST /api/order/placeOrder 直接购买结算 [settlementGoods*=>settlementGoods  body  json==>[{"decorate":0,"editionNo":0,"goodsId":0,"num":0,"paperJamId":0}]]
        placeOrder:'/api/order/placeOrder',
        //POST /api/order/shopCar 购物车选中结算 [ids=>12,3,4,5 选中购物车主键id逗号隔开:1,2,3 query  Array[string]]
        shopCar:'/api/order/shopCar',
        //PUT /api/order/{id}/cancel 取消订单 [id*=>订单主键id path integer]
        orderidcancel:'/api/order/{id}/cancel',
        //GET /api/order/{id}/order 主键查询订单 [id*=>订单主键id path    integer]
        cancelorder:'/api/order/{id}/order',
        //PUT /api/order/{id}/update 修改订单状态 [id*=>订单主键id path   integer,status*=>状态值：待支付、已发货，已退货，已完成、已取消  query string]
        updateid:'/api/order/{id}/update',
        //POST /api/order/{id}/vip 购买vip订单结算/返回订单号  [id*=>购买类型 path integer]
        vipid:'/api/order/{id}/vip',
        //GET /api/order/{orderNo} 订单号查询订单详情 [orderNo*=>订单号 path        string]
        orderNo:'/api/order/{orderNo}',
        //PUT /api/order/{id}/delete 删除订单 [id*=>订单主键id path integer]
        delete:'/api/order/{id}/delete'
}

/*圈子&群组*/
const circle={
    //GET /api/circle/topic/group/topic 关注群组的话题 [pageNo=>当前页 query   integer,pageSize=>每页显示条数 query  integer]
    topic:'/api/circle/topic/group/topic',
    //GET /api/circle/topic/top/{limit} 查询置顶话题列表 [limit=>查询个数 path  integer,groupId=>群组id query string]
    toplimit:'/api/circle/topic/top/{limit}',
    //GET /api/circle/group 分页查询群组列表 [pageNo*=>当前页 query    integer,pageSize*=>每页显示条数 query integer,type=>type【hasFocus：已关注，noFocus：未关注】query   string]
    group:'/api/circle/group',
    //PUT /api/circle/group/{id}/status/{status} 关注和取消关注群组 [id=>1212 id path    long,status=>on status【on：关注，un：取消关注】 path  string]
    grouplike:'/api/circle/group/{id}/status/{status}',
    //GET /api/circle/topic 分页查询列表 [groupId=>群组id query   string,pageNo=>当前页 query   integer,pageSize=>每页显示条数 query  integer]
    ctopic:'/api/circle/topic',
    //GET /api/circle/group/{id} 获取群组详情 [id=>id path    long]
    cgid:'/api/circle/group/{id}',
    //GET /api/circle/topic/{id} 获取话题详情 [id*=>id path  long]
    toppicid:'/api/circle/topic/{id}',
    //GET /api/circle/topic/{id}/comments 分页获取单个话题评论列表 [id*=>话题id path  long,pageNo*=>当前页 query integer,pageSize*=>每页显示条数 query integer]
    commentid:'/api/circle/topic/{id}/comments',
    //POST /api/circle/topic/{id}/comment 单个话题评论 [id*=>话题id path    long,content*=>评论内容 query   string]
    addcomment:'/api/circle/topic/{id}/comment',
    //PUT /api/circle/topic/{id}/view 单个话题浏览 [id=>话题id path long]
    view:'/api/circle/topic/{id}/view',
    //PUT /api/circle/topic/{id}/zan 单个资讯点赞  [id=>话题id path long]
    zan:'/api/circle/topic/{id}/zan'
}
/* copyright 版权*/
export const copyright=(a)=>{if(a===undefined||a===""){a="www.chinawiserv.com"}document.getElementsByTagName("body")[0].addEventListener('copy',function(event){event.preventDefault();const node=document.createElement('div');node.appendChild(window.getSelection().getRangeAt(0).cloneContents());const tp=['著作权归作者所有。','商业转载请联系作者获得授权，非商业转载请注明出处。','作者：'+a,'链接：'+window.location.href,'来源：DeepOne BDP基础平台'];const htmlData='<div>'+tp.join('<br />')+'<br/>'+node.innerHTML+'</div>';const textData=tp.join('\n')+'\n\n'+window.getSelection().getRangeAt(0)
if(event.clipboardData){event.clipboardData.setData("text/html",htmlData);event.clipboardData.setData("text/plain",textData);}else if(window.clipboardData){return window.clipboardData.setData("text",textData);}});}
/* meta title信息 */
export const meta=(a)=>{document.title=a}
/*REST_API工具函数*/
export const restApi=(url,params) => {const pa=[];return url.replace(/:(\w+)/img,function(a){return params[pa.push(a)-1]})};
export const restApi2=(url,params) => {const pa=[];return url.replace(/{(\w+)}/img,function(a){return params[a.slice(1,-1)]})};
export const ApiTool=(url, params) =>{
    var uk = [],
        uu = url.replace(/{(\w+)}/img, function(a) {
            uk.push(a.slice(1, -1));
            return params[a.slice(1, -1)]
        }),
        ks = '?';
    for (var j = 0; j < uk.length; j++) {
        params[uk[j]] = ''
    }
    for (var item in params) {
        if (params[item] != '' && item !== 'data') ks += item + '=' + (params[item]) + '&';
    }
    return (uu + ks).slice(0, -1)
}
/*判断是否是函数*/
export const isFunction=(it)=>{return ostring.call(it)==='[object Function]';}
/*判断是否是数组*/
export const isArray=(it)=>{return ostring.call(it)==='[object Array]';}
/* ajax */
export const Jajax=()=>{
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function() {},
        success: arguments[0].success || function() {},
        error: arguments[0].error || function() {}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}
function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}
/* 302跳转 */
export const code302=(it)=>{console.log(id)}
/* js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3 */
export const PreviewImage=(fileObj,imgPreviewId,divPreviewId)=>{
    var allowExtention=".jpg,.bmp,.gif,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
    var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();
    var browserVersion= window.navigator.userAgent.toUpperCase();
    if(allowExtention.indexOf(extention)>-1){
        if(fileObj.files){//HTML5实现预览，兼容chrome、火狐7+等
            if(window.FileReader){
                var reader = new FileReader();
                reader.onload = function(e){
                    document.getElementById(imgPreviewId).setAttribute("src",e.target.result);
                }
                reader.readAsDataURL(fileObj.files[0]);
            }else if(browserVersion.indexOf("SAFARI")>-1){
                alert("不支持Safari6.0以下浏览器的图片预览!");
            }
        }else if (browserVersion.indexOf("MSIE")>-1){
            if(browserVersion.indexOf("MSIE 6")>-1){//ie6
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
            }else{//ie[7-9]
                fileObj.select();
                if(browserVersion.indexOf("MSIE 9")>-1)
                    fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问
                var newPreview =document.getElementById(divPreviewId+"New");
                if(newPreview==null){
                    newPreview =document.createElement("div");
                    newPreview.setAttribute("id",divPreviewId+"New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width+"px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height+"px";
                    newPreview.style.border="solid 1px #d2e2e2";
                }
                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                var tempDivPreview=document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);
                tempDivPreview.style.display="none";
            }
        }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
            var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if(firefoxVersion<7){//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());
            }else{//firefox7.0+
                document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));
            }
        }else{
            document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
        }
    }else{
        alert("仅支持"+allowExtention+"为后缀名的文件!");
        fileObj.value="";//清空选中文件
        if(browserVersion.indexOf("MSIE")>-1){
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML=fileObj.outerHTML;
    }
}
/* 格式话日期 不含时间*/
export const date={
    /**
     * 获取当前时间毫秒数
     */
    getCurrentMsTime : function() {
        var myDate = new Date();
        return myDate.getTime();
    },
    /**
     * 毫秒转时间格式
     */
    longMsTimeConvertToDateTime : function(time) {
        var myDate = new Date(time);
        return this.formatterDateTime(myDate);
    },
    /**
     * 时间格式转毫秒
     */
    dateToLongMsTime : function(date) {
        var myDate = new Date(date);
        return myDate.getTime();
    },
    /**
     * 格式化日期（不含时间）
     */
    formatterDate : function(date) {
        var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate());
        return datetime;
    },
    /**
     * 格式化日期（含时间"00:00:00"）
     */
    formatterDate2 : function(date) {
        var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) + " " + "00:00:00";
        return datetime;
    },
    /**
     * 格式化去日期（含时间）
     */
    formatterDateTime : function(date) {
        var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    },
    /**
     * 时间比较{结束时间大于开始时间}
     */
    compareDateEndTimeGTStartTime : function(startTime, endTime) {
        return ((new Date(endTime.replace(/-/g, "/"))) > (new Date(
            startTime.replace(/-/g, "/"))));
    },
    /**
     * 验证开始时间合理性{开始时间不能小于当前时间{X}个月}
     */
    compareRightStartTime : function(month, startTime) {
        var now = formatterDayAndTime(new Date());
        var sms = new Date(startTime.replace(/-/g, "/"));
        var ems = new Date(now.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = ems - sms;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    },
    /**
     * 验证开始时间合理性{结束时间不能小于当前时间{X}个月}
     */
    compareRightEndTime : function(month, endTime) {
        var now = formatterDayAndTime(new Date());
        var sms = new Date(now.replace(/-/g, "/"));
        var ems = new Date(endTime.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = sms - ems;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    },
    /**
     * 验证开始时间合理性{结束时间与开始时间的间隔不能大于{X}个月}
     */
    compareEndTimeGTStartTime : function(month, startTime, endTime) {
        var sms = new Date(startTime.replace(/-/g, "/"));
        var ems = new Date(endTime.replace(/-/g, "/"));
        var tDayms = month * 30 * 24 * 60 * 60 * 1000;
        var dvalue = ems - sms;
        if (dvalue > tDayms) {
            return false;
        }
        return true;
    },
    /**
     * 获取最近几天[开始时间和结束时间值,时间往前推算]
     */
    getRecentDaysDateTime : function(day) {
        var daymsTime = day * 24 * 60 * 60 * 1000;
        var yesterDatsmsTime = this.getCurrentMsTime() - daymsTime;
        var startTime = this.longMsTimeConvertToDateTime(yesterDatsmsTime);
        var pastDate = this.formatterDate2(new Date(startTime));
        var nowDate = this.formatterDate2(new Date());
        var obj = {
            startTime : pastDate,
            endTime : nowDate
        };
        return obj;
    },
    /**
     * 获取今天[开始时间和结束时间值]
     */
    getTodayDateTime : function() {
        var daymsTime = 24 * 60 * 60 * 1000;
        var tomorrowDatsmsTime = this.getCurrentMsTime() + daymsTime;
        var currentTime = this.longMsTimeConvertToDateTime(this.getCurrentMsTime());
        var termorrowTime = this.longMsTimeConvertToDateTime(tomorrowDatsmsTime);
        var nowDate = this.formatterDate2(new Date(currentTime));
        var tomorrowDate = this.formatterDate2(new Date(termorrowTime));
        var obj = {
            startTime : nowDate,
            endTime : tomorrowDate
        };
        return obj;
    },
    /**
     * 获取明天[开始时间和结束时间值]
     */
    getTomorrowDateTime : function() {
        var daymsTime = 24 * 60 * 60 * 1000;
        var tomorrowDatsmsTime = this.getCurrentMsTime() + daymsTime;
        var termorrowTime = this.longMsTimeConvertToDateTime(tomorrowDatsmsTime);
        var theDayAfterTomorrowDatsmsTime = this.getCurrentMsTime()+ (2 * daymsTime);
        var theDayAfterTomorrowTime = this.longMsTimeConvertToDateTime(theDayAfterTomorrowDatsmsTime);
        var pastDate = this.formatterDate2(new Date(termorrowTime));
        var nowDate = this.formatterDate2(new Date(theDayAfterTomorrowTime));
        var obj = {
            startTime : pastDate,
            endTime : nowDate
        };
        return obj;
    }
}
//字符串转换为时间戳
const getDateTimeStamp=(dateStr)=>{
    return Date.parse(dateStr.replace(/-/gi,"/"));
}
/*=========================== 数值更新动态效果 =================================*/
/* 用法 */
// .number{
//     width: 16px;
//     height: 16px;
//     line-height: 16px;
//     display: inline-block;
//     *display: inline;
//     *zoom: 1;
//     overflow: hidden;
//     li{
//         span{
//             display: block;
//             -webkit-transform: translateY(0%);
//                -moz-transform: translateY(0%);
//                 -ms-transform: translateY(0%);
//                  -o-transform: translateY(0%);
//                     transform: translateY(0%);
//         }
//     }
//     li.active{
//         span{
//             -webkit-animation: move 1s;
//                -moz-animation: move 1s;
//                 -ms-animation: move 1s;
//                  -o-animation: move 1s;
//                     animation: move 1s;
//         }
//     }
// }
// @keyframes move{
//     from{
//         -webkit-transform: translateY(0);
//            -moz-transform: translateY(0);
//             -ms-transform: translateY(0);
//              -o-transform: translateY(0);
//                 transform: translateY(0);
//     }
//     to{
//         -webkit-transform: translateY(-100%);
//            -moz-transform: translateY(-100%);
//             -ms-transform: translateY(-100%);
//              -o-transform: translateY(-100%);
//                 transform: translateY(-100%);
//     }
// }
// window.setInterval(function(){update(w_old,addStep(w_old))},1000)
/*格式化：每三位增加逗号分割*/
export const makeThreeNum=(num)=>{
    num=(num||'').toString();
    return num.match(/\d{1,3}/g).join(',');
}
/*获取区间随机值*/
export const getRand=(min,max)=>{
    return parseInt(Math.random()*(max-min)+min)
}
/*增加step*/
export const addStep=(base)=>{
    return (parseInt(getRand(1,10))+parseInt(base))
}
export const update=(oldNum,newNum)=>{
    w_old=newNum;
    //格式化旧数字
        oldNum=makeThreeNum(oldNum),
        newNum=makeThreeNum(newNum),
        numberHTML='';
    for (var i = 0; i < oldNum.length; i++) {
        //不等加active
        if(oldNum[i]!==newNum[i]){
            numberHTML+=[
                '<li class="group active">',
                    '<span class="old">'+oldNum[i]+'</span>',
                    '<span class="new">'+newNum[i]+'</span>',
                '</li>',
            ].join(',');
        }else{
            numberHTML+=[
                '<li class="group">',
                    '<span class="old">'+oldNum[i]+'</span>',
                    '<span class="new">'+newNum[i]+'</span>',
                '</li>',
            ].join(',');
        }
    }
    return numberHTML;
}
/* 追加内容到后面*/
export const insertAfter=(newElement, targetElement)=>{
    var parent = targetElement.parentNode; // 找到指定元素的父节点
    if (parent.lastChild == targetElement) { // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法 
        parent.appendChild(newElement, targetElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    };
}

/* 字符串转数组 */
export const stringToArray=(str,s)=>{
    return str.split(s||',');//分隔符
}
/* 数组转字符串 */
export const arrayToString=(arr,s)=>{
    return str.join(s||',');// 连接符
}
/**
 * @param begin 截取开始的索引
 * @param num 截取的长度
 */
String.prototype.chinesesubstr = (function(begin, num) {
 var ascRegexp = /[^\x00-\xFF]/g, i = 0;
 while(i < begin) (i ++ && this.charAt(i).match(ascRegexp) && begin --);
 i = begin;
 var end = begin + num;
 while(i < end) (i ++ && this.charAt(i).match(ascRegexp) && end --);
 return this.substring(begin, end);
});

/*第一种：比较常规 */
Array.prototype.unique1 = function() {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (this[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}
/* 第二种：效率更高（改变数组的顺序去重）*/
Array.prototype.unique2 = function() {
    this.sort(); //先排序
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
}
/* 第三种：推荐使用*/
Array.prototype.unique3 = function() {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

/* 去掉数组空元素 */
Array.prototype.removeNull=function(){
    var d=this,arr=[];
    for (var i = 0; i < d.length; i++) {
        if(d[i]){
            arr.push(d[i])
        }
    }
    return arr;
}
export const removeEmptyArrayEle=(arr)=>{
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined) {
            arr.splice(i, 1);
            i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
            // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
    }
    return arr;
};
/* 数组排序 */
function arrMinNum(arr) {
    var minNum = Infinity,
        index = -1,
        minVul = "";
    for (var i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) == "string") {
            if (arr[i].charCodeAt() < minNum) {
                minNum = arr[i].charCodeAt();
                minVul = arr[i];
                index = i;
            }
        } else {
            if (arr[i] < minNum) {
                minNum = arr[i];
                minVul = arr[i]
                index = i;
            }
        }
    };
    return {
        "minNum": minVul,
        "index": index
    };
}

function arrMaxNum(arr) {
    var maxNum = -Infinity,
        index = -1,
        maxVul = "";
    for (var i = 0; i < arr.length; i++) {
        if (typeof(arr[i]) == "string") {
            if (arr[i].charCodeAt() > maxNum) {
                maxNum = arr[i].charCodeAt();
                maxVul = arr[i];
                index = i;
            }
        } else {
            if (arr[i] > maxNum) {
                maxNum = arr[i];
                maxVul = arr[i];
                index = i;
            }
        }
    };
    return {
        "maxNum": maxVul,
        "index": index
    };
}
//从大到小
Array.prototype.arrSortMinToMax=function(){
    var arr=this;
    var arrNew = [];
    var arrOld = arr.concat();
    for (var i = 0; i < arr.length; i++) {
        arrNew.push(arrMinNum(arrOld).minNum);
        arrOld.splice(arrMinNum(arrOld).index, 1)
    };
    return (arrNew);
}
//从小到大
Array.prototype.arrSortMaxToMin=function(){
    var arr=this;
    var arrNew = [];
    var arrOld = arr.slice(0);
    for (var i = 0; i < arr.length; i++) {
        arrNew.push(arrMaxNum(arrOld).maxNum);
        arrOld.splice(arrMaxNum(arrOld).index, 1);
    };
    return (arrNew);
}

/* 随机从数组中取几个元素 */
Array.prototype.getRandomArrayElements=function(count){
      var arr=this;
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
  }
/*============================================================*/
export {config,common,user,goods,artist,order,circle,layer}
