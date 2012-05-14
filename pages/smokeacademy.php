<?php header('Content-Type: text/html; charset=UTF-8');?>
<div id="topNav">smokeacademy</div>
<?php if($_GET['phone'])
echo "<div id='smoke'><div>"; ?>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo  $_GET['phoneString']; ?>/pages/smokeTitle.png" alt="" id="title">

<img src="images/pages/smokeHeft.png" name="linkPDF" alt="smokeacademy" id="heft">
<div id="text">
<?php switch($_GET['lang']) {
	case "de": ?>
		Wir m&ouml;chten unseren Kunden nicht nur besonders leistungsf&auml;hige Anlagen und technisch ausgereifte und innovative Technik liefern. Wir m&ouml;chten Sie auch darin unterst&uuml;tzen, Ihre Mitarbeiter zu qualifizieren. Deshalb bieten wir Ihnen einen neuen Service an:<br>
		Die SMOKEacademy. Unser Angebot f&uuml;r Sie: Wir schulen Ihre Mitarbeiter, wir vermitteln unser Know-how und unsere Kompetenzen. 
<?php		break;
	case "en": ?>
		In addition to providing our customers with particularly powerful systems and sophisticated and innovative technology, we also want to support them in training their employees. That's why we are now offering a new service: the SMOKEacademy. Here, we'll train your employees and pass on our know-how and expertise to them.
<?php		break;
} ?>
<br><br>
<div class="ansprechpartner"><?php echo $_GET['lang']=="de"?"Ihr Ansprechpartner":"Your Contact"; ?></div>
Andr&eacute; Budesheim<br>
+49(0)54259500<br>
<a href="mailto:smokeacademy@schroeter-technologie.de">smokeacademy@schroeter-technologie.de</a></div>
<div id="options">
	<img src="images<?php echo  $_GET['phoneString']; ?>/<?php echo  $_GET['lang']; ?>/<?php echo  ($_GET['phone']?"smoke/":""); ?>view.png" name="linkPDF" alt="smokeacademy" <?php echo  ($_GET['phone']?'noMove="1"':""); ?>><?php echo  ($_GET['phone']?"<br>":""); ?>
	<img src="images<?php echo  $_GET['phoneString']; ?>/pages/<?php echo  ($_GET['phone']?"smoke/":""); ?>mail.png" name="linkMail" alt="smokeacademy@schroeter-technologie.de" <?php echo  ($_GET['phone']?'noMove="1"':""); ?>>
	<?php if($_GET['phone']): ?>
	<img src="images<?php echo  $_GET['phoneString']; ?>/pages/<?php echo  ($_GET['phone']?"smoke/":""); ?>phone.png" name="linkPhone" alt="" noMove="1">
	<?php endif; ?>
</div>
<?php if($_GET['phone'])
echo "</div></div>"; ?>
MENU:
<?php $active="smokeacademy";include "defaultSub.php"; ?>