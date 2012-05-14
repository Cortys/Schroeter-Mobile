<div id="topNav">produkte</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo  $_GET['phoneString']; ?>/<?php echo  $_GET['lang']; ?>/produkteTitle.png" alt="" id="title">

<div id="groups">
<?php
	$table = array();	
	$table[0] = array("Thermic", "Arctic", "Semi");
	$table[1] = array("Conti", "Clima", "Bake");
	if(!$_GET['phone'])
		$table[2] = array("Fish", "Smok", "Cleen");
	else {
		array_push($table[0], "Fish", "Smok");
		array_push($table[1], "Cleen");
	}
	foreach($table as $nr => $zeile) {
		echo "<div class='n$nr'>";
		foreach($zeile as $zelle) {
			echo "<div name='linkDeep' alt='pr$zelle'><img src='images".$_GET['phoneString']."/pages/produkte/".$zelle."jet.png'></div>";
		}
		echo "</div>";
	}
?>
</div>

MENU:
<?php $active="produkte";include "defaultSub.php"; ?>