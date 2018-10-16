var socket;

// ================ PRELOAD
function preload()
{
	bugmanPreload();
}


// ================ SETUP
function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect(hostname + ":" + port);

	bugmanSetup();
}

// ================ DRAW
function draw()
{
	bugmanDraw();

	// Send data every now and then
	if (frameCount % 10 == 0)
	{
		socket.emit('drone', {
			param0:  int(bugman)
		});
		
	}
}


// ================ INTERFACES
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	bugmanResized();
	background(0);
}
