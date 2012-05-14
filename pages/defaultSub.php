<?php
	$elements = array("home", "unternehmen", "produkte", "service", "smokeacademy");
	foreach($elements as $key => $value) {
		$type = "linkAbsolute";
		$pre = "home-";
		if(!$key)
			$pre = "";
		$prefactiv=$active==$value?1:"";
		$l = $_GET['lang'];
		echo "<img src='images".$_GET['phoneString']."/defaultSub/$l/$value$prefactiv.png' name='$type' alt='$pre$value'>";
	}
?>