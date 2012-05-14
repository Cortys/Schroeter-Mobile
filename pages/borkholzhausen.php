<script type="text/javascript">
	function sideRefresh(el) {
		if(el.attr("info")) {
			el.css({ fontWeight:"bold" }).siblings().css({ fontWeight:"normal" });
			var name = (el.children().length>0?el.children(":first"):el).text().split(" ").join("");
			var replaces = { ae:/\ä/g,oe:/\ö/g,ue:/\ü/g,Ae:/\Ä/g,Oe:/\Ö/g,Ue:/\Ü/g,ss:/\ß/g };
			$.each(replaces, function(i,v) {
				name = String(name).replace(v, i);
			});
			$("#ergArea").html(el.attr("info"));
		}
		else
			$("#ergArea").html("");
	}
</script>
<div id="topNav">unternehmen</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo $_GET['phoneString']; ?>/<?php echo $_GET['lang']; ?>/borkholzhausenTitle.png" alt="" id="title">

<div id="searchBox">
	<input type="text" id="searchField" value="Name">
	<img src="images/static/closer.png" alt="">
</div>

<div id="selectWheel">
	<img src="images/<?php echo $_GET['lang']; ?>/borkholzhausenWheel.png" alt="Ansprechpartner">
	<div id="shadow"></div>
	<div id="active"></div>
	<div id="area">
		<ul>
			<li class="emptyLi"></li><?php echo $_GET['phone']?'':'<li class="emptyLi">'; ?>
			<?php
				$csv = file_get_contents("../tables/".$_GET['lang']."/team.csv");
				$table = explode("\n", $csv);
				function nachname($a, $b) {
					$a = explode(" ", $a);
					$b = explode(" ", $b);
					return strcasecmp($a[1], $b[1]);
				}
				//usort($table, "nachname");
				
				foreach($table as $key => $value) {
					$value = explode("|", htmlentities($value, ENT_QUOTES, "UTF-8", false));
					$info = "";
					$part = $value[4];
					$value[4] = "";
					$cat = $value[5];
					$value[5] = "";
					$name = $cat?"<div>".$value[0]."</div><div>$part</div>":$value[0];
					foreach($value as $i => $v) {
						switch($i) {
							case 0:
								$new = "<span>$v</span>";
								break;
							case 1:
								$new = "<div>$v<br>";
								break;
							case 2:
								$new = "<span class=\"typ\">Tel.</span><div class=\"tele_space\">&nbsp;</div>$v";
								break;
							case 3:
								$v = str_replace('@', '<br><div class="email_space">&nbsp;</div>@', $v);
								$new = "<span class=\"typ\">E-Mail</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$v";
								break;
							default:
								$new = $v;
								break;
						}
						$info .= $new;
						if($v)
							$info .= "<br>";
					}
					if($value[3])
						$info .= "<img src=\"images".$_GET['phoneString']."/pages/mail.png\" name=\"linkMail\" alt=\"".$value[3]."\" class=\"sendMail\">";
					 echo "<li info='$info' filter='$cat'>$name</li>";
				}
			?>
			<li class="emptyLi"><?php echo $_GET['phone']?'':'<li class="emptyLi">'; ?>
		</ul>
	</div>
</div>

<div id="wheelFilter">
<?php
	$filter = array("Management", "Project", "Sales", "Service", "Technik");
	foreach($filter as $key => $value) {
		echo "<img src='images".$_GET['phoneString']."/".$_GET['lang']."/borkholzhausenFilter/$value.png' alt='$value' class='filtered'><br>";
	}
?>
</div>
<?php if($_GET['phone']): ?><div id="overlay"></div><?php endif; ?>
<div id="wheelErg">
	<div id="ergArea"></div>
	<?php if($_GET['phone']): ?><img src="images/static/closer.png" id="ergClose"><?php endif; ?>
</div>

MENU:
<?php $active="unternehmen";include "defaultSub.php"; ?>