
class FmStrings {

  constructor(numVoices){

    this.arp = 0;
    this.octave = 0;
    this.beatsPerMeasure = 0;


    this.numVoices = numVoices;
    this.numCar = 3;
    // the carrier frequency pre-modulation
    this.carrierBaseFreq = 220;

    this.carriers = []
    this.modulators = []

    this.index = 0;
    this.carIndex = 0;

    this.envAmp = [];
    this.envFilter = [];
    this.filters = [];
    this.reverb = new p5.Reverb();

    this.modFreqs = [4.8, -4.8, 0];
    this.modAmps = [2, 2, 0];

    this.chordList = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
        this.chordList[beatsPerMeasure] = new Array();
    }

    for (var y = 0; y < numVoices; y++){
      this.envAmp.push(new p5.Envelope());
      this.envAmp[y].setADSR(1, 1, 0.2, 1);
      // this.envAmp[y].setADSR(0.8, 1, 0.2, 0.2);
      this.envAmp[y].setRange(0.05 + (y * 0.05 ) , 0);
      this.envAmp[y].setExp(1);

      this.envFilter.push(new p5.Envelope());
      this.envFilter[y].setADSR(1.2, 1.2, 50, 1);
      // this.envFilter[y].setADSR(0.1, 1, 50, 0.2);
      this.envFilter[y].setRange(72, 0);
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

  _setScore (score) {
    this.chordList = score;
  }

  _sequence () {

    var freqq = [];

      for (let strings = 0; strings < this.chordList.length; strings++){
        if (this.chordList[strings][0] > 0){
          freqq[strings] = this._mtof(this.chordList[strings][0] + (12 * this.octave * strings));
        for(let i = 0; i < this.numCar; i++){
            this.carriers[i + strings].freq(freqq[strings]);
            }
            this.envAmp[strings].triggerAttack();
            this.envFilter[strings].triggerAttack();
            }
          }
          // this.beatsPerMeasure = (this.beatsPerMeasure + 1) % this.chordList[0].length;
          for (var numStrings = 0; numStrings < this.chordList.length; numStrings++){
            this.chordList[numStrings].shift();
          }
        }



  _getRhythm () {
    let r = this.rhythm;
    return r;
  }

}//end FmStrings
