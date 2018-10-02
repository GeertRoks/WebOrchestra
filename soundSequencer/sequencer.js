// window.mixin = function (target, source) {
//   Object.keys(source).forEach(function (k) {
//     if (target[k] == undefined) target[k] = source[k];
//   });
//   return target;
// }
//
//
//
// window.MyClass = function () {
//   this.myProp = value;
// };
//
// myClass.prototype.constructNotes = function () {
//
// }
//
// var t = new MyClass();
//
// mixin(t, {
//
//
// })
//


class Algorithm {

  _constructNotes () {
    const notes = [];
    for (let i = 0; i < 7; i++){
      notes[i] = 60 + ((Math.round(Math.random(1))) * 12);
   }
   return notes;
   // console.log(this.notes);
  }

  constructRythm () {
    this.rhythm = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1];
  }

  get notes () {
    let c = this._notes;
    if (!c) c = this._notes = this._constructNotes();
    return c;
  }

  get rhythm () {
    return this.rhythm;
  }
  }

//==============================================================================

const algo = new Algorithm;

var notes = algo.getNotes();

var rythm = algo.getRhythm();

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

    if(rythm[count % rythm.length] == 1){
      triOsc.freq(mtof(notes[index % notes.length] - 24));
      env.play();
      index++;
    }
    count++;
  }
}
