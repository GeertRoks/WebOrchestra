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

// ================ SETUP
function bsodSetup()
{
	// Text
	fill(255);
	textAlign(LEFT, TOP);
	noStroke();
}

// ================ DRAW
function bsodDraw()
{
	background(0, 100, 200);
	
	// Text
	textSize(128);
	text(line0, hOffset, vOffset)
	textSize(32);
	text(stringGlitch(line1, progress), hOffset, vOffset + 200);
	text(stringGlitch(line2, progress), hOffset, vOffset + 240);
	text(progress + stringGlitch("% complete", progress * 0.1), hOffset, vOffset + 320);
	text(stringGlitch(line3, progress), hOffset + qrOffset, vOffset + 400);
	text(stringGlitch(line4, progress), hOffset + qrOffset, vOffset + 440);
	text(stringGlitch(line5, progress * 0.01), hOffset + qrOffset, vOffset + 480);
	text(stringGlitch(line6, progress), hOffset + qrOffset, vOffset + 560);
	text(stringGlitch(line7, progress * 0.1), hOffset + qrOffset, vOffset + 600);

	// QR
	rect(hOffset, vOffset + 400, qrSize, qrSize);

	progress += int(random(-1, 2));
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