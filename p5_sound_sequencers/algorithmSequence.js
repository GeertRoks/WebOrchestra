
class Algorithm {

    constructor () {
      console.log("hallo");
      this.first = true;
      this.notePicked = 0;
    }

  _constructNotes () {
    const scale = [60, 62, 63, 65, 67, 68, 70, 72];
    const notes = new Array(1);

    for (let i = 0; i < notes.length; i++) {
      notes[i] = new Array(3);
    }

    if(this.first){
      this.notePicked = Math.round((Math.random() * 10) % 8);
    }


    for (let i = 0; i < 3; i++){
        notes[0][i] = scale[this.notePicked];
      if (!this.first) {
        this.notePicked = notes[0][Math.round((Math.random() * 2) % 3)];
      }
      //noot afstand = 5 (1, 2, 3, 4)
      this.notePicked = (this.notePicked + 3) % 8;
    }
   return notes;
  }

  _constructRhythm () {
    const rhythm = [1, 0, 1, 0, 1, 1, 1];
    // for (let i = 0; i < 7; i++){
    //   rhythm[i] = Math.round(Math.random(1));
    // }
    return rhythm;
  }

  get notes () {
    let c = this._notes = this._constructNotes();
    return c;
  }

  get rhythm () {
    let r = this._rhythm;
    if (!r) r = this._rhythm = this._constructRhythm();
    return r;
  }
}

//==============================================================================

const algo = new Algorithm;

var notes = algo.notes;

var rhythm = algo.rhythm;

//Envelope======================================================================
var attackLevel = 0.2;
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

var env = [];
var triOsc = [];
var distortion;

function setup() {
  var cnv = createCanvas(100, 100);

  textAlign(CENTER);
  // text('click to play', width/2, height/2);

  var Nosc = 3;

  distortion = new p5.Distortion(0.0, 'none');

  for (var i = 0; i < Nosc; i++){

    env.push(new p5.Env());

    env[i].setADSR(attackTime, decayTime, susPercent, releaseTime);
    env[i].setRange(attackLevel, releaseLevel);

    triOsc.push(new p5.Oscillator('sine'));
    triOsc[i].amp(env[i]);
    triOsc[i].pan(((2.0 / numSines) * i) - 1);
    triOsc[i].start();
    triOsc[i].freq(mtof(notes[0][i]));
    triOsc[i].disconnect();
    triOsc[i].connect(distortion);

  }
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
  triggerLenght = 100;
  count = 0;
  firstSeq = false;
  }

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){
    algo._constructNotes();
    notes = algo.notes;

    if(rhythm[count % 7] == 1){
      triOsc[index % 3].freq(mtof(notes[0][index % 3]));
      env[index % 3].play();
      index++;
    }
  count++;
  }
}
