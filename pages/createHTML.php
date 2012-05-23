<script>
	var state = 1;
	if(location.search)
		state = (String(location.search).split("?")[1]).split("=")[1]*1+1;
	
	if(state<4)
		location.search = "renderState="+state;
</script>
<?php
	
	error_reporting(E_ALL);
	
	$dir = dirname(__FILE__);
	
	function renderWith($pLang, $pPhone) {
		
		global $_GET;
		global $dir;
		
		$files = scandir($dir);
		
		$_GET["lang"] = $pLang;
		$_GET["phone"] = $pPhone;
		$_GET["phoneString"] = $pPhone?"Mobile":"";
		
		
		$pFolder = $pPhone?"mobile":"tablet";
		
		foreach ($files as $key => $craps) {
			
			
			$craps = explode(".", $craps);
			
			if(!isset($craps[1]) || $craps[1] != "php" || $craps[0] == "createHTML")
				continue;
			
			ob_start();
			$_GET["page"] = $craps[0];
			
			include($craps[0].".php");
			
			file_put_contents("$pFolder/$pLang/".$craps[0].".html", ob_get_clean());
			
			echo "$pFolder/$pLang/".$craps[0].".html<br>";
		}
		
		echo "<h2>Render for $pFolder in $pLang completed!</h2>";
		
	}
	
	if($_GET["renderState"] == 0)
		renderWith("de", 0);
	if($_GET["renderState"] == 1)
		renderWith("de", 1);
	if($_GET["renderState"] == 2)
		renderWith("en", 0);
	if($_GET["renderState"] == 3)
		renderWith("en", 1);
?>