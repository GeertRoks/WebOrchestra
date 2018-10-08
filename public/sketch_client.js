var socket;

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
	textSize(64);
	text(":(", 100, 200)
	textSize(16);
	text("Oh noes, we have been crashed.", 100, 300)
}

function windowResized()
{
	resizeCanvas(windowWidth, windowHeight)
}