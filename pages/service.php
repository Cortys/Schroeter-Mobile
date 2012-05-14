<?php $p=$_GET['phoneString']; ?>
<div id="topNav">service</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo  $p; ?>/<?php echo  $_GET['lang']; ?>/serviceTitle.png" alt="" id="title">

<div id="types">
	<img src="images<?php echo  $p; ?>/<?php echo  $_GET['lang']; ?>/service/mp.png" name="linkDeep" alt="mp">
	<img src="images<?php echo  $p; ?>/<?php echo  $_GET['lang']; ?>/service/fach.png" name="linkDeep" alt="fach">
	<img src="images<?php echo  $p; ?>/<?php echo  $_GET['lang']; ?>/service/soft.png" name="linkDeep" alt="soft">
</div>

MENU:
<?php $active="service";include "defaultSub.php"; ?>