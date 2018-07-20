//如果大家想要补充，请留言
/**
 * 判断指定名称的复选框是否被选中
 *
 * @param {}
 *            chname复选框名称
 */
function chkCheckCha(chname) {
	var obj = jQuery("[name='" + chname + "']");
	var isCheck = false;
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].checked == true) {
			isCheck = true;
			break;
		}
	}
	return isCheck;
}

/**
 * 得到指定名称的复选框被选中个数
 *
 * @param {}
 *            chname
 * @return {}
 */
function checkChangedOnly(chname) {
	var obj = jQuery("[name='" + chname + "']");
	var count = 0;
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].checked == true) {
			count++;
		}
	}
	return count;
}

/**
 * 得到指定名称的单个被选中的复选择框的值
 *
 * @param {}
 *            chname
 */
function getValueCheckOnly(chname) {
	var str = "";
	jQuery("[name='" + chname + "'][checked]").each(function() {
		str += jQuery(this).val();
	});
	return str;
}

/**
 * 得到多个复选框的值
 *
 * @param {}
 *            chname
 */
function getCheckVals(chname) {
	var str = "";
	jQuery("[name='" + chname + "'][checked]").each(function() {
		str += jQuery(this).val() + "@";
	});
	return str.substring(0, str.length - 1);
}

function getCheckHidden(chname,tagId){
	var strval = getCheckVals(chname);
	var arr = "";
	var temp = strval.split("@");
	for(var i = 0;i<temp.length;i++){
		var val = temp[i];
		var id = tagId+val;
		var tag = $("#"+id).val();
		arr+=tag+"@";
	}
	return arr;
}

/**
 * 得到一些复选框的值 复选框的值中是否包含有","若无则用","将多个值组合 若有则先将值用","隔开再用","组合
 *
 * @param {}
 *            chname
 */
function getSomeChVals(chname) {
	var str = "";
	jQuery("[name='" + chname + "'][checked]").each(function() {
		var temp = jQuery(this).val();
		if (temp.indexOf(",") == -1) {
			str += temp + ",";
		} else {
			var tempValue = temp.split(",");
			str += tempValue[0] + ",";
		}
	});
	return str.substring(0, str.length - 1);
}

function getAnyCheckValue(chname) {
	var str = getCheckVals(chname);
	var tstr = str.split("@");
	var result = "";
	for (var i = 0; i < tstr.length; i++) {
		var temp = tstr[i].split(",");
		result += temp[0] + ",";
	}
	return result.substring(0, result.length - 1);
}

/**
 * 得到指定名称的有多个值的多个复选框的值
 *
 * @param chname
 */
function getCheckValues(chname) {
	var str = "";
	var sids = "";
	var snames = "";
	jQuery("[name='checkbox'][checked]").each(function() {
		var strval = jQuery(this).val();
		var temp = strval.split(",");
		var sid = temp[0];
		var sname = temp[1];
		sids += sid + ",";
		snames += sname + ", ";
	});
	str = sids.substring(0, sids.length - 1) + "|"
		+ snames.substring(0, snames.length - 2);
	return str;
}

/**
 * 判断复选框的状态
 *
 * @param {}
 *            chname
 */
function decideCheckState(chname) {
	var str = getCheckVals(chname);
	var tstr = str.split("@");
	var temp = "";
	for (var i = 0; i < tstr.length; i++) {
		var tval = tstr[i];
		var tem = tval.substring(tval.length - 1, tval.length);
		temp += tem;
	}
	return temp;
}

// 复选框的值是否全为0
function checkStringz(chname) {
	var regex = /^[0]*$/g;
	var source = decideCheckState(chname);
	return regex.test(source);
}

// 复选框的值是否全为1
function checkStringO(chname) {
	var regex = /^[1]*$/g;
	var source = decideCheckState(chname);
	return regex.test(source);
}

function decideStrallz(source) {
	var regex = /^[0]*$/g;
	return regex.test(source);
}
function decideStrallO(source) {
	var regex = /^[1]*$/g;
	return regex.test(source);
}

/**
 * 复选框全选v
 *
 * @param {}
 *            chname
 */
function checkboxAll(chname) {
	jQuery("[name='" + chname + "']").each(function() {
		jQuery(this).attr("checked", true);
	});
}

/**
 * 复选框反选
 *
 * @param {}
 *            chname
 */
function inverSelect(chname) {
	jQuery("[name='" + chname + "']").each(function() {
		if (jQuery(this).attr("checked")) {
			jQuery(this).attr("checked", false);
		} else {
			jQuery(this).attr("checked", true);
		}
	});
}

function selects(all_id,chname){
	$("#"+all_id).click(function(){
		if($(this).attr("checked")){
			checkboxAll(chname);
		}else{
			clearSelect(chname);
		}
	});
}
function mouseHover(obj){
	alert($(obj).attr("style"));
}

/**
 * 取消全选或反选
 *
 * @param {}
 *            chname
 */
function clearSelect(chname) {
	jQuery("[name='" + chname + "']").each(function() {
		jQuery(this).attr("checked", false);
	});
}

/**
 * 点击删除按钮时使用
 */
function dele(chname) {
	var b = chkCheckCha(chname);
	if (!b) {
		alert("请选择要删除的记录");
		return false;
	} else if (confirm("删除后无法恢复，确定删除吗?")) {
		jQuery("[name='form1']").submit();
	} else {
		return false;
	}
}

/**
 * 校验时间格式
 *
 * @param {}
 *            timevale
 * @return {}
 */
function checkTime(timevale) {
	var regex = /^(([0-1][0-9])|([2][0-4]))(\:)[0-5][0-9](\:)[0-5][0-9]$/g;
	var b = regex.test(timevale);
	return b;
}

/**
 * 校验Ip地址格式
 *
 * @param {}
 *            ipvale
 */
function checkIp(ipvale) {
	var regex = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
	var b = regex.test(ipvale);
	return b;
}

/**
 * 是否是由字母或数字组成的字符串
 *
 * @param {}
 *            letVale
 */
