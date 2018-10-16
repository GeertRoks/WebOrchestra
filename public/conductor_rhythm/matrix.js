const rainDropSize = 32;
var rain = [];
var rainSpeed = 5;

var input = '';

var hackingProgress = 0;

let easing = 0.01;
var hack = 0;


// ================ PRELOAD
function matrixPreload()
{
	rainFont = loadFont('fonts/matrix_code_nfi/matrix_code_nfi.otf ');
	monoFont = loadFont('fonts/dejavu/ttf/DejaVuSansMono.ttf');
}


// ================ SETUP
function matrixSetup()
{
	// Let it rain
	for (var i=0; i<50; i++)
		// rain.push(new RainDrop());

	background(0);
	// rectMode(CENTER);
	textAlign(CENTER, CENTER);
	strokeWeight(2)
}


// ================ DRAW
function matrixDraw()
{
	// MATRIX
	textFont(rainFont);
	textSize(rainDropSize * 0.9);
	if ((frameCount % rainSpeed) === 0) {

		background(0, 20);
		for (var i=0; i<rain.length; i++)
			rain[i].display();
	}

	// Codebox
	fill(0);
	stroke(matrixColor[0], matrixColor[1], matrixColor[2]);
	rect(windowWidth*.5 - 200,windowHeight*.5 - 50, 400, 100);


	// Codebox text
	fill(matrixColor[0], matrixColor[1], matrixColor[2]);
	textFont(monoFont);
	textSize(50);
	text(input, windowWidth*.5,windowHeight*.5);

	// Progress bar
	rect(windowWidth*.5 - 200,windowHeight*.5 - 50, hackingProgress * 4, 10);

	// hackingProgress = hackingProgress * 0.997;
	if (hackingProgress > 0)
		hackingProgress-= 0.1;

	let deltaHack = hackingProgress - hack;
	hack += deltaHack * easing;

	if (hack > 100 && random(100) > 90)
		background(random(255));

	// Makes sure there are at least 10 raindrops
	if (rain.length < 10) {
		rain.push(new RainDrop());
	}
}

function RainDrop()
{
	this.x = int(random(width / rainDropSize)) * rainDropSize;
	this.y = int(random(height / rainDropSize)) * rainDropSize;
	this.char = char(32+random(32));
	this.age = 0;

	this.display = function()
	{
		noStroke();
		if (hackingProgress < 100)
			fill(0, 255, 0);
		else
			fill(255);

		// New char on each draw
		this.char = char(32+random(32));
		text(this.char, this.x, this.y);

		// Move and keep within window
		this.y += rainDropSize;
		if (this.y > height)
			this.y = 0;

		// Small chance to move
		if (random(100) > 90 && this.y === 0)
			this.x = int(random(width / rainDropSize)) * rainDropSize;

		// Age and kill
		this.age++;
		if (this.age > random(10, 200))
			rain.pop();
	}
}

// ================ KEYBOARD
function keyPressed()
{
	// ARTIFICIAL INTELLIGENCE
	switch(keyCode)
	{
		case BACKSPACE:
			input = input.substring(0, input.length-1);
			break;

		case RETURN:
			for (var i=0; i<(input.length * 15); i++)
				rain.push(new RainDrop());

			hackingProgress += (input.length) * 2;
			input = '';
			break;
	}
}

function keyTyped()
{
	// machin lerning
	rain.push(new RainDrop());

	// Filter out non keyboard characters and constrain length
	if (keyCode >= 32 && keyCode <= 126 && input.length < 12)
		input += key.toUpperCase();


}
