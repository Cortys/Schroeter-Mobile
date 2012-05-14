<?php
	
	error_reporting(0);
	
	$dir = dirname(__FILE__);
	
	$files = scandir($dir);
	
	echo count($files)."<br>";
	
	$_GET["lang"] = "de";
	$_GET["phone"] = 0;
	$_GET["phoneString"] = "";
	
	foreach ($files as $key => $craps) {
		
		$craps = explode(".", $craps);
		
		echo "$key: ".$craps[0]."-".$craps[1]."<br>";
		
		if($craps[1] != "php" || $craps[0] == "createHTML")
			continue;
		
		ob_start(function($b) {
			global $craps;
			file_put_contents($craps[0].".html", $b);
		});
		$_GET["page"] = $craps[0];
		
		include($craps[0].".php");
		
		ob_end_flush();
	}
?>