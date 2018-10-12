var socket;

// ================ PRELOAD
function preload()
{
	matrixPreload();
}


// ================ SETUP
function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect("http://localhost:3000");

	matrixSetup();
}

// ================ DRAW
function draw()
{
	matrixDraw();
}


// ================ INTERFACES
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}