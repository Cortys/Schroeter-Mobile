/*******************************************************************************************
By Clemens Damke - 2011 - Deltamedia
This file contains the complete file loading system, touch engine and multi device support
especially developed for this project. Do not modify anything here! Apply changes in the
files being in the pages-folders and the defaults.js in this directory.
Frameworks used:
	jQuery - iScroll - swipeJS - zFlow(very many mods here, made for this project)
*******************************************************************************************/

//jQuery extension
jQuery.expr[':'].Contains = function(a,i,m){
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};
//Says if PC, Tablet or Smartphone is used
function iTD() {
	var el = document.createElement('div');
	el.setAttribute('ongesturestart', 'return;');
	return (typeof el.ongesturestart == "function" || (/android/gi).test(navigator.appVersion))?((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/mobile/i))?2:1):false;
}
//Events for the used device
var START = iTD()?"touchstart":"mousedown",
	MOVE = iTD()?"touchmove":"mousemove",
	END = iTD()?"touchend":"mouseup";
//Opens a page
function pageLoad(hashStr, open) {
	pageLoading = true;
	var page = hashStr,
		startUp = open?0:defaults["pageFade"],
		did = false;
	$("#loadedPage,#subNav").cssFadeOut(startUp, function() {
		if(!did) {
			var bg = (defaults['bgDict'][page])?defaults['bgDict'][page]:page+".jpg",
				css = ((defaults['cssLanguages'][page])?(LANGUAGE+"/"):"")+((defaults['cssDict'][page])?defaults['cssDict'][page]:page),
				js = ((defaults['scriptLanguages'][page])?(LANGUAGE+"/"):"")+((defaults['scriptDict'][page])?defaults['scriptDict'][page]:page),
				prel = new Image();
			prel.onload = function() {
				$.get("file:///android_asset/www/pages/"+(PHONE?"mobile":"tablet")+"/"+LANGUAGE+"/"+page+".html", function(data) {
					var menuReg = defaults["menuReg"],
						menu = data.match(menuReg);
					$("#subNav").html(menu[1]).cssFadeIn(startUp);
					data = data.replace(menuReg, "").replace(/\<div id\=[\"\']topNav[\"\']\>([a-zA-Z1-9]*)\<\/div\>/g, '<div id="topNav"><div name="linkBack" class="backArrow"></div><img src="images/'+LANGUAGE+'/heads/$1.png"><img src="images'+PHONESTRING+'/static/infoTrans.png" class="info" name="linkDeep" alt="info" id="infobutton"></div>');
					//Remove actions on CoverFlows
					coverActiveRefresh = function() {};
					//
					$("#loadedPage").html(data).cssFadeIn(startUp);
					setTimeout(function() {
						$.ajax({
							url: "file:///android_asset/www/js/pages/"+js+".js",
							dataType: "html",
							complete: function() {
								if(!iTD() || (window.innerWidth > 1024 && !PHONE)) {
									$("#topNav").css({ width:"1024px", left:"50%", marginLeft:"-512px" });
									if($("#wheelErg").length > 0)
										$("#wheelErg").css({ position:"absolute" });
								}
							},
							success: function(data) {
								eval(data);
							}
						});
					}, 0);
					pageLoading = false;
				}, "html");
				$("head .added").remove();
				$("head").append('<link rel="stylesheet" href="css/pages'+(PHONE?"Mobile":"")+'/'+css+'.css" type="text/css" class="added">');
				$("#bg").css({ backgroundImage:"url('images"+PHONESTRING+"/bgs/"+bg+"')" });
			};
			prel.src = 'images/bgs/'+bg;
			$("#bg").css({ backgroundImage: "none" });
		}
		did = !did;
	});
}
//Performs hash operations and opens page with "pageLoad()"
function linkLoad(page, mode) {
	if(!pageLoading) {
		var newHashArr = [],
			newHash = "",
			aktHash = String(location.hash).split("#")[1],
			aktPage = aktHash.split("-");
		aktPage = aktPage[aktPage.length-1];
		if(page!=aktPage) {
			switch(mode) {
				case "deep":
					newHash = aktHash+"-"+page;
					break;
				case "back":
					newHashArr = String(aktHash).split("-");
					newHash = newHashArr.slice(0,-1).join("-");
					page = newHashArr[newHashArr.length-2];
					break;
				case "replace":
					newHashArr = String(aktHash).split("-");
					newHash = newHashArr.slice(0,-1).join("-")+"-"+page;
					break;
				case "absolute":
					newHash = page;
					page = newHash.split("-");
					page = page[page.length-1];
					break;
				default:
					newHash = aktHash;
					break;
			};
			location.hash = newHash;
		}
		pageLoad(page);
	}
}
//Handles click events
function clickRun(e,o,d) {
	o = (!o)?($(e.target)):o;
	var oName = o.attr("name"),
		oAlt = o.attr("alt");
	if(oName == LAST_START.attr("name") && oAlt == LAST_START.attr("alt")) {
		switch(oName) {
			case "linkDeep":
				linkLoad(oAlt, "deep");
				break;
			case "linkBack":
				linkLoad("", "back");
				break;
			case "linkReplace":
				linkLoad(oAlt, "replace");
				break;
			case "linkAbsolute":
				linkLoad(oAlt, "absolute");
				break;
			case "linkMail":
				location.href="mailto:"+oAlt;
				break;
			case "linkPDF":
				$("#simulatedTrigger").attr("href", "pdfs/"+oAlt+".pdf");
				var a = $("#simulatedTrigger")[0];
				var e = document.createEvent('MouseEvents');
				e.initEvent('click', true, true);
				a.dispatchEvent(e);
				break;
			case "linkPhone":
				if(!navigator.userAgent.match(/ipod/gi))
					location.href="tel:"+oAlt;
				else
					alert("Calling is not supported on iPods!");
				break;
			case "linkLang":
				location.search = oAlt;
				break;
			case "linkWeb":
				$("#simulatedTrigger").attr("href", oAlt);
				var a = $("#simulatedTrigger")[0];
				var e = document.createEvent('MouseEvents');
				e.initEvent('click', true, true);
				a.dispatchEvent(e);
				break;
			default:
				if(!d) clickRun(e,o.parent(),1);
				break;
		};
		LAST_START = $(document);
	}
	else if(!d)
		clickRun(e,o.parent(),1);
}
//gets the clicked element the user meant to be clicked (bubbling)
function testClickRun(e) {
	if((/link/gi).test(e.attr("name")))
		return e;
	else if ((/link/gi).test(e.parent().attr("name")))
		return e.parent();
	return $(document);
}
//status variables
var pageLoading,
	windowWidth = 0,
	windowHeight = 0,
	LANGUAGE = location.search?location.search.replace(/^\?/, ""):defaults.defaultLang,
	LAST_START = $(document),
	PHONE = iTD()*1>1,
	PHONESTRING = PHONE?"Mobile":"";

$(document).ready(function() {
	//webapp initialisation
	document.ontouchmove = function(e){ e.preventDefault(); };
	window.scrollTo(0, 0);
	windowWidth = window.innerWidth,
	windowHeight = window.innerHeight;
	
	//startup actions
	var hashArr = String(location.hash).split("#");
	hashArr = hashArr[hashArr.length-1].split("-");
	var hashStr = hashArr[hashArr.length-1];
	hashStr = (!hashStr)?defaults.defaultPage:hashStr;
	hashArr[hashArr.length-1] = hashStr;
	location.hash = hashArr.join("-");
	pageLoad(hashStr);
	
	//mods for PCs and too large devices
	if(!iTD() || (windowWidth > 1024 && !PHONE)) {
		windowWidth = 1024;
		windowHeight = windowHeight>768?768:windowHeight;
		$("#loadedPage,#subNav,#bg").css({ width:windowWidth, height:windowHeight, marginLeft:-(windowWidth/2), left:"50%" });
		//$("body").css({ backgroundSize:windowWidth, marginTop:"100px" });
	}
	
	if((windowWidth<windowHeight&&!PHONE)||(windowWidth>windowHeight&&PHONE))
		window.onorientationchange = function() {
			windowWidth = window.innerWidth,
			windowHeight = window.innerHeight;
			$("#subNav").css("top", (windowHeight-40)+"px");
			window.onorientationchange = function() {};
		};
	$("#subNav").css("top", (windowHeight-40)+"px");
	
	//events
	$("#loadedPage,#subNav").bind(START, function(e) {
		LAST_START = testClickRun($(e.target));
	}).bind(MOVE, function() {
		if(LAST_START.attr("noMove"))
			LAST_START = $(document);
	}).bind(END, function(e) {
		clickRun(e);
		if(e.target.id == "logo")
			defaults.logoAction();
	});
});