function checkLetOrNum(letVale) {
	var regex = /^([a-zA-Z_]{1})([\w]*)$/g;
	var b = regex.test(letVale);
	return b;
}

/**
 * 取字符串的第index的字符
 *
 * @param {}
 *            source
 * @param {}
 *            index
 */
function interceptStr(source, index) {
	var temp = source.charAt(index);
	return parseInt(temp);
}

/**
 * 检查字符串中beindex位置到endindex位置之间是否全由targer组成
 *
 * @param {}
 *            source
 * @param {}
 *            targer
 * @param {}
 *            beindex
 * @param {}
 *            endindex
 */
function checkStr(source, targer, beindex, endindex) {
	var flag = false;
	for (var i = beindex; i <= endindex; i++) {
		var temp = source.charAt(i);
		if (targer == temp) {
			flag = true;
		}
	}
	return flag;
}

/**
 * 验证字符串中的某一段是否全为0
 *
 * @param {}
 *            source
 * @param {}
 *            begin
 * @param {}
 *            end
 * @return {}
 */
function checkString(source, begin, end) {
	var regex = /^[0]*$/g;
	var temp = source.substring(begin, end + 1);
	//alert("###temp=="+temp);
	return regex.test(temp);
}

/**
 * 判断两个字符串是否想等 相等返回true否则返回false
 *
 * @param {}
 *            source
 * @param {}
 *            target
 */
function decideString(source, target) {
	return (source == target) ? true : false;
}

/**
 * 将字符串转换成数字
 * @param val
 * @return
 */
function stringToNumber(val){
	return Number(val);
}

/**
 * 验证是否是整数或小数
 * @param source
 * @return
 */
function checkIntAndFloat(source){
	var regex = /^[0-9]+(\.[0-9]+)?$/g;
	return regex.test(source);
}

/**
 * 验证是否是整数或只有一位小数点的小数
 *
 * @param {}
 *            source
 * @return {}
 */
function checkFloat(source) {
	// var regex=/^[1-9]d*.d{1}|0.d{1}[1-9]d{1}$/g;
	var regex = /^[0-9]+\d*[\.\d]?\d{0,1}$/g;
	return regex.test(source);
}

/**
 * 验证是否两位数以内的正整数
 *
 * @param {}
 *            source
 * @return {}
 */
function checkTwoInt(source) {
	var regex = /^[1-9][0-9]?$/g;  //两位数以内的正整数
	return regex.test(source);
}

/**
 * 验证数字
 *
 * @param {}
 *            source
 * @return {}
 */
function checkNumber(source) {
	var regex = /^(\-|\+)?\d+(\.\d+)?$/;
	return regex.test(source);
}

/**
 * 验证是否是两位小数的正实数
 *
 * @param {}
 *            source
 * @return {}
 */
function checkTowLenFloat(source) {
	var regex = /^[0-9]+(.[0-9]{2})?$/g;//只能输入有两位小数的正实数
	return regex.test(source);
}

/**
 * 验证是否是两位或一位小数的正实数
 *
 * @param {}
 *            source
 * @return {}
 */
function checkTowLenFloatt(source) {
	var regex = /^[0-9]+(.[0-9]{1,2})?$/g;//只能输入有两位小数的正实数
	return regex.test(source);
}

/**
 * 验证是否是整数或只有2位小数的数
 *
 * @param {}
 *            source
 */
function checkTowFloat(source) {
	var regex = /^[1-9]+\d*[\.\d]?\d{0,2}$/g;
	return regex.test(source);
}

/**
 * 验证是否有空格
 *
 * @param {}
 *            source
 */
function checkSpace(source) {
	var regex = /\s/g;
	return regex.test(source);
}

/**
 * 检查一个数是否是整数则位数在8以内
 *
 * @param {}
 *            source
 */
function checkIntLeng(source) {
	var regex = /^[1-9]{1}[0-9]{1,7}$/g
	return regex.test(source);
}

/**
 * 检查一个数是否是整数则位数在2以内
 *
 * @param {}
 *            source
 */
function checkIntTwoLeng(source) {
	var regex = /^[1-9]{1}[0-9]{1,2}$/g
	return regex.test(source);
}

/**
 * 验证正整数
 *
 * @param {}
 *            source
 */
function checkInt(source) {
	// var regex=/^[1-9]d*$/g
	var regex = /^[0-9]*[1-9][0-9]*$/g
	return regex.test(source);
}

/**
 * 验证非负数
 *
 * @param {}
 *            source
 */
function checkNegative(source) {
	var regex=/^[1-9]\d*|0$/g
	return regex.test(source);
}

/**
 * 分割IP地址
 *
 * @param {}
 *            ipAddress
 */
function getIpNum(ipAddress) {
	var ip = ipAddress.split(".");
	var a = parseInt(ip[0]);
	var b = parseInt(ip[1]);
	var c = parseInt(ip[2]);
	var d = parseInt(ip[3]);
	var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
	return ipNum;
}

/**
 * 判断IP大小
 */
function decideIp(startIp, endIp) {
	var ip1 = getIpNum(startIp);
	var ip2 = getIpNum(endIp);
	return (ip2 > ip1) ? true : false;
}

/**
 * 验证是否全是空格
 *
 * @param {}
 *            source
 * @return {}
 */
function checkAllSpace(source) {
	var regex = /^\s+$/g
	return regex.test(source);
}

/*******************************************************************************
 * openWindow(url)函数：弹出窗口 * url：路径 * left:左边的距离 * top：上边的距离 * width：窗口宽度 *
 * height：窗口高度 * resize：yes时可调整窗口大小，no则不可调 *
 ******************************************************************************/
function openWindow(url,width, height, resize) {
	var mleft = (screen.width - width) / 2;
	var mtop = (screen.height - height) / 2;
	window.open(url,"","height=" + height + ",width=" + width
		+ ",location=no,menubar=no,resizable=" + resize
		+ ",scrollbars=yes,status=no,toolbar=no,left=" + mleft
		+ ",top=" + mtop + "");
}

