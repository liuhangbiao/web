

var loadimg_typr = true

$(function(){
	loadimg($("#loading img"),funloading_obj);
	setTimeout(function(){
		funloading_in();
	},6000);


	$(window).resize(section5_owl);

	sideNav();
	section5_xiala();
	section7_zI();
	footer();
	section5_owl();
	
});
//第5屏初始化
function section5_owl(){
			if($(window).width()>1400){
				$(".section5 .owl-carousel").css("width","916");
			}else if($(window).width()>=1024){
				$(".section5 .owl-carousel").css("width","680");
			}else if($(window).width()>=768){
				$(".section5 .owl-carousel").css("width","680");
			}else if($(window).width()>470){
		        $(".section5 .owl-carousel").css("width","430");
			}else {
				$(".section5 .owl-carousel"
					).css("width","260");
			}
	}

//底部展开按钮
function footer(){
	if($(window).width()<768){
		$(".footerBox .linkIn,.footerBox li").not(".tit").css("display","none");

		

	   	$(".footerBox ul").each(function(){
	   		if($(this).find("li").length>1){
	   			$(this).addClass("ul320");
	   		}
	   	})



        var btn=true;
		$(".footerBox").delegate(".tit","click",function(){
			if(btn==true){

             $(".footerBox li").parent().children("li").not(".tit").css("display","none");
			 $(this).parent().children().css("display","block");
			 $(this).parent().removeClass("ul320").addClass("ul320_b");

			 btn=false;			
			}else{
             $(this).parent().children("li").not(".tit").css("display","none");	
             $(this).parent().removeClass("ul320_b").addClass("ul320")
             btn=true;	
			}
		});

		if($(".linkIn a").length>0){
			$(".footerBox .center1").addClass("ul320");
			$(".link i").click(function(){
            
			if(btn==true ){
             
			 $(this).parent().find(".linkIn").css("display","block");
			 $(this).parent().removeClass("ul320").addClass("ul320_b");
			 btn=false;		

			}else{
             $(this).parent().find(".linkIn").css("display","none");
             $(this).parent().removeClass("ul320_b").addClass("ul320")
             btn=true;	
			}
			
		});	
		}
       	


	}
}



//第五屏下拉
function section5_xiala(){
	if($(window).width()<=1200){
		var btn=true;

		$(".left768").css("height",$(".left768 a").height());
       $(".leftactive").html($(".left768").eq(0).text());
       $(".left768").css({"top":0,"display":"none"});
       
      $(".left768 a").click(function(){
       	  $(".leftactive").html($(this).text());
       	  $(this).parent().css("background","#2277da");
       	  $(".left768").css({"display":"none"});
       	  btn=true;
       });       
       
       $(".leftactive").click(function(){
       	var le=0;
        if(btn){
        	$(".left768 a").each(function(i,elem){
        		if($(elem).text()!=$(".leftactive").text()){
        		    le++;
        			if($(window).width()>758){
						$(elem).parent().css({"display":"block","top":le*$(elem).height()-9});

					}else{
						$(elem).parent().css({"display":"block","top":le*$(elem).height()});
					}
        		}
        	});
        	btn=false;
        }else{
        	$(".left768").css({"display":"none"});
        	btn=true;
        	
        }
        console.log(btn);
       	
       });	


   }
}


//最后一屏点击圆圈让它的z-index++
function section7_zI(){
	var s=0;
	$(".section7 .box li").css("zIndex",1);
	$(".section7 .box li").click(function(){
		s+=10		
		$(this).css("zIndex",s);
	});
}

//侧边导航点击
function sideNav(){
	var timer=0;
	if($(window).width()<=1024){
		var num=120;
		if($(window).width()<=768){
            num=100;
		}
		$(".ct_nav ul li").click(function(){+
	  clearInterval(timer);
	  var i=$(this).index();
      if(i==1||i==3){
        $(".ct_nav .txt").css("width",0);
      	$(this).find(".txt").stop().animate({width:num});        	
      	timer=setInterval(function(){   	
      		$(".ct_nav .txt").css("width",0);
      	},3000);
      }

      if(i==4){
      	if($(window).width()>768){
      		
      	}else{
      		$('html,body').animate({scrollTop:0},700);
      	}
      	
      }
	});
	}
}



