<script type="text/javascript">
	function sideRefresh(el) {
		el.css({ fontWeight:"bold" }).siblings().css({ fontWeight:"normal" });
		$("#ergArea").html(el.attr("info"));
	}
</script>
<div id="topNav">unternehmen</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo $_GET['phoneString']; ?>/<?php echo $_GET['lang']; ?>/interTitle.png" alt="" id="title">

<div id="searchBox">
	<input type="text" id="searchField" value="<?php echo $_GET['lang']=="de"?"Land":"Country"; ?>">
	<img src="images/static/closer.png" alt="">
</div>

<div id="selectWheel">
	<img src="images/<?php echo $_GET['lang']; ?>/interWheel.png" alt="L&auml;nder">
	<div id="shadow"></div>
	<div id="active"></div>
	<div id="area">
		<ul>
			<li class="emptyLi"></li><?php echo $_GET['phone']?'':'<li class="emptyLi">'; ?>
			<?php
				$csv = file_get_contents("../tables/".$_GET['lang']."/international.csv");
				$table = explode("\n", $csv);
				//sort($table);
				
				foreach($table as $key => $value) {
					$value = explode("|", htmlentities($value, ENT_QUOTES, "UTF-8", false));
					$name = $value[0];
					$cont = $value[1];
					$value[0] = "";
					$value[1] = "";
					$info = "";
					foreach($value as $i => $v) {
						switch($i) {
							case 2:
								$new = "<span>$v</span><br>";
								break;
							case 3:
								$new = "$v".($_GET['phone']?"":"");
								break;
							case 6:
								$new = "$v<br>";
								break;							
							case 7: // tele
								if($v != "")
									$new = "<span class=\"typ\">Tel.</span><div class=\"tele_space\">&nbsp;</div>$v";
								else 
									$new = "";
								break;							
							case 8: // fax
								if($v != "")
									$new = "<span class=\"typ\">Fax</span><div class=\"fax_space\">&nbsp;</div>$v";
								else 
									$new = "";
								break;
							case 9: // mobile
								if($v != "")
									$new = "<span class=\"typ\">Mobil</span><div class=\"mobil_space\">&nbsp;</div>$v";
								else 
									$new = "";
								break;
							case 10: // email
								if($v != "") {
									$v = str_replace('@', '<br><div class="email_space">&nbsp;</div>@', $v);
									$new = "<span  class=\"typ\">E-Mail</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".($_GET['phone']?"&nbsp;":"").$v."<br>";
								} else {
									$new = "";
								}
								break;
							default:
								$new = $v;
								break;
						}
						$info .= $new;
						if($v)
							$info .= "<br>";
					}
					if($value[10])
						$info .= "<img src=\"images".$_GET['phoneString']."/pages/mail.png\" name=\"linkMail\" alt=\"".$value[10]."\" class=\"sendMail\">";
					echo "<li info='$info' filter='$cont'>$name</li>";
				}
			?>
			<li class="emptyLi"></li><?php echo $_GET['phone']?'':'<li class="emptyLi">'; ?>
		</ul>
	</div>
</div>

<div id="wheelFilter">
<?php
	$filter = array("Asien", "Afrika", "Nordamerika", "Suedamerika", "Europa", "Australien");
	foreach($filter as $key => $value) {
		echo "<img src='images".$_GET['phoneString']."/".$_GET['lang']."/interFilter/$value.png' alt='$value' class='filtered'><br>";
	}
?>
</div>
<?php if($_GET['phone']): ?><div id="overlay"></div><?php endif; ?>
<div id="wheelErg" class="large">
	<div id="ergArea"></div>
	<?php if($_GET['phone']): ?><img src="images/static/closer.png" id="ergClose"><?php endif; ?>
</div>

MENU:
<?php $active="unternehmen";include "defaultSub.php"; ?>