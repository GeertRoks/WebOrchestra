
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
    const rhythm = [1, 0, 0, 0, 0, 0];
    const rhythm2 = [1, 0, 0, 1, 0, 0];
    const rhythm3 = [1, 0, 0, 1, 0, 1];
    const rhythm4 = [1, 0, 1, 1, 0, 1];
    const rhythm5 = [1, 0, 0, 0, 1, 0, 1];
    const rhythm6 = [1, 0, 1, 0, 1, 0, 1];
    const rhythm7 = [1, 0, 1, 0, 1, 1, 1];
    return rhythm;
  }

  _constructChordRhythm () {
    //TODO maak een globale maatsoort
    const chordR = [1, 0, 0, 1];
    const chordRhythm1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chordRhythm2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
    const chordRhythm3 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
    const chordRhythm4 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chordRhythm5 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chordRhythm6 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];

    const c = [chordRhythm1, chordRhythm2, chordRhythm3, chordRhythm4,
    chordRhythm5, chordRhythm6];

    const chordRhythm = this._assignArray(c[2]);

    return chordRhythm;
  }

  _assignArray(array){
    var outputArray;
    outputArray = array.slice();

    return outputArray;
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