//预加载load
function loadimg(arr,funLoading,funOnLoad,funOnError){

	var numLoaded=0,
	numError=0,
	isObject=Object.prototype.toString.call(arr)==="[object Object]" ? true : false;
	var arr=isObject ? arr.get() : arr;
	for(a in arr){
		var src=isObject ? $(arr[a]).attr("data-src") : arr[a];
		preload(src,arr[a]);
	};
	function preload(src,obj){
		var img=new Image();
		img.onload=function(){
			numLoaded++;
			funLoading && funLoading(numLoaded,arr.length,src,obj);
			funOnLoad && numLoaded==arr.length && funOnLoad(numError);
			img.onload=null;
		};
		img.onerror=function(){
			numLoaded++;
			numError++;
			funOnError && funOnError(numLoaded,arr.length,src,obj);
		}
		img.src=src;
	};
};

var funloading_obj=function(n,total,src,obj){
	$(obj).attr("src",src).remove("data-src");
	var bfb = Math.round(n/total*100)
	$(".progress_txt").text( bfb + "%" );
	$(".progress_bar").css({ "width":bfb + "%" });
	if(n >= total-1){
		funloading_in();
	};
};

var funloading_in = function(){
	if(loadimg_typr){
		loadimg_typr = false;
		fun_fullpage();
		$("#loading").fadeOut(300);
	}
}

