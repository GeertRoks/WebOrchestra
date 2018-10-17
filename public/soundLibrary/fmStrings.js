
class FmStrings {

  constructor(numVoices){

    this.numVoices = numVoices;
    this.numCar = 3;
    // the carrier frequency pre-modulation
    this.carrierBaseFreq = 220;

    this.carriers = []
    this.modulators = []

    this.envAmp = [];
    this.envFilter = [];
    this.filters = [];
    this.reverb = new p5.Reverb();

    this.modFreqs = [4.8, -4.8, 0];
    this.modAmps = [2, 2, 0];

    this.chordList = [[],[],[]];
    this.maskList = [[],[],[]];


    for (var y = 0; y < numVoices; y++){
      this.envAmp.push(new p5.Envelope());
      this.envAmp[y].setADSR(1, 1, 0.2, 1);
      // this.envAmp[y].setADSR(0.8, 1, 0.2, 0.2);
      this.envAmp[y].setRange(0.1 + (y * 0.05 ) , 0);
      this.envAmp[y].setExp(1);

      this.envFilter.push(new p5.Envelope());
      this.envFilter[y].setADSR(1.2, 1.2, 50, 1);
      // this.envFilter[y].setADSR(0.1, 1, 50, 0.2);
      this.envFilter[y].setRange(72 * 2, 0);
      this.envFilter[y].setExp(1);

      this.filters.push(new p5.LowPass());
      this.filters[y].freq(this.envFilter[y]);

      for(var i = 0; i < this.numCar; i++){
        this.carriers.push(new p5.Oscillator('sawtooth'));
        this.carriers[i].freq(this.carrierBaseFreq); // set frequency
        this.carriers[i].amp(this.envAmp[y]);
        this.filters[y].freq(this.envFilter[y]);
        this.carriers[i].start(); // start oscillating
        this.carriers[i].disconnect();
        this.carriers[i].connect(this.filters[y]);
        this.reverb.process(this.filters[y], 5, 2);

        this.modulators.push(new p5.Oscillator('sine'));
        this.modulators[i].start();
        // add the modulator's output to modulate the carrier's frequency
        this.modulators[i].disconnect();
        this.carriers[i].freq(this.modulators[i]);
        this.modulators[y + i].freq(this.modFreqs[i]);
        this.modulators[y + i].amp(this.modAmps[i]);
      }
    }
  }

  _mtof (midiPitch) {
  return pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
  }

 _setOctave (octave) {
    this.octave = octave;
 }

  _setScore (score, mask) {

    var maskTemp = [mask.stringsvoice1, mask.stringsvoice2, mask.stringsvoice3];

    for (var i = 0; i < score.length; i++) {
      for (var j = 0; j < score[i].length; j++){
        this.chordList[i].push(score[i][j]);
        this.maskList[i].push(maskTemp[i][j]);
      }
    }

    // console.log("fmstings: " + this.chordList);
    // console.log("voice1 length: " + this.chordList[0].length);
    // console.log("voice2 length: " + this.chordList[1].length);
    // console.log("voice3 length: " + this.chordList[2].length);
  }

  _sequence () {

    var freqq = [];

      for (let strings = 0; strings < this.chordList.length; strings++){
        // console.log("chordList.length = ", this.chordList.length);
        if (this.chordList[strings][0] > 0 && this.maskList[strings][0]){
          this.maskList[strings][0];
          freqq[strings] = this._mtof(this.chordList[strings][0]);
          for(let i = 0; i < this.numCar; i++){
              this.carriers[i + strings].freq(freqq[strings]);
              }
              this.envAmp[strings].triggerAttack();
              this.envFilter[strings].triggerAttack();
              instrumentType = 1
            } else {
              if (this.chordList[strings][0] > 0 && !this.maskList[strings][0]){
                this.envAmp[strings].triggerRelease();
                this.envFilter[strings].triggerRelease();
              }
              }
            }
            for (var numStrings = 0; numStrings < this.chordList.length; numStrings++){
              this.chordList[numStrings].shift();
              this.maskList[numStrings].shift();
            }
          }



  _getRhythm () {
    let r = this.rhythm;
    return r;
  }

}//end FmStrings