function openWindow(url,width, height, resize,scrollbars) {
	var mleft = (screen.width - width) / 2;
	var mtop = (screen.height - height) / 2;
	window.open(url,"","height=" + height + ",width=" + width
		+ ",location=no,menubar=no,resizable=" + resize
		+ ",scrollbars="+scrollbars+",status=no,toolbar=no,left=" + mleft
		+ ",top=" + mtop + "");
}
/**
 *
 * @param {} url
 * @param {} width
 * @param {} height
 */
function showNewWind(url,width,height){
	//alert(url);
	var showresult = window.showModalDialog(url,window,"dialogWidth="+width+"px;dialogHeight="+height+"px;location=no;status=no;scroll=yes");
	return showresult;
}

/**
 *
 * @param {} url
 * @param {} width
 * @param {} height
 */
function showNewLessWind(url,width,height){
	//alert(url);
	var showresult = window.showModelessDialog(url,window,"dialogWidth:"+width+"px;location=no;status:no;dialogHeight:"+height+"px");
	return showresult;
}

function decideLeve(source){
	var regex=/^[a-zA-Z]{1}$/g;
	return regex.test(source);
}

function openBlankWindow(url){
	openWindow(url,"650","400","yes");
}

/**
 * 时间变化
 * @param {} source
 * @param {} addval
 */
function dateToString(source,addval){
	var paddval = parseInt(addval);//增量(秒)
	var temp = source.split(":");
	var thrs = parseInt(temp[0])*3600;//小时化成秒
	var tmis = parseInt(temp[1])*60;//分钟化成秒;
	var tss = parseInt(temp[2]);//秒
	var totals = parseInt(thrs)+parseInt(tmis)+parseInt(tss)+parseInt(paddval);
	var result = timeTohhmmss(totals);
	return result;
}

/**
 * 由秒数转化成hh:mm:ss格式
 * @param {} seconds
 */
function timeTohhmmss(seconds){
	var hh;
	var mm;
	var ss;
	if(seconds==null || seconds<0){
		return;
	}
	var pseconds = parseInt(seconds);
	//得到小时
	hh = pseconds/3600|0;
	pseconds = parseInt(pseconds)-parseInt(hh)*3600;
	if(parseInt(hh)<10){
		hh="0"+hh;
	}
	if(parseInt(hh)>=24){
		hh="00";
	}
	//得到分钟
	mm = parseInt(pseconds)/60|0;
	//得到秒
	ss = parseInt(pseconds)-parseInt(mm)*60;
	if(parseInt(mm)<10){
		mm = "0"+mm;
	}
	if(parseInt(ss)<10){
		ss = "0"+ss;
	}
	return hh+":"+mm+":"+ss;
}

/**
 验证身份证号是否正确
 **/
function isCardNo(num){
	if(isNaN(num)){
		alert("输入的身份证号不是数字！");
		return false;
	}
	var len = num.length;
	if(len<15 || len>18){
		alert("输入的身份证号码长度不正确定！应为15位或18位");
		return false;
	}
	var re15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	var re18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
	var res = (re15.test(num) || re18.test(num));
	if(res==false){
		alert("输入的身份证号格式不正确！");
		return false;
	}
	return res;
}

/**
 * 判断字符串是否为空，若为空则返回true否则返回false
 * @param source
 * @return true或者false
 **/
function isEmpty(source){
	var str = source.replace(/(^\s*)|(\s*$)/g,"");
	if(str=="" || str.toLowerCase()=="null" || str.length<=0){
		return true;
	}else{
		return false;
	}
}

/**
 * 验证是否为电话号码（座机）
 *
 * @param {}
 *            source
 */

function isTelephone(source) {
	var regex = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
	return regex.test(source);  //search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
}

/**
 * 验证是否为手机号码（移动手机）
 *
 * @param {}
 *            source
 */

function isMobilePhone(source) {
	var regex = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}/;
	return regex.test(source);
}

/**
 * 验证是否为电子邮箱
 *
 * @param {}
 *            source
 */
function isEmail(source) {
	var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(source.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
		return true;
	}else{
		alert("电子邮箱格式不正确");
		return false;
	}
}

/**
 *
 *验证是否为邮编
 * @param
 *      source
 */
function isZip(source){
	var regex=/^[1-9]\d{5}$/;
	return regex.test(source);
}

/**
 *
 *验证字符串是否是中文
 *
 **/
function isChines(source){
	var regex = /^[\u4E00-\u9FA5]+$/;
	return regex.test(source);
}

/**
 生成指定位数的随机整数
 **/
function getRandomNum(count){
	var arr = new Array;
	var reNum = "";
	for(var i=0;i<count;i++){
		arr[i] = parseInt(Math.random()*10);
		reNum += String(arr[i]);
	}
	return reNum;
}
function random(min,max){
	return Math.floor(min+Math.random()*(max-min));
}
/*
 *判断包含关系
 *string:原始字符串
 *substr:子字符串
 *isIgnoreCase:忽略大小写
 */


function jsContains(string,substr,isIgnoreCase)
{
	if(isIgnoreCase)
	{
		string=string.toLowerCase();
		substr=substr.toLowerCase();
	}
	var startChar=substr.substring(0,1);
	var strLen=substr.length;
	for(var j=0;j<string.length-strLen+1;j++)
	{
		if(string.charAt(j)==startChar)//如果匹配起始字符,开始查找
		{
			if(string.substring(j,j+strLen)==substr)//如果从j开始的字符与str匹配，那ok
			{
				return true;
			}
		}
	}
	return false;
}

/**
 * 随机数UUID
 * @return
 */
function makeUUID() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	//return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}




/**
 * 得到项目的基地址
 * @return {}
 */
function getContextPath() {
	var strFullPath = window.document.location.href;
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	var prePath = strFullPath.substring(0, pos);
	var path = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
	return path;
}


/**
 *  显示提示信息
 * @param {Object} msg
 */
function showInfoMessage(msg) {
	Ext.MessageBox.show({
		width:320,
		buttons:Ext.Msg.OK,
		msg:msg,
		icon:Ext.MessageBox.INFO,
		title:"系统提示"
	});
}
/**
 * 给URL追加参数
 * @param {} url
 * @param {} parameter 参数名
 * @param {} value  参数值
 */
