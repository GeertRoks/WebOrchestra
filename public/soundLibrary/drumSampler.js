class Drums {

  constructor () {
    //init lists================================================================
    this.maskList = [[],[],[]];
    this.drumRhythm = [[],[],[]];

    //Envelope vars=============================================================
    let attackLevelDrums = 0.4;
    let releaseLevelDrums = 0;

    let attackTimeDrums = 0.01;
    let decayTimeDrums = 0.02;
    let susPercentDrums = 0.02;
    let releaseTimeDrums = 0.05;
    //==========================================================================

    //init p5 objects===========================================================

    this.kick             = new p5.Oscillator('sine');
    this.kickNoise        = new p5.Noise('brown');
    this.snare            = new p5.Noise('pink');
    this.hihat            = new p5.Noise('white');

    this.envKick          = new p5.Envelope();
    this.envKickPitch     = new p5.Envelope();
    this.envKickNoise     = new p5.Envelope();
    this.envSnare         = new p5.Envelope();
    this.envHihat         = new p5.Envelope();

    this.envKick.setADSR(attackTimeDrums, 0.3, susPercentDrums, releaseTimeDrums);
    this.envKick.setRange(attackLevelDrums, releaseLevelDrums);
    this.envKickPitch.setADSR(0.01, 0.12, 0, 0);
    this.envKickPitch.setRange(250, 0);
    this.envKickNoise.setADSR(0., 0.05, 0, 0);
    this.envKickNoise.setRange(0.3, 0);
    this.envSnare.setADSR(attackTimeDrums, decayTimeDrums, susPercentDrums, 0.5);
    this.envSnare.setRange(0.5, releaseLevelDrums);
    this.envHihat.setADSR(0.01, 0.02, 0.02, 0.01);
    this.envHihat.setRange(0.05, releaseLevelDrums);

    this.kick.amp(this.envKick);
    this.kickNoise.amp(this.envKickNoise);
    this.kick.freq(65.4);
    this.kick.freq(this.envKickPitch);

    this.snare.amp(this.envSnare);
    
    this.hihat.amp(this.envHihat);

    this.kick.start();
    this.kickNoise.start();
    this.snare.start();
    this.hihat.start();
  }

  //put score into list for sequencer
  _setScore (score, mask) {

    var maskTemp = [mask.kick, mask.snare, mask.hihat];

    for (var i = 0; i < score.length; i++) {
      for (var j = 0; j < score[i].length; j++){
        this.drumRhythm[i].push(score[i][j]);
        this.maskList[i].push(maskTemp[i][j]);
      }
    }
    // console.log("kick: " + this.drumRhythm[0].length);
    // console.log("snare: " + this.drumRhythm[1].length);
    // console.log("hihat: " + this.drumRhythm[2].length);
  }

  //trigger events
  _sequence () {

    if(this.drumRhythm[0][0] == 1 && this.maskList[0][0]){
      this.envKick.play();
      this.envKickPitch.play();
      this.envKickNoise.play();
    }
    if(this.drumRhythm[1][0] == 1 && this.maskList[1][0]){
      this.envSnare.play();
    }
    if(this.drumRhythm[2][0] == 1 && this.maskList[2][0]){
      // console.log("this.drumRhythm = ", this.drumRhythm);
      this.envHihat.play();
      // console.log("play");
    }
    for (let drumIndex = 0; drumIndex < this.drumRhythm.length; drumIndex++){
      this.drumRhythm[drumIndex].shift();
      this.maskList[drumIndex].shift();
    }
  }
}//end Drums