function fun_fullpage(){
	//变量初始化
	var winW = $(window).width();
	var winH = $(window).height();
	var div_section6_l_img1 = $(".section6 .left .img1");
	var div_section6_l_img2 = $(".section6 .left .img2");
	var div_section6_l_img3 = $(".section6 .left .img3");
	var div_section6_r_img1 = $(".section6 .right .img1");
	var div_section6_r_img2 = $(".section6 .right .img2");
	var div_section6_r_img3 = $(".section6 .right .img3");
	var section_b_type = true;
	var section6_time = "";
	var section7_lx_time = "";
	var footer_h = $(".footerBox").height();

	$(".footerBox").css("bottom",-footer_h);
    
    var fullpage_autoScrolling = true;
	var fullpage_navigation=true;

   if($(window).width()<=1002){
   	fullpage_autoScrolling=false;
   	fullpage_navigation=false;
   }

	$(window).resize(function(){
		footer_h = $(".footerBox").height();
		console.log(footer_h)
		$(".section_b").removeClass("section_b2");
		$("#contBox").css("margin-top",0);
		section_b_type = true;
	})
   if($(window).width()>1200){
	$('#contBox').fullpage({
		css3:true,
		//scrollingSpeed:900,
		easing:"swing",
		//anchors: ['page1', 'page2' , 'page3', 'page4','page5','page6','page7','page8'],
		autoScrolling:fullpage_autoScrolling,
		navigation: fullpage_autoScrolling,
		navigationTooltips:qarr,
		afterRender:function(){
			section1_read();
			$(".headBox").addClass("headBox_an");
			$("#fp-nav").addClass("right_an");
			$(".section2").addClass("section2_an");
		},
		onLeave: function(index,nextIndex,direction) {
			//底部导航
			if(section_b_type == false){
				if(direction == "up"){
					$(".section_b").removeClass("section_b2");
					$("#contBox").css("margin-top",0)
					setTimeout(function (){
						section_b_type = true;
					},600)
					return false;
				}
			}
			if(index == 8 && nextIndex ==  9){
				if(section_b_type){
					section_b_type = false;
					$(".section_b").addClass("section_b2");
					$("#contBox").css("margin-top",-footer_h);
				}
				return false;
			}

			//顶部导航
			$(".headBox").removeClass("headBox_an");

			//左侧导航
			$("#fp-nav").removeClass("right_an");

			//内容
			if(nextIndex==1){
				$(".ct_nav").removeClass("ct_nav2");
				$(".section2").addClass("section2_an");
			}
			if(nextIndex==2){
				$(".section2x").addClass("section2x_an");
			}
			if(nextIndex==3){
				$(".section3").addClass("section3_an");
			}
			if(nextIndex==4){
				$(".section3x").addClass("section3x_an");
			}
			if(nextIndex==5){
				$(".section4").addClass("section4_an");
			}
			if(nextIndex==6){
				$(".section5").addClass("section5_an");
				section5_fun(0);
			}
			if(nextIndex==7){
				$(".section6").addClass("section6_an");
				section6_move();
			}
			if(nextIndex==8){
				$(".section7").addClass("section7_an");
				section7_lx_move();
			}

		},
		afterLoad: function(anchorLink ,index,slideIndex) {
			//顶部导航
			$(".ct_nav").addClass("ct_nav2");
			if(index == 1){
				$(".ct_nav").removeClass("ct_nav2");
				$(".headBox").addClass("headBox_an");

			}
			//左侧导航
			$("#fp-nav").addClass("right_an");

			if(index == 2 || index == 4 || index == 7){
				//$(".head").addClass("head2");
				$("#fp-nav").addClass("right2");
			}else{
				//$(".head").removeClass("head2");
				$("#fp-nav").removeClass("right2");
			}


			//内容
			if(index!=1){
				$(".section2").removeClass("section2_an");
				$('.nav_dropdown .dropdown').stop(true,true).slideUp();
			}
			if(index!=2){
				$(".section2x").removeClass("section2x_an");
			}
			if(index!=3){
				$(".section3").removeClass("section3_an");
			}
			if(index!=4){
				$(".section3x").removeClass("section3x_an");
			}
			if(index!=5){
				$(".section4").removeClass("section4_an");

			}
			if(index!=6){
				$(".section5").removeClass("section5_an");
				$(".section5 .a").fadeOut(0);
				$("#section5_left a").removeClass("active");
				$(".section5 .a").removeClass("a_an");
			}
			if(index!=7){
				$(".section6").removeClass("section6_an");
				section6_read();
			}
			if(index!=8){
				$(".section7").removeClass("section7_an");
				section7_lx_read();
			}



		}
	});
	}else{

		$(".section2").addClass("section2_an");
		$(".section2x").addClass("section2x_an");
		$(".section3").addClass("section3_an");
		$(".section3x").addClass("section3x_an");
		$(".section4").addClass("section4_an");
		$(".section5").addClass("section5_an");
		$(".section6").addClass("section6_an");
		$(".section7").addClass("section7_an");

		$(".headBox").addClass("headBox_an");
		$(".section_b").addClass("section_b2");
		$(".ct_nav").addClass("ct_nav2");

        section1_read();
		section7_lx_read();
		section6_read();

        setTimeout(function(){
		   section5_fun(0);
		},900);		

	}				



	var section1_num = 0;
	//第一屏，轮播图
	function section1_read(){
		/*
		var len = $(".section2_lbt .center").length;
		for(var i=0;i<len;i++){
			$(".section2_lbt .b_nav").append("<a href=''></a>");
		}
		$(".section2_lbt .b_nav a").eq(0).addClass("one");
		$(".section2_lbt .b_nav a").on("click",function(){
			section1_num = $(this).index();
			section1_fun($(this).index());
			return false;
		});
		*/
	}
	/*
	setInterval(function(){
		section1_num++
		if(section1_num>=$(".section2_lbt .center").length){
			section1_num = 0;
		}
		section1_fun(section1_num)
	},6000);
	
	function section1_fun(num){
		$(".section2_lbt .center").fadeOut(1000);
		$(".section2_lbt .center").eq(num).fadeIn(1000);
		$(".section2_lbt .b_nav a").removeClass("one");
		$(".section2_lbt .b_nav a").eq(num).addClass("one");


	}
	*/
	
	$('#owl-carousel-1a').owlCarousel({
		items:1,
		loop:true, //无限循环切换
		dots:true, //是否显示原点导航
		nav:false,   //是否左右切换
		// autoplay:true,
		autoplayTimeout:4000,
		smartSpeed:600
	});
	
	/*--粒子连线--*/
	if (window.ActiveXObject) {
		var ua = navigator.userAgent.toLowerCase();
		var ie=ua.match(/msie ([\d.]+)/)[1]
		if(ie<9.0){

		}else{
			particlesJS_fun();

		}
	}else{
		particlesJS_fun();
	}
	function particlesJS_fun(){
		particlesJS("particles", {
			"particles": {
			"number": {
			  "value": 50,
			  "density": {
				"enable": true,
				"value_area": 800
			  }
			},
			"color": {
			  "value": "#d8d5d5"
			},
			"shape": {
			  "type": "circle",
			  "stroke": {
				"width": 6,
				"color": "#d8d5d5"
			  },
			  "polygon": {
				"nb_sides": 5
			  },
			  "image": {
				"src": "img/github.svg",
				"width": 100,
				"height": 100
			  }
			},
			"opacity": {
			  "value": 0.3,
			  "random": false,
			  "anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			  }
			},
			"size": {
			  "value": 0.1,
			  "random": true,
			  "anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
			  }
			},
			"line_linked": {
			  "enable": true,
			  "distance": 150,
			  "color": "#d8d5d5",
			  "opacity": 1,
			  "width": 1
			},
			"move": {
			  "enable": true,
			  "speed": 2,
			  "direction": "none",
			  "random": false,
			  "straight": false,
			  "out_mode": "out",
			  "bounce": false,
			  "attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
			  }
			}
			},
			"interactivity": {
			"detect_on": "canvas",
			"events": {
			  "onhover": {
				"enable": true,
				"mode": "grab"
			  },
			  "onclick": {
				"enable": true,
				"mode": "push"
			  },
			  "resize": true
			},
			"modes": {
			  "grab": {
				"distance": 231.44271031594977,
				"line_linked": {
				  "opacity": 1
				}
			  },
			  "bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			  },
			  "repulse": {
				"distance": 200,
				"duration": 0.4
			  },
			  "push": {
				"particles_nb": 4
			  },
			  "remove": {
				"particles_nb": 2
			  }
			}
			},
			"retina_detect": true
		});
	}

	//标签切换
	$("#section5_left a").click(function(){
		section5_fun($("#section5_left a").index($(this)));
		return false;
	});

	function section5_fun(num){
		$("#section5_left a").removeClass("active");
		$("#section5_left a").eq(num).addClass("active");
		var div_num = $("#section5_left a").eq(num).attr("href");
		$(".section5 .a").fadeOut();
		$(".section5_lbt .lbt").not($(".section5_lbt .lbt").eq(num)).fadeOut(1500);
		$(".section5_lbt .lbt").eq(num).fadeIn(1500);

		$(div_num).fadeIn(300,function(){
			$(".section5 .a").removeClass("a_an");
			$(".section5 .a").eq(num).addClass("a_an");
		});
	}

	//logo墙
	function section6_read(){
		$("body").unbind("mousemove");
		//clearInterval(section6_time);
		//section6_time = "";
		div_section6_l_img1.css({"right":0,"top":0});
		div_section6_l_img2.css({"right":0,"top":0});
		div_section6_l_img3.css({"right":0,"top":0});
		div_section6_r_img1.css({"right":0,"top":0});
		div_section6_r_img2.css({"right":0,"top":0});
		div_section6_r_img3.css({"right":0,"top":0});
	}
	function section6_move(){
		/*
		section6_time = setInterval(function(){
			var random1 = Math.random();
			var random2 = Math.random();

			var r_w = random1*$(window).width();
			var r_h = random2*$(window).height();

			div_section6_l_img1.stop(true,false).animate({ "right":-(winW/2 - r_w)/30,"top":(winH/2 - r_h)/30 },1000,"linear");
			div_section6_l_img2.stop(true,false).animate({ "right":-(winW/2 - r_w)/35,"top":-(winH/2 - r_h)/35 },1000,"linear");
			div_section6_l_img3.stop(true,false).animate({ "right":(winW/2 - r_w)/40,"top":-(winH/2 - r_h)/40 },1000,"linear");
			div_section6_r_img1.stop(true,false).animate({ "left":-(winW/2 - r_w)/30,"top":(winH/2 - r_h)/30 },1000,"linear");
			div_section6_r_img2.stop(true,false).animate({ "left":(winW/2 - r_w)/35,"top":-(winH/2 - r_h)/35 },1000,"linear");
			div_section6_r_img3.stop(true,false).animate({ "left":-(winW/2 - r_w)/40,"top":-(winH/2 - r_h)/40 },1000,"linear");
		},1000);
		*/
		$("body").unbind("mousemove");
		$("body").bind("mousemove",function(event){
			div_section6_l_img1.stop(true,false).animate({ "right":-(winW/2 - event.clientX)/20,"top":(winH/2 - event.clientY)/20 },200);
			div_section6_l_img2.stop(true,false).animate({ "right":-(winW/2 - event.clientX)/22,"top":-(winH/2 - event.clientY)/22 },200);
			div_section6_l_img3.stop(true,false).animate({ "right":(winW/2 - event.clientX)/24,"top":(winH/2 - event.clientY)/24 },200);
			div_section6_r_img1.stop(true,false).animate({ "left":-(winW/2 - event.clientX)/20,"top":(winH/2 - event.clientY)/20 },200);
			div_section6_r_img2.stop(true,false).animate({ "left":(winW/2 - event.clientX)/22,"top":-(winH/2 - event.clientY)/22 },200);
			div_section6_r_img3.stop(true,false).animate({ "left":-(winW/2 - event.clientX)/24,"top":(winH/2 - event.clientY)/24 },200);
		});

	}

	function section7_lx_read(){
		clearInterval(section7_lx_time);
		section7_lx_time = "";

	}
	function section7_lx_move(){
		section7_lx_time = setInterval(function(){
			var time2 = Math.floor(Math.random()*10+1)*100;
			var lr = (Math.floor(Math.random()*10+1)<=5)?"lx1":"lx2";
			var random1 = Math.random();
			var random2 = Math.random();
			var r_w = random1*$(window).width();
			var r_h = random2*$(window).height()/3;

			$(".section7 .lx").removeClass("lx1");
			$(".section7 .lx").removeClass("lx2");
			$(".section7 .lx").css({"left":r_w,"top":r_h});
			setTimeout(function(){
				$(".section7 .lx").addClass(lr);
			},time2);

		},3000);
	}
	
	$(".backtop").click(function(){
		$(".section_b").removeClass("section_b2");
		$("#contBox").css("margin-top",0)
		section_b_type = true;
		$("#fp-nav li").eq(0).find("a").click();
		return false;
	});

	// 右侧导航bug修复 liyulan
	$("#fp-nav li").click(function(){
		$(".section_b").removeClass("section_b2");
		$("#contBox").css("margin-top",0)
		section_b_type=true;
	});
	
	
	
}




