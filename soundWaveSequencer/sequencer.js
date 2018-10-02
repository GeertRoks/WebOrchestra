class Algorithm {

  constructor() {
    this.notes = [];
    this.rythm = [];
    this.constructNotes();
    this.constructRythm();
  }

  constructNotes(){
    // for(var i = 0; i < 16; i++){
      // this.notes[i] = 60 + ((Math.round(Math.random(1))) * 12);
    this.notes = [60, 0, 0, 72, 0, 0, 60, 0, 0, 60, 72, 0, 60, 0, 72, 72];
   // }
   console.log(this.notes);
  }

  constructRythm(){
    this.rythm = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1];
  }

  getNotes(){
    return this.notes;
  }

  getRythm(){
    return this.rythm;
  }
}

var reverbPing     = [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0];
var pingRythm      = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
var ruisRythm      = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var snareRuisRythm = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var snareRythm     = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0];
var kickRythm      = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1];


//==============================================================================

const algo = new Algorithm;

var notes = algo.getNotes();

var rythm = algo.getRythm();

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
var d;

var numSines = 1;
//==============================================================================

var env, triOsc;

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

  
  triOsc = new p5.Oscillator('triangle');
  triOsc.amp(env);
  triOsc.start();
  triOsc.freq(220);

  kick.setVolume(1);
  rPing.setVolume(0.5);
  ping.setVolume(0.5);
  ruis.setVolume(0.5);
  snareRuis.setVolume(0.5);
  snare.setVolume(1);

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
  triggerLenght = 170;
  count = 0;
  firstSeq = false;
  }

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){

    if(rythm[count % rythm.length] == 1){
      triOsc.freq(mtof(notes[index % notes.length] - 27));
      env.play();
      index++;
    }
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
