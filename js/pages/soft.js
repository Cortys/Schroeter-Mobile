if(PHONE) {
	$("#smoke").css({ height:windowHeight-60 });
	var img = new Image();
	img.onload = function() {
		var scrollArea = new iScroll("smoke", {
			hScroll:false,
			vScrollbar:true,
			lockDirection: false,
			useTransition: true
		});
	};
	img.src = "images/pages/smokeHeft.png";
}