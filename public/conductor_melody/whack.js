// THE CLASSIC GAME WHACK A MEMORY

var bitArray = [];
var bitsPerLine = 50;
const bitLineHeight = 40
var randNullPos = 0;

function whackPreload()
{
	monoFont = loadFont('fonts/dejavu/ttf/DejaVuSansMono.ttf');
}

function whackSetup()
{
	print((1300/bitsPerLine)*bitLineHeight);

	let nBits = int((windowHeight/bitLineHeight)+0.999) * bitsPerLine;

	print(nBits);

	for (var i=0; i<nBits; i++)
	{
		bitArray.push(int(random(2)));
	}

	textSize(30);
	textFont(monoFont);

	fill(255);
	background(0);
}

function whackDraw()
{
	background(0);
	

	if (frameCount % 100 == 0) {
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

	for (var i=0; i<bitArray.length; i++)
	{
		if (i >= randNullPos && i < randNullPos+5)
			fill(255,0,0);
		else
			fill(255);

		text(bitArray[i], (i%bitsPerLine)*(windowWidth/(bitsPerLine+1)) + bitsPerLine*0.5, int(i/bitsPerLine)*bitLineHeight);
	}
}

function whackResized()
{
}