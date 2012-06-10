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
var activeCover = 0;
(function () {

var global = this;

function utils_extend(obj, dict)
{
    for (var key in dict)
    {
        obj[key] = dict[key];
    }
}

function utils_setsize(elem, w, h)
{
    elem.style.width = w.toString() + "px";
    elem.style.height = h.toString() + "px";
}

function utils_setxy(elem, x, y)
{
    elem.style.left = Math.round(x).toString() + "px";
    elem.style.top = Math.round(y).toString() + "px";
}

/*
    TrayController is a horizontal touch event controller that tracks cumulative offsets and passes events to a delegate. 
*/

TrayController = function ()
{
    return this;
}

TrayController.prototype.init = function (elem)
{
    this.currentX = 0;
    this.elem = elem;
}

TrayController.prototype.touchstart = function (event)
{
	var abstand = window.innerWidth-event.touches[0].pageX;
	if(abstand > PHONE*170) {
		this.startX = event.touches[0].pageX - this.currentX;
		this.touchMoved = false;

		window.addEventListener("touchmove", this, true);
		window.addEventListener("touchend", this, true);

		this.elem.style.webkitTransitionDuration = "0s";
		this.elem.style.mozTransitionDuration = "0s";
		this.elem.style.transitionDuration = "0s";
	}
}

TrayController.prototype.touchmove = function (e)
{
    this.touchMoved = true;
    this.lastX = this.currentX;
    this.lastMoveTime = new Date();
    this.currentX = event.touches[0].pageX - this.startX;
    this.delegate.update(this.currentX);
}

TrayController.prototype.touchend = function (e)
{
    window.removeEventListener("touchmove", this, true);
    window.removeEventListener("touchend", this, true);

    this.elem.style.webkitTransitionDuration = "0.4s";
	this.elem.style.mozTransitionDuration = "0.4s";
	this.elem.style.transitionDuration = "0.4s";
	
    if (this.touchMoved)
    {
        /* Approximate some inertia -- the transition function takes care of the decay over 0.4s for us, but we need to amplify the last movement */
        var delta = this.currentX - this.lastX;
        var dt = (new Date()) - this.lastMoveTime + 1;
        /* dx * 400 / dt */

        this.currentX = this.currentX + delta * 200 / dt;
        this.delegate.updateTouchEnd(this);
    }
    /*else
    {
        this.delegate.clicked(this.currentX);
    }*/
	fileName = $(activeCover).children("img").attr("src").split("/");
	fileName = fileName[fileName.length-1].split(".")[0];
	coverActiveRefresh(fileName);
}

TrayController.prototype.handleEvent = function (event)
{
    this[event.type](event);
    event.preventDefault();
}

/*
    These variables define how the zflow presentation is made.
*/

var CSIZE = 450;
var CGAP = CSIZE / 3;

var FLOW_ANGLE = 50;
var FLOW_THRESHOLD = CGAP / 2;
var FLOW_ZFOCUS = 0;
var FLOW_XGAP = CSIZE / 5;
var FLOW_OUT = -500;

var T_NEG_ANGLE = "rotateY(" + (- FLOW_ANGLE) + "deg)";
var T_ANGLE = "rotateY(" + FLOW_ANGLE + "deg)";
var showType = (/android/gi).test(navigator.appVersion);

if(showType) {
	CGAP = CSIZE/2;
	T_NEG_ANGLE = "rotateY(0deg)";
	T_ANGLE = "rotateY(0deg)";
}

FlowDelegate = function ()
{
    this.cells = new Array();
    this.transforms = new Array();
}

FlowDelegate.prototype.init = function (elem)
{
    this.elem = elem;
}

FlowDelegate.prototype.updateTouchEnd = function (controller)
{
    this.lastFocus = undefined;
    // Snap to nearest position
    var i = this.getFocusedCell(controller.currentX);
    controller.currentX = - i * CGAP;
    this.update(controller.currentX);
}

FlowDelegate.prototype.getFocusedCell = function (currentX)
{
    // Snap to nearest position
    var i = - Math.round(currentX / CGAP);

    // Clamp to cells array boundary
    return Math.min(Math.max(i, 0), this.cells.length - 1);
}

FlowDelegate.prototype.transformForCell = function (cell, i, offset)
{
    /* 
        This function needs to be fast, so we avoid function calls, divides, Math.round,
        and precalculate any invariants we can.
    */
    var x = (i * CGAP);
    var ix = x + offset;

    if ((ix < FLOW_THRESHOLD) && (ix >= -FLOW_THRESHOLD))
    {
        // yangle = 0, zpos = FLOW_ZFOCUS
		activeCover = cell;
        return ["translate3d(" + x + "px, 0, 0)", 2];
    }
    else if (ix > 0)
    {
        // yangle = -FLOW_ANGLE, x + FLOW_XGAP
        return ["translate3d(" + (x + FLOW_XGAP) + "px, 0, "+FLOW_OUT+"px) " + T_NEG_ANGLE, 0];
    }
    else
    {
        // yangle = FLOW_ANGLE, x - FLOW_XGAP
        return ["translate3d(" + (x - FLOW_XGAP) + "px, 0, "+FLOW_OUT+"px) " + T_ANGLE, 0];
    }
}

FlowDelegate.prototype.setTransformForCell = function (cell, i, transform)
{
	var zi = transform[1];
	transform = transform[0];
    if (this.transforms[i] != transform)
    {
        cell.style.webkitTransform = transform;
		cell.style.mozTransform = transform;
		cell.style.transform = transform;
		if(showType||!iTD()) cell.style.zIndex = zi;
        this.transforms[i] = transform;
    }
}

FlowDelegate.prototype.update = function (currentX)
{
    this.elem.style.webkitTransform = "translate(" + (currentX) + "px, 0)";
	this.elem.style.mozTransform = "translate(" + (currentX) + "px, 0)";
	this.elem.style.transform = "translate(" + (currentX) + "px, 0)";

    /*
        It would be nice if we only updated dirty cells... for now, we use a cache
    */
    for (var i in this.cells)
    {
        var cell = this.cells[i];
        this.setTransformForCell(cell, i, this.transformForCell(cell, i, currentX));
        i += 1;
    }
}

global.zflow = function (images, selector)
{
    var controller = new TrayController();
    var delegate = new FlowDelegate();
    var tray = document.querySelector(selector);
    controller.init(tray);
    delegate.init(tray);

    controller.delegate = delegate;

    var imagesLeft = images.length;
    
    var cellCSS = {
        top: Math.round(-CSIZE * 0.65) + "px",
        left: Math.round(-CSIZE / 2) + "px",
        width: CSIZE + "px",
        height: Math.round(CSIZE * 1.5) + "px",
        opacity: 0,
    }
	
    images.forEach(function (url, i)
    {
        var cell = document.createElement("div");
        var image = document.createElement("img");
        var canvas = document.createElement("canvas");

        cell.className = "cell";
        cell.appendChild(image);
        cell.appendChild(canvas);
		
		delegate.setTransformForCell(cell, delegate.cells.length, delegate.transformForCell(cell, delegate.cells.length, controller.currentX));
		delegate.cells.push(cell);
		// Start at 0 opacity
		tray.appendChild(cell);
		
        image.onload = function () {
            imagesLeft -= 1;

            var iwidth = image.width;
            var iheight = image.height;
            
            var ratio = Math.min(CSIZE / iheight, CSIZE / iwidth);
            
            iwidth *= ratio;
            iheight *= ratio;

            utils_setsize(image, iwidth, iheight);

            utils_extend(cell.style, cellCSS);

            utils_setxy(image, (CSIZE - iwidth) / 2, CSIZE - iheight);
            utils_setxy(canvas, (CSIZE - iwidth) / 2, CSIZE);

            reflect(image, iwidth, iheight, canvas);
			
			// Set to 1 to fade element in.
			cell.style.opacity = 1.0;
			
			if(!iTD()) {
				$(cell).click(function(e) {
					var l = delegate.cells.length;
					controller.currentX -= CGAP;
					if(-l*CGAP >= controller.currentX)
						controller.currentX = 0;
					delegate.updateTouchEnd(controller);
				});
			}

            if (imagesLeft == 0)
            {
                window.setTimeout( function() { window.scrollTo(0, 0); }, 100 );
            }
        };
		image.src = url;
    });

    $("#loadedPage")[0].addEventListener('touchstart', controller, false);
	if(!iTD())
		$("#options").css({ background:"none", width:"170px" });

	/* Limited keyboard support for now */
	window.onkeydown = function (e) {
		if (e.keyCode == 37)
		{
			/* Left Arrow */
			controller.currentX += CGAP;
			delegate.updateTouchEnd(controller);
		}
		else if (e.keyCode == 39)
		{
			/* Right Arrow */
			controller.currentX -= CGAP;
			delegate.updateTouchEnd(controller);
		}
		fileName = $(activeCover).children("img").attr("src").split("/");
		fileName = fileName[fileName.length-1].split(".")[0];
		coverActiveRefresh(fileName);
	};
}

function reflect(image, iwidth, iheight, canvas)
{
    canvas.width = iwidth;
    canvas.height = iheight / 2;

    var ctx = canvas.getContext("2d");

    ctx.save();

    ctx.translate(0, iheight - 1);
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, 0, iwidth, iheight);

    ctx.restore();

    ctx.globalCompositeOperation = "destination-out";

    var gradient = ctx.createLinearGradient(0, 0, 0, iheight / 4);
    gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, iwidth, iheight / 2);
}

})();