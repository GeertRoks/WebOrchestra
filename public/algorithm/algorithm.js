
class Algorithm {

    constructor () {
      //stets number of drumVoices each voice represents one list. in this case
      //kick, snare, hihat
      this.drumVoices = 3;

      this.drumsThresholdValue = 4;
      this.chordsThresholdValue = 1;
      this.melodyThresholdValue = 3;

      this.first = true;
      this.notePicked = 0;

      //init a interval on which the chords are based, in this case a chord that is based on 3ths
      this.chordInterval = 3;

      //create note and rhythm output
      this._constructNotes ();
      this._constructMelodyRhythm();
      this._constructChordRhythm();
      this._constructDrumRhythm();
    }

  _constructNotes () {
    const scale = [60, 62, 63, 65, 67, 68, 70, 72];
    const notes = [];

    //pick random notes in scale
    if(this.first){
      this.notePicked = Math.round((Math.random() * 10) % 8);
      this.first = false
    }
      //take first picked note or if !first a previous picked note and create a
      //new chord by set interval
      for (let i = 0; i < 3; i++){
          notes[i] = scale[this.notePicked];
        if (!this.first) {//TODO hier nog naar kijken, dit wordt nooit uitgevoerd?
          this.notePicked = notes[Math.round((Math.random() * 2) % 3)];
        }
        //noot afstand = 5 (1, 2, 3, 4)
        this.notePicked = (this.notePicked + this.chordInterval) % 8;
      }

    return notes;
  }

  _constructMelodyRhythm () {

    var melodyRhythm = [];
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


  //these following rhythm functions work with a threshold value. if the drumsThresholdValue
  //is higher more notes are added
  _constructChordRhythm () {

    var chordRhythm = [];
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
    var drumRhythm = new Array();

    drumRhythm[0] = new Array();
    drumRhythm[1] = new Array();
    drumRhythm[2] = new Array();
    //first row resembles threshold values for a drum voice, first is kick, second is snare etc.
    const drumThresholds = [[1, 8, 6, 11, 10, 11, 5, 11], [11, 11, 9, 11, 1, 11, 10, 10],
    [9, 5, 7, 6, 8, 5, 9, 5]];

    //compare threshold value in list with this.drumsThresholdValue
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


  //sets interval between the notes in the generated chords
  _setInterval (chordInterval) {
    this.chordInterval = chordInterval;
  }

  //returns amount of drum voices
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
    this.drumsThresholdValue = densityDrums;
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
    // let d = this._drumRhythm;
    let d = this._drumRhythm = this._constructDrumRhythm();
    return d;
  }

}//Algorithm