// var loadimg_typr = true

// $(function(){
// 	loadimg($("#loading img"),funloading_obj);
// 	setTimeout(function(){
// 		funloading_in();
// 	},6000);

// 	//第5屏初始化
// 	if($(window).width()>1400){
// 		$(".section5 .owl-carousel").css("width","916");
// 	}else{
// 		$(".section5 .owl-carousel").css("width","705");
// 	}
// 	$(window).resize(function(event) {
// 		if($(window).width()>1400){
// 			$(".section5 .owl-carousel").css("width","916");
// 		}else{
// 			$(".section5 .owl-carousel").css("width","705");
// 		}
// 	});
	
// });

// //预加载load
// function loadimg(arr,funLoading,funOnLoad,funOnError){
// 	console.log(arr.length)
// 	var numLoaded=0,
// 	numError=0,
// 	isObject=Object.prototype.toString.call(arr)==="[object Object]" ? true : false;
// 	var arr=isObject ? arr.get() : arr;
// 	for(a in arr){
// 		var src=isObject ? $(arr[a]).attr("data-src") : arr[a];
// 		preload(src,arr[a]);
// 	};
// 	function preload(src,obj){
// 		var img=new Image();
// 		img.onload=function(){
// 			numLoaded++;
// 			funLoading && funLoading(numLoaded,arr.length,src,obj);
// 			funOnLoad && numLoaded==arr.length && funOnLoad(numError);
// 			img.onload=null;
// 		};
// 		img.onerror=function(){
// 			numLoaded++;
// 			numError++;
// 			funOnError && funOnError(numLoaded,arr.length,src,obj);
// 		}
// 		img.src=src;
// 	};
// };

