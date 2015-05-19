$(document).bind("mobileinit", function() {
	$.mobile.allowCrossDomainPages = true;
	$.mobile.orientationChangeEnabled = false;
	$.mobile.zoom = "disable";
	$.mobile.loadingMessageTheme = "d";
	$.mobile.buttonMarkup.hoverDelay = 0;
});

function clearVC() {
	console.log('Clearing VCKurtForm');
	$('#vcq2').val('null').selectmenu('refresh');
	$('#vcpage input[type=radio]').attr('checked', false).next("label").removeClass("ui-btn-active");
	$('#vcpage :radio').attr('checked', false).checkboxradio("refresh");
	$("#vcq17").val("");
	$("#vcq16").val("");
	$("#vcq14").val("");

}

function clearKK() {
	console.log('Clearing KKurtForm');
	$('#kkq1').val('null').selectmenu('refresh');
	$('#kkq2').val('null').selectmenu('refresh');
	$('#kkq3').val('null').selectmenu('refresh');
	$('#kkq4').val('null').selectmenu('refresh');
	$('input[type=radio]').attr('checked', false).next("label").removeClass("ui-btn-active");
	$('#kkpage :radio').attr('checked', false).checkboxradio("refresh");
	$("#kkq17").val("");
	$("#kkq15").val("");
	$('#KKopendialog').addClass('ui-disabled');
	$("#kkfr3").hide();
	$("#kkfr4").hide();
	$(".fewq").show();
	$(".moreq").hide();
	$("#kkt5").hide();
	$("#kkt6").hide();
	$("#kkt7").hide();
	$("#kkt8").hide();
	$("#kkt9").hide();
	$("#kkt10").hide();
	$("#terminfo").removeClass("bounceOutDown");
	$("#terminfo").show();
	$("#ortcont").hide();
	$("#restofkk").hide();
	/*$.mobile.changePage("#tackkkbody", {
	 transition: "slidefade"
	 });*/
	console.log('Inskickad KK3');
}

function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	} else {
		return [0, 0, 0];
	}
}
var pushNotification;
var ver = new Array();
ver = iOSversion();

function onBodyLoad() {
	console.log("2");
	//    StatusBar.overlaysWebView(true);
	navigator.splashscreen.show();
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("deviceready", initPushwoosh, false);
	$.mobile.page.prototype.options.domCache = false;

	if (ver[0] >= 7) {
		window.plugins.webviewcolor.change('#FFFFFF');
		$(".ui-header .ui-title").css("padding-top", "10px");
		$(".ui-header .ui-btn-left").css("margin-top", "10px");
		$("#omalltitles").css("padding-top", "10px");
		$("#omallbackbtn").css("margin-top", "10px");
	}
}

function initPushwoosh() {
	var pushNotification = window.plugins.pushNotification;

	//set push notifications handler
	document.addEventListener('push-notification', function(event) {
		var title = event.notification.title;
		var userData = event.notification.userdata;

		if ( typeof (userData) != "undefined") {
			console.warn('user data: ' + JSON.stringify(userData));
		}

		alert(title);
	});

	//initialize Pushwoosh with projectid: "996348093822", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
	pushNotification.onDeviceReady({
		projectid : "996348093822",
		appid : "C25C8-A3BC7"
	});

	//register for pushes
	pushNotification.registerDevice(function(status) {
		var pushToken = status;
		console.warn('push token: ' + pushToken);
	}, function(status) {
		console.warn(JSON.stringify(['failed to register ', status]));
	});
}

