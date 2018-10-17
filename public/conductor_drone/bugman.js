var posX = 100;
var posY = 100;
let errEasing = 0.05;
let easing = 0.01;

let errText = 'This program is not responding\n\nTo return to Windows and check the status of the\nprogram, click Cancel\n\nIf you choose to end the program immediately, you will lose\nany unsaved data. To end the program now, click End\nNow.';

let errors = [];
let nErrors = 10;

var bgImg;

var bugman = nErrors;

function bugmanPreload() {
	
}

function bugmanSetup() {
	bgImg = loadImage("conductor_drone/background.jpg");

	for (var i=0; i<nErrors; i++) {
		errors.push(new WinErr());
	}

	textAlign(LEFT, TOP);
}

function bugmanDraw()
{
	background(bgImg);

	let dx = mouseX - posX;
	posX += dx * errEasing;

	let dy = mouseY - posY;
	posY += dy * errEasing;



	if (frameCount % 30 === 0) {
		if (random(100) > 80)
			errors.push(new WinErr());

		if (errors.length > nErrors)
			errors.shift();

	}

	for (var i=0; i<errors.length; i++) {
		errors[i].display();
	}

	let deltaBugman = errors.length - bugman;
	bugman += deltaBugman * easing;

	textSize(32);
	noStroke();
	fill(0);
	text('CPU ' + int(100 * (bugman / nErrors)) + '%', 10, 10);
}

function bugmanResized() {
}

function WinErr() {
	this.x = int(posX);
	this.y = int(posY);

	this.xSize = 400;
	this.ySize = 250;

	if (this.x > windowWidth - this.xSize)
		this.x = windowWidth - this.xSize;

	if (this.y > windowHeight - this.ySize)
		this.y = windowHeight - this.ySize;

	this.display = function() {
		// Window
		stroke(0, 0, 255);
		strokeWeight(2);
		fill(226, 224, 208);
		rect(this.x, this.y, this.xSize, this.ySize, 3);

		// Blue bar
		fill(0, 0, 220)
		rect(this.x, this.y, this.xSize, 30, 3);

		// Text
		noStroke();
		fill(255);
		textSize(16);
		text('End Program - Internet Explorer', this.x+5, this.y+10);

		// Error text
		fill(0);
		textSize(12);
		text(errText, this.x+20, this.y+50);

		// Red X
		fill(200, 50, 50);
		stroke(255);
		strokeWeight(1);
		rect(this.x+this.xSize-28, this.y+2, 26, 26, 3);
		fill(255);
		textSize(18);
		text('X',this.x+this.xSize-21, this.y+8)

		// Buttons
		stroke(0);
		strokeWeight(1);
		fill(226, 224, 208);
		rect(this.x+this.xSize-100, this.y+this.ySize-45, 80, 25);	// Cancel
		rect(this.x+this.xSize-190, this.y+this.ySize-45, 80, 25);	// End Now

		// Buttontext
		noStroke();
		fill(0);
		textSize(12);
		text('Cancel', 	this.x+this.xSize-100+20, this.y+this.ySize-37);
		text('End Now', this.x+this.xSize-190+13, this.y+this.ySize-37);

	};

	this.check = function(removeID) {
		// Red X
		this.redX = this.x+this.xSize-28;
		this.redY = this.y+2;

		if (mouseX > this.redX && mouseX <= this.redX+26 && mouseY > this.redY && mouseY <= this.redY+26) {
			errors.splice(removeID, 1);
			print('X');
		}

		// Cancel
		this.cancelX = this.x+this.xSize-100+20;
		this.cancelY = this.y+this.ySize-37;
		if (mouseX > this.cancelX && mouseX <= this.cancelX+80 && mouseY > this.cancelY && mouseY <= this.cancelY+25) {
			errors.splice(removeID, 1);
			print('Cancel');
		}

		// End now
		this.endX = this.x+this.xSize-190
		this.endY = this.y+this.ySize-45;
		if (mouseX > this.endX && mouseX <= this.endX+80 && mouseY > this.endY && mouseY <= this.endY+25) {
			while(errors.length < 10) {
				posX = random(windowWidth);
				posY = random(windowHeight);
				errors.push(new WinErr());
				print(mouseX+' '+mouseY);
			}
			print('End Now');
		}
	}
}

function mouseClicked() {

	for (var i=0; i<errors.length; i++) {
		errors[i].check(i);
	}
}