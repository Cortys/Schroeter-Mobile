var images = [];
for(var i=1;i<=defaults["meetingCount"];i++)
	images.push("images/pages/meetingpoint/"+i+".jpg");
images.reverse();
zflow(images, "#tray");
function coverActiveRefresh(fileName) {
	$("#view").attr("alt", "MP"+fileName);
}
coverActiveRefresh(defaults["meetingCount"]);