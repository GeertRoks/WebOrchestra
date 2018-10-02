var rhythmList = [[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]];

//Envelope======================================================================
var attackLevel = 0.2;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.2;
//==============================================================================

//Sequencer=====================================================================
var startTime;
var triggerTime;
var triggerLenght;
var index = 0;
var count = 0;
var sound = 0;
var firstSeq = true;

//==============================================================================

var env = [];
var samples = [];

function preload() {
  soundFormats('mp3', 'wav');
  kick = loadSound('soundFiles/kick.wav');
  rPing = loadSound('soundFiles/reverbPing.wav');
  ping = loadSound('soundFiles/ping.wav');
  ruis = loadSound('soundFiles/ruis_1.wav');
  snareRuis = loadSound('soundFiles/snare_ruis.wav');
  snare = loadSound('soundFiles/snare.wav');
}

function setup() {
  var cnv = createCanvas(100, 100);
  var amountSamples = 6;

  textAlign(CENTER);
  // text('click to play', width/2, height/2);

  for(var i = 0; i < amountSamples; i++){
    env.push(new p5.Envelope);
    env[i].setADSR(attackTime, decayTime, susPercent, releaseTime);
    env[i].setRange(attackLevel, releaseLevel);
  }

  kick.setVolume(env[0]);
  rPing.setVolume(env[1]);
  ping.setVolume(env[2]);
  ruis.setVolume(env[3]);
  snareRuis.setVolume(env[4]);
  snare.setVolume(env[5]);

  samples[0] = kick;
  samples[1] = rPing;
  samples[2] = ping;
  samples[3] = ruis;
  samples[4] = snareRuis;
  samples[5] = snare;

}

function draw(){
  sequence();
}

function mtof(midiPitch) {
  return pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
}

function sequence() {

  if(firstSeq){
  startTime = millis();
  triggerLenght = 200;
  count = 0;
  firstSeq = false;
  }

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){

  for(var i = 0; i < 6; i++){
    if(rhythmList[i][count % 16] == 1){
        samples[i].play();
        env[i].play();
      }
    }
    count++;
  }
}