function urlAddParmert(url,parameter,value){
	var buf = new StringBuffer();
	if(!isEmpty(url)){
		buf.append(url);
		if(url.indexOf("?") > -1){  //已经有参数
			buf.append("&");
		}else{
			buf.append("?");
		}
		buf.append(parameter);
		buf.append("=");
		buf.append(value);
	}
	return buf.toString();
}

/**
 * 得到文件的扩展名
 * @param {} filename
 */
function getFileExt(filename){
	var d=/\.[^\.]+$/.exec(filename);
	var ext = new String(d);
	var s = ext.toLowerCase();
	return s;
}


//字符串编码
function strEncode(source){
	return encodeURIComponent(source);
}
//字符串解码
function strDencode(source){
	return decodeURIComponent(source);
}
/**
 * 字符串转正形
 * @param source
 * @returns
 */
function strParseInt(source){
	if(isEmpty(source) || isNaN(source)){
		return 0;
	}
	return parseInt(source);
}
/**
 * 字符串转Float形
 * @param source
 * @returns
 */
function strParseFloat(source){
	if(isEmpty(source) || isNaN(source)){
		return 0;
	}
	return parseFloat(source);
}

/**
 * 获取今天日期，星期几
 * @returns
 */
function getTodayDate(){
	var now = new Date();
	var yy = now.getFullYear();
	var mm = now.getMonth()+1;
	var dd=now.getDate();
	var day = new Array();
	day[0] = "星期日";
	day[1] = "星期一";
	day[2] = "星期二";
	day[3] = "星期三";
	day[4] = "星期四";
	day[5] = "星期五";
	day[6] = "星期六";
	return( yy + '年' + mm + '月'+ dd +'日 '+day[now.getDay()]);
}

/**
 * 获取一段时间中含有的周末数量
 * @param beginDate
 * @param endDate
 * @returns {number}
 */
function getIntervalWeekends(beginDate,endDate) {
	var weekends = 0;
	var dateDiffDays = dateDiff("d", beginDate, endDate)+1;
	if(dateDiffDays>0){
		for(var i=0;i<dateDiffDays;i++){
			var newDate = dateAdd("d",i,beginDate);
			if(newDate.getDay()==0 || newDate.getDay()==6){
				weekends++;
			}
		}
	}
	return weekends;
}

/**
 * 时间戳转成时间
 * @param time
 * @returns
 */
function timeStamp2String(time){
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

/**
 * 判断是否为空
 * @param val
 * @returns
 */
function isNull(val) {
	if (val == undefined || val == null || val == "" || val == ''
		|| val == "undefined" || val == "null" || val == "NULL") {
		return true;
	}
	return false;
}

/**
 * 判断闰年
 * @param date Date日期对象
 * @return boolean true 或false
 */
this.isLeapYear = function(date){
	return (0==date.getYear()%4&&((date.getYear()%100!=0)||(date.getYear()%400==0)));
}

/**
 * 日期对象转换为指定格式的字符串
 * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
 * @param date Date日期对象, 如果缺省，则为当前时间
 *
 * YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 * @return string 指定格式的时间字符串
 */
this.dateToStr = function(formatStr, date){
	formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
	date = arguments[1] || new Date();
	var str = formatStr;
	var Week = ['日','一','二','三','四','五','六'];
	str=str.replace(/yyyy|YYYY/,date.getFullYear());
	str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));
	str=str.replace(/MM/,date.getMonth()>9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));
	str=str.replace(/M/g,date.getMonth());
	str=str.replace(/w|W/g,Week[date.getDay()]);

	str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
	str=str.replace(/d|D/g,date.getDate());

	str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());
	str=str.replace(/h|H/g,date.getHours());
	str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());
	str=str.replace(/m/g,date.getMinutes());

	str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());
	str=str.replace(/s|S/g,date.getSeconds());

	return str;
}


/**
 * 日期计算
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param num int
 * @param date Date 日期对象
 * @return Date 返回日期对象
 */
this.dateAdd = function(strInterval, num, date){
	date =  arguments[2] || new Date();
	switch (strInterval) {
		case 's' :return new Date(date.getTime() + (1000 * num));
		case 'n' :return new Date(date.getTime() + (60000 * num));
		case 'h' :return new Date(date.getTime() + (3600000 * num));
		case 'd' :return new Date(date.getTime() + (86400000 * num));
		case 'w' :return new Date(date.getTime() + ((86400000 * 7) * num));
		case 'm' :return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
		case 'y' :return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
	}
}

/**
 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 */
this.dateDiff = function(strInterval, dtStart, dtEnd) { //如 'd',new Date("2016-8-22"),new Date("2016-8-25")
	switch (strInterval) {
		case 's' :return parseInt((dtEnd - dtStart) / 1000);
		case 'n' :return parseInt((dtEnd - dtStart) / 60000);
		case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
		case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
		case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
		case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
		case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
	}
}

/**
 * 字符串转换为日期对象
 * @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
 */
this.strToDate = function(dateStr){
	var data = dateStr;
	var reCat = /(\d{1,4})/gm;
	var t = data.match(reCat);
	t[1] = t[1] - 1;
	eval('var d = new Date('+t.join(',')+');');
	return d;
}

/**
 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
 *
 */