// var funloading_obj=function(n,total,src,obj){
// 	$(obj).attr("src",src).remove("data-src");
// 	var bfb = Math.round(n/total*100)
// 	$(".progress_txt").text( bfb + "%" );
// 	$(".progress_bar").css({ "width":bfb + "%" });
// 	console.log(n+","+total)
// 	if(n >= total-1){
// 		funloading_in();
// 	};
// };

// var funloading_in = function(){
// 	if(loadimg_typr){
// 		loadimg_typr = false;
// 		fun_fullpage();
// 		$("#loading").fadeOut(300);
// 	}
// }

// function fun_fullpage(){
// 	//变量初始化
// 	var winW = $(window).width();
// 	var winH = $(window).height();
// 	var div_section6_l_img1 = $(".section6 .left .img1");
// 	var div_section6_l_img2 = $(".section6 .left .img2");
// 	var div_section6_l_img3 = $(".section6 .left .img3");
// 	var div_section6_r_img1 = $(".section6 .right .img1");
// 	var div_section6_r_img2 = $(".section6 .right .img2");
// 	var div_section6_r_img3 = $(".section6 .right .img3");
// 	var section_b_type = true;
// 	var section6_time = "";
// 	var section7_lx_time = "";

// 	$('#contBox').fullpage({
// 		css3:true,
// 		//scrollingSpeed:900,
// 		easing:"swing",
// 		//anchors: ['page1', 'page2' , 'page3', 'page4','page5','page6','page7','page8'],
// 		navigation: true,
// 		navigationTooltips:qarr,
// 		afterRender:function(){
// 			section1_read();
// 			$(".headBox").addClass("headBox_an");
// 			$("#fp-nav").addClass("right_an");
// 			$(".section2").addClass("section2_an");
// 		},
// 		onLeave: function(index,nextIndex,direction) {
// 			//底部导航
// 			if(section_b_type == false){
// 				if(direction == "up"){
// 					$(".section_b").removeClass("section_b2");
// 					$("#contBox").removeClass("contBox_b");
// 					setTimeout(function (){
// 						section_b_type = true;
// 					},600)
// 					return false;
// 				}
// 			}
// 			if(index == 8 && nextIndex ==  9){
// 				if(section_b_type){
// 					section_b_type = false;
// 					$(".section_b").addClass("section_b2");
// 					$("#contBox").addClass("contBox_b");
// 				}
// 				return false;
// 			}

