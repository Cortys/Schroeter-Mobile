/*************************************************
All the used Frameworks are bundled in this file:
- cssAnimate (Clemens Damke)
- zFlow (Charles Ying)
*************************************************/

/**************************************\
 *  cssAnimate 1.1.6 for jQuery       *
 *  (c) 2012 - Clemens Damke          *
 *  Licensed under MIT License        *
 *  Works with jQuery >=1.4.3         *
\**************************************/
(function(a){var b=["Webkit","Moz","O","Ms","Khtml",""];var c=["borderRadius","boxShadow","userSelect","transformOrigin","transformStyle","transition","transitionDuration","transitionProperty","transitionTimingFunction","backgroundOrigin","backgroundSize","animation","filter","zoom","columns","perspective","perspectiveOrigin","appearance"];a.fn.cssSetQueue=function(b,c){v=this;var d=v.data("cssQueue")?v.data("cssQueue"):[];var e=v.data("cssCall")?v.data("cssCall"):[];var f=0;var g={};a.each(c,function(a,b){g[a]=b});while(1){if(!e[f]){e[f]=g.complete;break}f++}g.complete=f;d.push([b,g]);v.data({cssQueue:d,cssRunning:true,cssCall:e})};a.fn.cssRunQueue=function(){v=this;var a=v.data("cssQueue")?v.data("cssQueue"):[];if(a[0])v.cssEngine(a[0][0],a[0][1]);else v.data("cssRunning",false);a.shift();v.data("cssQueue",a)};a.cssMerge=function(b,c,d){a.each(c,function(c,e){a.each(d,function(a,d){b[d+c]=e})});return b};a.fn.cssAnimationData=function(a,b){var c=this;var d=c.data("cssAnimations");if(!d)d={};if(!d[a])d[a]=[];d[a].push(b);c.data("cssAnimations",d);return d[a]};a.fn.cssAnimationRemove=function(){var b=this;var c=b.data("cssAnimations");var d=b.data("identity");a.each(c,function(a,b){c[a]=b.splice(d+1,1)});b.data("cssAnimations",c)};a.css3D=function(c){a("body").data("cssPerspective",isFinite(c)?c:c?1e3:0).cssOriginal(a.cssMerge({},{TransformStyle:c?"preserve-3d":"flat"},b))};a.cssPropertySupporter=function(d){a.each(c,function(c,e){if(d[e])a.each(b,function(a,b){var c=e.substr(0,1);d[b+c[b?"toUpperCase":"toLowerCase"]()+e.substr(1)]=d[e]})});return d};a.cssAnimateSupport=function(){var c=false;a.each(b,function(a,b){c=document.body.style[b+"AnimationName"]!==undefined?true:c});return c};a.fn.cssEngine=function(c,d){function f(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()}var e=this;var e=this;if(typeof d.complete=="number")e.data("cssCallIndex",d.complete);var g={linear:"linear",swing:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out"};var h={};var i=a("body").data("cssPerspective");if(c.transform)a.each(b,function(a,b){var d=b+(b?"T":"t")+"ransform";var g=e.cssOriginal(f(d));var j=c.transform;if(!g||g=="none")h[d]="scale(1)";c[d]=(i&&!/perspective/gi.test(j)?"perspective("+i+") ":"")+j});c=a.cssPropertySupporter(c);var j=[];a.each(c,function(a,b){j.push(f(a))});var k=false;var l=[];var m=[];for(var n=0;n<j.length;n++){l.push(String(d.duration/1e3)+"s");var o=g[d.easing];m.push(o?o:d.easing)}l=e.cssAnimationData("dur",l.join(", ")).join(", ");m=e.cssAnimationData("eas",m.join(", ")).join(", ");var p=e.cssAnimationData("prop",j.join(", "));e.data("identity",p.length-1);p=p.join(", ");var q={TransitionDuration:l,TransitionProperty:p,TransitionTimingFunction:m};var r={};r=a.cssMerge(r,q,b);var s=c;a.extend(r,c);if(r.display=="callbackHide")k=true;else if(r.display)h["display"]=r.display;e.cssOriginal(h);setTimeout(function(){e.cssOriginal(r);var b=e.data("runningCSS");b=!b?s:a.extend(b,s);e.data("runningCSS",b);setTimeout(function(){e.data("cssCallIndex","a");if(k)e.cssOriginal("display","none");e.cssAnimationRemove();if(d.queue)e.cssRunQueue();if(typeof d.complete=="number"){e.data("cssCall")[d.complete].call(e);e.data("cssCall")[d.complete]=0}else d.complete.call(e)},d.duration)},0)};a.str2Speed=function(a){return isNaN(a)?a=="slow"?1e3:a=="fast"?200:600:a};a.fn.cssAnimate=function(b,c,d,e){var f=this;var g={duration:0,easing:"swing",complete:function(){},queue:true};var h={};h=typeof c=="object"?c:{duration:c};h[d?typeof d=="function"?"complete":"easing":0]=d;h[e?"complete":0]=e;h.duration=a.str2Speed(h.duration);a.extend(g,h);if(a.cssAnimateSupport()){f.each(function(c,d){d=a(d);if(g.queue){var e=!d.data("cssRunning");d.cssSetQueue(b,g);if(e)d.cssRunQueue()}else d.cssEngine(b,g)})}else f.animate(b,g);return f};a.cssPresetOptGen=function(a,b){var c={};c[a?typeof a=="function"?"complete":"easing":0]=a;c[b?"complete":0]=b;return c};a.fn.cssFadeTo=function(b,c,d,e){var f=this;opt=a.cssPresetOptGen(d,e);var g={opacity:c};opt.duration=b;if(a.cssAnimateSupport()){f.each(function(b,d){d=a(d);if(d.data("displayOriginal")!=d.cssOriginal("display")&&d.cssOriginal("display")!="none")d.data("displayOriginal",d.cssOriginal("display")?d.cssOriginal("display"):"block");else d.data("displayOriginal","block");g.display=c?d.data("displayOriginal"):"callbackHide";d.cssAnimate(g,opt)})}else f.fadeTo(b,opt);return f};a.fn.cssFadeOut=function(b,c,d){if(a.cssAnimateSupport()){if(!this.cssOriginal("opacity"))this.cssOriginal("opacity",1);this.cssFadeTo(b,0,c,d)}else this.fadeOut(b,c,d);return this};a.fn.cssFadeIn=function(b,c,d){if(a.cssAnimateSupport()){if(this.cssOriginal("opacity"))this.cssOriginal("opacity",0);this.cssFadeTo(b,1,c,d)}else this.fadeIn(b,c,d);return this};a.cssPx2Int=function(a){return a.split("p")[0]*1};a.fn.cssStop=function(){var c=this,d=0;c.data("cssAnimations",false).each(function(f,g){g=a(g);var h={TransitionDuration:"0s"};var i=g.data("runningCSS");var j={};if(i)a.each(i,function(b,c){c=isFinite(a.cssPx2Int(c))?a.cssPx2Int(c):c;var d=[0,1];var e={color:["#000","#fff"],background:["#000","#fff"],"float":["none","left"],clear:["none","left"],border:["none","0px solid #fff"],position:["absolute","relative"],family:["Arial","Helvetica"],display:["none","block"],visibility:["hidden","visible"],transform:["translate(0,0)","scale(1)"]};a.each(e,function(a,c){if((new RegExp(a,"gi")).test(b))d=c});j[b]=d[0]!=c?d[0]:d[1]});else i={};h=a.cssMerge(j,h,b);g.cssOriginal(h);setTimeout(function(){var b=a(c[d]);b.cssOriginal(i).data({runningCSS:{},cssAnimations:{},cssQueue:[],cssRunning:false});if(typeof b.data("cssCallIndex")=="number")b.data("cssCall")[b.data("cssCallIndex")].call(b);b.data("cssCall",[]);d++},0)});return c};a.fn.cssDelay=function(a){return this.cssAnimate({},a)};a.fn.cssOriginal=a.fn.css;a.fn.css=function(c,d){var e=this,f={};if(typeof c=="string")if(d)f[a.camelCase(c)]=d;else return e.cssOriginal(c);else f=c;if(!f.transitionDuration)f.transitionDuration="0s";f=a.cssPropertySupporter(f);var g=a("body").data("cssPerspective");if(f.transform)a.each(b,function(a,b){var c=b+(b?"T":"t")+"ransform";var d=f.transform;f[c]=(g&&!/perspective/gi.test(d)?"perspective("+g+") ":"")+d});var h=e.cssOriginal("transition-duration");e.cssOriginal(f);setTimeout(function(){e.cssOriginal("transition-duration",h)},0);return e}})(jQuery)

/*******************************************************************************************
Modified version of zFlow by Clemens Damke. Added by me:
	- Android support
	- Speed improvements
	- Bug fixes
	- UI changes and improvements
	- "activeCover" var to check the active cover
	- right area of display (swipe) disabled (for ui elements laying over the coverflow)
	- Full Chrome & Safari support
	- Half Firefox support. With some bugs...
	- More cover switching possibilities on Desktop-PCs
*******************************************************************************************/
var activeCover=0;(function(){function b(a,b){for(var c in b){a[c]=b[c]}}function c(a,b,c){a.style.width=b.toString()+"px";a.style.height=c.toString()+"px"}function d(a,b,c){a.style.left=Math.round(b).toString()+"px";a.style.top=Math.round(c).toString()+"px"}function o(a,b,c,d){d.width=b;d.height=c/2;var e=d.getContext("2d");e.save();e.translate(0,c-1);e.scale(1,-1);e.drawImage(a,0,0,b,c);e.restore();e.globalCompositeOperation="destination-out";var f=e.createLinearGradient(0,0,0,c/4);f.addColorStop(1,"rgba(255, 255, 255, 1.0)");f.addColorStop(0,"rgba(255, 255, 255, 0.5)");e.fillStyle=f;e.fillRect(0,0,b,c/2)}var a=this;TrayController=function(){return this};TrayController.prototype.init=function(a){this.currentX=0;this.elem=a};TrayController.prototype.touchstart=function(a){var b=window.innerWidth-a.touches[0].pageX;if(b>PHONE*170){this.startX=a.touches[0].pageX-this.currentX;this.touchMoved=false;window.addEventListener("touchmove",this,true);window.addEventListener("touchend",this,true);this.elem.style.webkitTransitionDuration="0s";this.elem.style.mozTransitionDuration="0s";this.elem.style.transitionDuration="0s"}};TrayController.prototype.touchmove=function(a){this.touchMoved=true;this.lastX=this.currentX;this.lastMoveTime=new Date;this.currentX=event.touches[0].pageX-this.startX;this.delegate.update(this.currentX)};TrayController.prototype.touchend=function(a){window.removeEventListener("touchmove",this,true);window.removeEventListener("touchend",this,true);this.elem.style.webkitTransitionDuration="0.4s";this.elem.style.mozTransitionDuration="0.4s";this.elem.style.transitionDuration="0.4s";if(this.touchMoved){var b=this.currentX-this.lastX;var c=new Date-this.lastMoveTime+1;this.currentX=this.currentX+b*200/c;this.delegate.updateTouchEnd(this)}fileName=$(activeCover).children("img").attr("src").split("/");fileName=fileName[fileName.length-1].split(".")[0];coverActiveRefresh(fileName)};TrayController.prototype.handleEvent=function(a){this[a.type](a);a.preventDefault()};var e=450;var f=e/3;var g=50;var h=f/2;var i=0;var j=e/5;var k=-500;var l="rotateY("+ -g+"deg)";var m="rotateY("+g+"deg)";var n=/android/gi.test(navigator.appVersion);if(n){f=e/2;l="rotateY(0deg)";m="rotateY(0deg)"}FlowDelegate=function(){this.cells=new Array;this.transforms=new Array};FlowDelegate.prototype.init=function(a){this.elem=a};FlowDelegate.prototype.updateTouchEnd=function(a){this.lastFocus=undefined;var b=this.getFocusedCell(a.currentX);a.currentX=-b*f;this.update(a.currentX)};FlowDelegate.prototype.getFocusedCell=function(a){var b=-Math.round(a/f);return Math.min(Math.max(b,0),this.cells.length-1)};FlowDelegate.prototype.transformForCell=function(a,b,c){var d=b*f;var e=d+c;if(e<h&&e>=-h){activeCover=a;return["translate3d("+d+"px, 0, 0)",2]}else if(e>0){return["translate3d("+(d+j)+"px, 0, "+k+"px) "+l,0]}else{return["translate3d("+(d-j)+"px, 0, "+k+"px) "+m,0]}};FlowDelegate.prototype.setTransformForCell=function(a,b,c){var d=c[1];c=c[0];if(this.transforms[b]!=c){a.style.webkitTransform=c;a.style.mozTransform=c;a.style.transform=c;if(n||!iTD())a.style.zIndex=d;this.transforms[b]=c}};FlowDelegate.prototype.update=function(a){this.elem.style.webkitTransform="translate("+a+"px, 0)";this.elem.style.mozTransform="translate("+a+"px, 0)";this.elem.style.transform="translate("+a+"px, 0)";for(var b in this.cells){var c=this.cells[b];this.setTransformForCell(c,b,this.transformForCell(c,b,a));b+=1}};a.zflow=function(a,g){var h=new TrayController;var i=new FlowDelegate;var j=document.querySelector(g);h.init(j);i.init(j);h.delegate=i;var k=a.length;var l={top:Math.round(-e*.65)+"px",left:Math.round(-e/2)+"px",width:e+"px",height:Math.round(e*1.5)+"px",opacity:0};a.forEach(function(a,g){var m=document.createElement("div");var n=document.createElement("img");var p=document.createElement("canvas");m.className="cell";m.appendChild(n);m.appendChild(p);i.setTransformForCell(m,i.cells.length,i.transformForCell(m,i.cells.length,h.currentX));i.cells.push(m);j.appendChild(m);n.onload=function(){k-=1;var a=n.width;var g=n.height;var j=Math.min(e/g,e/a);a*=j;g*=j;c(n,a,g);b(m.style,l);d(n,(e-a)/2,e-g);d(p,(e-a)/2,e);o(n,a,g,p);m.style.opacity=1;if(!iTD()){$(m).click(function(a){var b=i.cells.length;h.currentX-=f;if(-b*f>=h.currentX)h.currentX=0;i.updateTouchEnd(h)})}if(k==0){window.setTimeout(function(){window.scrollTo(0,0)},100)}};n.src=a});$("#loadedPage")[0].addEventListener("touchstart",h,false);if(!iTD())$("#options").css({background:"none",width:"170px"});window.onkeydown=function(a){if(a.keyCode==37){h.currentX+=f;i.updateTouchEnd(h)}else if(a.keyCode==39){h.currentX-=f;i.updateTouchEnd(h)}fileName=$(activeCover).children("img").attr("src").split("/");fileName=fileName[fileName.length-1].split(".")[0];coverActiveRefresh(fileName)}}})()