this.strFormatToDate = function(formatStr, dateStr){
	var year = 0;
	var start = -1;
	var len = dateStr.length;
	if((start = formatStr.indexOf('yyyy')) > -1 && start < len){
		year = dateStr.substr(start, 4);
	}
	var month = 0;
	if((start = formatStr.indexOf('MM')) > -1  && start < len){
		month = parseInt(dateStr.substr(start, 2)) - 1;
	}
	var day = 0;
	if((start = formatStr.indexOf('dd')) > -1 && start < len){
		day = parseInt(dateStr.substr(start, 2));
	}
	var hour = 0;
	if( ((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len){
		hour = parseInt(dateStr.substr(start, 2));
	}
	var minute = 0;
	if((start = formatStr.indexOf('mm')) > -1  && start < len){
		minute = dateStr.substr(start, 2);
	}
	var second = 0;
	if((start = formatStr.indexOf('ss')) > -1  && start < len){
		second = dateStr.substr(start, 2);
	}
	return new Date(year, month, day, hour, minute, second);
}


/**
 * 日期对象转换为毫秒数
 */
this.dateToLong = function(date){
	return date.getTime();
}

/**
 * 毫秒转换为日期对象
 * @param dateVal number 日期的毫秒数
 */
this.longToDate = function(dateVal){
	return new Date(dateVal);
}

/**
 * 判断字符串是否为日期格式
 * @param str string 字符串
 * @param formatStr string 日期格式， 如下 yyyy-MM-dd
 */
this.isDate = function(str, formatStr){
	if (formatStr == null){
		formatStr = "yyyyMMdd";
	}
	var yIndex = formatStr.indexOf("yyyy");
	if(yIndex==-1){
		return false;
	}
	var year = str.substring(yIndex,yIndex+4);
	var mIndex = formatStr.indexOf("MM");
	if(mIndex==-1){
		return false;
	}
	var month = str.substring(mIndex,mIndex+2);
	var dIndex = formatStr.indexOf("dd");
	if(dIndex==-1){
		return false;
	}
	var day = str.substring(dIndex,dIndex+2);
	if(!isNumber(year)||year>"2100" || year< "1900"){
		return false;
	}
	if(!isNumber(month)||month>"12" || month< "01"){
		return false;
	}
	if(day>getMaxDay(year,month) || day< "01"){
		return false;
	}
	return true;
}

this.getMaxDay = function(year,month) {
	if(month==4||month==6||month==9||month==11)
		return "30";
	if(month==2)
		if(year%4==0&&year%100!=0 || year%400==0)
			return "29";
		else
			return "28";
	return "31";
}

/**
 *    变量是否为数字
 */
this.isNumber = function(str)
{
	var regExp = /^\d+$/g;
	return regExp.test(str);
}

/**
 * 把日期分割成数组 [年、月、日、时、分、秒]
 */
this.toArray = function(myDate)
{
	myDate = arguments[0] || new Date();
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
}

/**
 * 取得日期数据信息
 * 参数 interval 表示数据类型
 * y 年 M月 d日 w星期 ww周 h时 n分 s秒
 */
this.datePart = function(interval, myDate)
{
	myDate = arguments[1] || new Date();
	var partStr='';
	var Week = ['日','一','二','三','四','五','六'];
	switch (interval)
	{
		case 'y' :partStr = myDate.getFullYear();break;
		case 'M' :partStr = myDate.getMonth()+1;break;
		case 'd' :partStr = myDate.getDate();break;
		case 'w' :partStr = Week[myDate.getDay()];break;
		case 'ww' :partStr = myDate.WeekNumOfYear();break;
		case 'h' :partStr = myDate.getHours();break;
		case 'm' :partStr = myDate.getMinutes();break;
		case 's' :partStr = myDate.getSeconds();break;
	}
	return partStr;
}

/**
 * 取得当前日期所在月的最大天数
 */
this.maxDayOfDate = function(date)
{
	date = arguments[0] || new Date();
	date.setDate(1);
	date.setMonth(date.getMonth() + 1);
	var time = date.getTime() - 24 * 60 * 60 * 1000;
	var newDate = new Date(time);
	return newDate.getDate();
}

/*==========================================*/
isString(o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

isNumber(o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

isBoolean(o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

isFunction(o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

isNull(o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

isUndefined(o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

isObj(o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

isArray(o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

isDate(o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

isRegExp(o) { //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

isError(o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

isSymbol(o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

isPromise(o) { //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

isSet(o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}



isFalse(o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
        return false
}

isTrue(o) {
    return !this.isFalse(o)
}

isIos () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        return false
    }else{
        return false
    }
}

isPC () { //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

browserType(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) return "IE7"
        else if(fIEVersion == 8) return "IE8";
        else if(fIEVersion == 9) return "IE9";
        else if(fIEVersion == 10) return "IE10";
        else return "IE7以下"//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return "Edge";
    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
}

checkStr (str, type) {
    switch (type) {
        case 'phone':   //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':     //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':    //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal':  //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ':      //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':   //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':   //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':     //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP':      //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':    //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number':  //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':   //小写
            return /^[a-z]+$/.test(str);
        case 'upper':   //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML':    //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }
    
    // 严格的身份证校验
    isCardID(sId) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
            alert('你输入的身份证长度或格式错误')
            return false
        }
        //身份证城市
        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if(!aCity[parseInt(sId.substr(0,2))]) { 
            alert('你的身份证地区非法')
            return false
        }

        // 出生日期验证
        var sBirthday=(sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2))).replace(/-/g,"/"),
            d = new Date(sBirthday)
        if(sBirthday != (d.getFullYear()+"/"+ (d.getMonth()+1) + "/" + d.getDate())) {
            alert('身份证上的出生日期非法')
            return false
        }

        // 身份证号码校验
        var sum = 0,
            weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = "10X98765432"
        for (var i = 0; i < sId.length - 1; i++) {
            sum += sId[i] * weights[i];
        }
        var last = codes[sum % 11]; //计算出来的最后一位身份证号码
        if (sId[sId.length-1] != last) { 
            alert('你输入的身份证号非法')
            return false
        }
        
        return true
    }
}

/*==========================================================*/
/*判断一个元素是否在数组中*/
contains (arr, val) {
    return arr.indexOf(val) != -1 ? true : false;
}


/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @return {undefined}
 */
each (arr, fn) {
    fn = fn || Function;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < arr.length; i++) {
        var res = fn.apply(arr, [arr[i], i].concat(args));
        if(res != null) a.push(res);
    }
}

/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @param  {thisObj} this指向
 * @return {Array} 
 */
map (arr, fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for(var i = 0, j = arr.length; i < j; ++i) {
        var res = fn.call(scope, arr[i], i, this);
        if(res != null) a.push(res);
    }
    return a;
}


/**
 * @param  {arr} 数组
 * @param  {type} 1：从小到大   2：从大到小   3：随机
 * @return {Array}
 */
sort (arr, type = 1) {
    return arr.sort( (a, b) => {
        switch(type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}

/*去重*/
unique (arr) {
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr));
    }else{
        var n = {},r=[]; 
        for(var i = 0; i < arr.length; i++){
            if (!n[arr[i]]){
                n[arr[i]] = true; 
                r.push(arr[i]);
            }
        }
        return r;
    }
    // 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能,暂时没找到替代的方法。。。
    /* 正确排重
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr))
    }else{
        var r = [], NaNBol = true
        for(var i=0; i < arr.length; i++) {
            if (arr[i] !== arr[i]) {
                if (NaNBol && r.indexOf(arr[i]) === -1) {
                    r.push(arr[i])
                    NaNBol = false
                }
            }else{
                if(r.indexOf(arr[i]) === -1) r.push(arr[i])
            }
        }
        return r
    }

     */
}


/*求两个集合的并集*/
union (a, b) {
    var newArr = a.concat(b);
    return this.unique(newArr);
}

/*求两个集合的交集*/
intersect (a, b) {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function(o) {
        return _this.contains(b, o) ? o : null;
    });
}

/*删除其中一个元素*/
remove (arr, ele) {
    var index = arr.indexOf(ele);
    if(index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

/*将类数组转换为数组的方法*/
formArray (ary) {
    var arr = [];
    if(Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    };
    return arr;
}

/*最大值*/
max (arr) {
    return Math.max.apply(null, arr);
}

/*最小值*/
min (arr) {
    return Math.min.apply(null, arr);
}

/*求和*/
sum (arr) {
    return arr.reduce( (pre, cur) => {
        return pre + cur
    })
}

/*平均值*/
average (arr) {
    return this.sum(arr)/arr.length
}
/*====================================================================*/
/*随机数范围*/
random (min, max) {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ( (max+1) - min ))
    }else{
        return null;
    }
    
}

/*将阿拉伯数字翻译成中文的大写数字*/
numberToChinese (num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for(var i = a[0].length - 1; i >= 0; i--) {
        switch(k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if(!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if(k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if(a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if(a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for(var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if(re == '一十')
        re = "十";
    if(re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}

/*将数字转换为大写金额*/
changeToChinese (Num) {
        //判断如果传递进来的不是字符的话转换为字符
        if(typeof Num == "number") {
            Num = new String(Num);
        };
        Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
        Num = Num.replace(/ /g, "") //替换tomoney()中的空格
        Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
        if(isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return "";
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(".");
        var newchar = "";
        //小数点前进行转化
        for(var i = part[0].length - 1; i >= 0; i--) {
            if(part[0].length > 10) {
                return "";
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = ""
            var perchar = part[0].charAt(i);
            switch(perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            switch(part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + "元";
                    break;
                case 1:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if(perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "拾";
                    break;
            }
            var newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if(Num.indexOf(".") != -1) {
            if(part[1].length > 2) {
                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)
            }
            for(i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
                switch(perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                if(i == 0) tmpnewchar = tmpnewchar + "角";
                if(i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while(newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零元", "元");
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
        if(newchar.charAt(newchar.length - 1) == "元") {
            newchar = newchar + "整"
        }
        return newchar;
    }

/*=========================================================*/
$ (selector){ 
	var type = selector.substring(0, 1);
	if (type === '#') {
	    if (document.querySelecotor) return document.querySelector(selector)
	        return document.getElementById(selector.substring(1))
	    
	}else if (type === '.') {
	    if (document.querySelecotorAll) return document.querySelectorAll(selector)
	        return document.getElementsByClassName(selector.substring(1))
	}else{
	    return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
	}
} 

/*检测类名*/
hasClass (ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
}

/*添加类名*/
addClass (ele, name) {
    if (!this.hasClass(ele, name)) ele.className += " " + name;
}

/*删除类名*/
removeClass (ele, name) {
    if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}

/*替换类名*/
replaceClass (ele, newName, oldName) {
    this.removeClass(ele, oldName);
    this.addClass(ele, newName);
}

/*获取兄弟节点*/
siblings (ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children,eleMatch = []; 
    for(var i = 0, len = chid.length; i < len; i ++){ 
        if(chid[i] != ele){ 
            eleMatch.push(chid[i]); 
        } 
    } 
    return eleMatch;
}

/*获取行间样式属性*/
getByStyle (obj,name){
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    }else{
        return  getComputedStyle(obj,false)[name];
    }
}
/*==============================================================*/
/*获取网址参数*/
getURL(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if(r!=null) return  r[2]; return null;
}

/*获取全部url参数,并转换成json对象*/
getUrlAllParams (url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

/*删除url指定参数，返回url*/
delParamsUrl(url, name){
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(name)>-1) {
        var obj = {}
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
        return url
    }else{
        return url;
    }
}

/*获取十六进制随机颜色*/
getRandomColor () {
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
}

/*图片加载*/
imgLoadAll(arr,callback){
    var arrImg = []; 
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = arr[i];
        img.onload = function(){
            arrImg.push(this);
            if (arrImg.length == arr.length) {
                callback && callback();
            }
        }
    }
}

/*音频加载*/
loadAudio(src, callback) {
    var audio = new Audio(src);
    audio.onloadedmetadata = callback;
    audio.src = src;
}

/*DOM转字符串*/
domToStirng(htmlDOM){
    var div= document.createElement("div");
    div.appendChild(htmlDOM);
    return div.innerHTML
}

/*字符串转DOM*/
stringToDom(htmlString){
    var div= document.createElement("div");
    div.innerHTML=htmlString;
    return div.children[0];
}


/**
 * 光标所在位置插入字符，并设置光标位置
 * 
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
setCursorPosition (dom,val,posLen) {
    var cursorPosition = 0;
    if(dom.selectionStart){
        cursorPosition = dom.selectionStart;
    }
    this.insertAtCursor(dom,val);
    dom.focus();
    console.log(posLen)
    dom.setSelectionRange(dom.value.length,cursorPosition + (posLen || val.length));
}

/*光标所在位置插入字符*/
insertAtCursor(dom, val) {
    if (document.selection){
        dom.focus();
        sel = document.selection.createRange();
        sel.text = val;
        sel.select();
    }else if (dom.selectionStart || dom.selectionStart == '0'){
        let startPos = dom.selectionStart;
        let endPos = dom.selectionEnd;
        let restoreTop = dom.scrollTop;
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
        if (restoreTop > 0){
            dom.scrollTop = restoreTop;
        }
        dom.focus();
        dom.selectionStart = startPos + val.length;
        dom.selectionEnd = startPos + val.length;
    } else {
        dom.value += val;
        dom.focus();
    }
}

/*JavaScript将首字母转成大写*/
/* To Title Case 1.1.1
 * David Gouch <http://individed.com>
 * 23 May 2008
 * License: http://individed.com/code/to-title-case/license.txt
 *
 * In response to John Gruber's call for a Javascript version of his script: 
 * http://daringfireball.net/2008/05/title_case
 */

String.prototype.toTitleCase = function() {
    return this.replace(/([\w&amp;`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title) {
        if (index > 0 &amp;&amp; title.charAt(index - 2) !== ":" &amp;&amp;
            match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1)
            return match.toLowerCase();
        if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1)
            return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
        if (match.substr(1).search(/[A-Z]+|&amp;|[\w]+[._][\w]+/) > -1 || 
            title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
            return match;
        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};


/**
 * 
 * @desc 判断两个数组是否相等
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return {Boolean}
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * 
 * @desc   为元素添加class
 * @param  {HTMLElement} ele 
 * @param  {String} cls 
 */
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

/**
 * 
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 * @return {Boolean}
 */
function hasClass(ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
 }

 /**
 * 
 * @desc 为元素移除class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 */
var hasClass = require('./hasClass');
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * 
 * @desc 根据name读取cookie
 * @param  {String} name 
 * @return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
}

/**
 * 
 * @desc 根据name删除cookie
 * @param  {String} name 
 */
function removeCookie(name) {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, '1', -1);
}

/**
 * 
 * @desc  设置Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days 
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
 * 
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}

/**
 * 
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}


/**
 * 
 * @desc 获取滚动条距顶部的距离
 */
function getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}
/**
 * 
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele 
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
    };
    return pos;
}




var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
/**
 * 
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to 
 * @param {Number} duration 
 */
function scrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return
    }
    var diff = to - getScrollTop();
    if (diff === 0) return
    var step = diff / duration * 10;
    requestAnimationFrame(
        function () {
            if (Math.abs(step) > Math.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                return;
            }
            setScrollTop(getScrollTop() + step);
            if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
                return;
            }
            scrollTo(to, duration - 16);
        });
}

/**
 * 
 * @desc 设置滚动条距顶部的距离
 */
function setScrollTop(value) {
    window.scrollTo(0, value);
    return value;
}



var keyCodeMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    42: 'Print Screen',
    45: 'Insert',
    46: 'Delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    91: 'Windows',
    93: 'Right Click',
    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};
/**
 * @desc 根据keycode获得键名
 * @param  {Number} keycode 
 * @return {String}
 */
function getKeyName(keycode) {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
    }
};


/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values) return values;
    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }
    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }
    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy values! Its type isn't supported.");
}

/**
 * 
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}



/**
 * 
 * @desc 随机生成颜色
 * @return {String} 
 */
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * 
 * @desc 生成指定范围随机数
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}



/**
 * 
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}


/**
 * 
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}


/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}


/**
 * 
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}


/**
 * 
 * @desc   现金额转大写
 * @param  {Number} n 
 * @return {String}
 */
function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};


/**
 * 
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean} 
 */
function isSupportWebP() {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}


/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime 
 * @return {String}
 */
function formatPassTime(startTime) {
    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
}


/**
 * 
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime  
 * @return {String}
 */
function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

/**
 * 
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
function parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


/**
 * 
 * @desc   对象序列化
 * @param  {Object} obj 
 * @return {String}
 */
function stringfyQueryString(obj) {
    if (!obj) return '';
    var pairs = [];
    for (var key in obj) {
        var value = obj[key];
        if (value instanceof Array) {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return pairs.join('&');
}



/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */
function throttle(delay, noTrailing, callback, debounceMode) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;
    // Keep track of the last time `callback` was executed.
    var lastExec = 0;
    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;
        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }
        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        }
        if (debounceMode && !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }
        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        if (debounceMode === undefined && elapsed > delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();
        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }
    }
    // Return the wrapper function.
    return wrapper;
};


/**
 * @desc 函数防抖 
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */
function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};




// 添加自己的函数
/**
 * 
 * @desc   判断是否NaN
 * @param  {Any} value 
 * @return {Boolean}
 */
function isNaN(value) {    
    return value !== value;
};
modules.export = isNaN


// 在 test文件新建测试用例
describe('#isNaN()', function () {
    it(`outils.isNaN(NaN) should return true`, function () {
        assert(outils.isNaN(NaN))
    })
    it(`outils.isNaN('value') should return false`, function () {
        assert.notEqual(outils.isNaN(NaN))
    })
})


// -------------------------------
/* copyright 版权*/
export const copyright=(a)=>{if(a===undefined||a===""){a="www.xintongdt.com"}document.getElementsByTagName("body")[0].addEventListener('copy',function(event){event.preventDefault();const node=document.createElement('div');node.appendChild(window.getSelection().getRangeAt(0).cloneContents());const tp=['著作权归作者所有。','商业转载请联系作者获得授权，非商业转载请注明出处。','作者：'+a,'链接：'+window.location.href,'来源：税务信用云'];const htmlData='<div>'+tp.join('<br />')+'<br/>'+node.innerHTML+'</div>';const textData=tp.join('\n')+'\n\n'+window.getSelection().getRangeAt(0)
if(event.clipboardData){event.clipboardData.setData("text/html",htmlData);event.clipboardData.setData("text/plain",textData);}else if(window.clipboardData){return window.clipboardData.setData("text",textData);}});}
/* meta title信息 */
export const meta=(a)=>{document.title=a}
/*工具类*/
export const util={
	/* 格式化url占位符：[urlFormat(url, {id: '111', name: 'yc'}),eg:http://localhost:8080/yunpan/{id}/aaa/{name}=>http://localhost:8080/yunpan/111/aaa/yc]*/
	urlFormat:function(url, param){
		if (param === undefined || param === null || param === {}) {
	        return url;
	    }
	    let keys = Object.keys(param);
	    for (let key of keys) {
	        url = url.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
	    }
	    return url;
	},
	/* 获取类型
	 * __getClass(5); // => "Number"
	 * __getClass({}); // => "Object"
	 * __getClass(/foo/); // => "RegExp"
	 * __getClass(''); // => "String"
	 * __getClass(true); // => "Boolean"
	 * __getClass([]); // => "Array"
	 * __getClass(undefined); // => "Window"
	 * __getClass(Element); // => "Constructor"
	*/
	__getClass:function(object){
	  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	},
	/* 判断类型 [isType([])=> Array],isType([],'Array')=>true*/
	isType:function(val,type){
		// const types=["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"];
		// return Object.prototype.toString.call(val);
		if(type){
		  return Object.prototype.toString.call(val) === "[object "+type+"]";
		}
		return Object.prototype.toString.call(val).match(/^\[object\s(.*)\]$/)[1];
	},
	checkStr:function(str, type) {
	    switch (type) {
	        case 'phone':   //手机号码
	            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
	        case 'tel':     //座机
	            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
	        case 'card':    //身份证
	            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
	        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
	            return /^[a-zA-Z]\w{5,17}$/.test(str);
	        case 'postal':  //邮政编码
	            return /[1-9]\d{5}(?!\d)/.test(str);
	        case 'QQ':      //QQ号
	            return /^[1-9][0-9]{4,9}$/.test(str);
	        case 'email':   //邮箱
	            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
	        case 'money':   //金额(小数点2位)
	            return /^\d*(?:\.\d{0,2})?$/.test(str);
	        case 'url':     //网址
	            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
	        case 'IP':      //IP
	            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
	        case 'IP2':      //IP
	        	return /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/.test(str);
	        case 'time':    //时间
	        	return  /^(([0-1][0-9])|([2][0-4]))(\:)[0-5][0-9](\:)[0-5][0-9]$/.test(str);
	        case 'date':    //日期时间
	            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
	        case 'IntAndFloat':  //验证是否是整数或小数
	        	return /^[0-9]+(\.[0-9]+)?$/.test(str);
	        case 'number':  //数字
	            return /^[0-9]$/.test(str);
	        case 'english': //英文
	            return /^[a-zA-Z]+$/.test(str);
	        case 'chinese': //中文
	            return /^[\u4E00-\u9FA5]+$/.test(str);
	        case 'lower':   //小写
	            return /^[a-z]+$/.test(str);
	        case 'upper':   //大写
	            return /^[A-Z]+$/.test(str);
	        case 'HTML':    //HTML标记
	            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
	        default:
	            return true;
	    }
	},
	/* 判断是否为false */
	isFalse:function(o) {
	    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
	        return false
	},
	/* 判断两个字符串是否想等 相等返回true否则返回false  */
	decideString:function(source, target){
    	return (source == target) ? true : false;
	},
	/* 判断是否为空对象 */
	isEmptyObject:function(obj) {
	    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
	        return false
	    return !Object.keys(obj).length
	},
	/* 将字符串转换成数字  */
	stringToNumber:function(val){
		return Number(val);
	},
	/* 生成指定范围随机数 */
	randomNum:function(min, max) {
	    return Math.floor(min + Math.random() * (max - min));
	}
}
/**
 * 扩展了 String 类型，给其添加格式化的功能，替换字符串中 {placeholder} 或者 {0}, {1} 等模式部分为参数中传入的字符串
 * 使用方法:
 *     'I can speak {language} since I was {age}'.format({language: 'Javascript', age: 10})
 *     'I can speak {0} since I was {1}'.format('Javascript', 10)
 * 输出都为:
 *     I can speak Javascript since I was 10
 *
 * @param replacements 用来替换 placeholder 的 JSON 对象或者数组
 */
String.prototype.format = function(replacements) {
    replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 0);
    return formatString(this, replacements);
}
/**
 * 替换字符串中 {placeholder} 或者 {0}, {1} 等模式部分为参数中传入的字符串
 * 使用方法:
 *     formatString('I can speak {language} since I was {age}', {language: 'Javascript', age: 10})
 *     formatString('I can speak {0} since I was {1}', 'Javascript', 10)
 * 输出都为:
 *     I can speak Javascript since I was 10
 *
 * @param str 带有 placeholder 的字符串
 * @param replacements 用来替换 placeholder 的 JSON 对象或者数组
 */
const formatString = function (str, replacements) {
    replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 1);
    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
        if (m == '{{') { return '{'; }
        if (m == '}}') { return '}'; }
        return replacements[n];
    });
};
/*REST_API工具函数*/
// export const restApi=(url,params) => {const pa=[];return url.replace(/:(\w+)/img,function(a){return params[pa.push(a)-1]})};
// export const restApi2=(url,params) => {const pa=[];return url.replace(/{(\w+)}/img,function(a){return params[a.slice(1,-1)]})};
// export const ApiTool=(url, params) =>{
//     var uk = [],
//         uu = url.replace(/{(\w+)}/img, function(a) {
//             uk.push(a.slice(1, -1));
//             return params[a.slice(1, -1)]
//         }),
//         ks = '?';
//     for (var j = 0; j < uk.length; j++) {
//         params[uk[j]] = ''
//     }
//     for (var item in params) {
//         if (params[item] != '' && item !== 'data') ks += item + '=' + (params[item]) + '&';
//     }
//     return (uu + ks).slice(0, -1)
// }
// 
/* =============================================================== */
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