// 			//顶部导航
// 			$(".headBox").removeClass("headBox_an");

// 			//左侧导航
// 			$("#fp-nav").removeClass("right_an");

// 			//内容
// 			if(nextIndex==1){
// 				$(".ct_nav").removeClass("ct_nav2");
// 				$(".section2").addClass("section2_an");
// 			}
// 			if(nextIndex==2){
// 				$(".section2x").addClass("section2x_an");
// 			}
// 			if(nextIndex==3){
// 				$(".section3").addClass("section3_an");
// 			}
// 			if(nextIndex==4){
// 				$(".section3x").addClass("section3x_an");
// 			}
// 			if(nextIndex==5){
// 				$(".section4").addClass("section4_an");
// 			}
// 			if(nextIndex==6){
// 				$(".section5").addClass("section5_an");
// 				section5_fun(0);
// 			}
// 			if(nextIndex==7){
// 				$(".section6").addClass("section6_an");
// 				section6_move();
// 			}
// 			if(nextIndex==8){
// 				$(".section7").addClass("section7_an");
// 				section7_lx_move();
// 			}

// 		},
// 		afterLoad: function(anchorLink ,index,slideIndex) {
// 			//顶部导航
// 			$(".ct_nav").addClass("ct_nav2");
// 			if(index == 1){
// 				$(".ct_nav").removeClass("ct_nav2");
// 				$(".headBox").addClass("headBox_an");

// 			}
// 			//左侧导航
// 			$("#fp-nav").addClass("right_an");

// 			if(index == 2 || index == 4 || index == 7){
// 				//$(".head").addClass("head2");
// 				$("#fp-nav").addClass("right2");
// 			}else{
// 				//$(".head").removeClass("head2");
// 				$("#fp-nav").removeClass("right2");
// 			}


// 			//内容
// 			if(index!=1){
// 				$(".section2").removeClass("section2_an");
// 				$('.nav_dropdown .dropdown').stop(true,true).slideUp();
// 			}
// 			if(index!=2){
// 				$(".section2x").removeClass("section2x_an");
// 			}
// 			if(index!=3){
// 				$(".section3").removeClass("section3_an");
// 			}
// 			if(index!=4){
// 				$(".section3x").removeClass("section3x_an");
// 			}
// 			if(index!=5){
// 				$(".section4").removeClass("section4_an");

// 			}
// 			if(index!=6){
// 				$(".section5").removeClass("section5_an");
// 				$(".section5 .a").fadeOut(0);
// 				$("#section5_left a").removeClass("active");
// 				$(".section5 .a").removeClass("a_an");
// 			}
// 			if(index!=7){
// 				$(".section6").removeClass("section6_an");
// 				section6_read();
// 			}
// 			if(index!=8){
// 				$(".section7").removeClass("section7_an");
// 				section7_lx_read();
// 			}



// 		}
// 	});

// 	var section1_num = 0;
// 	//第一屏，轮播图
// 	function section1_read(){
// 		/*
// 		var len = $(".section2_lbt .center").length;
// 		for(var i=0;i<len;i++){
// 			$(".section2_lbt .b_nav").append("<a href=''></a>");
// 		}
// 		$(".section2_lbt .b_nav a").eq(0).addClass("one");
// 		$(".section2_lbt .b_nav a").on("click",function(){
// 			section1_num = $(this).index();
// 			section1_fun($(this).index());
// 			return false;
// 		});
// 		*/
// 	}
// 	/*
// 	setInterval(function(){
// 		section1_num++
// 		if(section1_num>=$(".section2_lbt .center").length){
// 			section1_num = 0;
// 		}
// 		section1_fun(section1_num)
// 	},6000);
	
