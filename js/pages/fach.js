var images = [];
var add = '';
for(var i=1;i<=defaults["fachCount"];i++)
	images.push("images/pages/fach/"+i+".jpg");
images.reverse();
zflow(images, "#trayFach");

function coverActiveRefresh(fileName) {
	add = '<img src="images/pages/prDE.png" name="linkPDF" alt="fach'+fileName+'_DE" id="viewDE"><img src="images/pages/prEN.png" name="linkPDF" alt="fach'+fileName+'_EN" id="viewEN">';
	$("#overlay div div").html(add);
}
coverActiveRefresh(defaults["fachCount"]);

$(".viewer").bind(END, function() {
	$("#overlay").cssFadeIn(400);
});
$("#overlay").bind(START, function(e) {
	if(e.target.id == "overlay")
		$(this).cssFadeOut(400);
});