var socket;
const matrixColor = [255, 0, 0];

// ================ PRELOAD
function preload()
{
	matrixPreload();
}


// ================ SETUP
function setup()
{
	createCanvas(displayWidth, displayHeight);
	socket = io.connect(hostname + ":" + port);

	matrixSetup();
}

// ================ DRAW
function draw()
{
	matrixDraw();

	// Send data every now and then
	if (frameCount % 10 == 0)
	{
		socket.emit('rhythm', {
			param0:  int(hack)
		});
	}
}


// ================ INTERFACES
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}

/*var data = {
   x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  */