// 	function section1_fun(num){
// 		$(".section2_lbt .center").fadeOut(1000);
// 		$(".section2_lbt .center").eq(num).fadeIn(1000);
// 		$(".section2_lbt .b_nav a").removeClass("one");
// 		$(".section2_lbt .b_nav a").eq(num).addClass("one");


// 	}
// 	*/
	
// 	$('#owl-carousel-1a').owlCarousel({
// 		items:1,
// 		loop:true, //无限循环切换
// 		dots:true, //是否显示原点导航
// 		nav:false,   //是否左右切换
// 		autoplay:true,
// 		autoplayTimeout:4000,
// 		smartSpeed:600
// 	});
	
// 	/*--粒子连线--*/
// 	if (window.ActiveXObject) {
// 		var ua = navigator.userAgent.toLowerCase();
// 		var ie=ua.match(/msie ([\d.]+)/)[1]
// 		if(ie<9.0){

// 		}else{
// 			particlesJS_fun();

// 		}
// 	}else{
// 		particlesJS_fun();
// 	}
// 	function particlesJS_fun(){
// 		particlesJS("particles", {
// 			"particles": {
// 			"number": {
// 			  "value": 50,
// 			  "density": {
// 				"enable": true,
// 				"value_area": 800
// 			  }
// 			},
// 			"color": {
// 			  "value": "#d8d5d5"
// 			},
// 			"shape": {
// 			  "type": "circle",
// 			  "stroke": {
// 				"width": 6,
// 				"color": "#d8d5d5"
// 			  },
// 			  "polygon": {
// 				"nb_sides": 5
// 			  },
// 			  "image": {
// 				"src": "img/github.svg",
// 				"width": 100,
// 				"height": 100
// 			  }
// 			},
// 			"opacity": {
// 			  "value": 0.3,
// 			  "random": false,
// 			  "anim": {
// 				"enable": false,
// 				"speed": 1,
// 				"opacity_min": 0.1,
// 				"sync": false
// 			  }
// 			},
// 			"size": {
// 			  "value": 0.1,
// 			  "random": true,
// 			  "anim": {
// 				"enable": false,
// 				"speed": 40,
// 				"size_min": 0.1,
// 				"sync": false
// 			  }
// 			},
// 			"line_linked": {
// 			  "enable": true,
// 			  "distance": 150,
// 			  "color": "#d8d5d5",
// 			  "opacity": 1,
// 			  "width": 1
// 			},
// 			"move": {
// 			  "enable": true,
// 			  "speed": 2,
// 			  "direction": "none",
// 			  "random": false,
// 			  "straight": false,
// 			  "out_mode": "out",
// 			  "bounce": false,
// 			  "attract": {
// 				"enable": false,
// 				"rotateX": 600,
// 				"rotateY": 1200
// 			  }
// 			}
// 			},
// 			"interactivity": {
// 			"detect_on": "canvas",
// 			"events": {
// 			  "onhover": {
// 				"enable": true,
// 				"mode": "grab"
// 			  },
// 			  "onclick": {
// 				"enable": true,
// 				"mode": "push"
// 			  },
// 			  "resize": true
// 			},
// 			"modes": {
// 			  "grab": {
// 				"distance": 231.44271031594977,
// 				"line_linked": {
// 				  "opacity": 1
// 				}
// 			  },
// 			  "bubble": {
// 				"distance": 400,
// 				"size": 40,
// 				"duration": 2,
// 				"opacity": 8,
// 				"speed": 3
// 			  },
// 			  "repulse": {
// 				"distance": 200,
// 				"duration": 0.4
// 			  },
// 			  "push": {
// 				"particles_nb": 4
// 			  },
// 			  "remove": {
// 				"particles_nb": 2
// 			  }
// 			}
// 			},
// 			"retina_detect": true
// 		});
// 	}

// 	//标签切换
// 	$("#section5_left a").click(function(){
// 		section5_fun($("#section5_left a").index($(this)));
// 		return false;
// 	});

// 	function section5_fun(num){
// 		$("#section5_left a").removeClass("active");
// 		$("#section5_left a").eq(num).addClass("active");
// 		var div_num = $("#section5_left a").eq(num).attr("href");
// 		$(".section5 .a").fadeOut();
// 		$(".section5_lbt .lbt").not($(".section5_lbt .lbt").eq(num)).fadeOut(1500);
// 		$(".section5_lbt .lbt").eq(num).fadeIn(1500);

// 		$(div_num).fadeIn(300,function(){
// 			$(".section5 .a").removeClass("a_an");
// 			$(".section5 .a").eq(num).addClass("a_an");
// 		});
// 	}