function onDeviceReady() {
	console.log("3");
	var devicePlatform = device.platform;
	if (devicePlatform === "Android") {
		var link = document.createElement("link");
		link.href = "css/androidspecific.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	
	$("#klinkurtnew").hide();
	$("#vckurtnew").hide();
	$("#ifylltnew").hide();
	$("#omnew").hide();
	$("#newcontcover").hide();
	$("#newcont").height(function() {
		$(window).height();
	});
	$("#newcontcover").height(function() {
		$(window).height();
	});
	document.addEventListener("offline", onOffline, false);
	$("#splash").show();

	window.deviceOS = device.platform;

	//    console.log(deviceOS);
	//    if (deviceOS === "DEACTIVATEDAndroid") {
	//        function initPushwoosh()
	//        {
	//            var pushNotification = window.plugins.pushNotification;
	//            pushNotification.onDeviceReady();
	//
	//            pushNotification.registerDevice({projectid: "klinikkurt-push", appid: "4FAC216A216983.26700931"},
	//            function(status) {
	//                var pushToken = status;
	//                console.warn('push token: ' + pushToken);
	//            },
	//                    function(status) {
	//                        console.warn(JSON.stringify(['failed to register ', status]));
	//                    }
	//            );
	//
	//            document.addEventListener('push-notification', function(event) {
	//                var title = event.notification.title;
	//                var userData = event.notification.userdata;
	//
	//                if (typeof (userData) != "undefined") {
	//                    console.warn('user data: ' + JSON.stringify(userData));
	//                }
	//
	//                navigator.notification.alert(title);
	//            });
	//        }
	//    } else if (deviceOS === "DEACTIVATEDiOS") {
	//        function initPushwoosh() {
	//            var pushNotification = window.plugins.pushNotification;
	//            pushNotification.onDeviceReady();
	//
	//            pushNotification.registerDevice({alert: true, badge: true, sound: true, pw_appid: "4FAC216A216983.26700931", appname: "KlinikKurt PROD"},
	//            function(status) {
	//                var deviceToken = status['deviceToken'];
	//                console.warn('registerDevice: ' + deviceToken);
	//            },
	//                    function(status) {
	//                        console.warn('failed to register : ' + JSON.stringify(status));
	//                        console.log(JSON.stringify(['failed to register ', status]));
	//                    }
	//            );
	//
	//            pushNotification.setApplicationIconBadgeNumber(0);
	//
	//            document.addEventListener('push-notification', function(event) {
	//                var notification = event.notification;
	//                navigator.notification.alert(notification.aps.alert);
	//                pushNotification.setApplicationIconBadgeNumber(0);
	//            });
	//        }
	//    } else {
	//        console.log(deviceOS + ' did not match any filter. Thus, did not register for push notifications');
	//    }
	// initPushwoosh();

	ranNum = Math.floor((Math.random() * 10) + 1);
	console.log(ranNum);
	if (ranNum === 1) {
		window.introClass = 'bounceInLeft';
	} else if (ranNum === 2) {
		window.introClass = 'bounceInRight';
	} else if (ranNum === 3) {
		window.introClass = 'bounceInDown';
	} else {
		window.introClass = 'bounceInUp';
	}
	setTimeout(function() {
		cordova.exec(null, null, "SplashScreen", "hide", []);
		setTimeout(function() {
			$("#omnew").addClass(introClass).show().delay(300).queue(function() {
				$("#ifylltnew").addClass(introClass).show().delay(300).queue(function() {
					$("#vckurtnew").addClass(introClass).show().delay(300).queue(function() {
						$("#klinkurtnew").addClass(introClass).show().delay(300).queue(function() {
							//                            $("#newcontcover").show().delay(1600).queue(function() {
							$("#splash").hide();
							$("#newcont").addClass("hemcontbg");
							//                            });
						});
					});
				});
			});
		}, 100);
	}, 100);
}

function onOffline() {
	navigator.notification.alert("Du verkar ha lite problem med din n\344tverksanslutning. Du kan fortfarande fylla i din KURTning men du kommer inte kunna skicka in den utan att ansluta till ett WiFi-n\344tverk eller mobiln\344tverk.", null, "Kontrollera anslutning", "OK");
}

function refreshPage(page) {
	// Page refresh
	page.trigger('pagecreate');
	page.listview('refresh');
}

function TillKK() {
	$.mobile.showPageLoadingMsg();
	setTimeout(function() {
		$.mobile.changePage("#kkpage", {
			transition : "slide"
		});
	}, 5);
	e.stopImmediatePropagation();
	return false;
}

function TillVCK() {
	$.mobile.showPageLoadingMsg();
	setTimeout(function() {
		$.mobile.changePage("#vcpage", {
			transition : "slide"
		});
	}, 5);
	e.stopImmediatePropagation();
	return false;
}

function TillIfyllt() {
	$.mobile.showPageLoadingMsg();
	setTimeout(function() {
		$.mobile.changePage("#vadfylltjag", {
			transition : "slide"
		});
	}, 5);
	e.stopImmediatePropagation();
	//window.plugins.googleAnalyticsPlugin.trackPageview("Ifyllt");
	return false;
}

function TillHem() {
	$.mobile.showPageLoadingMsg();
	clearVC();
	clearKK();
	setTimeout(function() {
		$.mobile.changePage("#hem", {
			transition : "slide",
			reverse : true
		});
	}, 5);
	//    e.stopImmediatePropagation();

	return false;
}

function TillHemFade() {
	$.mobile.showPageLoadingMsg();
	setTimeout(function() {
		$.mobile.changePage("#hem", {
			transition : "slidefade",
			reverse : true
		});
	}, 5);
	e.stopImmediatePropagation();
	return false;
}


$(document).delegate("#hem", "pageinit", function(event, ui) {
	jQuery(function() {
		var omdiv = $('#om');
		var omwidth = omdiv.width();
		omdiv.css('height', omwidth);
	});
	$.mobile.loadPage("#vcpage", {
		prefetch : "true"
	});
	$.mobile.loadPage("#kkpage", {
		prefetch : "true"
	});
	$.mobile.loadPage("#vadfylltjag", {
		prefetch : "true"
	});
	$.mobile.loadPage("#tackkkbody", {
		prefetch : "true"
	});
	$.mobile.loadPage("#vadfyllttermin", {
		prefetch : "true"
	});
	$("#omnew").on('tap', omnewTapHandler);

	// Callback function references the event target and adds the 'tap' class to it
	function omnewTapHandler(event) {
		$.mobile.showPageLoadingMsg();
		$("#splash").hide();
		setTimeout(function() {
			$("#newcont").addClass('bounceOutDown');
			setTimeout(function() {
				$.mobile.changePage("#omall", {
					transition : "fade"
				});
				setTimeout(function() {
					$("#newcont").removeClass('bounceOutDown')
				}, 1000);
			}, 300);
		}, 5);
		e.stopImmediatePropagation();
		return false;
	}


	$("#ifylltnew").on('tap', ifylltnewTapHandler);
	function ifylltnewTapHandler(event) {
		$.mobile.showPageLoadingMsg();
		$("#splash").hide();
		setTimeout(function() {
			$("#newcont").addClass('bounceOutDown');
			setTimeout(function() {
				$.mobile.changePage("#vadfylltjag", {
					transition : "fade"
				});
				setTimeout(function() {
					$("#newcont").removeClass('bounceOutDown')
				}, 1000);
			}, 300);
		}, 5);
		window.VadFyllt = "jag";
		event.stopImmediatePropagation();
		return false;
	}


	$("#vckurtnew").on('tap', vckurtnewTapHandler);
	function vckurtnewTapHandler(event) {
		$.mobile.showPageLoadingMsg();
		$("#splash").hide();
		setTimeout(function() {
			$("#newcont").addClass('bounceOutDown');
			setTimeout(function() {
				$.mobile.changePage("#vcpage", {
					transition : "fade"
				});
				setTimeout(function() {
					$("#newcont").removeClass('bounceOutDown')
				}, 1000);
			}, 300);
		}, 5);
		event.stopImmediatePropagation();
		return false;
	}


	$("#klinkurtnew").on('tap', klinkurtnewTapHandler);
	function klinkurtnewTapHandler(event) {
		$.mobile.showPageLoadingMsg();
		$("#splash").hide();
		setTimeout(function() {
			$("#newcont").addClass('bounceOutDown');
			setTimeout(function() {
				$.mobile.changePage("#kkpage", {
					transition : "fade"
				});
				setTimeout(function() {
					$("#newcont").removeClass('bounceOutDown')
				}, 1000);
			}, 300);
		}, 5);
		event.stopImmediatePropagation();
		return false;
	}

	/*
	 $("#hem").delegate("#om", 'tap', function (event) {
	 console.log('omnew!')
	 event.preventDefault();
	 $.mobile.showPageLoadingMsg();
	 setTimeout(function () {
	 $.mobile.changePage("#omall", {
	 transition: "slideup"
	 });
	 }, 5);
	 e.stopImmediatePropagation();
	 return false;
	 });
	 $("#hand").hide();
	 setTimeout(function () {
	 if ($.mobile.activePage.attr("id") === "hem") {
	 setTimeout(function () {
	 if ($.mobile.activePage.attr("id") === "hem") {
	 setTimeout(function () {
	 if ($.mobile.activePage.attr("id") === "hem") {
	 $("#hand").show();
	 setTimeout(function () {
	 $("#hand").hide();
	 }, 3000);
	 }
	 }, 10000);
	 }
	 }, 10000);
	 }
	 }, 10000);
	 */
});
$(document).delegate("#tackkkbody", "pageshow", function() {
	$('#facebookkk').bind('tap', function(e) {
		event.preventDefault();
		$.mobile.showPageLoadingMsg();
		setTimeout(function() {
			facebookWallPost();
		}, 5);
		setTimeout(function() {
			$.mobile.hidePageLoadingMsg();
		}, 100);
		//window.plugins.googleAnalyticsPlugin.trackPageview("FB-Delat");
		return false;
	});
});
touchMove = function(event) {
	// Prevent scrolling on this element
	event.preventDefault();
};
/*
 function gestureChange(event) {
 // Disable browser zoom
 event.preventDefault();
 }
 var elm = document.body; // or some selection of the element you want to disable

 var catcher = function(evt) {
 if (evt.touches.length < 2)
 evt.preventDefault();
 };

 elm.addEventListener('touchstart', catcher, true);*/

$(document).delegate("#hem", "pageshow", function(event) {
	$.mobile.hidePageLoadingMsg();
});
$(document).delegate("#vadfylltjag", "pageinit", function(event) {
	$.mobile.hidePageLoadingMsg();
	jQuery(function() {
		$("#mailk").submit(function(e) {

			var cas_regex = /[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[0-9]+[0-9]+[0-9]+[0-9]/g;
			if (!cas_regex.test($("#mailkcasid").val())) {
				navigator.notification.alert("Du har inte fyllt i ett giltigt CAS-id, skriv in ett giltig CAS-id och försök igen. Om du vet att du fyllt i ett giltigt CAS-id, försök skicka in igen, vi arbetar på att lösa problemet!", null, "Ogiltigt CAS-id", "OK");
			} else {
				$.mobile.showPageLoadingMsg();
				var mailkDataString = $("#mailk").serialize();
				$.ajax({
					type : "GET",
					url : "http://studentit-bevakare.user.uu.se/klinikkurt/mailk.asp",
					data : mailkDataString,
					datatype : "html",
					success : function() {
						navigator.notification.alert("Kontrollera din inkorg, du bör nu ha fått ett mail med vilka kurtningar du fyllt i!", null, "Kolla din inkorg!", "OK");
						$.mobile.hidePageLoadingMsg();
					}
				});
			}
			e.preventDefault();
		});
		$("#svark").submit(function(e) {
			var cas_regex = /[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[0-9]+[0-9]+[0-9]+[0-9]/g;
			if (!cas_regex.test($("#svarkcasid").val())) {
				navigator.notification.alert("Du har inte fyllt i ett giltigt CAS-id, skriv in ett giltig CAS-id och försök igen. Om du vet att du fyllt i ett giltigt CAS-id, försök skicka in igen, vi arbetar på att lösa problemet!", null, "Ogiltigt CAS-id", "OK");
			} else {
				$.mobile.showPageLoadingMsg();
				var svarkDataString = $("#svark").serialize();
				$.ajax({
					type : "GET",
					url : "http://studentit-bevakare.user.uu.se/klinikkurt/svark.asp",
					data : svarkDataString,
					datatype : "html",
					success : function() {
						navigator.notification.alert("Kontrollera din inkorg, du bör nu ha fått ett mail med din termins svarsfrekvens!", null, "Kolla din inkorg!", "OK");
						$.mobile.hidePageLoadingMsg();
					},
					error : function() {
						alert("syntax errrrrorrrr 1337");
					}
				});
			}
			e.preventDefault();
		});
	});

});
$(document).delegate("#vadfylltjag", "pageshow", function(event) {
	$.mobile.hidePageLoadingMsg();
	console.log('show vfj');
	/* alert("show vfj");
	 jQuery(function(){
	 $( "#jagcont" ).delegate("#submitmailk", 'tap', function(event) {
	 alert("submitmailk");
	 });
	 });
	 */
});
/* $(document).delegate("#vadfyllttermin", "pageinit", function (event) {
 $.mobile.hidePageLoadingMsg();
 //alert("init vfj");
 jQuery(function () {
 $("#svark").submit(function (e) {
 $.mobile.showPageLoadingMsg();
 var mailkDataString = $("#svark").serialize();
 $.ajax({
 type: "GET",
 url: "http://studentit-bevakare.user.uu.se/klinikkurt/svark.asp",
 data: mailkDataString,
 datatype: "html",
 success: function () {
 navigator.notification.alert("Kontrollera din inkorg, du bör nu ha fått ett mail med din termins svarsfrekvens!", null, "Kolla din inkorg!", "OK");
 $.mobile.hidePageLoadingMsg();
 }
 });
 e.preventDefault();
 });
 });
 }); */
$(document).delegate("#vadfyllttermin", "pageshow", function(event) {
	$.mobile.hidePageLoadingMsg();
	//alert("show vfj");
	/*jQuery(function(){
	$( "#termincont" ).delegate("#submitsvark", 'tap', function(event) {
	alert("submitsvark");
	});
	});
	*/
	//    function iOSversion() {
	//        if (/iP(hone|od|ad)/.test(navigator.platform)) {
	//            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
	//            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
	//            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	//        }
	//    }
	//
	//    ver = iOSversion();
	//
	//    if (ver[0] >= 7) {
	//        alert('This is running iOS 7 or later.');
	//    }
});
$(document).delegate("#omkk", "pageshow", function(event) {
	$.mobile.hidePageLoadingMsg();
	if ((screen.width = 320) && (screen.height >= 568)) {
		$("#omkk").bind("touchmove", function(event) {
			event.preventDefault();
		});
	}
});
$(document).delegate("#ommsr", "pageshow", function(event) {
	if ((screen.width = 320) && (screen.height >= 568)) {
		$("#ommsr").bind("touchmove", function(event) {
			event.preventDefault();
		});
	}
});
$(document).delegate("#kkpage", "pageshow", function(event) {
	//window.plugins.googleAnalyticsPlugin.trackPageview("KKpage");
	if (ver[0] >= 7) {
		window.plugins.webviewcolor.change('#C6E0FF');
	}
	$.mobile.hidePageLoadingMsg();
	function openKurtCheckKK() {
		// what is now?
		$.ajax({
			url : 'http://www.kk.beachtime.se/open.php',
			data : {
				type : "klinik"
			},
			dataType : 'json',
		}).then(function(res) {
			console.log(res);
			switch(res) {
			case "open":
				return true;
				break;
			case "closed":
				$.mobile.changePage("#hem", {
					transition : "flip"
				});
				navigator.notification.alert("Attans! Den h\344r terminens KlinikKurt har tyv\344rr st\344ngt. Om du vet med dig att den inte alls borde ha st\344ngt, kontrollera att du har den senaste uppdateringen av appen.", null, "KlinikKurt har st\344ngt!", "OK");
				return false;
				break;
			case "construction":
				$.mobile.changePage("#hem", {
					transition : "flip"
				});
				navigator.notification.alert("Attans! Den h\344r terminens KlinikKurt har tyv\344rr st\344ngt. Om du vet med dig att den inte alls borde ha st\344ngt, kontrollera att du har den senaste uppdateringen av appen.", null, "KlinikKurt har st\344ngt!", "OK");
				return false;
				break;
			}
		});

	}

	openKurtCheckKK();

});

$(document).delegate("#kkpage", "pageinit", function(event) {
	function klinkurtnewTapHandler(event) {
		$.mobile.showPageLoadingMsg();
		$("#splash").hide();
		setTimeout(function() {
			$("#newcont").addClass('bounceOutDown');
			setTimeout(function() {
				$.mobile.changePage("#kkpage", {
					transition : "fade"
				});
				setTimeout(function() {
					$("#newcont").removeClass('bounceOutDown')
				}, 1000);
			}, 300);
		}, 5);
		event.stopImmediatePropagation();
		return false;
	}

	jQuery(function() {
		var cas_regex = /[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[0-9]+[0-9]+[0-9]+[0-9]/g;
		$("#klinikkurt").submit(function(e) {
			e.preventDefault();
			BlurIt2();
			if (cas_regex.test($("#kkq17").val())) {
				console.log('giltigt cas');
				showConfirmKK();
				//   e.preventDefault();
			} else {
				navigator.notification.alert("Du har inte fyllt i ett giltigt CAS-id, skriv in ett giltig CAS-id och försök igen. Om du vet att du fyllt i ett giltigt CAS-id, försök skicka in igen, vi arbetar på att lösa problemet!", null, "Ogiltigt CAS-id", "OK");
			}
		});

	});
	function kksubmitter() {
		$("#kkq18").val(deviceOS);
		$.mobile.showPageLoadingMsg();
		var dataString = $("#klinikkurt").serialize();
		function tackPrompt() {
			console.log('tackprompt1');
			$.mobile.changePage("#hem", {
				transition : "slide",
				direction : "reverse"
			});
			console.log('tackprompt2');
			function oneMore(buttonIndex) {
				if (buttonIndex === 1) {
					klinkurtnewTapHandler();
				}
			}


			console.log('tackprompt3');
			navigator.notification.confirm('Tack för din utvärdering! Vill du kurta en placering till?', // message
			oneMore, // callback to invoke with index of button pressed
			'Tack!', // title
			'Ja,Nej' // buttonLabels
			);
			console.log('tackprompt4');
		}


		$.ajax({
			type : "POST",
			url : "http://doit.medfarm.uu.se/script/kurt2/receive.php",
			data : dataString,
			timeout : 20000,
			datatype : "html",
			contentType : "application/x-www-form-urlencoded;charset=utf-8",
			success : function() {
				clearKK();
				tackPrompt();
			},
			error : function(x, e) {
				$.mobile.hidePageLoadingMsg();
				navigator.notification.alert("Attans! Din KURTning kunde inte skickas. Kontrollera att du har internet\345tkomst och f\366rs\366k igen!", null, "Kunde inte skicka KURTning", "OK");
				$('#KKopendialog').removeClass('ui-disabled');
			}
		});
	}

	var KKTermInfo = $("#terminfo");
	var RestOfKK = $("#restofkk");
	var OrtCont = $("#ortcont");
	var FewQ = $(".fewq");
	var MoreQ = $(".moreq");
	var KKfr3 = $("#kkfr3");

	jQuery("input[name=qx]").change(function() {
		//$("#kkpage").addClass("kkpagestatheight");
		RestOfKK.hide();
		OrtCont.addClass("bounceOutDown");
		KKTermInfo.addClass("bounceOutDown");
		$("input[name=q1]").prop('checked', false).checkboxradio('refresh', true);
		$("#kkq2").val(["null"]).selectmenu("refresh", true);
		setTimeout(function() {
			OrtCont.hide();
			setTimeout(function() {
				KKTermInfo.hide();
			}, 10);
		}, 1000);
		if ($(this).val() === "10") {
			$("#kkt10").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt10").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt10").hide();
			}, 1000);
		}
		if ($(this).val() === "9") {
			$("#kkt9").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt9").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt9").hide();
			}, 1000);
		}
		if ($(this).val() === "8") {
			$("#kkt8").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt8").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt8").hide();
			}, 1000);
		}
		if ($(this).val() === "7") {
			$("#kkt7").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt7").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt7").hide();
			}, 1000);
		}
		if ($(this).val() === "6") {
			$("#kkt6").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt6").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt6").hide();
			}, 1000);
		}
		if ($(this).val() === "5") {
			$("#kkt5").removeClass("bounceOutDown abspos").show();
		} else {
			$("#kkt5").addClass("bounceOutDown abspos");
			setTimeout(function() {
				$("#kkt5").hide();
			}, 1000);
		}
	});

	jQuery("input[name=q1]").change(function() {
		OrtCont.removeClass("bounceOutDown").show();
		if (ver[0] >= 7) {
			$("#ios7whitefix").show();
		}
		//$("#kkpage").removeClass("kkpagestatheight");
	});

	jQuery("select[name=q2]").change(function() {
		RestOfKK.show();
		if (ver[0] >= 7) {
			$("#ios7whitefix").hide();
		}
		//$("#kkcont").css('height','auto');
		//$("#kkpage").css('height','auto');
		//$("#kkcont").css('height','3000px');
	});

	$('input[name=q1]').change(T9Psyk);
	$('#kkq2').change(T9Psyk);

	function T9Psyk() {
		if ($('input[name=q1]:checked').val() === '29' && $('#kkq2 :selected').val() === '20') {
			KKfr3.removeClass("hinge").show();
			FewQ.hide();
			MoreQ.show();
		} else {
			KKfr3.addClass("hinge");
			KKfr3.delay(2500).queue(function() {
				$(this).hide();
				$(this).dequeue();
			});
			FewQ.show();
			MoreQ.hide();
		}
	}

	function Uppsala() {
		if ($('#kkq2 :selected').val() === '20') {
			T910gyn();
		}
	}

	function T910gyn() {
		if ($('input[name=q1]:checked').val() === '25' || $('input[name=q1]:checked').val() === '27' || $('input[name=q1]:checked').val() === '28' || $('input[name=q1]:checked').val() === '32' || $('input[name=q1]:checked').val() === '33' || $('input[name=q1]:checked').val() === '34') {
			$("#kkfr4").removeClass("hinge");
			$("#kkfr4").show();
			FewQ.hide();
			MoreQ.show();
		} else {
			$("#kkfr4").addClass("hinge");
			setTimeout(function() {
				$("#kkfr4").hide();
			}, 2500);
		}
	}


	$('input[name=q1]').change(Uppsala);
	$('#kkq2').change(Uppsala);

	function verifyReq1() {
		if ($('#kkq1 :selected').val() === 'null' || $('#kkq2 :selected').val() === 'null' || $('#kkq17').val().length === 0) {
			$('#KKopendialog').addClass('ui-disabled');
			$("#kkreqmsg").show();
		} else {
			$('#KKopendialog').removeClass('ui-disabled');
			$("#kkreqmsg").hide();
		}
	}


	$('#kkq1').change(verifyReq1);
	$('#kkq2').change(verifyReq1);
	$('#kkq17').change(verifyReq1);
	$("#KKopendialog").click(BlurIt2);

	function BlurIt2() {
		$("#kkq15").blur();
		$("#kkq17").blur();
	}

	function SubKK(button) {
		if (button === 1) {
			kksubmitter();
			//$("#klinikkurt").submit();
		} else if (button === 2) {
			$('#KKopendialog').removeClass('ui-disabled');
		}
	}

	function showConfirmKK(cdata) {
		console.log('showconfirmkk)');
		if ($("input:radio[name='q5']:checked").val() && $("input:radio[name='q6']:checked").val() && $("input:radio[name='q7']:checked").val() && $("input:radio[name='q8']:checked").val() && $("input:radio[name='q9']:checked").val() && $("input:radio[name='q10']:checked").val() && $("input:radio[name='q11']:checked").val() && $("input:radio[name='q12']:checked").val() && $("input:radio[name='q13']:checked").val() && $("input:radio[name='q14']:checked").val() && $("input:radio[name='q16']:checked").val()) {
			if ($("#kkq15").val().length === 0) {
				$('#KKopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte l\344mnat n\345gon kommentar. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubKK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			} else {
				$('#KKopendialog').addClass('ui-disabled');
				navigator.notification.confirm('\304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubKK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			}
		} else {
			if ($("#kkq15").val().length === 0) {
				$('#KKopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor och inte l\344mnat n\345gon kommentar.  \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubKK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			} else {
				$('#KKopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor.  \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubKK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			}
		}
	}


	$('#KKopendialog').addClass('ui-disabled');
	$("#KKopendialog").click(BlurIt2);
	$("#kkpage").delegate("#KKopendialog", 'tap', function(event) {
		//showConfirmKK();
		$("#klinikkurt").submit();
		return false;
	});

});

function DynTermPlac() {
	if ($("input:radio[name='qx']:checked").val()) {
		$(".placercont").hide();
	} else {
		$(".placercont").show();
	}
}


$(document).delegate("#vcpage", "pageshow", function(event) {
	if (device.platform === "iPhone" || device.platform === "iOS") {
		$('#vcq2').selectmenu({
			preventFocusZoom : true
		});
	}

	if (ver[0] >= 7) {
		window.plugins.webviewcolor.change('#FFC6C6');
	}
	//window.plugins.googleAnalyticsPlugin.trackPageview("VCpage");
	$.mobile.hidePageLoadingMsg();
	// returns true if if date <= today
	// returns false if if date > today

	function openKurtCheckVC() {
		// what is now?
		$.ajax({
			url : 'http://www.kk.beachtime.se/open.php',
			data : {
				type : "vc"
			},
			dataType : 'json',
		}).then(function(res) {
			console.log(res);
			switch(res) {
			case "open":
				return true;
				break;
			case "closed":
				$.mobile.changePage("#hem", {
					transition : "flip"
				});
				navigator.notification.alert("Attans! Den h\344r terminens VC-Kurt har tyv\344rr st\344ngt. Om du vet med dig att den inte alls borde ha st\344ngt, kontrollera att du har den senaste uppdateringen av appen.", null, "VC-Kurt har st\344ngt denna termin!", "OK");
				return false;
				break;
			case "construction":
				$.mobile.changePage("#hem", {
					transition : "flip"
				});
				navigator.notification.alert("Attans! Den h\344r terminens VC-Kurt har tyv\344rr st\344ngt. Om du vet med dig att den inte alls borde ha st\344ngt, kontrollera att du har den senaste uppdateringen av appen.", null, "VC-Kurt har st\344ngt pga tekniska problem!", "OK");
				return false;
				break;
			}
		});

	}

	openKurtCheckVC();

});
$(document).delegate("#vcpage", "pageinit", function() {

	function verifyReq2() {
		if (!$(':radio[name="qT"]').is(':checked') || $('#vcq2 :selected').val() === 'null' || $('#vcq16').val().length === 0) {
			$('#VCopendialog').addClass('ui-disabled');
			$("#vcreqmsg").show();
		} else {
			$('#VCopendialog').removeClass('ui-disabled');
			$("#vcreqmsg").hide();
		}
	}

	verifyReq2();
	$(':radio[name="qT"]').change(verifyReq2);
	var counter = 0;
	$('#vcpage :radio[name="qT"]').change(function() {

		console.log($(this).attr("id"));
		if ($(this).attr("id") != 'vcq1v5' && counter < 1) {
			counter++;
			navigator.notification.confirm('Attans! VC-kurt i mobilen finns bara för termin 11! Vill du KURTa din VC-placering p\345 internet?', // message
			VCTermin, // callback to invoke with index of button pressed
			'Bara termin 11!', // title
			'Ja,Nej' // buttonLabels
			);
		}
	});

	function VCTermin(yesno) {
		counter = 0;
		$('#vcpage :radio[name="qT"]').attr('checked', false).checkboxradio("refresh");
		if (yesno === 1) {
			window.open("http://www.kurskurt.se", '_system');
		} else {

			TillHem();

		}
	}

	;
	$('#vcq2').change(verifyReq2);
	$('#vcq16').change(verifyReq2);
	$("#vcpage").delegate("#VCopendialog", 'tap', function(event) {
		showConfirmVCK();
	});
	$('#VCopendialog').addClass('ui-disabled');
	$("#reqmsg").show();
	$("#VCopendialog").click(BlurIt);

	function BlurIt() {
		$("#vcq14").blur();
		$("#vcq16").blur();
	}

	function SubVCK(button) {
		if (button === 1) {
			$("#vckurtform").submit();
		} else if (button === 2) {
			$('#VCopendialog').removeClass('ui-disabled');
		}
	}

	function showConfirmVCK(cdata) {
		$("#vckurtform").submit();
	}

	function showConfirmVCKbkp(cdata) {
		if ($("input:radio[name='q2']:checked").val() && $("input:radio[name='q3']:checked").val() && $("input:radio[name='q4']:checked").val() && $("input:radio[name='q5']:checked").val() && $("input:radio[name='q6']:checked").val() && $("input:radio[name='q7']:checked").val() && $("input:radio[name='q9']:checked").val() && $("input:radio[name='q10']:checked").val() && $("input:radio[name='q11']:checked").val() && $("input:radio[name='q13']:checked").val()) {
			if ($("#vcq14").val().length === 0) {
				$('#VCopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte l\344mnat n\345gon kommentar. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubVCK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			} else {
				$('#VCopendialog').addClass('ui-disabled');
				navigator.notification.confirm('\304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubVCK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			}
		} else {
			if ($("#vcq14").val().length === 0) {
				$('#VCopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor och inte l\344mnat n\345gon kommentar. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubVCK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			} else {
				$('#VCopendialog').addClass('ui-disabled');
				navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
				SubVCK, // callback to invoke with index of button pressed
				'Skicka in?', // title
				'Ja,Nej' // buttonLabels
				);
			}

		}
	}

	/*
	 JESPER: DEN HÄR FUNKTIONEN BEHÖVS JU INTE LÄNGRE, NU ÄR DET JU BARA VCFR10 SOM SKA SYNAS DE ANDRA ÄR JU INTE LÄNGRE MED I ORIGINALFORMULÄRET. ÄNDRADE HÄR, I JS OCH HTML-FILEN
	 jQuery(function() {
	 jQuery("input[name=qT]").change(function() {
	 if ($(this).val() === "5") {
	 $("#vcfr10").show();
	 $("#vcfr9").hide();
	 } else {
	 //                $("#vcfr10").hide();
	 //                $("#vcfr9").show();
	 }
	 });
	 });

	 function VCterm11() {
	 if ($("input:radio[name='qT']:checked").val() === '5') {
	 $("#vcfr10").show();
	 $("#vcfr9").hide();
	 } else {
	 $("#vcfr10").hide();
	 $("#vcfr9").show();
	 }
	 }
	 */
	var cas_regex = /[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[a-zA-Z]+[0-9]+[0-9]+[0-9]+[0-9]/g;
	$("#vckurtform").submit(function(e) {
		e.preventDefault();
		BlurIt();
		if (cas_regex.test($("#vcq16").val())) {
			if ($(':radio[name="qT"]:checked') > !0 || $('#vcq2 :selected').val() === 'null' || $('#vcq16').val().length === 0) {
			} else {
				if ($("input:radio[name='q2']:checked").val() && $("input:radio[name='q3']:checked").val() && $("input:radio[name='q4']:checked").val() && $("input:radio[name='q5']:checked").val() && $("input:radio[name='q6']:checked").val() && $("input:radio[name='q7']:checked").val() && $("input:radio[name='q9']:checked").val() && $("input:radio[name='q10']:checked").val() && $("input:radio[name='q11']:checked").val() && $("input:radio[name='q13']:checked").val()) {
					if ($("#vcq14").val().length === 0) {
						$('#VCopendialog').addClass('ui-disabled');
						navigator.notification.confirm('Du har inte l\344mnat n\345gon kommentar. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
						SubVCKil, // callback to invoke with index of button pressed
						'Skicka in?', // title
						'Ja,Nej' // buttonLabels
						);
					} else {
						$('#VCopendialog').addClass('ui-disabled');
						navigator.notification.confirm('\304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
						SubVCKil, // callback to invoke with index of button pressed
						'Skicka in?', // title
						'Ja,Nej' // buttonLabels
						);
					}
				} else {
					if ($("#vcq14").val().length === 0) {
						$('#VCopendialog').addClass('ui-disabled');
						navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor och inte l\344mnat n\345gon kommentar. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
						SubVCKil, // callback to invoke with index of button pressed
						'Skicka in?', // title
						'Ja,Nej' // buttonLabels
						);
					} else {
						$('#VCopendialog').addClass('ui-disabled');
						navigator.notification.confirm('Du har inte svarat p\345 alla fr\345gor. \304r du s\344ker p\345 att du vill skicka in din Kurtning?', // message
						SubVCKil, // callback to invoke with index of button pressed
						'Skicka in?', // title
						'Ja,Nej' // buttonLabels
						);
					}

				}
			}
			function SubVCKil(button) {
				if (button === 1) {
					$("#vcq17").val(deviceOS);
					$.mobile.showPageLoadingMsg();
					var dataStringVC = $("#vckurtform").serialize();
					console.log(dataStringVC);
					$.ajax({
						type : "POST",
						url : "http://doit.medfarm.uu.se/script/kurt2/receive.php",
						data : dataStringVC,
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						datatype : "html",
						success : function() {
							TillHem();
							//window.plugins.googleAnalyticsPlugin.trackPageview("VCKifyllt");
							navigator.notification.alert("Tack f\366r din Kurtning! Du har precis gjort l\344karprogrammet lite b\344ttre. Se nu till att dina kursare g\366r samma sak!", null, "Tack!", "OK");
						},
						error : function(x, e) {
							$.mobile.hidePageLoadingMsg();
							navigator.notification.alert("Attans! Din KURTning kunde inte skickas. Kontrollera att du har internet\345tkomst och f\366rs\366k igen!", null, "Kunde inte skicka KURTning", "OK");
							$('#VCopendialog').removeClass('ui-disabled');
						}
					});
				} else if (button === 2) {
					$('#VCopendialog').removeClass('ui-disabled');
				}
			}

		} else {
			navigator.notification.alert("Du har inte fyllt i ett giltigt CAS-id, skriv in ett giltig CAS-id och försök igen. Om du vet att du fyllt i ett giltigt CAS-id, försök skicka in igen, vi arbetar på att lösa problemet!", null, "Ogiltigt CAS-id", "OK");
		}
	});

});
