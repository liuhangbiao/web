//公共
export const nopic="this.src='"+require("img/nopic.png")+"'";
export const nopics=require('img/nopic.png');
export const share=[
		['icon-weixing','weixin://','wechatFriend'],
		['icon-weibox share-icon1','https://weibo.cn/huanqiushibaoguanwei','weibo'],
		['icon-fackbook share-icon2','https://m.facebook.com/','qqFriend'],
	];
export const navbar=[
	    {name:"首页",label:"/home",src:require('img/icon1.png'),src1:require('img/icon1a.png')},
	    {name:"分类",label:"/cat",src:require('img/icon2.png'),src1:require('img/icon2a.png')},
	    {name:"圈子",label:"/circle",src:require('img/icon3.png'),src1:require('img/icon3a.png')},
	    {name:"互动",label:"/dong",src:require('img/icon4.png'),src1:require('img/icon4a.png')},
	    {name:"我的",label:"/my",src:require('img/icon5.png'),src1:require('img/icon5a.png')}
	]
export const search={
	logo:require('img/homelogo.png'),
	title:'艺术圈',
	from:{
		placeholder:'作品名称/艺术家/关键字',
		clear:'取消'
	}
}
// 启动页
export const start={
	bgimg:require('img/start.jpg'),
	listRf:[{
		text:'跳过',
		url:'/home',
	},{
		text:'登录',
		url:'/login',
	},{
		text:'注册',
		url:'/register',
	}]
}
//登录
export const login={
	listRf:[{
		text:'登录',
		url:'/start',
	},{
		text:'新用户注册',
		url:'/register',
	},{
		text:'忘记密码',
		url:'/start',
	}],
	from:[
		['请输入手机号码'],
		['密码','请输入密码'],
		['登录']
	]
}
//注册
export const reg={
	listRf:[{
		text:'注册',
		url:'/start'
	},{
		text:'已有帐号?请登录',
		url:'/login'
	}],
	from:[
		['新用户注册，立获首购优'],
		['请输入手机号码'],
		['获取验证码','/registerok']
	]
}
//注册确认
export const regok={
	listRf:[{
		text:'注册',
		url:'/register'
	}],
	from:[
		['获取验证码',20],
		['请输入收到的验证码'],
		['请输入登录密码'],
		['完成'],
		['icon-xingxi','完成注册，则视为您接受《艺术圈用户协议》','http://baidu.com'],
	]
}
//首页
export const banner=[{
		src:require('img/hbs.png'),
		url:'http://m.baidu.com',
		title:'艺术鉴赏'
	},{
		src:require('img/hbs.png'),
		url:'#',
		title:'艺术鉴赏2'
	},{
		src:require('img/hbs.png'),
		url:'#',
		title:'艺术鉴赏3'
}]
export const newgoods=[{
		src:require('img/list1s.png'),
		url:'http://m.baidu.com',
		name:'高渐离',
		title:'艺术鉴赏',
		price:'1234',
	},{
		src:require('img/list1s.png'),
		url:'#',
		name:'高玠瑜',
		title:'难忘的映秀湾',
		price:'31,034'
	},{
		src:require('img/list1s.png'),
		url:'#',
		name:'高玠瑜',
		title:'难忘的映秀湾2',
		price:'31,034'
	},{
		src:require('img/list1s.png'),
		url:'#',
		name:'高玠瑜',
		title:'难忘的映秀湾3',
		price:'31,034'
}]
export const artist=[{
	src:require('img/tou.png'),
	url:'#',
	name:'高玠瑜',
	dd:'李景方教授现为我院教学部部长，笔名井方1935年生于云南个旧，擅长水彩、版画，历任四川美院副教授、教授、教研室主任。中国美术家协会会员、中国水彩画家学会会员、重庆水彩画家学会副会长。20世纪70年代以前，李景方主要从事版画的研究与创作，之后主要从事水彩画的研究与创作。',
	prodUrl:'#'
},{
	src:require('img/tou.png'),
	url:'#',
	name:'李景方',
	dd:'李景方教授现为我院教学部部长，笔名井方1935年生于云南个旧，擅长水彩、版画，历任四川美院副教授、教授、教研室主任。中国美术家协会会员、中国水彩画家学会会员、重庆水彩画家学会副会长。20世纪70年代以前，李景方主要从事版画的研究与创作，之后主要从事水彩画的研究与创作。',
	prodUrl:'#'
},{
	src:require('img/tou.png'),
	url:'#',
	name:'高玠瑜',
	dd:'李景方教授现为我院教学部部长，笔名井方1935年生于云南个旧，擅长水彩、版画，历任四川美院副教授、教授、教研室主任。中国美术家协会会员、中国水彩画家学会会员、重庆水彩画家学会副会长。20世纪70年代以前，李景方主要从事版画的研究与创作，之后主要从事水彩画的研究与创作。',
	prodUrl:'#'
}]
//分类
export const cats={
	title:'分类',
	tolink:["#/catscreen",'icon-saixuan','筛选','icon-tiaozhuan2'],
	catlsit:[{
		name: '默认',
		list:[{
			src:require('img/c1.png'),
			url:'#',
			title:'油画'
		},{
			src:require('img/c2.png'),
			url:'#',
			title:'水彩'
		},{
			src:require('img/c3.png'),
			url:'#',
			title:'摄影'
		},{
			src:require('img/c4.png'),
			url:'#',
			title:'雕塑'
		}]
	},{
		name: '风格',
		list:[{
			src:require('img/c1.png'),
			url:'#',
			title:'抽象'
		},{
			src:require('img/c2.png'),
			url:'#',
			title:'具象'
		},{
			src:require('img/c3.png'),
			url:'#',
			title:'卡通'
		},{
			src:require('img/c4.png'),
			url:'#',
			title:'传统国画'
		}]
	},{
		name: '题材',
		list:[{
			src:require('img/c1.png'),
			url:'#',
			title:'风景'
		},{
			src:require('img/c2.png'),
			url:'#',
			title:'人物'
		},{
			src:require('img/c3.png'),
			url:'#',
			title:'动物'
		},{
			src:require('img/c4.png'),
			url:'#',
			title:'山水'
		}]
	},{
		name: '其他',
		list:[{
			src:require('img/c1.png'),
			url:'#',
			title:'温暖'
		},{
			src:require('img/c2.png'),
			url:'#',
			title:'明亮'
		},{
			src:require('img/c3.png'),
			url:'#',
			title:'快乐'
		},{
			src:require('img/c4.png'),
			url:'#',
			title:'卧室'
		}]
	}]
}
//分类筛选
export const catscreen={
	cstab:['艺术家','价格','尺寸','作品类别','风格','题材','颜色','形状'],
	data:[{ "code": "200", "message": "success", "result": { "recordsFiltered": 11, "data": [{ "id": 1, "memberid": 3, "levelid": 1, "beLiked": null, "name": "马灵丽", "headimg": "https://cdn.ywart.com/ysj/0954501385pBeCMIvjfzGciCm.jpg_small02", "sex": "女", "born": "1987年", "birthday": "11月20日", "primaryschool": "", "juniorschool": "四川美术学院国画系", "seniorschool": "成都四中", "undergraduateschool": "", "graduateschool": "四川美术学院国画系", "doctorschool": "四川美术学院国画系", "weibo": "", "qqzone": "", "qq": "82918828", "wechat": "", "mobile": "18976281092", "liveplace": "四川成都", "livepictures": "", "introduce": "中国当代水墨邀请展", "comment": "", "top": "否", "story": "法自成一体，别具一格，每个字宛如活泼可爱的小燕子，又像是水中嬉戏的小蝌蚪跃然于纸上，由此可见艺术家的身法底蕴深厚。", "recommend": null, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 3, "memberid": 6, "levelid": 1, "beLiked": null, "name": "张可", "headimg": "https://cdn.ywart.com/ysj/201607281559423644074ebe4.png_small02", "sex": "女", "born": "1989年", "birthday": "1月9日", "primaryschool": "", "juniorschool": "四川美术学院油画系", "seniorschool": "通江中学", "undergraduateschool": "四川美术学院油画系", "graduateschool": "四川美术学院油画系", "doctorschool": "四川美术学院油画系", "weibo": "", "qqzone": "", "qq": "982833", "wechat": "", "mobile": "15789645555", "liveplace": "四川通江", "livepictures": "", "introduce": "民生现代美术馆开幕展", "comment": "", "top": "是", "story": "带给人们一种肯定的景象，却有一种未知的陌生。场景的组合仿佛是艺术家在有意消解一种明确的信息，希望观者自己去思考、探索。", "recommend": 0, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 4, "memberid": 9, "levelid": 2, "beLiked": null, "name": "许方正", "headimg": "https://cdn.ywart.com/ysj/20160817112915529a04c6591.png_small02", "sex": "男", "born": "1990年", "birthday": "7月16日", "primaryschool": "", "juniorschool": "四川美术学院油画系", "seniorschool": "重庆沙坪坝高中", "undergraduateschool": "四川美术学院油画系", "graduateschool": "四川美术学院油画系", "doctorschool": "四川美术学院油画系", "weibo": "", "qqzone": "", "qq": "83738332", "wechat": "", "mobile": "15286975896", "liveplace": "重庆", "livepictures": "", "introduce": "第三届重庆青年美术双年展", "comment": "", "top": "否", "story": "近期创作的这一批倾向于实验性的作品，着重于重新去定义和塑造图像，试图在绘画中消解图示符号本身的意义，达到一种新的构建", "recommend": 1, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 5, "memberid": 11, "levelid": 3, "beLiked": null, "name": "王广艺", "headimg": "https://cdn.ywart.com/ysj/20170601113128387025baac6.png_small02", "sex": "男", "born": "1877年", "birthday": "9月1日", "primaryschool": "", "juniorschool": "四川美术学院油画系", "seniorschool": "", "undergraduateschool": "四川美术学院油画系", "graduateschool": "四川美术学院油画系", "doctorschool": "四川美术学院油画系", "weibo": "", "qqzone": "", "qq": "10293893", "wechat": "Vhiishq", "mobile": "13258885455", "liveplace": "深圳", "livepictures": "", "introduce": "画面的深度是依凭绘画过程中的时间", "comment": "", "top": "否", "story": "我无法讲明自己画的是什么，绘画大概是最无法用语言文字来陈述的一种艺术形式，文字永远不能取代视觉，而我们身处在流动的时间当中，各自拥有着自己的角度，让我们看到的并非一个完全一样的世界", "recommend": 0, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 6, "memberid": 13, "levelid": 3, "beLiked": null, "name": "张丽平", "headimg": "https://cdn.ywart.com/ysj/140521842gUtXb4UrZe2mlZOY.jpg_small02", "sex": "男", "born": "1981年", "birthday": "11月9日", "primaryschool": "string", "juniorschool": "四川美术学院油画系", "seniorschool": "", "undergraduateschool": "四川美术学院油画系", "graduateschool": "四川美术学院油画系", "doctorschool": "string", "weibo": "string", "qqzone": "string", "qq": "string", "wechat": "string", "mobile": "13258885455", "liveplace": "string", "livepictures": "string", "introduce": "string", "comment": "string", "top": "string", "story": "string", "recommend": 1, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 18, "memberid": 21, "levelid": 2, "beLiked": null, "name": "陈浩", "headimg": "http://oy9oc5zoj.bkt.clouddn.com/20171031144244_638.jpg", "sex": "female", "born": "", "birthday": "", "primaryschool": "", "juniorschool": "", "seniorschool": "", "undergraduateschool": "", "graduateschool": "", "doctorschool": "", "weibo": "", "qqzone": "", "qq": "", "wechat": "", "mobile": "15923046161", "liveplace": "", "livepictures": "", "introduce": "", "comment": "", "top": "否", "story": "", "recommend": 0, "auditStatus": null, "signType": null, "email": "string", "prize": "", "createtime": 1509432173850 }, { "id": 19, "memberid": 22, "levelid": 2, "beLiked": null, "name": "范加尔", "headimg": "http://oy9oc5zoj.bkt.clouddn.com/20171031144244_638.jpg", "sex": "female", "born": "", "birthday": "", "primaryschool": "", "juniorschool": "", "seniorschool": "", "undergraduateschool": "", "graduateschool": "", "doctorschool": "", "weibo": "", "qqzone": "", "qq": "", "wechat": "", "mobile": "15923046161", "liveplace": "", "livepictures": "", "introduce": "", "comment": "", "top": "否", "story": null, "recommend": 0, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 21, "memberid": 15, "levelid": 5, "beLiked": null, "name": "张大千", "headimg": "https://cdn.ywart.com/ysj/20170104153143806802ada56.jpg@200h_200w_1e_1c_1wh_90Q", "sex": "man", "born": "1993", "birthday": "1993.06", "primaryschool": "三小", "juniorschool": "12", "seniorschool": "125478548.com", "undergraduateschool": "不", "graduateschool": "齐云大学", "doctorschool": "逸散", "weibo": "15895445886", "qqzone": "125478548", "qq": "125478548", "wechat": "assd", "mobile": "15896589657", "liveplace": "新亚", "livepictures": "https://cdn.ywart.com/ysj/20170104153143806802ada56.jpg@200h_200w_1e_1c_1wh_90Q", "introduce": "125", "comment": null, "top": null, "story": "[{\"content\":\"景观:世纪与天堂——成都双年展成都世纪城成都自我造局——中国当代绘画展    上海证大现代艺术馆  上海\",\"time\":\"2003\"},{\"content\":\"中国艺术三年展    南京博物院  南京景观:世纪与天堂——成都双年展    成都世纪城  成都自我造局——中国当代绘画展    上海证大现代艺术馆  上海\",\"time\":\"2010\"}]", "recommend": null, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": null }, { "id": 228, "memberid": 23, "levelid": 2, "beLiked": null, "name": "张觉", "headimg": "http://oy9oc5zoj.bkt.clouddn.com/20171031144244_638.jpg", "sex": "female", "born": "", "birthday": "", "primaryschool": "", "juniorschool": "", "seniorschool": "", "undergraduateschool": "", "graduateschool": "", "doctorschool": "", "weibo": "", "qqzone": "", "qq": "", "wechat": "", "mobile": "15923046161", "liveplace": "", "livepictures": "", "introduce": "", "comment": "", "top": "否", "story": "", "recommend": 0, "auditStatus": null, "signType": null, "email": null, "prize": "", "createtime": 1509432173850 }, { "id": 229, "memberid": 24, "levelid": 2, "beLiked": null, "name": "均安", "headimg": "http://oy9oc5zoj.bkt.clouddn.com/20171031144244_638.jpg", "sex": "女", "born": "&nbsp;", "birthday": "", "primaryschool": "&nbsp;", "juniorschool": "&nbsp;", "seniorschool": "&nbsp;", "undergraduateschool": "&nbsp;", "graduateschool": "", "doctorschool": "&nbsp;", "weibo": "&nbsp;", "qqzone": "&nbsp;", "qq": "&nbsp;", "wechat": "&nbsp;", "mobile": "15923046161", "liveplace": "&nbsp;", "livepictures": "", "introduce": "1111", "comment": "&nbsp;", "top": "是", "story": "&nbsp;", "recommend": 1, "auditStatus": null, "signType": null, "email": "&nbsp;", "prize": "", "createtime": 1509432173850 }, { "id": 232, "memberid": 0, "levelid": 0, "beLiked": null, "name": "胡圣刚", "headimg": "http://oy9oc5zoj.bkt.clouddn.com/20171031144244_638.jpg", "sex": "", "born": "", "birthday": "", "primaryschool": "", "juniorschool": "", "seniorschool": "", "undergraduateschool": "", "graduateschool": "", "doctorschool": "", "weibo": "", "qqzone": "", "qq": "", "wechat": "", "mobile": "", "liveplace": "", "livepictures": "", "introduce": "1111", "comment": "", "top": "", "story": "", "recommend": 0, "auditStatus": null, "signType": null, "email": "", "prize": "", "createtime": 1510128091000 }], "recordsTotal": 11 }}],
	ctds:[{
          on: '',
          name: '艺术家',
          list: []
        },
        {
          on: '',
          name: '价格',
          list: ['￥2,000以下','￥2,000-￥8,000','￥8,000-￥15,000','￥15,000-￥30,000','￥30,000以上']
        },
        {
          on: '',
          name: '尺寸',
          list: ['50cm以下','50cm-100cm','100cm-150cm','150cm-200cm','200cm以上']
        },
        {
          on: '',
          name: '作品类别',
          list: ['油画', '版画', '水墨', '水彩(粉)', '雕塑', '摄影', '书法', '其他']
        }, {
          on: '',
          name: '风格',
          list: ['抽象', '具象', '观念', '卡通', '传统国画', '实验水墨', '其他']
        },
        {
          on: '',
          name: '题材',
          list: ['风景','人物','静物','动物','花鸟','山水','其他']
        },
        {
          on: '',
          name: '颜色',
          list:[
          	{t:'红色',c:'color:#E8343D'},
          	{t:'橙色',c:'color:#FF9706'},
			{t:'黄色',c:'color:#FFDE00'},
			{t:'绿色',c:'color:#1BD168'},
			{t:'青色',c:'color:#04D2D3'},
			{t:'蓝色',c:'color:#14A1E4'},
			{t:'紫色',c:'color:#673AB7'},
			{t:'黑色',c:'color:#000000'},
			{t:'白色',c:'color:#FFFFFF'},
			{t:'灰白',c:'color:#666666'}
			],
        },
        {
          on: '',
          name: '形状',
          list:[
          	{t:'方形',c:'icon-shape1'},
          	{t:'横形',c:'icon-shape2'},
          	{t:'竖形',c:'icon-shape3'},
          	{t:'圆形',c:'icon-shape4'},
          	{t:'不规则形',c:'icon-shape5'},
          ]
        },
      ]
}
//商品列表
export const catls=[
    {name:'李景方',url:'#/goods/1',title:'贡嘎山日出',price:'128',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/2',title:'贡嘎山日出',price:'298',details:'油画 53x36cm',src:require('img/list1s.png')},
    {name:'李景方',url:'#/goods/3',title:'贡嘎山日出',price:'668',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/4',title:'贡嘎山日出',price:'218',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/5',title:'贡嘎山日出',price:'88',details:'油画 53x36cm',src:require('img/list1s.png')},
    {name:'李景方',url:'#/goods/6',title:'贡嘎山日出',price:'128',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/7',title:'贡嘎山日出',price:'128',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/8',title:'贡嘎山日出',price:'298',details:'油画 53x36cm',src:require('img/c3.png')},
    {name:'李景方',url:'#/goods/9',title:'贡嘎山日出',price:'668',details:'油画 53x36cm',src:require('img/hbs.png')},
    {name:'李景方',url:'#/goods/10',title:'贡嘎山日出',price:'218',details:'油画 53x36cm',src:require('img/list1s.png')},
    {name:'李景方',url:'#/goods/11',title:'贡嘎山日出',price:'118',details:'油画 53x36cm',src:require('img/hbs.png')}
]
//商品详情
export const goodsbar={
	totab:[
		{clasz:'fl icon icon-tiaozhuan'},
		{clasz:'fr icon icon-fenxiang'},
		{clasz:'fr icon icon-gouwuc'},
		{text:'作品'},
		{text:'详情'},
		{text:'评论'},
	],
	bottombar:{
		link:[
			['icon-yulan','预览'],['icon-kefu','客服'],['icon-shoucang1','收藏']
			// ['icon-kefu','客服'],['icon-shoucang1','收藏']
		],
		btn:[
			['addCart','加入购物车'],
			['attBuy','立即购买']
		]
	}
}
export const goods={
}