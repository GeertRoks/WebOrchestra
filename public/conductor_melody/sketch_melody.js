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
	if (frameCount % 10 == 0)
	{
		socket.emit('melody', {
			param0:  int(memoryProgress)
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
