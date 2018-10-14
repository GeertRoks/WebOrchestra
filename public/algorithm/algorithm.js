
class Algorithm {

    constructor () {
      this.drumVoices = 3;
      this.first = true;
      this.notePicked = 0;
      this.chordInterval = 3;
      // this.numerator = 8;
      this._constructNotes ();
      this._constructMelodyRhythm();
      this._constructChordRhythm();
      this._constructDrumRhythm();
    }

  _constructNotes () {
    const scale = [60, 62, 63, 65, 67, 68, 70, 72];
    const notes = [];


    if(this.first){
      this.notePicked = Math.round((Math.random() * 10) % 8);
    }

      for (let i = 0; i < 3; i++){
          notes[i] = scale[this.notePicked];
        if (!this.first) {
          this.notePicked = notes[Math.round((Math.random() * 2) % 3)];
        }
        //noot afstand = 5 (1, 2, 3, 4)
        this.notePicked = (this.notePicked + this.chordInterval) % 8;
      }

    return notes;
  }

  _constructMelodyRhythm () {

    let divideList = []
    let numerator = Math.round(Math.random() * 10);
    // console.log("numerator = ", numerator);
    const deviders = [[],[],[]];

    //kijkt naar hoe de maat onderverdeeld kan worden
    for (let checkValue = 2; checkValue < 5; checkValue++){
      let ticksInBar = numerator;
      // console.log("ticksInBar = ", ticksInBar, " ", "checkValue = ", checkValue);

      while (ticksInBar > 0) {
        ticksInBar -= checkValue;
        if (ticksInBar >= 0){
          deviders[checkValue-2].push(checkValue);
        }
      }

      if(ticksInBar < 0){
        ticksInBar += checkValue;
        deviders[checkValue-2].push(ticksInBar);
      }
    }

    // for(var y = 0; y < deviders.length; y++){
    //   for (var i = 0; i < deviders[y].length; i++){
    //     if(deviders[y][i] == 1){
    //       deviders[y][i - 1]+= deviders[y][i - 1] + 1;
    //       deviders[y].splice(i, 1);
    //     }
    //   }
    // }

    const rhythm = [1, 0, 1, 0, 1, 1, 1];
    return rhythm;
  }

  _constructChordRhythm () {
    //TODO maak een globale maatsoort

    const chrodRhythm = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return chrodRhythm;
  }

  //beinvloed nootmateriaal
  _setInterval (chordInterval) {
    this.chordInterval = chordInterval;
  }


  _constructDrumRhythm () {
    const drumRhythm = new Array();

    drumRhythm[0] = new Array(1, 0, 0, 0, 0, 0, 1, 0);
    drumRhythm[1] = new Array(0, 0, 0, 0, 1, 0, 0, 0);
    drumRhythm[2] = new Array(0, 1, 1, 1, 0, 1, 0, 1);

    return drumRhythm;
  }

  _returnDrumVoices(){
    return this.drumVoices;
  }

// //akkoorden of arpeggio ========================================================
//   _setArpMelody (arpM) {
//
//   }
//
//   _setArpDrone (arpD) {
//
//   }

//nootdichtheid ================================================================
  _setNoteDensityMelody (densityMelody) {

  }

  _setNoteDensityDrone (densityDrone) {

  }

  _setNoteDensityRhythm (densityMelody) {

  }

//getters ======================================================================
  get notes () {
    let n = this._notes = this._constructNotes();
    return n;
  }

  get rhythm () {
    let r = this._rhythm;
    if (!r) r = this._rhythm = this._constructMelodyRhythm();
    return r;
  }

  get chordRythm () {
    let cr = this._chordRythm;
    if (!cr) cr = this._chordRhythm = this._constructChordRhythm();
    return cr;
  }

  get drumRhythm () {
    let d = this._drumRhythm;
    if (!d) d = this._drumRhythm = this._constructDrumRhythm();
    return d;
  }

}//Algorithm
