<?php header('Content-Type: text/html; charset=UTF-8');?>
<div id="topNav">information</div>
<img src="images/static/logo.png" alt="" id="logo">
<img src="images<?php echo  $_GET['phoneString']; ?>/<?php echo  $_GET['lang']; ?>/infoTitle.png" alt="" id="title">
<div id="version">Version 1.0</div>
<div id="info">
<b>Schr&ouml;ter Technologie GmbH &amp; Co. KG</b><br>
Bahnhofstra&szlig;e 86<br>
33829 Borgholzhausen, Deutschland<br>
<br>
Tel. +49 (0) 54 25.95 00<br>
Fax +49 (0) 54 25.18 28<br>
<br>
<span name="linkMail" alt="info@schroeter-technologie.de">info@schroeter-technologie.de</span><br>
<span name="linkWeb" alt="http://www.schroeter-technologie.de">www.schroeter-technologie.de</span><br>
<?php if(!$_GET['phone']): ?>
<br>
<br>
<b><?php echo  $_GET['lang']=="de"?"KONZEPTION UND GESTALTUNG":"CONCEPT AND LAYOUT"; ?></b><br>
STEUER Marketing und Kommunikation GmbH, Bielefeld<br>
<span name="linkWeb" alt="http://www.agentur-steuer.de">www.agentur-steuer.de</span><br>
<br>
<b><?php echo  $_GET['lang']=="de"?"PROGRAMMIERUNG":"PROGRAMMING"; ?></b><br>
Delta Media GmbH, Paderborn<br>
<span name="linkWeb" alt="http://www.deltamedia.de">www.deltamedia.de</span></div>
<?php endif; ?>
MENU:
<?php $active="info";include "defaultSub.php"; ?>