
class Algorithm {

    constructor () {
      this.drumVoices = 3;
      this.drumsThresholdValue = 1;
      this.chordsThresholdValue = 1;
      this.melodyThresholdValue = 3;
      this.first = true;
      this.notePicked = 0;
      this.chordInterval = 3;
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

    // const rhythm1 = [1, 0, 0, 0, 0, 0];
    // const rhythm2 = [1, 0, 0, 1, 0, 0];
    // const rhythm3 = [1, 0, 0, 1, 0, 1];
    // const rhythm4 = [1, 0, 1, 1, 0, 1];
    const melodyRhythm = [];
    const melodyThresholds = [1, 0, 2, 4, 0, 3];

    for (let melodyIndex = 0; melodyIndex < melodyThresholds.length; melodyIndex++){
      if(melodyThresholds[melodyIndex] <= this.melodyThresholdValue){
        melodyRhythm[melodyIndex] = 1;
      } else {
        melodyRhythm[melodyIndex] = 0;
      }
    }
    // console.log("melodyRhythm = ", melodyRhythm);
    return melodyRhythm;
  }

  _constructChordRhythm () {

    const chordRhythm = [];
    const chordThresholds = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // const chordThresholds = [1, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0,
    // 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0];

    for (let chordIndex = 0; chordIndex < chordThresholds.length; chordIndex++){
      if(chordThresholds[chordIndex] <= this.chordsThresholdValue){
        chordRhythm[chordIndex] = 1;
      } else {
        chordRhythm[chordIndex] = 0;
      }
    }

    return chordThresholds;
  }

  _constructDrumRhythm () {
    const drumRhythm = new Array();

    drumRhythm[0] = new Array();
    drumRhythm[1] = new Array();
    drumRhythm[2] = new Array();
    const drumThresholds = [[1, 8, 6, 11, 10, 11, 5, 11], [11, 11, 9, 11, 1, 11, 10, 0],
    [9, 5, 7, 6, 8, 5, 9, 5]];

    for (let row = 0; row < 3; row++){
      for (let drumIndex = 0; drumIndex < drumThresholds[0].length; drumIndex++){
        if(drumThresholds[row][drumIndex] <= this.drumsThresholdValue){
          drumRhythm[row][drumIndex] = 1;
        } else {
          drumRhythm[row][drumIndex] = 0;
        }
      }
    }
    return drumRhythm;
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

  _returnDrumVoices(){
    return this.drumVoices;
  }

  //note density ================================================================
  _setNoteDensityMelody (densityMelody) {
    this.melodyThresholdValue = densityMelody;

  }

  _setNoteDensityDrone (densityDrone) {
    this.chordsThresholdValue = densityDrone;
  }

  _setNoteDensityDrums (densityDrums) {
    this.thresholdValue = densityDrums;
  }

  //getters ======================================================================
  get notes () {
    let n = this._notes = this._constructNotes();
    return n;
  }

  get rhythm () {
    let r = this._melodyRhythm;
    if (!r) r = this._melodyRhythm = this._constructMelodyRhythm();
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
