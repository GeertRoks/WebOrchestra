var length = 2;

//Envelope======================================================================

if(length == 1){

var attackLevel = 0.2;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.02;
var susPercent = 0.05;
var releaseTime = 0.5;
}
//
// if(length == 2){
//
// var attackLevel = 0.2;
// var releaseLevel = 0;
//
// var attackTime = 0.001
// var decayTime = 0.2;
// var susPercent = 0.5;
// var releaseTime = 0.5;
// }
//==============================================================================

//Sequencer=====================================================================
var startTime;
var triggerTime;
var triggerLenght;

var firstSeq = true;
var d;

var numSines = 1;
//==============================================================================



  constructor () {

    this.env = [];
    this.triOsc = [];

    this.index = 0;
    this.count = 0;

    this.attackLevel = 0.2;
    this.releaseLevel = 0;

    this.attackTime = 0.001
    this.decayTime = 0.02;
    this.susPercent = 0.05;
    this.releaseTime = 0.5;

    var this.Nosc = 3;

    this.distortion = new p5.Distortion(0.0, 'none');

    for (var i = 0; i < this.Nosc; i++){

      env.push(new p5.Env());

      this.env[i].setADSR(this.attackTime, this.decayTime, this.susPercent, this.releaseTime);
      this.env[i].setRange(this.attackLevel, this.releaseLevel);

      this.triOsc.push(new p5.Oscillator('sine'));
      this.triOsc[i].amp(this.env[i]);
      this.triOsc[i].pan(((2.0 / this.numSines) * i) - 1);
      this.triOsc[i].start();
      this.triOsc[i].freq(this._mtof(this.notes[0][i]));
      this.triOsc[i].disconnect();
      this.triOsc[i].connect(this.distortion);
    }
  }


  _mtof(midiPitch) {
  return pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
  }

  _sequence() {

    if(rhythm[count % 7] == 1){
      triOsc[index % 3].freq(this._mtof(notes[0][index % 3]));
      env[index % 3].play();
      index++;
      }
    count++;
  }
