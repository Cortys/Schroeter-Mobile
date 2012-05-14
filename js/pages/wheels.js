if((/android/gi).test(navigator.appVersion))
	$("#searchBox img").remove();

var getSelected = function(t, onlyGet) {
	var h = (PHONE?55:64);
	var cordY = Math.round(t.y/h)*h;
	if(!onlyGet) {
		t.y = cordY;
		t._pos(t.x, t.y);
	}
	return Math.abs(Math.round(cordY/h))+1+(!PHONE*1); //+2 wegen Leerelementen
};

var theChecker = function(notSudden) { // ^_^
	var t = this;
	var i=notSudden?20:0;
	setTimeout(function() {
		if(!t.animating) {
			cordY = getSelected(t);
			var selection = $(t.scroller).children("li").filter(function(i) { return ($(this).css("display")!="none"); }).eq(cordY);
			sideRefresh(selection);
		}
	}, i);
};

var scrollArea = new iScroll("area", {
	hScroll:false,
	vScrollbar:false,
	snap: "li",
	onAnimationEnd: theChecker,
	onRefresh: function() {
		sideRefresh($("#area ul li").filter(function(i) { return ($(this).css("display")!="none"); }).eq(1+(!PHONE*1)));
	},
	bounce: false,
	lockDirection: false
});

$(document).bind(END, function() {
	theChecker.call(scrollArea, 1);
});
var wort = $("#searchField").val();
var filter = function() {
	var f = $(".filtered", $("#wheelFilter")),
		w = $("#searchBox input").val()==wort?"":$("#searchBox input").val();
	f = f.length<=1?f.attr("alt"):"ALL";
	$("#area ul li").hide().each(function(i,v) {
		v = $(v);
		var e = v.children().length>0?v.children(":first"):v;
		if(e.text().match(new RegExp(w.replace(/[^A-Za-z1-9 ]/gi, ""), "gi"))&&(v.attr("filter")==f || f=="ALL") || v.attr("class")=="emptyLi")
			v.show();
	});
	
	setTimeout(function() {
		scrollArea._pos(0,0);
		scrollArea.refresh();
	}, 0);
};
var suche = function() {
	$("#searchBox img").hide();
	var v = $(this);
	var w = v.val();
	if(w == "") v.val(wort);
	if(w == wort) w = "";
	filter();
};
$("#searchBox input").bind("change, blur", suche).keyup(function(e) {
	if(e.keyCode == 13) {
		$(this).blur();
		suche.call(this);
	}
}).focus(function() {
	$("#searchBox img").show();
	var v = $(this);
	if(v.val()==wort)
		v.val("");
});
$("#searchBox img").bind(iTD()?END:START, function() {
	$("#searchBox input").val("");
	setTimeout(function() {
		$("#searchBox input").select();
	}, 0);
});

$("#wheelFilter img").bind(START, function() {
	var f = $(".filtered", $("#wheelFilter")),
		t = $(this);
	f.attr("class", "");
	((t.attr("alt")!=f.attr("alt")||f.length>1)?t:$("#wheelFilter img")).attr("class", "filtered");
	filter();
});

if(PHONE) {
	var openAccept = false;
	var closeAccept = false;
	$("#area ul li").bind(START, function() {
		openAccept = (getSelected(scrollArea,1)==$("#area ul li").filter(function(){return $(this).css("display")=="none"?false:true;}).index($(this))&&$(this).css("font-weight")=="bold")?true:false;
	}).bind(MOVE, function() {
		openAccept = false;
	}).bind(END, function() {
		if(openAccept) {
			closeAccept = false;
			$("#overlay").cssFadeIn({ duration:500, queue:false });
			$("#wheelErg").cssAnimate({ transform:"translateY(0)" }, { duration:500, queue:false, complete:function() { closeAccept=true; } });
		}
		openAccept = false;
	});
	$("#ergClose,#overlay").bind(START, function() {
		if(closeAccept) {
			$("#overlay").cssFadeOut({ duration:500, queue:false });
			$("#wheelErg").cssAnimate({ transform:"translateY("+($("#wheelErg").attr("class")=="large"?291:209)+"px)" }, { duration:500, queue:false });
			closeAccept = false;
		}
	});
}