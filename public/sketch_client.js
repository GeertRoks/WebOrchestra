var socket;

var progress = 0;

var line1 = "Your PC ran into a problem and needs to restart";
var line2 = "We're just collecting some error info, and then we'll restart for you.";

function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect("http://localhost:3000");
}

function draw()
{
	// BSOD
	background(0, 100, 200);

	fill(255);
	textAlign(LEFT, TOP);
	textSize(96);
	text(":(", 100, 200)
	textSize(32);
	text(line1, 100, 350);
	text(line2, 100, 390);
	text(progress + "% complete", 100, 500);

	progress += int(random(0, 2));
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight)
}

function stringGlitch(str)
{
	return str;
}