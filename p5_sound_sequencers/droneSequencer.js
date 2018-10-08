//Sequencer=====================================================================
var startTime;
var triggerTime;
var triggerLenght;
var index = 0;
var count = 0;
var onOff = 1;
var numOsc = 3;
//==============================================================================

//Envelope======================================================================
var attackLevel = 1100.0;
var releaseLevel = 0;

var attackTime = 3;
var decayTime = 2;
var susPercent = 0.2;
var releaseTime = 1;
//==============================================================================

var osc = [];
var filters = [];
var env = [];

function setup() {
  var cnv = createCanvas(500, 500);
  background(0);

  textAlign(CENTER);
  fill(255)
  text('click to play', width/2, height/2);

  for(var i = 0; i < numOsc; i++){
    osc.push(new p5.Oscillator('sawtooth'));
    filters.push(new p5.LowPass());
    env.push(new p5.Env());


    env[i].setADSR(attackTime, decayTime, susPercent, releaseTime);
    env[i].setRange(attackLevel, releaseLevel);

    filters[i].freq(env[i]);

    osc[i].disconnect();
    osc[i].connect(filters[i])
    osc[i].amp(0.1);
    osc[i].start();
    osc[i].freq(220 + (i * 200));
  }

  startTime = millis();
  triggerLenght = 5000;
  count = 0;
}

function draw(){
  sequence();
}

//sound on off
function mouseClicked() {
  playing = (onOff + 1) % 2;
}

function mtof(midiPitch) {
  return pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
}

function sequence() {

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){
    for(var i = 0; i < osc.length; i++)
      env[i].play();

    count++;
  }
}
