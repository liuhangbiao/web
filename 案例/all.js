/*!
 * Digit Roller Library v1.0
 *
 * Copyright 2013, zhangshaolong
 * QQ: 369669902
 *
 */
 var Roller = (function(win, doc){
	var Digit = function(options, context){
		var options = options || {}, holder;
		this.numel = options.numel || 10;
		this.currentIndex = options.currentIndex || 0;
		this.interval = options.interval || 5;
		this.speed = options.speed || context.speed || 30;
		this.height = 33;
		this.width = 24;
		if(!holder){
			var digitMask = this.digitMask = doc.createElement('div');
			digitMask.className = 'digit-mask';
			holder = this.holder = doc.createElement('div');
			digitMask.appendChild(holder);
			//context.container.style.width = (context.digits.length + 1) * this.width + 'px';
			context.container.appendChild(digitMask);
		}
		holder.className = holder.className ? holder.className + ' digit-container' : 'digit-container';
		createInteger(this.numel, holder);
		holder.style.top = -this.currentIndex * this.height + 'px';
	};
	var createInteger = function(n, node){
		for(var i=0; i<n; i++){
			var rollerDigit = doc.createElement('div');
			rollerDigit.className = 'roller-digit digit-' + i;
			rollerDigit.innerHTML = '&nbsp;';
			node.appendChild(rollerDigit);
		}
	};
	Digit.prototype.move = function(nextIndex){
		clearInterval(this.stepTimer);
		var that = this;
		this.currentIndex = nextIndex;
		var top = parseFloat(this.holder.style.top);
		var distance = - nextIndex * this.height - top;
		var flg = distance > 0 ? 1 : -1;
		var step = distance / this.speed * this.interval;
		var offset = top;
		var holder = this.holder;
		var height = this.height;
		this.stepTimer = win.setInterval(function(){
			offset = offset + step;
			if(flg * (offset - top - distance) >= 0){
				clearInterval(that.stepTimer);
				holder.style.top = -nextIndex * height + 'px';
			}else{
				holder.style.top = offset + 'px';
			}
		}, this.interval);
	};
	var Roller = function(options){
		this.digits = [];
		this.preCount = options.preCount || 0;
		this.speed = options.speed || 300;
		build(this, this.holder = options.holder);
	};
	var build = function(o, node){
		var container = o.container = doc.createElement('div');
		container.className = 'roller-container';
		node.appendChild(container);
	};
	//调用此方法的方式为先添加最低位的数字
	Roller.prototype.addDigit = function(options){
		var digit = new Digit(options, this);
		if(digit.currentIndex){
			this.preCount = +('' + digit.currentIndex + (this.preCount || ''));
		}
		this.digits.push(digit);
	};
	Roller.prototype.add = function(count){
		if(count){
			var nextCount = this.preCount + count;
			var nextCountstr = '' + nextCount;
			var len = Math.max(('' + this.preCount).length, nextCountstr.length);
			this.preCount = nextCount;
			while(this.digits.length < len){
				this.addDigit({}, this);
			}
			var nexts = [];
			while(len--){
				nexts.push(nextCountstr.charAt(len));
			}
			this.refresh(nexts);
		}
	};
	Roller.prototype.refresh = function(vals){
		for(var i=0,len=this.digits.length; i<len; i++){
			var digit = this.digits[i];
			win.clearInterval(digit.stepTimer);
			digit.move(vals[i]);
		}
	};
	return Roller;
})(window, document);
/********* 焦点图 **********
********* liaojin *********
******** 2014-05-27 *******
******* QQ:150334055 ******
**http://www.acmr.com.cn***
**************************/
(function($){
	$.fn.extend({
		player: function(data,options) {
			var defaults = {			//默认值
				Event : "click",		//按钮事件（默认点击）
				timer : false,			//自动播放（默认开启）
				time : 3000,			//定时器间隔（毫秒）
				thatHtml : "",
				minBtnText : "",
				index : 0,
				st : null
			};
			var options = $.extend(defaults,options);//以传参覆盖
			var that = $(this);
			//添加文本开始
			options.thatHtml = "<div class='play-box'><ul class='play-list'>";
			options.minBtnText = "<ol>";
			$.each(data,function(i){
				options.thatHtml += "<li>" +
					"<div class='play-box-l'>" +
						"<dl>" +
							"<dt>" + data[i].ctitle + "</dt>" +
							"<dd>" + data[i].context + "</dd>" +
						"</dl>" +
					"</div>" +
					"<div class='play-box-r'>" +
						"<a href='" + data[i].href + "' target='_blank'><img src='" + data[i].piccode + "' /></a>" +
					"</div>" +
				"</li>";
				options.minBtnText +=  "<li>" + (i+1) + "</li>";
			});
			options.minBtnText += "</ol>";
			options.thatHtml += "</ul>" + options.minBtnText + "</div>";
			that.append(options.thatHtml);
			//添加文本结束
			var $btn = $("ol > li",that), $play = $("ul.play-list > li",that);
			var w1 = $play.width(), w2 = $btn.outerWidth();
			$play.first().css({'z-index':2}).siblings().css({'z-index':1});
			//按钮位置初始化
			$("ol",that).css({left:parseInt(w1-w2*data.length)/2});
			$btn.first().addClass('on');
			//按钮事件
			$btn.on(options.Event,function(e){
				if( $play.is(":animated") ){
					return false;
				}
				options.index = $(this).index();
				play(options.index);
			});
			if(options.timer){		//是否有定时器
				that.mouseover(function(){
					options.st && clearInterval(options.st);
				}).mouseout(function(){
					options.st = setInterval(function (){
						autoPlay();
					},options.time);
				});
				that.trigger("mouseout");
			}
			function play(i){		//开始运动
				var curIndex = $("ol > li.on",that).index();
				if(i === curIndex){			//始终往左滚
					return false;
				}else{
					$btn.eq(i).addClass('on').siblings().removeClass('on');
					$play.css({'z-index':1}).eq(i).css({'left':w1,'z-index':2}).animate({left: 0});
					$play.eq(curIndex).css({'z-index':2}).animate({left: -w1});
				}
			}
			function autoPlay(){	//自动播放
				options.index++;
				if(options.index > data.length - 1){
					options.index = 0;
				}
				play(options.index);
			}
		}
	});
})(jQuery);
/**
 * [menu 菜单]
 * @param  {[type]} mainmenuid [description]
 * @param  {[type]} dir        [description]
 * @return {[type]}            [description]
 */
