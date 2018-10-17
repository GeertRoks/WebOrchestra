// BEWARE: BLUE SCREEN OF DEATH AHEAD!

var progress = 0;

var line0 = ":(";
var line1 = "Your PC ran into a problem and needs to restart. We're just ";
var line2 = "collecting some error info, and then we'll restart for you.";
var line3 = "For more information about this issue and";
var line4 = "possible fixes, visit";
var line5 = "https://github.com/GeertRoks/WebOrchestra";
var line6 = "If you call a support person, give them this info:";
var line7 = "Stop code: CRITICAL_BEAT_PLAYED";
const hOffset = 200;
const vOffset = 100;
const qrOffset = 240;
const qrSize = 230;
const qrBlock = qrSize / 29;

var instrumentType = 0;

// ================ SETUP
function bsodSetup()
{
	// Text

	textAlign(LEFT, TOP);
	noStroke();

	drawQR();
}

// ================ DRAW
function bsodDraw()
{
	switch(instrumentType) {
		case 0:	background(0, 100, 200);	break;
		case 1:	background(200, 100, 100);	break;
		case 2:	background(200, 100, 0);	break;
		case 3: background(100, 150, 0);	break;
	}
	
	drawText();
	
	if (progress < random(255))
		drawQR();

	lineGlitch();
	
	progress = int(progress * 0.8);

}

function onNote(intensity)
{
	progress += intensity;
}

function lineGlitch()
{
	// stroke(255);
	fill(255);
	for (var i=0; i<int(progress*0.1); i++)
	{
		let x = random(width);
		let y = random(height);

		rect(x,y,random(width-x),random(5));
	}

}

function drawText()
{
	fill(255);

	// Text
	textSize(128);
	
	if (progress > 10)
		text(":)", hOffset, vOffset); // happy
	else
		text(":(", hOffset, vOffset); // sad

	textSize(32 + (progress * progress * (0.0001) * (0.8 + random(0.2))));
	text(stringGlitch(line1, progress*0.5), hOffset, vOffset + 200);
	text(stringGlitch(line2, progress*0.5), hOffset, vOffset + 240);
	text(progress + stringGlitch("% complete", progress * 0.1), hOffset, vOffset + 320);
	text(stringGlitch(line3, progress*0.5), hOffset + qrOffset, vOffset + 400);
	text(stringGlitch(line4, progress*0.5), hOffset + qrOffset, vOffset + 440);
	text(stringGlitch(line5, progress * 0.05), hOffset + qrOffset, vOffset + 480);
	text(stringGlitch(line6, progress*0.5), hOffset + qrOffset, vOffset + 560);
	text(stringGlitch(line7, progress *0.5 * 0.03), hOffset + qrOffset, vOffset + 600);
}

function drawQR()
{
	fill(255);

	rect(hOffset, vOffset + 400, qrSize, qrSize);	// main
	
	// Noise
	noStroke();
	for (var i = 0; i < 729; i++)
	{
		// Random color
		if (int(random(2)))
			switch(instrumentType) {
				case 0:	fill(0, 100, 200);		break;
				case 1:	fill(200, 100, 100);	break;
				case 2:	fill(200, 100, 0);		break;
				case 3: fill(100, 150, 0);		break;
			}
			
		else
			fill(255)
		rect(hOffset + ((i  % 27)+1) * qrBlock, vOffset + 400 + (int(i / 27)+1) * qrBlock, qrBlock, qrBlock);	
	}

	// Identifiers
	fill(255);
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock, 		qrBlock*7, 		qrBlock*7); 	// TOP LEFT
	rect(hOffset+qrBlock*21, 	vOffset+400+qrBlock, 		qrBlock*7, 		qrBlock*7); 	// TOP RIGHT
	rect(hOffset+qrBlock,		vOffset+400+qrBlock*21, 	qrBlock*7, 		qrBlock*7); 	// BOTTOM LEFT
	switch(instrumentType) {
		case 0:	fill(0, 100, 200);		break;
		case 1:	fill(200, 100, 100);	break;
		case 2:	fill(200, 100, 0);		break;
		case 3: fill(100, 150, 0);		break;
	}
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*1, 		qrBlock*6, 		qrBlock);		// top
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*6, 		qrBlock*6,		qrBlock);		// bottom
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*1, 		qrBlock, 		qrBlock*6);		// left
	rect(hOffset+qrBlock*6, 	vOffset+400+qrBlock, 		qrBlock, 		qrBlock*6);		// right
	rect(hOffset+qrBlock*3, 	vOffset+400+qrBlock*3, 		qrBlock*2, 		qrBlock*2);		// isle

	rect(hOffset+qrBlock*22, 	vOffset+400+qrBlock*1, 		qrBlock*6, 		qrBlock);		// top
	rect(hOffset+qrBlock*22, 	vOffset+400+qrBlock*6, 		qrBlock*6,		qrBlock);		// bottom
	rect(hOffset+qrBlock*22, 	vOffset+400+qrBlock*1, 		qrBlock, 		qrBlock*6);		// left
	rect(hOffset+qrBlock*27, 	vOffset+400+qrBlock, 		qrBlock, 		qrBlock*6);		// right
	rect(hOffset+qrBlock*24, 	vOffset+400+qrBlock*3, 		qrBlock*2, 		qrBlock*2);		// isle

	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*22,		qrBlock*6, 		qrBlock);		// top
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*27,		qrBlock*6,		qrBlock);		// bottom
	rect(hOffset+qrBlock, 		vOffset+400+qrBlock*22,		qrBlock, 		qrBlock*6);		// left
	rect(hOffset+qrBlock*6, 	vOffset+400+qrBlock*22,		qrBlock, 		qrBlock*6);		// right
	rect(hOffset+qrBlock*3, 	vOffset+400+qrBlock*24, 	qrBlock*2, 		qrBlock*2);		// isle


}

// ================ INTERFACE
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight)
}

function stringGlitch(str, amount)
{
	let string = split(str, '');

	for (let i=0; i<string.length; i++)
		if (random(100) < amount)
			string[i] = char(random(32, 100));

	return join(string, '');
}