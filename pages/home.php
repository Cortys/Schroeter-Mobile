<?php
$m = $_GET['phoneString'];
$l = $_GET['lang'];
?>
<img src="images/static/logo.png" alt="" id="logo">
<ul id="menuHome">
	<li name="linkDeep" alt="unternehmen" style="background-image: url('images<?php echo $m;?>/<?php echo $l;?>/home/unternehmen.png');"></li>
	<li name="linkDeep" alt="produkte" style="background-image: url('images<?php echo $m;?>/<?php echo $l;?>/home/produkte.png');"></li>
<?php echo $_GET['phone']?"</ul><ul id='menuHome2'>":"";?>
	<li name="linkDeep" alt="service" style="background-image: url('images<?php echo $m;?>/<?php echo $l;?>/home/service.png');"></li>
	<li name="linkDeep" alt="smokeacademy" style="background-image: url('images<?php echo $m;?>/<?php echo $l;?>/home/smokeacademy.png');"></li>
</ul>

<div id="overlay">
	<div><div></div></div>
</div>

MENU:
<img src="images/static/infoTrans.png" class="info" name="linkDeep" alt="info"><img src="images/static/langSelect_<?php echo $l;?>.png" class="lang">