function menu(mainmenuid, dir){
var menu = {
    enableshim:true,
    arrowpointers:{
        downarrow:[ "js/nav/images/arrow-down.gif", 9, 6 ],
        rightarrow:[ "js/nav/images/arrow-right.gif", 6, 9 ],
        showarrow:{
            toplevel:true,
            sublevel:true
        }
    },
    hideinterval:200,
    effects:{
        enableswipe:true,
        enableslide:true,
        enablefade:true,
        duration:200
    },
    httpsiframesrc:"blank.html",
    topmenuids:[],
    topitems:{},
    subuls:{},
    lastactivesubul:{},
    topitemsindex:-1,
    ulindex:-1,
    hidetimers:{},
    nonFF:!/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent),
    ismobile:navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null,
    getoffset:function(what, offsettype) {
        return what.offsetParent ? what[offsettype] + this.getoffset(what.offsetParent, offsettype) :what[offsettype];
    },
    getoffsetof:function(el) {
        el._offsets = {
            left:this.getoffset(el, "offsetLeft"),
            top:this.getoffset(el, "offsetTop")
        };
    },
    getwindowsize:function() {
        this.docwidth = window.innerWidth ? window.innerWidth - 10 :this.standardbody.clientWidth - 10;
        this.docheight = window.innerHeight ? window.innerHeight - 15 :this.standardbody.clientHeight - 18;
    },
    gettopitemsdimensions:function() {
        for (var m = 0; m < this.topmenuids.length; m++) {
            var topmenuid = this.topmenuids[m];
            for (var i = 0; i < this.topitems[topmenuid].length; i++) {
                var header = this.topitems[topmenuid][i];
                var submenu = document.getElementById(header.getAttribute("rel"));
                header._dimensions = {
                    w:header.offsetWidth,
                    h:header.offsetHeight,
                    submenuw:submenu.offsetWidth,
                    submenuh:submenu.offsetHeight
                };
            }
        }
    },
    isContained:function(m, e) {
        var e = window.event || e;
        var c = e.relatedTarget || (e.type == "mouseover" ? e.fromElement :e.toElement);
        while (c && c != m) try {
            c = c.parentNode;
        } catch (e) {
            c = m;
        }
        if (c == m) return true; else return false;
    },
    addpointer:function(target, imgclass, imginfo, BeforeorAfter) {
        var pointer = document.createElement("img");
        pointer.src = imginfo[0];
        pointer.style.width = imginfo[1] + "px";
        pointer.style.height = imginfo[2] + "px";
        if (imgclass == "rightarrowpointer") {
            pointer.style.left = target.offsetWidth - imginfo[2] - 5 + "px";
        }
        pointer.className = imgclass;
        var target_firstEl = target.childNodes[target.firstChild.nodeType != 1 ? 1 :0];
        if (target_firstEl && target_firstEl.tagName == "SPAN") {
            target = target_firstEl;
        }
        if (BeforeorAfter == "before") target.insertBefore(pointer, target.firstChild); else target.appendChild(pointer);
    },
    css:function(el, targetclass, action) {
        var needle = new RegExp("(^|\\s+)" + targetclass + "($|\\s+)", "ig");
        if (action == "check") return needle.test(el.className); else if (action == "remove") el.className = el.className.replace(needle, ""); else if (action == "add" && !needle.test(el.className)) el.className += " " + targetclass;
    },
    positionshim:function(header, submenu, dir, scrollX, scrollY) {
        if (header._istoplevel) {
            var scrollY = window.pageYOffset ? window.pageYOffset :this.standardbody.scrollTop;
            var topgap = header._offsets.top - scrollY;
            var bottomgap = scrollY + this.docheight - header._offsets.top - header._dimensions.h;
        }
    },
    buildmenu:function(mainmenuid, header, submenu, submenupos, istoplevel, dir) {
        header._master = mainmenuid;
        header._pos = submenupos;
        header._istoplevel = istoplevel;
        if (istoplevel) {
            this.addEvent(header, function(e) {
            	//点击不隐藏
                //menu.hidemenu(menu.subuls[this._master][parseInt(this._pos)].parentNode);
            }, "click");
        }
        this.subuls[mainmenuid][submenupos] = submenu;
        header._dimensions = {
            w:header.offsetWidth,
            h:header.offsetHeight,
            submenuw:submenu.offsetWidth,
            submenuh:submenu.offsetHeight
        };
        this.getoffsetof(header);
        submenu.parentNode.style.left = 0;
        submenu.parentNode.style.top = 0;
        submenu.parentNode.style.visibility = "hidden";
        submenu.style.visibility = "hidden";
        this.addEvent(header, function(e) {
            if (menu.ismobile || !menu.isContained(this, e)) {
                var submenu = menu.subuls[this._master][parseInt(this._pos)];
                if (this._istoplevel) {
                    menu.css(this, "selected", "add");
                    clearTimeout(menu.hidetimers[this._master][this._pos]);
                }
                menu.getoffsetof(header);
                var scrollX = window.pageXOffset ? window.pageXOffset :menu.standardbody.scrollLeft;
                var scrollY = window.pageYOffset ? window.pageYOffset :menu.standardbody.scrollTop;
                var submenurightedge = this._offsets.left + this._dimensions.submenuw + (this._istoplevel && dir == "topbar" ? 0 :this._dimensions.w);
                var submenubottomedge = this._offsets.top + this._dimensions.submenuh;
                var menuleft = this._istoplevel ? this._offsets.left + (dir == "sidebar" ? this._dimensions.w :0) :this._dimensions.w;
                if (submenurightedge-scrollX > menu.docwidth){
					menuleft+= -this._dimensions.submenuw + (this._istoplevel ? this._dimensions.w : -this._dimensions.w);
				}
                submenu.parentNode.style.left = menuleft + "px";
                var menutop = this._istoplevel ? this._offsets.top + (dir == "sidebar" ? 0 :this._dimensions.h) :this.offsetTop;
                submenu.parentNode.style.top = menutop + "px";
                if (menu.enableshim && (menu.effects.enableswipe == false || menu.nonFF)) {
                    menu.positionshim(header, submenu, dir, scrollX, scrollY);
                } else {
                    submenu.FFscrollInfo = {
                        x:scrollX,
                        y:scrollY
                    };
                }
                menu.showmenu(header, submenu, dir);
                if (!menu.ismobile) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                } else {
                    if (header._istoplevel || e.target.parentNode.getElementsByTagName("ul").length > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }, this.ismobile ? "click" :"mouseover");
        this.addEvent(header, function(e) {
            var submenu = menu.subuls[this._master][parseInt(this._pos)];
            if (this._istoplevel) {
                if (!menu.isContained(this, e) && !menu.isContained(submenu.parentNode, e)) menu.hidemenu(submenu.parentNode);
            } else if (!this._istoplevel && !menu.isContained(this, e)) {
                menu.hidemenu(submenu.parentNode);
            }
        }, "mouseout");
    },
    setopacity:function(el, value) {
        el.style.opacity = value;
        if (typeof el.style.opacity != "string") {
            el.style.MozOpacity = value;
            try {
                if (el.filters) {
                    el.style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=" + value * 100 + ")";
                }
            } catch (e) {}
        }
    },
    showmenu:function(header, submenu, dir) {
        if (this.effects.enableswipe || this.effects.enablefade) {
            if (this.effects.enableswipe) {
                var endpoint = header._istoplevel && dir == "topbar" ? header._dimensions.submenuh :header._dimensions.submenuw;
                submenu.parentNode.style.width = submenu.parentNode.style.height = 0;
                submenu.parentNode.style.overflow = "hidden";
            }
            if (this.effects.enablefade) {
                submenu.parentNode.style.width = submenu.offsetWidth + "px";
                submenu.parentNode.style.height = submenu.offsetHeight + "px";
                this.setopacity(submenu.parentNode, 0);
            }
            submenu._curanimatedegree = 0;
            submenu.parentNode.style.visibility = "visible";
            submenu.style.visibility = "visible";
            clearInterval(submenu._animatetimer);
            submenu._starttime = new Date().getTime();
            submenu._animatetimer = setInterval(function() {
                menu.revealmenu(header, submenu, endpoint, dir);
            }, 10);
        } else {
            submenu.parentNode.style.visibility = "visible";
            submenu.style.visibility = "visible";
        }
    },
    revealmenu:function(header, submenu, endpoint, dir) {
        var elapsed = new Date().getTime() - submenu._starttime;
        if (elapsed < this.effects.duration) {
            if (this.effects.enableswipe) {
                if (submenu._curanimatedegree == 0) {
                    submenu.parentNode.style[header._istoplevel && dir == "topbar" ? "width" :"height"] = (header._istoplevel && dir == "topbar" ? submenu.offsetWidth :submenu.offsetHeight) + "px";
                }
                submenu.parentNode.style[header._istoplevel && dir == "topbar" ? "height" :"width"] = submenu._curanimatedegree * endpoint + "px";
                if (this.effects.enableslide) {
                    submenu.style[header._istoplevel && dir == "topbar" ? "top" :"left"] = Math.floor((submenu._curanimatedegree - 1) * endpoint) + "px";
                }
            }
            if (this.effects.enablefade) {
                this.setopacity(submenu.parentNode, submenu._curanimatedegree);
            }
        } else {
            clearInterval(submenu._animatetimer);
            if (this.effects.enableswipe) {
                submenu.parentNode.style.width = submenu.offsetWidth + "px";
                submenu.parentNode.style.height = submenu.offsetHeight + "px";
                submenu.parentNode.style.overflow = "visible";
                if (this.effects.enableslide) {
                    submenu.style.top = 0;
                    submenu.style.left = 0;
                }
            }
            if (this.effects.enablefade) {
                this.setopacity(submenu.parentNode, 1);
                submenu.parentNode.style.filter = "";
            }
            if (this.enableshim && submenu.FFscrollInfo) this.positionshim(header, submenu, dir, submenu.FFscrollInfo.x, submenu.FFscrollInfo.y);
        }
        submenu._curanimatedegree = (1 - Math.cos(elapsed / this.effects.duration * Math.PI)) / 2;
    },
    hidemenu:function(submenu) {
        if (typeof submenu._pos != "undefined") {
            this.css(this.topitems[submenu._master][parseInt(submenu._pos)], "selected", "remove");
        }
        clearInterval(submenu.firstChild._animatetimer);
        submenu.style.left = 0;
        submenu.style.top = "-1000px";
        submenu.style.visibility = "hidden";
        submenu.firstChild.style.visibility = "hidden";
    },
    addEvent:function(target, functionref, tasktype) {
        if (target.addEventListener) target.addEventListener(tasktype, functionref, false); else if (target.attachEvent) target.attachEvent("on" + tasktype, function() {
            return functionref.call(target, window.event);
        });
    },
    domready:function(functionref) {
        if (dd_domreadycheck) {
            functionref();
            return;
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                functionref();
                dd_domreadycheck = true;
            }, false);
        } else if (document.attachEvent) {
            if (document.documentElement.doScroll && window == window.top) (function() {
                if (dd_domreadycheck) {
                    functionref();
                    return;
                }
                try {
                    document.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                functionref();
                dd_domreadycheck = true;
            })();
        }
        if (document.attachEvent && parent.length > 0) this.addEvent(window, function() {
            functionref();
        }, "load");
    },
    init:function(mainmenuid, dir) {
        this.standardbody = document.compatMode == "CSS1Compat" ? document.documentElement :document.body;
        this.topitemsindex = -1;
        this.ulindex = -1;
        this.topmenuids.push(mainmenuid);
        this.topitems[mainmenuid] = [];
        this.subuls[mainmenuid] = [];
        this.hidetimers[mainmenuid] = [];
        var menubar = document.getElementById(mainmenuid);
        var alllinks = menubar.getElementsByTagName("a");
        this.getwindowsize();
        for (var i = 0; i < alllinks.length; i++) {
            if (alllinks[i].getAttribute("rel")) {
                this.topitemsindex++;
                this.ulindex++;
                var menuitem = alllinks[i];
                this.topitems[mainmenuid][this.topitemsindex] = menuitem;
                var dropul = document.getElementById(menuitem.getAttribute("rel"));
                var shelldiv = document.createElement("div");
                shelldiv.className = "navsubmenustyle";
                dropul.removeAttribute("class");
                shelldiv.appendChild(dropul);
                document.body.appendChild(shelldiv);
                shelldiv.style.zIndex = 2e3;
                shelldiv._master = mainmenuid;
                shelldiv._pos = this.topitemsindex;
                this.addEvent(shelldiv, function() {
                    menu.hidemenu(this);
                }, "click");
                var arrowclass = dir == "sidebar" ? "rightarrowpointer" :"downarrowpointer";
                var arrowpointer = dir == "sidebar" ? this.arrowpointers.rightarrow : this.arrowpointers.downarrow;
                if (this.arrowpointers.showarrow.toplevel) this.addpointer(menuitem, arrowclass, arrowpointer, dir == "sidebar" ? "before" :"after");
                this.buildmenu(mainmenuid, menuitem, dropul, this.ulindex, true, dir);
                shelldiv.onmouseover = function() {
                    clearTimeout(menu.hidetimers[this._master][this._pos]);
                };
                this.addEvent(shelldiv, function(e) {
                    if (!menu.isContained(this, e) && !menu.isContained(menu.topitems[this._master][parseInt(this._pos)], e)) {
                        var dropul = this;
                        menu.hidetimers[this._master][this._pos] = setTimeout(function() {
                            menu.hidemenu(dropul);
                        }, menu.hideinterval);
                    }
                }, "mouseout");
                var subuls = dropul.getElementsByTagName("ul");
                for (var c = 0; c < subuls.length; c++) {
                    this.ulindex++;
                    var parentli = subuls[c].parentNode;
                    var subshell = document.createElement("div");
                    subshell.appendChild(subuls[c]);
                    parentli.appendChild(subshell);
                    if (this.arrowpointers.showarrow.sublevel) this.addpointer(parentli.getElementsByTagName("a")[0], "rightarrowpointer", this.arrowpointers.rightarrow, "before");
                    this.buildmenu(mainmenuid, parentli, subuls[c], this.ulindex, false, dir);
                }
            }
        }
        this.addEvent(window, function() {
            menu.getwindowsize();
            menu.gettopitemsdimensions();
        }, "resize");
    }
};
	menu.init(mainmenuid, dir);
}
/********* 人口钟 **********
********* liaojin *********
******** 2014-06-10 *******
******* QQ:150334055 ******
**http://www.acmr.com.cn***
**************************/
function roll(s){			
	var roller = new Roller({holder:$('#rollBox')[0]});
	roller.add(getNumber(s));						//初始化人口数
	setInterval(function(){								//增长数
		roller.add(1);
	}, getScale(s));
	$(".digit-mask").each(function(i){					//数字间隔样式
		if((i) % 3 === 0){
			$(this).css('margin-right', '5px');
		}else{
			$(this).css('margin-right', '2px');
		}
	});
}
function getScale(scale){								//多少秒增加一人
	return parseInt((1 / scale)*1000);
}
function getNumber(scale){						//sTime : 服务器当前时间戳, scale : 人口增长率
	var timeStamp = parseInt((new Date().getTime() - 1388505600000)/1000);					//2014-01-01 00:00:00 000的时间戳1388505600000
	var income = Math.round(timeStamp * scale);			//四舍五入取整
	return income + 1360720000;							//2014-01-01 00:00:00人口数1360720000
}
function pClock(o){
	$.tips({
		title : '中国大陆人口钟',
		content : o.getAttribute('detail'),
		width : 300,
		height : 200,
		drag : true,
		isCopy : false
	});
}
/********* 发布日程 *********
********* liaojin *********
******** 2014-06-10 *******
******* QQ:150334055 ******
**http://www.acmr.com.cn***
**************************/
;(function ($) {
    $.fn.calendar = function (options) {
        var settings = $.extend({
            customDay: new Date(),
			yCount: '',
			content : '',
            lang: 'CN'
        }, options);
        // 语言（中英文）            
        var dayNames = {};
        var monthNames = {};
        dayNames['EN'] = new Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
        dayNames['CN'] = new Array('一', '二', '三', '四', '五', '六', '日');
        monthNames['EN'] = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		monthNames['CN'] = new Array('1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月');
        var $this = $(this);
        var div = function (e, classN) {
            return $(document.createElement(e)).addClass(classN);
        };
        // HTML 日历
        $this.prepend(
			div('div', 'calendar-pages').append(
				div('div', 'header').append(
					div('div', 'ym').append(
						div('div', 'y').append(
							div('p'),
							div('ul').hide()
						),
						div('div', 'm').append(
							div('p'),
							div('ul').hide()
						)
					),
					div('div', 'day-names')
				),
				div('div', 'days clearfix')
			)
        );
        // 添加日期网格6行x7列
        for (var i = 0; i < 42; i++) {
            $this.find('.days').append(div('div', 'day'));
			if(i%7 == 6) {
				$this.find('.days .day').eq(i).css({'border-right':'none'});
			}
			if( (i > 6 && i < 14) || (i > 20 && i < 28) || (i > 34 && i < 42) ) {
				$this.find('.days .day').eq(i).css({'background':'#efefef'});
			}
			if((i%7)%2 ==0) {
				$this.find('.days .day').eq(i).css({'width':35});
			}
        }
        // 添加星期
        for (var i = 0; i < 7; i++) {
			if(i == 0){
				$this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]).css({'border-left':'1px solid #e3e3e3'}));
			}
			else if(i == 6){
				$this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]).css({'border-right':'none'}));
			}
			else{
				$this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]));
			}
			if(i%2 == 0){
				$this.find('.day-names h2').eq(i).css({width:35});
			}
        }
        var d = new Date(settings.customDay.toString().replace(/-/g, "/"));
        var year = d.getFullYear();
        var date = d.getDate();
        var month = d.getMonth();
        var isLeapYear = function(year1) {
            var f = new Date();
            f.setYear(year1);
            f.setMonth(1);
            f.setDate(29);
            return f.getDate() == 29;
        };
        var feb;
        var febCalc = function(feb) { 
            if (isLeapYear(year) === true) { feb = 29; } else { feb = 28; } 
            return feb;
        };
        var monthDays = new Array(31, febCalc(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		function zero(i) {
			return i < 10 ? '0' + i : i;
		}
        function calcMonth(data) {
            monthDays[1] = febCalc(feb);
            var weekStart = new Date();
            weekStart.setFullYear(year, month, 0);
            var startDay = weekStart.getDay();  
            $this.find('.header .y p').html(year + " 年");
            $this.find('.header .m p').html(monthNames[settings.lang][month]);
            $this.find('.day').html('&nbsp;');
            $this.find('.day').removeClass('this-month');
            for (var i = 1; i <= monthDays[month]; i++) {
                startDay++;
                $this.find('.day').eq(startDay-1).addClass('this-month').attr('data-date', year+'-' + zero(month+1) + '-' + zero(i)).html(i);
				if(i%7 == 6){
					$this.find('.day').eq(i).css({'border-right':'none'});
				}
            }
			//当月最后一行日期为空则不显示此行
			if($this.find('.day').eq(35).html() == '&nbsp;'){
				$.each($this.find('.day'),function(i){
					if(i >= 35){
						$this.find('.day').eq(i).hide();
					}
				});
			}else{
				$.each($this.find('.day'),function(i){
					if(i >= 35){
						$this.find('.day').eq(i).show();
					}
				});
			}
			//当天
            if ( month == d.getMonth() && year == d.getFullYear() ) {
                $this.find('.day.this-month').removeClass('today').eq(date-1).addClass('today');
            } else {
                $this.find('.day').removeClass('today');
            }
            //添加发布标记
			$.each(data,function(i){
				var _date = data[i].ym.substring(0,10);
				var _time = data[i].ym.substring(11,16);
				var $day = $this.find('.this-month[data-date="' + _date + '"]');
				if($day.find('.details').length > 0){
					$day.find('.details').append(
						div('li','detail').append(data[i].ctitle + '<span>('+ _time + ')</span>')
					)
				}else{
					$day.append(
						div('div','details').append(
							div('li','detail').append(data[i].ctitle + '<span>('+ _time + ')</span>')
						)
					).addClass('have-event').prepend(div('i',''));
				}
            });
        }
        calcMonth(options.content);
        // 输出、改变年月
		var yC = parseInt(options.yCount[1] - options.yCount[0]);
        for (var i = 0; i <= yC; i++) {
            $this.find('.header .y ul').append("<li>" + (parseInt(options.yCount[0]) + i) + " 年</li>");
        }
        for (var i = 1; i <= 12; i++) {
            $this.find('.header .m ul').append("<li>" + i + " 月</li>")
        }
		//年
		$this.on('click','.header .y p', function(e){
			e.stopPropagation();
			if($(this).siblings('ul').is(':visible')){
				$(this).siblings('ul').hide().parent().removeClass('on');
			}else{
				$(this).siblings('ul').slideDown(300).parent().addClass('on');
			}
			$this.find('.header .m ul').hide().parent().removeClass('on');
		});
		$this.on('click','.header .y ul li',function(e){
			$(this).parent().hide();
			$this.find('.header .y').removeClass('on');
			year = parseInt( $(this).text() );
			$.ajax({
				url : ctx+"/index.htm?m=getMonthData",																		/**********************/
				data : {yearMonth: year + '-' + zero(month +1 )},
				type : 'post',
				dataType : 'json',
				success : function(data){
					calcMonth(data);
				}
			});
			e.stopPropagation();
		});
		//月
		$this.on('click','.header .m p',function(e){
			e.stopPropagation();
			if($(this).siblings('ul').is(':visible')){
				$(this).siblings('ul').hide().parent().removeClass('on');
			}else{
				$(this).siblings('ul').slideDown(300).parent().addClass('on');
			}
			$this.find('.header .y ul').hide().parent().removeClass('on');
		});
		$this.on('click','.header .m ul li',function(e){
			$(this).parent().hide();
			$this.find('.header .m').removeClass('on');
			month = $(this).index();
			$.ajax({
				url : ctx+"/index.htm?m=getMonthData",																		/**********************/
				data : {yearMonth: year + '-' + zero(month +1 )},
				type : 'post',
				dataType : 'json',
				success : function(data){
					calcMonth(data);
				}
			});
			e.stopPropagation();
		});
		$(document).click(function(){
			$this.find('.header .y ul').hide().parent().removeClass('on');
			$this.find('.header .m ul').hide().parent().removeClass('on');
		});
        $this.on('mousedown','.calendar-pages', function () {
            return false;
        });
    };
}(jQuery));
function todayPublish(d){
	var div = function (e, classN) {
		return $(document.createElement(e)).addClass(classN);
	};
	$('#calendar').append(
		div('div', 'todayPublish').append(div('span').text('今日发布：'),div('ul')),
		div('div', 'tomorrowPublish').append(div('span').text('明日发布：'),div('ul')),
		div('div', 'showDates'),
		div('div', 'clear zero')
	);
	//今天
	if(d[1].length > 0){
		$.each(d[1],function(i){
			$('.todayPublish ul').append(div('li', 'list').text(d[1][i].ctitle));
		});
		if(d[1].length > 1){
			slide($('.todayPublish ul'));
		}
	}
	else{
		$('.todayPublish ul').append(div('li', 'list').text('今日无发布内容'));
	}
	//明天
	if(d[2].length > 0){
		$.each(d[2],function(i){
			$('.tomorrowPublish ul').append(div('li', 'list').text(d[2][i].ctitle));
		});
		if(d[2].length > 1){
			slide($('.tomorrowPublish ul'));
		}
	}
	else{
		$('.tomorrowPublish ul').append(div('li', 'list').text('明日无发布内容'));
	}
}
//当天发布明天发布上下无缝滚动
function slide(o){
	var that = o;
	var h = that.children().first().height();
	setInterval(function(){
		that.animate({top: -h},800,function(){
			that.css({top: 0}).children().first().appendTo(that);
		});
	},4000);
}
function time(data){
	calendar(data[0][0].serverTime,data[0][0].minTime,data[0][0].maxTime);
	function calendar(sTime,mintime,maxtime){
		$('#calendar').calendar({
			customDay: sTime,
			yCount: [mintime,maxtime],
			content: data[3],
			color: '#205AA7'
		});
	}
	todayPublish(data);
}
$(function () {	
	$(document).on('mouseover', ".have-event", function () {
		var that = $(this);
		if( that.children().length ){
			var top = $(".calendar-pages").height();
			$(".showDates").css("top",top).html(that.find('.details').html()).show();
			/*$.tips({
				title : '统计发布预告',
				content : that.find('.details').html(),
				date : that.attr('data-date'),
				width : 600,
				height : 300,
				drag : true,			//开启拖拽
				swfUrl : 'js/tips/js/ZeroClipboard.swf'
			});*/
		}
	});
	$(document).on('mouseout', ".have-event", function () {
		$(".showDates").hide();
	});
});
/********* 弹出层 **********
********* liaojin *********
******** 2014-06-05 *******
******* QQ:150334055 ******
**http://www.acmr.com.cn***
**************************/
(function($){
	$.extend({
		tips: function(options) {
			var defaults = {
				title : '',			//标题
				content : '',		//内容
				width : 600,		//默认宽度
				height : 350,		//默认高度
				date : '',			//发布时间
				drag : true,		//弹出层是否可以拖拽
				swfUrl :'',
				isCopy : true
			};
			var options = $.extend(defaults,options);
			var w = $(window).width();
			var _h = $(window).height();
			var h = $(document).height();
			var t = parseInt(( _h - options.height - 62 ) / 2) + $(window).scrollTop();
			var l = parseInt(( w - options.width - 28 ) / 2);
			var content = "<div style='padding:5px'>" + options.content + "</div>";
			var html = "<div class='shade' style='height:" + h + "px;'></div>" + 
				"<div class='tipsBox' style='top:" + t + "px;left:" + l + "px;width:" + (options.width + 20) +"px'>" +
					"<div class='tips-title'><span class='titleTxt'>" + options.title + "</span><span class='closeBtn'></span></div>" +
					"<div class='tips-content' style='height:" + options.height + "px;width:" + options.width + "px'>" + content + "</div>" +
					"<div class='tips-copy'>复制到粘贴板</div>" +
				"</div>";
			$('body').append(html);
			$(document).on('click', '.closeBtn', function(e){
				$('.shade, .tipsBox').remove();
				e.stopPropagation();
			});
			if(!options.isCopy){
				$('.tips-copy').hide();
			}else{
				$('.tips-copy').zclip({
					path: options.swfUrl,
					copy: function(){
						var data = "";
						$('.tips-content ul li,.tips-content > div').each(function(){
							//data += ($(this).text().replace(/,/g, '\r'));
							data += ($(this).html().replace(/<[^<>]+>/g, '\r'));
						});
						return data;
					},
					afterCopy:function(){
						alert("复制成功！");
					}
				});
			}
			$(window).resize(function(){
				auto();
			}).scroll(function(){
				auto()
			});
			function auto(){
				var t = parseInt(( $(window).height() - options.height - 62 ) / 2) + $(window).scrollTop();
				var l = parseInt(( $(window).width() - options.width - 28 ) / 2);
				$('.tipsBox').css({left:l,top:t});
				$('.shade').css({width: $(window).width(),height:$(window).height() + $(window).scrollTop()});
			}
			if(options.drag){
				$(document).on('mousedown', '.tips-title', function(e){
					var that = $(this);
					that.parent().css({opacity:0.6});
					var e = e || window.event;
					var disX = e.clientX - that.parent().offset().left;
					var disY = e.clientY - that.parent().offset().top;
					if(that[0].setCapture){
						that[0].onmousemove=fnMove;
						that[0].onmouseup=fnUp;
						that[0].setCapture();
					}
					else{
						document.onmousemove=fnMove;
						document.onmouseup=fnUp;
					}
					function fnMove(e){
						var e = e || window.event;
						var l = e.clientX - disX;
						var t = e.clientY - disY;
						(l < 0) && (l = 0);
						(l > $(document).width() - that.parent().outerWidth()) && (l = $(document).width()-that.parent().outerWidth());
						(t < 0) && (t = 0);
						(t > $(document).height() - that.parent().outerHeight()) && (t = $(document).height() - that.parent().outerHeight());
						that.parent().css({left: l});
						that.parent().css({top: t});
					}
					function fnUp(){
						that.parent().css({opacity:1});
						this.onmousemove=null;
						this.onmouseup=null;
						that[0].releaseCapture && that[0].releaseCapture();
					}
					return false;
				});
			}
		}
	});
})(jQuery);


