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
	socket = io.connect("https://" + hostname + ":" + port);

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

/*var data = {
   x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);
  */
