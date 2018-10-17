class Drums {

  constructor () {

    this.drumRhythm = [[],[],[]];
    //Envelope======================================================================
    let attackLevelDrums = 0.4;
    let releaseLevelDrums = 0;

    let attackTimeDrums = 0.001
    let decayTimeDrums = 0.02;
    let susPercentDrums = 0.02;
    let releaseTimeDrums = 0.05;
    //==========================================================================

    //==========================================================================

    this.kick = new p5.Oscillator('sine');
    this.snare = new p5.Noise('pink');
    this.hihat = new p5.Noise('white');

    this.envKick = new p5.Envelope();
    this.envSnare = new p5.Envelope();
    this.envHihat = new p5.Envelope();

    this.envKick.setADSR(attackTimeDrums, 0.2, susPercentDrums, releaseTimeDrums);
    this.envKick.setRange(attackLevelDrums, releaseLevelDrums);
    this.envSnare.setADSR(attackTimeDrums, decayTimeDrums, susPercentDrums, 0.5);
    this.envSnare.setRange(0.5, releaseLevelDrums);
    this.envHihat.setADSR(0.01, 0.02, 0.02, 0.01);
    this.envHihat.setRange(0.05, releaseLevelDrums);

    this.kick.amp(this.envKick);
    this.kick.freq(40);
    this.snare.amp(this.envSnare);
    this.hihat.amp(this.envHihat);

    this.kick.start();
    this.snare.start();
    this.hihat.start();
    }

  _setScore (score) {
    for (var i = 0; i < score.length; i++) {
      for (var j = 0; j < score[i].length; j++){
        this.drumRhythm[i].push(score[i][j]);
      }
    }
    // console.log("kick: " + this.drumRhythm[0].length);
    // console.log("snare: " + this.drumRhythm[1].length);
    // console.log("hihat: " + this.drumRhythm[2].length);
  }

  _sequence () {

    if(this.drumRhythm[0][0] == 1){
      this.envKick.play();
    }
    if(this.drumRhythm[1][0] == 1){
      this.envSnare.play();
    }
    if(this.drumRhythm[2][0] == 1){
      // console.log("this.drumRhythm = ", this.drumRhythm);
      this.envHihat.play();
      // console.log("play");
    }
    for (let drumIndex = 0; drumIndex < this.drumRhythm.length; drumIndex++){
      this.drumRhythm[drumIndex].shift();
    }
  }
}//end Drums
