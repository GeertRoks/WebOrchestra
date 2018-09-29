var reverbPing     = [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0];
var pingRythm      = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
var ruisRythm      = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var snareRuisRythm = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var snareRythm     = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var kickRythm      = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1];

//Envelope======================================================================
var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;
//==============================================================================

//Sequencer=====================================================================
var startTime;
var triggerTime;
var triggerLenght;
var index = 0;
var count = 0;
var firstSeq = true;

//==============================================================================

var env;

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

  textAlign(CENTER);
  // text('click to play', width/2, height/2);

  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  kick.setVolume(0.1);
  rPing.setVolume(0.1);
  ping.setVolume(0.1);
  ruis.setVolume(0.1);
  snareRuis.setVolume(0.1);
  snare.setVolume(0.1);


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

    if(kickRythm[count % kickRythm.length] == 1){
      kick.play();
      // env.play();
      index++;
    }
    if(reverbPing[count % reverbPing.length] == 1){
      rPing.play();
    }
    if(pingRythm[count % pingRythm.length] == 1){
      ping.play();
    }
    if(ruisRythm[count % ruisRythm.length] == 1){
      ruis.play();
    }
    if(snareRuisRythm[count % snareRuisRythm.length] == 1){
      snareRuis.play();
    }
    if(snareRythm[count % snareRythm.length] == 1){
      snare.play();
    }
    count++;
  }
}
