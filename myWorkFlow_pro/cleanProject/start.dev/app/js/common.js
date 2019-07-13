'use strict';
$(function() {
	/**Cоздаем NameSpace*/

	var doc = document;
	var MYAPP = MYAPP || {};

	MYAPP.namespace = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = MYAPP,
			i;
		//Отбросить начальный префикс - имя глобального объекта
		if (parts[0] === 'MYAPP') {
			parts = parts.slice(1);
		}
		for (i = 0; i < parts.length; i++) {
			//создать свойство если оно остуствует
			if (typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	// var App = doc.getElementsByClassName('APP')[0],
	// 	div,
	// 	textArea;

	// var Calculator = MYAPP.namespace('MYAPP.modules.Calculator');
	
	/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
	//seclectize
	$('form select').selectize();

	//Equal heights +resize function(пересчитывает высоту)
	function heightses() {
		$('.s-direct .item-vertical p').height('auto').equalHeights();
		$('.carousel-text p').height('auto').equalHeights();
		$('.testimonials-head').height('auto').equalHeights();
		$('.testimonials-desc').height('auto').equalHeights();
	}
	$(window).resize(function() {
		heightses();
	});
	heightses();
	//scroll top button
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});

	// //Owl-carousel start
	var owl, owl2, prev, next;

	owl = $('.slider');
	// owl.on('mousewheel', '.owl-stage', function (e) {
	//     if (e.deltaY>0) {
	//         owl.trigger('next.owl');
	//     } else {
	//         owl.trigger('prev.owl');
	//     }
	//     e.preventDefault();
	// });
	// счетчик для карусели
	owl.on('initialized.owl.carousel changed.owl.carousel', function(e) {
			if (!e.namespace) {
				return;
			}
			var carousel = e.relatedTarget;
			$('.slider-counter').text(carousel.relative(carousel.current()) + 1 + '/');
			$('.slider-counter').append('<span>');
			$('.slider-counter span').text(carousel.items().length);
			var
			$size = function(el){
				return $(el);
			},
			$h = $size('.slider img').height(),
			$w = $size('.slider img').width(),
			$currentSlide = $size('.slider .owl-item'),
			$blockBigPreviewH = $size('.slider .owl-stage-outer').height(),
			$blockBigPreviewW = $size('.slider .owl-stage-outer').width(),
			$fixHeight = $blockBigPreviewH - $h;
			$('.slider').on('touchstart',function(){
				// $size('.slider .owl-stage-outer').css('max-height', $fixHeight);
				$size('.slider .owl-stage-outer').css('min-height', $blockBigPreviewH- ($fixHeight + $currentSlide.height()));
			});
				// $blockBigPreviewW
			console.log($blockBigPreviewH + '|' + $h + '|' + $currentSlide.height() );
			console.log($fixHeight);
			// var $Iheight = $('.slider .owl-stage-outer ').innerHeight();
			// console.log($h + '|' + $blockBigPreviewH);
				// if($h< $blockBigPreviewH){
				// 	$size('.slider .owl-stage-outer').css('min-height', $blockBigPreviewH + $h);
				// 	console.log($blockBigPreviewH + $h);
				// 	$size('.slider .owl-stage-outer').css('min-height');
				// 	var $sizebord = $size('.slider .owl-stage-outer').css('min-height');
				// 	console.log($sizebord);
				// }



				
				// }else if($h> $blockBigPreviewH){
				// 	$size('.slider .owl-stage-outer').css('min-height', $blockBigPreviewH - $h);
				// 	console.log($blockBigPreviewH - $h);
				// }
			// else{
				// $size('.slider .owl-stage-outer').css('overflow','hidden');
			// }
			// $w = $img('.slider img').width(),
			// $previewBlock = $(".slider .owl-stage-outer"),		
			// $nHeight = $('.slider img').naturalHeight,
			// $nWidth = $('.slider img').naturalWidth;
			// console.log($h, $w, $blockBigPreviewW, $blockBigPreviewH);


			// if($h<)
		})
		.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			nav: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				}
			}
		});

	owl.on('initialized.owl.carousel changed.owl.carousel', function(e) {
		if(!e.namespace){
			return;
		}
		var carousel = e.relatedTarget;
		$('.slider-counter').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
	}).owlCarousel({
		items : 1,
		loop: true,
		margin: 0,
		nav: true
	});

	// $('.owl-carousel').owlCarousel({
	//     loop:true,
	//     margin:10,
	//     responsiveClass:true,
	//     responsive:{
	//         0:{
	//             items:1,
	//             nav:true
	//         },
	//         600:{
	//             items:3,
	//             nav:false
	//         },
	//         1000:{
	//             items:5,
	//             nav:true,
	//             loop:false
	//         }
	//     }
	// })
	// // owl.on('initialized.owl.carousel changed.owl.carousel', function(e){
	// owl.on('initialized.owl.carousel changed.owl.carousel', function(e){
	// 	if(!e.namespace){
	// 		return;
	// 	}
	// 	var carousel = e.relatedTarget;
	//  $('.slider-counter').text(carousel.relative(carousel.current())+ 1 + '/' + carousel.items().length);
	//  // $('.slider-counter').text(++e.page.index + '/' + e.item.count);
	//  // $('.slider-counter').text(carousel.relative(carousel.current()) + 1 +'/');
	//  // $('.slider-counter').append('<span>');
	//  // $('.slider-counter span').append(carousel.items().length);
	// });

	// owl.owlCarousel({
	// 	loop: true,
	// 	items: 1,
	// 	// dots: true,
	// 	nav: true,
	// 	autoWidth: false,
	// 	// dots: ($(".owl-carousel slider").length > 1) ? true: false,
	//   loop:($(".owl-carousel slider").length > 1) ? true: false,
	// 	navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
	// 	// autoplay: true,
	// 	smartSpeed: 350,
	// 		responsive:{
	// 		0:{
	// 			items:1,
	// 			nav: true
	// 		},
	// 	// 	600:{
	// 	// 		items:3
	// 	// 	},
	// 	// 	1000:{
	// 	// 		items:4
	// 	// 	},
	// 	// 	1199:{
	// 	// 		items:4
	// 	// 	}
	// 	},

	// });

	// owl = $(".slider2");
	// owl.owlCarousel({
	// 	loop: true,
	// 	items: 4,
	// 	nav: true,
	// 	dots: true,
	// 	navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
	// 	// autoplay: true,
	// 	smartSpeed: 350,
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		600:{
	// 			items:3
	// 		},
	// 		1000:{
	// 			items:4
	// 		},
	// 		1199:{
	// 			items:4
	// 		},
	// 	}

	// });

	// /*// Если нужен другой слайдер разкомментировать
	// owl2 = $(".slider-team");
	// owl2.owlCarousel({
	// 	loop: true,
	// 	items: 4,
	// 	nav: true,
	// 	 margin:10,
	// 	navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
	// 	// autoplay: true,
	// 	smartSpeed: 350,
	// 	 responsive:{
	// 				0:{
	// 						items:1
	// 				},
	// 				600:{
	// 						items:3
	// 				},
	// 				1000:{
	// 						items:5
	// 				}
	// 		}

	// });
	// */

	//Start  gallery
	//Magnificpopup
	//1:02 решиние проблем с галереей
	$('.portfolio-item').each(function(e) {
		var th = $(this);
		th.attr('href', '#portfolio-img-' + e).find('.portfolio-popup').attr('id', 'portfolio-img-' + e);
	});
	//animation popup window
	$(".portfolio-item, a[href='#callback']").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline'
	});
	//animation popup window END

	//>получение инфы с формы смена заголовка
	$("a[href='#callback']").click(function() {
		var dataForm = $(this).data('form');
		var dataText = $(this).data('text');
		$('.form-callback h4').text(dataText);
		$(".form-callback [name='admin-data']").val(dataForm);
	});
	//<

	$('.mfp-gallery').each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-zoom-in',
			type: 'image',
			tLoading: '',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random();
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() {
							$.magnificPopup.proto.next.call(self);
						}, 120);
					};
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() {
							$.magnificPopup.proto.prev.call(self);
						}, 120);
					};
				},
				imageLoadComplete: function() {
					var self = this;
					setTimeout(function() {
						self.wrap.addClass('mfp-image-loaded');
					}, 16);
				}
			}
		});
	});
	//End our gallery

	//Scroll to content
	$('.mouse-icon').click(function() {
		$('html, body').animate(
			{
				scrollTop: $('.slider-wrap').offset().top
			},
			1000
		);
	});

	//jQuery Number Animation with Blur + Number Separator
	$('.s-adv').waypoint(
		function() {
			$({ blurRadius: 5 }).animate(
				{ blurRadius: 0 },
				{
					duration: 1200,
					easing: 'swing',
					step: function() {
						$('.s-adv-item h3 span').css({
							'-webkit-filter': 'blur(' + this.blurRadius + 'px)',
							filter: 'blur(' + this.blurRadius + 'px)'
						});
					}
				}
			);
			var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
			$('.s-adv-item h3 span').each(function() {
				var tcount = $(this).data('count');
				$(this).animateNumber(
					{
						number: tcount,
						easing: 'easeInQuad',
						'font-size': '1.8125em',
						numberStep: comma_separator_number_step
					},
					1200
				);
			});
			this.destroy();
		},
		{
			offset: '75%'
		}
	);

	//Toggle-menu на нижнее и верхнее независимо
	$('.toggle-mnu').click(function() {
		$(this).toggleClass('on');
		// var g = $(this).parent().next().next().find(".mobile-menu").slideToggle();
		$(this).parent().find('.mobile-menu').slideToggle();
		return false;
	});

	$('.main-foot .toggle-mnu').click(function() {
		$('html, body').animate({ scrollTop: $(document).height() + 200 }, 'slow');
		return false;
	});

	//> Перемотка на начало страницы
	$('body').append('<div class="scrollback"><i class="fa fa-angle-double-up">');
	$('body').on('click', '.scrollback', function() {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.scrollback').addClass('activeb');
		} else {
			$('.scrollback').removeClass('activeb');
		}
	});
	//< Перемотка на начало страницы End

	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr('src', function() {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if ($('html').hasClass('chrome')) {
			$.smoothScroll();
		}
	} catch (err) {}
	//Запрет на перетаскивание картинок
	$('img, a').on('dragstart', function(event) {
		event.preventDefault();
	});

	//Replace all SVG images with inline SVG в нем косяк
	$('img.img-svg').each(function() {
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(
			imgURL,
			function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
				}

				// Replace image with new SVG
				$img.replaceWith($svg);
			},
			'xml'
		);
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$('.form').submit(function() {
		//Change
		var th = $(this);
		$.ajax({
			type: 'POST',
			url: 'mail.php', //Change
			data: th.serialize()
		}).done(function() {
			$('.form-callback .success').addClass('.active');
			setTimeout(function() {
				// Done Functions
				$('.form-callback .success').removeClass('active');
				th.trigger('reset');
				$.magnificPopup.close();
			}, 1000);
		});
		return false;
	});

	// tabs by dbmast
	$('.tabs-nav li').click(function(e) {
		var a = $(this),
			parent = a.parents('.tabs'),
			nav = parent.children('.tabs-nav').children('li'),
			box = parent.children('.tabs-box').children('div');

		if (!a.hasClass('active')) {
			a.addClass('active').siblings().removeClass('active');

			box.eq(a.index()).addClass('active').siblings().removeClass('active');
		}

		e.preventDefault();
	});

	console.log('страница загруженa');
	// Перемотка на начало страницы
	// $("body").append('<div class="top"><i class="fa fa-angle-double-up">');
});

window.addEventListener('load', function OnWindowLoaded() {});
