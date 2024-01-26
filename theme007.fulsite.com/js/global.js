
window.addEventListener('load', function () {

	const beforeUnloadListener = (event) => {
		event.preventDefault();
	};	

	var countHolder = $('#cart_quantity');
	var cartSyncing = $('#app_golbal_cart_syncing_parameter').val();

	try {
		getCartData();
	} catch (e) {
		console.log(e);
	}

	function getCartData() {
		$.get(minCartURL, function (data) {
			localStorage.setItem('fetched_cart', JSON.stringify(data));
			renderCart(data);
		});
	};

	function renderCart(data) {
		countHolder.html(data.cartItems.count).css('opacity', '1');
	}

});

function changeFavicon(iconname) {
	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
	}
	link.href = `/images/logo/${iconname}`;
}

function delay(callback, ms) {
	var timer = 0;
	return function () {
		var context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			callback.apply(context, args);
		}, ms || 0);
	};
}


window.addEventListener('load', function () {

	$(document).on('click', '.dropdownmenu__item-link', function (e) {
		$('ul.dropdownmenu__item-content').hide();
		$(this).next('ul.dropdownmenu__item-content').show();
	});

	$('#navigation-products-search-input, #navigation-products-search-input2').on('focusin', function () {
		if ($(this).val() !== '' && $('.search-results .result').length > 0)
			$('.search-results').show();
	});


	$(document).mouseup(function (e) {
		var container = $(".search-results, #navigation-products-search-input, #navigation-products-search-input2");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			$(".search-results").hide();
		}
	});

	$('#navigation-products-search-input, #navigation-products-search-input2').parents('form').on('submit', function (e) {
		e.preventDefault();
	});

	$('#navigation-products-search-input, #navigation-products-search-input2').on('keyup', delay(function (e) {
		var val = this.value;
		if (val != '') {
			$.ajax({
				url: search_url,
				type: "POST",
				data: {
					keyword: val
				},
				beforeSend: function () {
					$('.search-results').show().html(`
                                    <div class="loader" style="padding: 15px; text-align: center">
                                        <span class="fa fa-spinner fa-spin"></span>
                                    </div>
                                `);
				},
				success: function (data) {
					$('.search-results').html(data.results);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		} else {
			$('.search-results').hide();
		}
	}, 500));

});

window.addEventListener('load',async function () {
	var videoElements = document.querySelectorAll("video");
	videoElements.forEach(function(videoElement) {
		videoElement.setAttribute("playsinline", "");
		videoElement.play()
	});
	init()
});


function init() {
	var countries_loaded = !1,
	currencies_loaded = !1;
	$(document).on('click', '[data-toggle="custom-modal"]', function () {
		var _target = $(this).data('target');
		$(_target).css('display', 'block').after('<div class="custom-modal-backdrop"></div>');
		if (_target == '#countries-popup' && !countries_loaded) {
			$.get(Routing.generate('get_countries'), function (data) {
				$(_target).find('.custom-modal-body').html(data.countries);
				countries_loaded = !0;
				$('#saveCountry').on('click', function () {
					var code = $('#countries-select-box').val();
					var $url = Routing.generate('change_country', {
						code: code
					});
					$.get($url, function (data) {
						if (data.msg == 'ok') {
							var loc = window.location.href;
							window.location.href = loc
						}
					})
				})
			})
		} else if (_target == '#currencies-popup' && !currencies_loaded) {
			$.get(Routing.generate('get_currencies'), function (data) {
				$(_target).find('.custom-modal-body').html(data.currencies);
				currencies_loaded = !0;
				$('#saveCurrency').on('click', function (e) {
					var code = $('#currencies-select-box').val();
					var $url = Routing.generate('change_currency', {
						code: code
					});
					$.get($url, function (data) {
						if (data.msg == 'ok') {
							var loc = window.location.href;
							window.location.href = loc
						}
					})
				})
			})
		}
	})
	$('.custom-modal').find('.close').on('click', function () {
		clearGalleryOnPage(document);
		_clearOptionClasses(document);
		$(this).parents('.custom-modal').css('display', '').next('.custom-modal-backdrop').remove()
	})
}


//     console.log('initCanvasMenu');

//     $('.category-menu-list').hide();

//     $('.category-heading').on('click', function () {
//         $('.category-menu-list').slideToggle();
//     });

//     /*Variables*/
//     var $offcanvasNav = $('nav#mobile-menu'),
//         $offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu');

//     /*Add Toggle Button With Off Canvas Sub Menu*/
//     // $offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fa fa-angle-down"></i></span>');

//     /*Close Off Canvas Sub Menu*/
//     $offcanvasNavSubMenu.slideUp();

//     /*Category Sub Menu Toggle*/
//     $offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {

//         if($(this).siblings('ul').is(':visible'))
//             $(this).siblings('ul').slideUp('slow');
//         else {
//             $(this).closest('li').siblings('li').find('ul:visible').slideUp('slow');
//             $(this).siblings('ul').slideDown('slow');
//         }

//         // if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
//         //     e.preventDefault();
//         //     if ($this.siblings('ul:visible').length) {
//         //         $this.siblings('ul').slideUp('slow');
//         //     } else {
//         //         $this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
//         //         $this.siblings('ul').slideDown('slow');
//         //     }
//         // }
//         // if ($this.is('a') || $this.is('span') || $this.attr('clas').match(/\b(menu-expand)\b/)) {
//         //     $this.parent().toggleClass('menu-open');
//         // } else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
//         //     $this.toggleClass('menu-open');
//         // }
//     });

//     $('#change-lang-holder-2').find('.toClick').on('click', function () {
//         var url = $(this).data('href') + location.search;
//         console.log(url);
//         var data = {};
//         data.locale = url;
//         $.ajax({
//             url: url,
//             type: "POST",
//             data: data,
//             success: function (data) {
//                 location.reload()
//             }
//         })
//     });

// };


// function initCanvasMenu() {

// 	console.log('initCanvasMenu');

// 	if ($(window).width() > 768 && $('.accordion-nav').is(':hidden')) {
// 		$('.accordion-nav').show();
// 		$('.dropdown-items').find('ul').css('display', '');
// 	}

// 	if ($(window).width() < 768) {
// 		$('.accordion-nav').hide();
// 	}
// 	window.mobilecheck = function () {
// 		var check = false;
// 		(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
// 		return check;
// 	};
	
// 	if (window.mobilecheck() || navigator.userAgent.match(/iPad/i) != null) {
// 		if ($(window).width() < 769) {
// 			$('.toolbar-dropdown, .dropdown-item, .dropdown-sub-item').hide();
// 			$('.lang,.cart, .account').find('a').on('click', function (e) {
// 				e.preventDefault();
// 				$('.accordion-nav').hide();
// 				$(this).siblings('.toolbar-dropdown').toggle();
// 			});
// 			$('.menu-bar').find('a').on('click', function (e) {
// 				e.preventDefault();
// 				console.log('clicked');
// 				var $target = $(this).data('target');
// 				$($target).slideToggle();
// 			});
// 			$('.dropdown-link').on('click', function (e) {
// 				console.log('link clicked');
// 				e.preventDefault();
// 				$(this).next('.dropdown-item').slideToggle();
// 				$(this).next('.dropdown-item').find('ul:visible').hide();
// 			});
// 			$('.dropdown-sub-link').on('click', function (e) {
// 				console.log('sub link clicked');
// 				e.preventDefault();
// 				$(this).next('.dropdown-sub-item').slideToggle();
// 				$(this).next('.dropdown-sub-item').find('ul:visible').hide();
// 			});
// 		};
// 	}

// 	//# sourceMappingURL=slinky.min.js.map

// 	"use strict";
// 	function _objectSpread(t) {
// 		for (var e = 1; e < arguments.length; e++) {
// 			var n = null != arguments[e] ? arguments[e] : {},
// 				i = Object.keys(n);
// 			"function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
// 				return Object.getOwnPropertyDescriptor(n, e).enumerable
// 			}))), i.forEach(function (e) {
// 				_defineProperty(t, e, n[e])
// 			})
// 		}
// 		return t
// 	}

// 	function _defineProperty(e, t, n) {
// 		return t in e ? Object.defineProperty(e, t, {
// 			value: n,
// 			enumerable: !0,
// 			configurable: !0,
// 			writable: !0
// 		}) : e[t] = n, e
// 	}

// 	function _classCallCheck(e, t) {
// 		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
// 	}

// 	function _defineProperties(e, t) {
// 		for (var n = 0; n < t.length; n++) {
// 			var i = t[n];
// 			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
// 		}
// 	}

// 	function _createClass(e, t, n) {
// 		return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
// 	}
// 	var Slinky = function () {
// 		function n(e) {
// 			var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
// 			_classCallCheck(this, n), this.settings = _objectSpread({}, this.options, t), this._init(e)
// 		}
// 		return _createClass(n, [{
// 			key: "options",
// 			get: function () {
// 				return {
// 					resize: !0,
// 					speed: 300,
// 					theme: "slinky-theme-default",
// 					title: !1
// 				}
// 			}
// 		}]), _createClass(n, [{
// 			key: "_init",
// 			value: function (e) {
// 				this.menu = $(e), this.base = this.menu.children().first();
// 				this.base;
// 				var t = this.menu,
// 					n = this.settings;
// 				t.addClass("slinky-menu").addClass(n.theme), this._transition(n.speed), $("a + ul", t).prev().addClass("next"), $("li > a", t).wrapInner("<span>");
// 				var i = $("<li>").addClass("header");
// 				$("li > ul", t).prepend(i);
// 				var s = $("<a>").prop("href", "#").addClass("back");
// 				$(".header", t).prepend(s), n.title && $("li > ul", t).each(function (e, t) {
// 					var n = $(t).parent().find("a").first().text();
// 					if (n) {
// 						var i = $("<header>").addClass("title").text(n);
// 						$("> .header", t).append(i)
// 					}
// 				}), this._addListeners(), this._jumpToInitial()
// 			}
// 		}, {
// 			key: "_addListeners",
// 			value: function () {
// 				var n = this,
// 					i = this.menu,
// 					s = this.settings;
// 				$("a", i).on("click", function (e) {
// 					if (n._clicked + s.speed > Date.now()) return !1;
// 					n._clicked = Date.now();
// 					var t = $(e.currentTarget);
// 					(0 === t.attr("href").indexOf("#") || t.hasClass("next") || t.hasClass("back")) && e.preventDefault(), t.hasClass("next") ? (i.find(".active").removeClass("active"), t.next().show().addClass("active"), n._move(1), s.resize && n._resize(t.next())) : t.hasClass("back") && (n._move(-1, function () {
// 						i.find(".active").removeClass("active"), t.parent().parent().hide().parentsUntil(i, "ul").first().addClass("active")
// 					}), s.resize && n._resize(t.parent().parent().parentsUntil(i, "ul")))
// 				})
// 			}
// 		}, {
// 			key: "_jumpToInitial",
// 			value: function () {
// 				var e = this.menu,
// 					t = this.settings,
// 					n = e.find(".active");
// 				0 < n.length && (n.removeClass("active"), this.jump(n, !1)), setTimeout(function () {
// 					return e.height(e.outerHeight())
// 				}, t.speed)
// 			}
// 		}, {
// 			key: "_move",
// 			value: function () {
// 				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
// 					t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function () { };
// 				if (0 !== e) {
// 					var n = this.settings,
// 						i = this.base,
// 						s = Math.round(parseInt(i.get(0).style.left)) || 0;
// 					i.css("left", "".concat(s - 100 * e, "%")), "function" == typeof t && setTimeout(t, n.speed)
// 				}
// 			}
// 		}, {
// 			key: "_resize",
// 			value: function (e) {
// 				this.menu.height(e.outerHeight())
// 			}
// 		}, {
// 			key: "_transition",
// 			value: function () {
// 				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 300,
// 					t = this.menu,
// 					n = this.base;
// 				t.css("transition-duration", "".concat(e, "ms")), n.css("transition-duration", "".concat(e, "ms"))
// 			}
// 		}, {
// 			key: "jump",
// 			value: function (e) {
// 				var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
// 				if (e) {
// 					var n = this.menu,
// 						i = this.settings,
// 						s = $(e),
// 						a = n.find(".active"),
// 						r = 0;
// 					0 < a.length && (r = a.parentsUntil(n, "ul").length), n.find("ul").removeClass("active").hide();
// 					var o = s.parentsUntil(n, "ul");
// 					o.show(), s.show().addClass("active"), t || this._transition(0), this._move(o.length - r), i.resize && this._resize(s), t || this._transition(i.speed)
// 				}
// 			}
// 		}, {
// 			key: "home",
// 			value: function () {
// 				var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0],
// 					t = this.base,
// 					n = this.menu,
// 					i = this.settings;
// 				e || this._transition(0);
// 				var s = n.find(".active"),
// 					a = s.parentsUntil(n, "ul");
// 				this._move(-a.length, function () {
// 					s.removeClass("active").hide(), a.not(t).hide()
// 				}), i.resize && this._resize(t), !1 === e && this._transition(i.speed)
// 			}
// 		}, {
// 			key: "destroy",
// 			value: function () {
// 				var t = this,
// 					e = this.base,
// 					n = this.menu;
// 				$(".header", n).remove(), $("a", n).removeClass("next").off("click"), n.css({
// 					height: "",
// 					"transition-duration": ""
// 				}), e.css({
// 					left: "",
// 					"transition-duration": ""
// 				}), $("li > a > span", n).contents().unwrap(), n.find(".active").removeClass("active"), n.attr("class").split(" ").forEach(function (e) {
// 					0 === e.indexOf("slinky") && n.removeClass(e)
// 				});
// 				["settings", "menu", "base"].forEach(function (e) {
// 					return delete t[e]
// 				})
// 			}
// 		}]), n
// 	}();
// 	$.fn.slinky = function (e) {
// 		return new Slinky(this, e)
// 	};
// 	/*---canvas menu activation---*/

// 	$(".canvas_open").on("click", function () {
// 		$(".Offcanvas_menu_wrapper").addClass("active");
// 	});
// 	$(".canvas_close").on("click", function () {
// 		$(".Offcanvas_menu_wrapper").removeClass("active");
// 	});
// 	/*--- Clickable menu active ----*/
// 	const slinky = $('#menu').slinky();
// 	$('#change-lang-holder-2').find('.toClick').on('click', function () {
// 		var url = $(this).data('href') + location.search;
// 		console.log(url);
// 		var data = {};
// 		data.locale = url;
// 		$.ajax({
// 			url: url,
// 			type: "POST",
// 			data: data,
// 			success: function (data) {
// 				location.reload()
// 			}
// 		})
// 	});
// 
$(window).load(function () {
	$("#preloader").delay(400).fadeOut("slow");
	$("#preloader .clock").fadeOut();
});