// 	//logo墙
// 	function section6_read(){
// 		$("body").unbind("mousemove");
// 		//clearInterval(section6_time);
// 		//section6_time = "";
// 		div_section6_l_img1.css({"right":0,"top":0});
// 		div_section6_l_img2.css({"right":0,"top":0});
// 		div_section6_l_img3.css({"right":0,"top":0});
// 		div_section6_r_img1.css({"right":0,"top":0});
// 		div_section6_r_img2.css({"right":0,"top":0});
// 		div_section6_r_img3.css({"right":0,"top":0});
// 	}
// 	function section6_move(){
// 		/*
// 		section6_time = setInterval(function(){
// 			var random1 = Math.random();
// 			var random2 = Math.random();

// 			var r_w = random1*$(window).width();
// 			var r_h = random2*$(window).height();

// 			div_section6_l_img1.stop(true,false).animate({ "right":-(winW/2 - r_w)/30,"top":(winH/2 - r_h)/30 },1000,"linear");
// 			div_section6_l_img2.stop(true,false).animate({ "right":-(winW/2 - r_w)/35,"top":-(winH/2 - r_h)/35 },1000,"linear");
// 			div_section6_l_img3.stop(true,false).animate({ "right":(winW/2 - r_w)/40,"top":-(winH/2 - r_h)/40 },1000,"linear");
// 			div_section6_r_img1.stop(true,false).animate({ "left":-(winW/2 - r_w)/30,"top":(winH/2 - r_h)/30 },1000,"linear");
// 			div_section6_r_img2.stop(true,false).animate({ "left":(winW/2 - r_w)/35,"top":-(winH/2 - r_h)/35 },1000,"linear");
// 			div_section6_r_img3.stop(true,false).animate({ "left":-(winW/2 - r_w)/40,"top":-(winH/2 - r_h)/40 },1000,"linear");
// 		},1000);
// 		*/
// 		$("body").unbind("mousemove");
// 		$("body").bind("mousemove",function(event){
// 			div_section6_l_img1.stop(true,false).animate({ "right":-(winW/2 - event.clientX)/20,"top":(winH/2 - event.clientY)/20 },200);
// 			div_section6_l_img2.stop(true,false).animate({ "right":-(winW/2 - event.clientX)/22,"top":-(winH/2 - event.clientY)/22 },200);
// 			div_section6_l_img3.stop(true,false).animate({ "right":(winW/2 - event.clientX)/24,"top":(winH/2 - event.clientY)/24 },200);
// 			div_section6_r_img1.stop(true,false).animate({ "left":-(winW/2 - event.clientX)/20,"top":(winH/2 - event.clientY)/20 },200);
// 			div_section6_r_img2.stop(true,false).animate({ "left":(winW/2 - event.clientX)/22,"top":-(winH/2 - event.clientY)/22 },200);
// 			div_section6_r_img3.stop(true,false).animate({ "left":-(winW/2 - event.clientX)/24,"top":(winH/2 - event.clientY)/24 },200);
// 		});

// 	}

// 	function section7_lx_read(){
// 		clearInterval(section7_lx_time);
// 		section7_lx_time = "";

// 	}
// 	function section7_lx_move(){
// 		section7_lx_time = setInterval(function(){
// 			var time2 = Math.floor(Math.random()*10+1)*100;
// 			var lr = (Math.floor(Math.random()*10+1)<=5)?"lx1":"lx2";
// 			var random1 = Math.random();
// 			var random2 = Math.random();
// 			var r_w = random1*$(window).width();
// 			var r_h = random2*$(window).height()/3;

// 			$(".section7 .lx").removeClass("lx1");
// 			$(".section7 .lx").removeClass("lx2");
// 			$(".section7 .lx").css({"left":r_w,"top":r_h});
// 			setTimeout(function(){
// 				$(".section7 .lx").addClass(lr);
// 			},time2);

// 		},3000);
// 	}
	
// 	$(".backtop").click(function(){
// 		$(".section_b").removeClass("section_b2");
// 		$("#contBox").removeClass("contBox_b");
// 		section_b_type = true;
// 		$("#fp-nav li").eq(0).find("a").click();
// 		return false;
// 	});

// 	// 右侧导航bug修复 liyulan
// 	$("#fp-nav li").click(function(){
// 		$(".section_b").removeClass("section_b2");
// 		$("#contBox").removeClass("contBox_b");
// 		section_b_type=true;
// 	});
	
	
	
// }

