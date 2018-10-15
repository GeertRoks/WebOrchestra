// THE CLASSIC GAME WHACK A MEMORY

var bitArray = [];
var bitsPerLine = 50;
const bitLineHeight = 40;
var bitCharWidth = 0;
var randNullPos = 0;

var mouseXClick = 0;
var mouseYClick = 0;

var memoryProgress = 0;

function whackPreload()
{
	monoFont = loadFont('fonts/dejavu/ttf/DejaVuSansMono.ttf');
}

function whackSetup()
{
	let nBits = int((windowHeight/bitLineHeight)+0.999) * bitsPerLine;
	bitCharWidth = (windowWidth/(bitsPerLine));

	for (var i=0; i<nBits; i++)
	{
		bitArray.push(int(random(2)));
	}

	textSize(36);
	textFont(monoFont);
	textAlign(LEFT, TOP)

	fill(255);
	background(0);
}

function whackDraw()
{
	background(0);
	
	// Move and regenerate memory
	if (frameCount % 60 == 0) {
		randNullPos = int(random(bitArray.length-5));

		for (var i=0; i<bitArray.length; i++)
		{
			switch (i) {
				case randNullPos:	bitArray[i] = 'e';	break;
				case randNullPos+4:
				case randNullPos+1:	
				case randNullPos+2:
									bitArray[i] = 'r';	break;
				case randNullPos+3:	bitArray[i] = 'o';	break;
				default: 			bitArray[i] = int(random(2));
			}
		}
	}

	// Draw the memory
	for (var i=0; i<bitArray.length; i++)
	{
		if (i >= randNullPos && i < randNullPos+5)
			fill(255,0,0);
		else
			fill(255);

		noStroke();
		text(bitArray[i], (i%bitsPerLine)*(windowWidth/(bitsPerLine)) , int(i/bitsPerLine)*bitLineHeight);
	}

	noFill();
	stroke(255);
	strokeWeight(2);
	rect(int(mouseX/bitCharWidth)*bitCharWidth, int(mouseY/bitLineHeight)*bitLineHeight, bitCharWidth, bitLineHeight);
	// rect(mouseXClick*bitCharWidth, mouseYClick*bitLineHeight, bitCharWidth, bitLineHeight);

	if (memoryProgress > 0)
		memoryProgress -= 0.3;
	// print(memoryProgress);

	fill(255, 100);
	rect(0, 0, windowWidth * memoryProgress * 0.01, bitLineHeight);
}

function mouseClicked()
{
	mouseXClick = int(mouseX/bitCharWidth);
	mouseYClick = int(mouseY/bitLineHeight);
	let clickIndex = mouseXClick + (mouseYClick * bitsPerLine);

	if (clickIndex >= randNullPos && clickIndex < randNullPos + 5) {
		memoryProgress += 20;
		frameCount = -1;
	}
}

function whackResized()
{
}