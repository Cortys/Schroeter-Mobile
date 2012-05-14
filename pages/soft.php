<?php header('Content-Type: text/html; charset=UTF-8');?>
<div id="topNav">software</div>
<?php if($_GET['phone'])
echo "<div id='smoke'><div>"; ?>
<img src="images/static/logo.png" alt="" id="logo"></a>
<img src="images<?php echo  $_GET['phoneString']; ?>/<?php echo  $_GET['lang']; ?>/softTitle.png" alt="" id="title">

<img src="images/pages/softwareIcon.png" alt="" id="softIcon">
<div id="desc">
<?php switch($_GET['lang']) {
	case "de": ?>
		Jetzt können Sie auch von unterwegs Ihre Schröter Anlagensysteme überwachen und steuern. Dies macht die neue App von TeamViewer möglich. Über den Link können Sie sich direkt die TeamViewer App herunterladen und auf Ihrem mobilen Gerät installieren. In der Meeting Point 30 erfahren Sie alles weitere über die technischen Voraussetzungen oder Sie kontaktieren einen Schröter Mitarbeiter.
<?php		break;
	case "en": ?>
		Now you can monitor and control your Schröter systems when you're on the go. This is possible thanks to the new app from TeamViewer. You can use the link provided to directly download the TeamViewer app and install it on your mobile device. Find out more about the technical requirements in Meeting Point 30 or by contacting a Schröter representative.
<?php		break;
} ?>
	<br>
	<br>
	<br>
	<div class="ansprechpartner"><?php echo $_GET['lang']=="de"?"Ihr Ansprechpartner":"Your Contact"; ?></div>
	Thorsten Gerding<br>
	+49 (0) 54 25.95 00<br>
	thorsten.gerding@schroeter-technologie.de
</div>
<div id="func">
<img src="images/pages/download.png" name="linkWeb" alt="<?php echo $_GET['phone']?"http://itunes.apple.com/de/app/teamviewer/id357069581?mt=8&ign-mpt=uo%3D6":"http://itunes.apple.com/de/app/teamviewer-hd/id379424610?mt=8"; ?>" <?php echo  ($_GET['phone']?'noMove="1"':""); ?>><?php echo  ($_GET['phone']?"<br>":""); ?>
<img src="images/pages/mail.png" name="linkMail" alt="thorsten.gerding@schroeter-technologie.de" <?php echo  ($_GET['phone']?'noMove="1"':""); ?>>
</div>
<?php if($_GET['phone'])
echo "</div></div>"; ?>
MENU:
<?php $active="service";include "defaultSub.php"; ?>