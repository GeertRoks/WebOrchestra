var socket;

// ================ PRELOAD
function preload()
{
	whackPreload();
}


// ================ SETUP
function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect(hostname + ":" + port);

	whackSetup();
}

// ================ DRAW
function draw()
{
	whackDraw();

	// Send data every now and then
	if (frameCount % 30 == 0)
	{
		socket.emit('conductor', {
			id: 'melody',
			x: mouseX,
			y: mouseY
		});
	}
}


// ================ INTERFACES
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	whackResized();
	background(0);
}

/*var data = {
   x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  */
