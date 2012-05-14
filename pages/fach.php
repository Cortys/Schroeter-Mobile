<div id="magazin" class="centering landscape">
	<div id="trayFach" class="tray"></div>
</div>

<div id="topNav">service</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images/<?php echo  $_GET['lang']; ?>/fbTitle.png" alt="" id="title">

<div id="options">
	<div id="buttons">
		<img src="images/<?php echo  $_GET['lang']; ?>/view.png" class="viewer">
	</div>
</div>

<div id="overlay">
	<div><div></div></div>
</div>

MENU:
<?php $active="service";include "defaultSub.php"; ?>