var messageDiv='<div id="messageTable" class="office">'+
	'<table width="100%"><tr>'+
	'<td width="33%"></td><td width="67%"><h2>您好！请您留言，我们将尽快回复！</h2></td></tr>'+
	'<tr><td align="right"><strong>*</strong>姓名：</td>'+
	'<td><input type="text" class="messageTxt" name="usrname" id="usrname"/></td></tr>'+
	'<tr><td align="right"><strong>*</strong>电话：</td><td><input type="text" class="messageTxt" id="phone" name="phone"/></td></tr>'+
	'<tr><td align="right"><strong>*</strong>电子邮件：</td>'+
	'<td><input type="text" class="messageTxt" name="email" id="email"/></td></tr>'+
	'<tr><td align="right">留言主题：</td><td><input type="text" value="" class="messageTxt" id="subject" name="subject"/></td></tr>'+
	'<tr><td align="right"><strong>*</strong>留言内容：</td><td><textarea class="messageTxtarea" id="detail" name="detail"></textarea></td></tr>'+
	'<tr><td></td><td><div class="messageBtn ml50 mr15 mt10 left" onclick="addMsg();">提交</div>'+
	'<div class="messageBtn left mt10" onclick="cancelMsg();">取消</div></td>'+
	'</tr></table></div>';