/*配置文件*/
export const config={
    baseURI:'/api'
}

/*通用接口*/
const common={
	//GET /api/user/{id} 获取用户
    // user:'/api/user/{id}',
    user:'/sys/users',
}
/*资源配置*/
const nopics=require('img/nopic.png');

/* copyright 版权*/
export const copyright=(a)=>{if(a===undefined||a===""){a="www.xintongdt.com"}document.getElementsByTagName("body")[0].addEventListener('copy',function(event){event.preventDefault();const node=document.createElement('div');node.appendChild(window.getSelection().getRangeAt(0).cloneContents());const tp=['著作权归作者所有。','商业转载请联系作者获得授权，非商业转载请注明出处。','作者：'+a,'链接：'+window.location.href,'来源：税务信用云'];const htmlData='<div>'+tp.join('<br />')+'<br/>'+node.innerHTML+'</div>';const textData=tp.join('\n')+'\n\n'+window.getSelection().getRangeAt(0)
if(event.clipboardData){event.clipboardData.setData("text/html",htmlData);event.clipboardData.setData("text/plain",textData);}else if(window.clipboardData){return window.clipboardData.setData("text",textData);}});}
/* meta title信息 */
export const meta=(a)=>{document.title=a}
/*工具类*/
export const util={
	/* 格式化url占位符：[urlFormat(url, {id: '111', name: 'yc'}),eg:http://localhost:8080/yunpan/{id}/aaa/{name}=>http://localhost:8080/yunpan/111/aaa/yc]*/
	urlFormat:function(url, param){
		console.log(url,param)
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
	},
	/* 判断是否存在该字体 isFontFamily('Microsoft Yahei')*/
	isFontFamily:function(f) {
	    if (typeof f != "string") { return false }
	    var h = "Arial";
	    if (f.toLowerCase() == h.toLowerCase()) { return true }
	    var e = "a";
	    var d = 100;
	    var a = 100,
	        i = 100;
	    var c = document.createElement("canvas");
	    var b = c.getContext("2d");
	    c.width = a;
	    c.height = i;
	    b.textAlign = "center";
	    b.fillStyle = "black";
	    b.textBaseline = "middle";
	    var g = function(j) {
	        b.clearRect(0, 0, a, i);
	        b.font = d + "px " + j + ", " + h;
	        b.fillText(e, a / 2, i / 2);
	        var k = b.getImageData(0, 0, a, i).data;
	        return [].slice.call(k).filter(function(l) { return l != 0 })
	    };
	    return g(h).join("") !== g(f).join("")
	},
	cutStrinf:function(s, n) {
　　　　return s.slice(0, n).replace(/([^x00-xff])/g, "$1a").slice(0, n).replace(/([^x00-xff])a/g, "$1");
　　},
	subString: function(str, len, hasDot) {
		// str = str.replace(/&amp;/g,"&");
		// str = str.replace(/&lt;/g,"<");
		// str = str.replace(/&gt;/g,">");
		// str = str.replace(/&quot;/g,"\"");
		// str = str.replace(/&#39;/g,"'");
		// str = str.replace(/\<\/br\>/g," ");
		// str = str.replace(/\<br\/\>/g," ");
	    var newLength = 0;
	    var newStr = "";
	    var chineseRegex = /[^\x00-\xff]/g;
	    var singleChar = "";
	    var strLength = str.replace(chineseRegex, "**").length;
	    for (var i = 0; i < strLength; i++) {
	        singleChar = str.charAt(i).toString();
	        if (singleChar.match(chineseRegex) != null) {
	            newLength += 2;
	        } else {
	            newLength++;
	        }
	        if (newLength > len) {
	            break;
	        }
	        newStr += singleChar;
	    }
	    if (hasDot && strLength > len) {
	        newStr += "...";
	    }
	    return newStr;
	},
	 subString2:function(str, n) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "...";
            }
        }
        return str;
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

export {
	common,
	nopic,
	nopics
}