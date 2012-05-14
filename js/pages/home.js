var add = "";
$.each(defaults.languages, function(i,v) {
	add += "<img src='images/pages/pr"+(v.toUpperCase())+".png' name='linkLang' alt='"+v+"'>";
});

// Easy! But not felxible!
//addd = '<a href="/schroeter3/de/"><img src="images/pages/prDE.png" name="linkLangQuick" alt="de"></a><a href="/schroeter3/en/"><img src="images/pages/prEN.png" name="linkLangQuick" alt="en"></a>';

$(".lang").bind(END, function() {
	$("#overlay").cssFadeIn(400);
});
$("#overlay").bind(START, function(e) {
	if(e.target.id == "overlay")
		$(this).cssFadeOut(400);
}).children("div").children("div").html(add);