/*
// JavaScript Document	$(function(){
$(function(){
	    var btn=true;
		$(".nav_but_box").click(function(){
			$(this).parent().toggleClass("phone_nav_one")
			 $("body").toggleClass('hide');
			 if(btn){
			 	$(".phone_nav .nav_but").css("background","none");
			 	btn=false;
			 }else{
			 	$(".phone_nav .nav_but").css("background","#996633");
			 	btn=true;
			 }
			})//手机导航
		$(".nav_main b").click(function(){
			$(this).parent().toggleClass("b_one")
			.siblings().removeClass("b_one");
			})//手机二级导航
		$(".app_ss").click(function(){
			$(this).parent().toggleClass("resch_one")
			})//搜索按钮
		$(".main .dxcp .sfq li").mouseover(function(){
			var width=$(window).width();
			if (width>1183){
				$(".main .dxcp .sfq li").removeClass("big-da");
				$(this).addClass("big-da");
			}
		})
	})
	$(function(){
		var a = $(window).scrollTop();
		var wa =parseInt(a);
		if(wa>10){
			$(".warper").addClass("css3");
		    // $(".phone_nav").css("box-shadow":"2px 2px  #ccc");
		}
	$(window).scroll(function(){

		if($(".phone_nav").css("position")=="fixed"){
        
	        if($(window).scrollTop()>65){
	        	$(".phone_nav").css("box-shadow","2px 2px  #ccc");
	        }else{
	        	$(".phone_nav").css("box-shadow","none");
	        }
			if($(window).scrollTop()>=940){
				$("body").addClass("body_nav");;
			}else{
				$("body").removeClass("body_nav");
			}
		}
	})//上、左导航
})
*/

// JavaScript Document	$(function(){
$(function(){
	    var btn=true;
		$(".nav_but_box").click(function(){
			$(this).parent().toggleClass("phone_nav_one")
			 $("body").toggleClass('hide');
			 if(btn){
			 	$(".phone_nav .nav_but").css("background","none");
			 	btn=false;
			 }else{
			 	$(".phone_nav .nav_but").css("background","#fff");
			 	btn=true;
			 }
			})//手机导航
		$(".nav_main b").click(function(){
			$(this).parent().toggleClass("b_one")
			.siblings().removeClass("b_one");
			})//手机二级导航
		$(".app_ss").click(function(){
			$(this).parent().toggleClass("resch_one")
			})//搜索按钮
		$(".main .dxcp .sfq li").mouseover(function(){
			var width=$(window).width();
			if (width>1183){
				$(".main .dxcp .sfq li").removeClass("big-da");
				$(this).addClass("big-da");
			}
		})
	})
	$(function(){
		var a = $(window).scrollTop();
		var wa =parseInt(a);
		if(wa>10){
			$(".warper").addClass("css3");
		    // $(".phone_nav").css("box-shadow":"2px 2px  #ccc");
		}
	$(window).scroll(function(){

		if($(".phone_nav").css("position")=="fixed"){
        
	        if($(window).scrollTop()>65){
	        	$(".phone_nav").css("box-shadow","2px 2px  #ccc");
	        }else{
	        	$(".phone_nav").css("box-shadow","none");
	        }
			if($(window).scrollTop()>=940){
				$("body").addClass("body_nav");;
			}else{
				$("body").removeClass("body_nav");
			}
		}
	})//上、左导航
})
