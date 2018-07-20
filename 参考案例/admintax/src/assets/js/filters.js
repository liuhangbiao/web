import Vue from 'vue';
/* 价格格式化 */
const money = (value,type) => {
  return "￥" + String(value).replace(/(?=((?!\b)\d{3})+$)/g, ',') + (type||'');
  // return "￥" + (value).toString().match(/\d{1,3}/g).join(',') + (type||'');
}
/* 日期格式化 */
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
const formatDate=(date, fmt)=> {
	if(!fmt){fmt='yyyy-MM-dd';}
	date=new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

const no=(v)=>{
    if(v==='' || v===null || v===undefined){
        return '未知'
    }else{
        return v;
    }
}
const num=(v)=>{
    if(v==='' || v===null || v===undefined){
        return 0
    }else{
        return v;
    }
}

const getDateDiff=(dateTimeStamp)=>{
    var result='未知';
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else result = "刚刚";
    return result;
}
export { money,formatDate,getDateDiff,no,num}