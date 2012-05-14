$("#slide").show();
var and = (/android/gi).test(navigator.appVersion);
var page = $("#folias").html();
var num = defaults.products[page];
var write = "";
for(var i = 1; i<=num; i++)
	write += "<div><img src='images/pages/products/"+page+"jet"+i+".jpg' alt=''></div>";
$("#folias").css(!PHONE?{ width:windowWidth*num }:{ width:1150*(windowHeight/768)*num }).html(write).children("div").css(!PHONE?{ width:windowWidth }:{ width:1150*(windowHeight/768) });
var scrollArea = new iScroll("slide", {
	vScroll:false,
	hScrollbar:false,
	snap: !PHONE,
	useTransition: true,
	lockDirection: false,
	momentum: PHONE,
	onAnimationEnd: function() {
		if(!PHONE) buttonUpdate(this);
	}
});
var buttonUpdate = function(t) {
	var cordX = Math.round(t.x/windowWidth)*windowWidth;
	var mL = -(t.pagesX.length-1)*windowWidth;
	if(!PHONE) {
		$("#slide > img").show();
		if(!cordX||cordX==mL)
			$("#slide > img:"+(!cordX?"first":"last")).hide();
	}
};
$("#slide").bind(END, function() {
	if(!PHONE) {
		var t = scrollArea;
		buttonUpdate(t);
		setTimeout(function() {
			if(!t.animating) {
				var cordX = Math.round(t.x/windowWidth)*windowWidth;
				t.x = cordX;
				t._pos(t.x, t.y);
			}
		}, 20);
	}
}).append(!PHONE?"<img src='images/pages/left.png' class='-1'><img src='images/pages/right.png' class='1'>":"");
var prInhalt = "<span class='mH'>"+(LANGUAGE=="de"?"W&auml;hlen Sie das Produktdatenblatt in Ihrer Sprache:":"Select the product specification sheet in your language:")+"</span>";
var subs = defaults.productSubs[page];
if(!subs) subs = [""];
$.each(subs, function(i,v) {
	prInhalt += "<div class='cat'>"+page+"<span>jet</span> "+v+"<br>";
	v = v?("_"+v.replace(/\//g, "_")):v;
	$.each(defaults.productLangs, function(j,w) {
		var file = (page.toUpperCase())+"jet"+v+"_"+w;
		prInhalt += "<img src='images/pages/pr"+w+".png' name='linkPDF' alt='"+file+"'>";
	});
	prInhalt += "</div>";
});
var h = ((subs.length-1)*81)+169;
$("#loadedPage").append('<div id="topNav"><div name="linkBack" class="backArrow"></div><img src="images/'+LANGUAGE+'/heads/produkte.png"><img src="images'+PHONESTRING+'/static/infoTrans.png" class="info" name="linkDeep" alt="info"></div><div id="overlay"><div><div>'+prInhalt+'</div></div></div>');
setTimeout(function() {
	if(!PHONE)
		$("#overlay > div").css({ height:h, marginTop:-Math.ceil(h/2) });
	$("#overlay").bind(START, function(e) {
		if((e.target.id == "overlay" && !PHONE) || (e.target.name != "linkPDF" && PHONE))
			$(this).cssFadeOut(400);
	});
	if(!PHONE)
		$("#slide > img").bind(START, function() {
			var t = scrollArea;
			var cl = $(this).attr("class")*1;
			var mL = (t.pagesX.length-1)*windowWidth;
			var x = Math.abs(Math.round(t.x/windowWidth)*windowWidth)+(windowWidth*cl);
			x = (x<0?0:(x>mL?mL:x));
			$("#slide > img").show();
			if(!x||x==mL)
				$("#slide > img:"+(!x?"first":"last")).hide();
			t.scrollTo(-x, 0, 300);
		});
}, 0);
var state = false;
var infoStart = 0;
var prel = new Image();
var prCords = !PHONE?[0,-330]:[0,-250];
function infoToggle(zu) {
	zu = (zu=="auto")?(state?prCords[0]:prCords[1]):zu;
	state = !!zu;
	$(this).attr("src", "images/pages/prPfeil"+(state*1)+".png");
	zu += "px";
	$("#info").cssAnimate({ transform:"translateY("+zu+")" }, 500);
}

function swipe(e, d) {
	var c = $(e.target).attr("class");
	if(c != "toggler" && c != "viewer") {
		var zu = (d=="up")?prCords[1]:prCords[0];
		zu = (d=="down")?prCords[0]:zu;
		infoToggle.call($(".toggler")[0], zu);
	}
}

prel.onload = function() {
	$(".desc").html(($(".desc").html().split("\n"))[(LANGUAGE=="en")*1+1]);
	$("#info").prepend("<div class='head'><img src='images/"+LANGUAGE+"/produkte/"+page+"jet.png' alt='"+page+"jet'></div><img src='images/pages/prPfeil0.png' class='toggler'>").append("<div class='actions'><div class=\"pr_datenblatt\">"+(LANGUAGE=="de"?"Produktdatenblatt:":"Product Specification Sheet:")+"</div><img src='images/pages/download.png' class='viewer'></div>");
	setTimeout(function() {
		$(".viewer").bind(END, function() {
			$("#overlay").cssFadeIn(400);
		});
		$(".toggler").bind(END, function() {
			infoToggle.call(this, "auto");
		});
		$("#info").swipe({ swipe:swipe, threshold:0 });
	}, 0);
};
prel.src = "images/pages/prPfeil1.png";