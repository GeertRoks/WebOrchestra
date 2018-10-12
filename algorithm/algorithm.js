
class Algorithm {

    constructor () {
      this.first = true;
      this.notePicked = 0;
      this.chordInterval = 3;
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
      this.notePicked = (this.notePicked + this.chordInterval) % 8;
    }
   return notes;
  }

  _constructRhythm () {

    let divideList = []
    let numerator = Math.round(Math.random() * 10);
    console.log("numerator = ", numerator);
    const deviders = [[],[],[]];

    //kijkt naar hoe de maat onderverdeeld kan worden
    for (let checkValue = 2; checkValue < 5; checkValue++){
      let ticksInBar = numerator;
      console.log("ticksInBar = ", ticksInBar, " ", "checkValue = ", checkValue);

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

    console.log("deviders = ", deviders);

    const rhythm = [1, 0, 1, 0, 1, 1, 1];
    return rhythm;
  }

  //beinvloed nootmateriaal
  _setInterval (chordInterval) {
    this.chordInterval = chordInterval;
  }

//akkoorden of arpeggio ========================================================
  _setArpMelody (arpM) {

  }

  _setArpDrone (arpD) {

  }

//nootdichtheid ================================================================
  _setNoteDensityMelody (densityMelody) {

  }

  _setNoteDensityDrone (densityDrone) {

  }

  _setNoteDensityRhythm (densityMelody) {

  }

//getters ======================================================================
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
