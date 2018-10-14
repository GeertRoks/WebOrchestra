class Lead {

  constructor () {

    this.arp = 1;
    this.octave = 0;
    this.duration = 1;

    this.env = [];
    this.triOsc = [];
    this.notes = [];
    this.rhythm = [];

    this.index = 0;
    this.count = 0;

    this.attackLevel = 0.2;
    this.releaseLevel = 0;

    this.attackTime = 0.001
    this.decayTime = 0.02;
    this.susPercent = 0.05;
    this.releaseTime = 0.5;

    this.Nosc = 3;
    this.numSines = 1;

    this.distortion = new p5.Distortion(0.0, 'none');
    this.delay = new p5.Delay();

    for (let i = 0; i < this.Nosc; i++){

      this.env.push(new p5.Envelope());

      this.env[i].setADSR(this.attackTime, this.decayTime, this.susPercent, this.releaseTime);
      this.env[i].setRange(this.attackLevel, this.releaseLevel);

      this.triOsc.push(new p5.Oscillator('sine'));
      this.triOsc[i].amp(this.env[i]);
      this.triOsc[i].pan(((2.0 / this.numSines) * i) - 1);
      this.triOsc[i].start();
      this.triOsc[i].freq(this._mtof(this.notes[i]));
      this.triOsc[i].disconnect();
      this.triOsc[i].connect(this.distortion);
      this.delay.process(this.distortion, .50, .30, 2300);
    }
  }

  _setScore (notesList) {
    this.notes = notesList;
  }

  _setRhythm (rhythmList) {
    this.rhythm = rhythmList;
  }

  _mtof (midiPitch) {
  return Math.pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
  }

  _setArp (arp) {
    this.arp = arp;
  }

  //werkt wel, later nog wat mooier maken
  _setNoteDuration (duration) {

    this.duration = duration;
    this.attackTime = 0.001 * this.duration;
    this.decayTime = 0.02 * this.duration;
    this.susPercent = 0.05;
    this.releaseTime = 0.5 * this.duration;

    for (let i = 0; i < this.Nosc; i++){
      this.env[i].setADSR(this.attackTime, this.decayTime, this.susPercent, this.releaseTime);
    }
  }

  _setOctave (octave) {
    this.octave = octave;
  }

  _sequence() {

    if(this.notes[this.count] > 0){
        this.triOsc[this.index % 3].freq(this._mtof(this.notes[this.count] + (12 * this.octave)));
        this.env[this.index % 3].play();
        this.index++;
      }
      this.count = (this.count + 1) % this.notes.length;
  }
}
