var socket;


// ================ SETUP
function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect("http://localhost:3000");

	bsodSetup();
}


// ================ DRAW
function draw()
{
	bsodDraw();
}