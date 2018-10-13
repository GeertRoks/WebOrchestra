class Drums {

  constructor () {
    this.reverbPing     = [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0];
    this.ruisRythm      = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.snareRuisRythm = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
    this.reverbPing     = [0, 1, 0, 1, 0, 1, 0, 1];
    this.hihatRythm     = [0, 1, 1, 1, 0, 1, 0, 1];
    this.snareRythm     = [0, 0, 0, 0, 1, 0, 0, 0];
    this.kickRythm      = [1, 0, 0, 0, 0, 0, 1, 0];

    //Envelope======================================================================
    let attackLevelDrums = 0.4;
    let releaseLevelDrums = 0;

    let attackTimeDrums = 0.001
    let decayTimeDrums = 0.02;
    let susPercentDrums = 0.02;
    let releaseTimeDrums = 0.05;
    //==========================================================================

    //Sequencer=================================================================
    this.count = 0;
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
    this.envHihat.setADSR(0.01, 0.001, 0.01, 0.01);
    this.envHihat.setRange(0.05, releaseLevelDrums);

    this.kick.amp(this.envKick);
    this.kick.freq(40);
    this.snare.amp(this.envSnare);
    this.hihat.amp(this.envHihat);

    this.kick.start();
    this.snare.start();
    this.hihat.start();
    }

  _sequence () {

      if(this.kickRythm[this.count % this.kickRythm.length] == 1){
        this.envKick.play();
      }
      if(this.snareRythm[this.count % this.snareRythm.length] == 1){
        this.envSnare.play();
      }
      if(this.hihatRythm[this.count % this.reverbPing.length] == 1){
        this.envHihat.play();
      }
    this.count++;
    }
}//end Drums
