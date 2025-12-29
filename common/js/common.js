$(document).ready(function(){
	$(function(){
		AOS.init();
	});

	// header
	$('.header .btn_sitemap').click(function(){
		$(this).toggleClass('is-active');
	});

	$(window).scroll(function(){
		if($(window).scrollTop() > 0)
			return $('.header').addClass("active");

		return $('.header').removeClass("active");
	});

	$('.m .gnb .text').click(function(e){
		e.preventDefault();
	});

	$('.m .gnb').click(function(){
		$('.gnb').not($(this)).removeClass('active').find('.depth02').slideUp();
		$(this).toggleClass('active').find('.depth02').slideToggle();
	});

	var isActive = false;
	var gnbsEl = $('.header .gnbs.m');
	var topEl = $('.top');
	var blockEl = $('.header .block');

	$('.header .btn_menu').click(function(){
		if(isActive) {
			gnbsEl.animate({left:-250}, 300);
			topEl.animate({left:-250}, 300);

			$(this).removeClass('active');
			$(this).children('.hamburger').removeClass('active');
		}else{
			gnbsEl.animate({left:0}, 300);
			topEl.animate({left:0}, 300);

			$(this).addClass('active');
			$(this).children('.hamburger').addClass('active');

		}

		blockEl.toggle();

		isActive = !isActive;
	});

	// 웹접근성용 gnb 포커스 제어
	$('.gnb').focusin(function(){
		$('.depth02').removeClass("active");

		$(this).find('.depth02').addClass("active");

	});

	$('.gnb .depth02 a').focusin(function(){
		$('.gnb .depth02').removeClass("active");

		$(this).parents('.depth02').addClass("active");
	});

	// sitemap
	var btnSitemap = $('.btn_sitemap');
	var btnClose = $('.sitemap .btn_close_sitemap');
	var siteMap = $('.sitemap.pop');

	btnSitemap.click(function(){
		siteMap.show();

		$('body').css('overflow-y', 'hidden');

	});


	btnClose.click(function(){
		siteMap.hide();

		$('body').css('overflow-y', 'auto');
	});

	// 팝업창 제어
	var target;
	var type;
	var animation;

	$('.btn_open_pop').click(function(){
		$(this).toggleClass('active');

		target = $(this).attr('data-target');

		type = $(this).attr('data-type');

		animation = $(this).attr('data-animation');

		if(type === "toggle"){
			if(animation === "slide")
				return $(target).slideToggle();

			return $(target).toggle();
		}

		if(animation === "slide")
			return $(target).slideDown();

		$(target).show();
		$('#all_search_keyword').focus();
	});

	$('.btn_close_pop').click(function(){
		target = $(this).attr('data-target');

		$(target).hide();
	});

	$('.popup-btn-open').click(function(){
		$(this).toggleClass('active');

		target = $(this).attr('data-target');

		type = $(this).attr('data-type');

		animation = $(this).attr('data-animation');

		if(type === "toggle"){
			if(animation === "slide")
				return $(target).slideToggle();

			return $(target).toggle();
		}

		if(animation === "slide")
			return $(target).slideDown();

		$(target).show();
	});

	$('.popup-btn-close').click(function(){
		target = $(this).attr('data-target');

		$(target).hide();
	});

	// tab
	var tab = $('.tab');
	var tabIndex;
	var tabsWrap;
	var tabsContent;

	tab.click(function(){
		tabsWrap = $(this).parents('.wrap_tabs');

		tab.removeClass('active');

		$(this).addClass('active');

		tabIndex = $(this).index();

		tabsContent = tabsWrap.find('.tabs_content');

		tabsContent.removeClass('active');

		tabsContent.eq(tabIndex).addClass('active');
	});

	// ellipsis
	setTimeout(function(){
		$('.ellipsis').each(function (index, item) {
			var wordArray = item.innerHTML.split(' ');

			while (item.scrollHeight > item.offsetHeight) {
				wordArray.pop();
				item.innerHTML = wordArray.join(' ') + '...';
			}
		});
	}, 100);

	$('.btn_pop').click(function(){
		$(this).siblings(".contents_pop").slideToggle();
	});

	$('.btn_top').click(function(){
		$('body, html').animate({scrollTop:0}, 500);
	});

	// 퀵메뉴
	var quickMenu = $('.quicks');
	var originTop;
	var footer = $('.footer');
	var bottom;
	var animating = false;

	if(footer.length){
		$(window).scroll(function(){
			bottom = $(window).scrollTop() + quickMenu.height() + 200;

			if(footer.offset().top - 30 < bottom) {
				originTop = quickMenu.css('top');

				quickMenu.addClass('active');
			}else{
				quickMenu.removeClass('active');
			}
		});
	}


		//비주얼
		let swiper01 = new Swiper('.section3 .swiper', {
			autoplay: {
				delay: 6000,
				disableOnInteraction: false,
			},
			loop: true,
			slidesPerView: 3,
      		spaceBetween: 10,
			pagination:false,
			centeredSlides: true,
		});

});