$(document).ready(function () {
	$('.regSearch').click(function() {
		$('.searchList').toggle();
		return false;
	});
	$('.txtSel').click(function() {
		$(this).next().toggle();
		return false;
	});
	//main slide
    $('.promo').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 871,
        slideMargin: 5,
        auto: true,
		controls: false,
		pager: false
    });
    $('.storeListWrap').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 871,
		controls: false
    });



	$('.bt_Sel').click(function(){
		$(this).next('.menu').toggle();
		return false;
	});

	$('.menu > li > a').click(function(){
		$(this).next('ul').toggle();
	});

	$('.menu > li > ul > li > a').hover(function(){
		$('.menu > li > ul > li').removeClass('act');
		$('.menu > li > ul > li > ul').hide();
		$(this).parent().addClass('act');
		$(this).next('ul').show();
	},function(){
		
	});

	$('.cMsg').click(function(){
		$(this).next().toggle();
	});
	var item_height = 178;
	var ul_top = parseInt($("#photo_sd").css("top"));

	$(".sd_btn").click(function(event){
		event.preventDefault();

		var item_cnt = $("#photo_sd > li").length;
		var type = $(this).data('type');
		if( type == 'up'){
			if( ul_top <= ((item_cnt-1)*item_height*(-1)) ){ //마지막계산
				return false;
			}
			ul_top = parseInt((ul_top - item_height));
		}else{
			console.log(ul_top , ((item_cnt-1)*item_height));
			if( ul_top >= 0 ){ //마지막계산
				return false;
			}
			ul_top = parseInt((ul_top + item_height));
		}
		$("#photo_sd").css("top",ul_top );
	});
		
});