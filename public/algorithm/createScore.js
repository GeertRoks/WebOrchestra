class Score {

  constructor () {

    this.countScores = 0;

    this.algo = new Algorithm;

    this.drumsOn = true;
    this.stringsOn = true;
    this.melodyOn = true;

    this.stringsArp;
    this.stringsOctave;
    this.stringsOctaveSpread;
    this.stringsHalfTimeVar = 1;
    this.stringsIsHalfTime = true;

    this.melodyArp;
    this.melodyOctave;
    this.melodyOctaveSpread;
    this.melodyHalfTimeVar = 1;
    this.melodyisHalfTime = true;
    this.melodyOffset;

    this.measures = 8;
    this.beatsPerMeasure = 32;
    this.drumVoices = this.algo.drumVoices;

    this.scoreNotes = [];
    this.melodyRhythm = [];
    this.chordRhythm = [];

    this.strings = [[],[],[]];
    this.melodyList = [[],[],[]];
    this.drumList = [[],[],[]];

    this.chordList = new Array();
    this.scoreNotesChords = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array();
      this.scoreNotesChords[beatsPerMeasure] = new Array();
    }
  }


  _setScoreState (conductorName, stateFloat) {

    if(conductorName == 'melody') {
      this._setMelodyState(stateFloat);
    }
    if(conductorName == 'drone') {
      this._setStringsState(stateFloat);
    }
    if(conductorName == 'rhythm') {
      this._setDrumState(stateFloat);
    }

  }

  _testStateVars(state) {

    switch (state) {
      case 1:
        this._setMelodyState(1);
        this._setStringsState(1);
        this._setDrumState(10);
        break;
      case 2:
        this._setMelodyState(1);
        this._setStringsState(2);
        this._setDrumState(2);
        break;
      case 3:
        this._setMelodyState(2);
        this._setStringsState(1);
        this._setDrumState(3);
        break;
      case 4:
        this._setMelodyState(1);
        this._setStringsState(1);
        this._setDrumState(4);
        break;
      case 5:
        this._setMelodyState(2);
        this._setStringsState(1);
        this._setDrumState(4);
        break;
      case 6:
        this._setMelodyState(2);
        this._setStringsState(2);
        this._setDrumState(5);
        break;
      case 7:
        this._setMelodyState(2);
        this._setStringsState(1);
        this._setDrumState(6);
        break;
      case 8:
        this._setMelodyState(3);
        this._setStringsState(2);
        this._setDrumState(7);
        break;
      case 9:
        this._setMelodyState(2);
        this._setStringsState(2);
        this._setDrumState(8);
        break;
      case 10:
        this._setMelodyState(2);
        this._setStringsState(3);
        this._setDrumState(9);
        break;
      case 11:
        this._setMelodyState(3);
        this._setStringsState(3);
        this._setDrumState(5);
        break;
      case 12:
        this._setMelodyState(3);
        this._setStringsState(3);
        this._setDrumState(3);
        break;
      case 13:
        this._setMelodyState(4);
        this._setStringsState(3);
        this._setDrumState(3);
        break;
      case 14:
        this._setMelodyState(3);
        this._setStringsState(4);
        this._setDrumState(3);
        break;
      case 15:
        this._setMelodyState(3);
        this._setStringsState(3);
        this._setDrumState(4);
        break;
      case 16:
        this._setMelodyState(3);
        this._setStringsState(4);
        this._setDrumState(4);
        break;
      case 17:
        this._setMelodyState(4);
        this._setStringsState(4);
        this._setDrumState(10);
        break;
    }

  }

  _setMelodyState (state) {

    if(state > 100){
      state = 11;
    } else {
      state = int(state / 10);
    }

    console.log('mel: '+state);

    switch (state) {
      case 1:
        this.melodyArp = 1;
        this.melodyisHalfTime = true;
        this.melodyOctaveSpread = 0;
        this.melodyOctave = 0;
        this.melodyThresholdValue = 1;
        break;
      case 2:
        this.melodyArp = 1;
        this.melodyisHalfTime = true;
        this.melodyOctaveSpread = 1;
        this.melodyOctave = -1;
        this.melodyThresholdValue = 2;
        break;
      case 3:
        this.melodyArp = 0;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = 1;
        this.melodyOctave = -1;
        this.melodyThresholdValue = 3;
        break;
      case 4:
        this.melodyArp = 1;
        this.melodyisHalfTime = true;
        this.melodyOctaveSpread = -1;
        this.melodyOctave = -1;
        this.melodyThresholdValue = 4;
        break;
      case 5:
        this.melodyArp = 0;
        this.melodyisHalfTime = true;
        this.melodyOctaveSpread = -1;
        this.melodyOctave = 2;
        this.melodyThresholdValue = 1;
        break;
      case 6:
        this.melodyArp = 1;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = -2;
        this.melodyOctave = 2;
        this.melodyThresholdValue = 2;
        break;
      case 7:
        this.melodyArp = 1;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = 0;
        this.melodyOctave = 2;
        this.melodyThresholdValue = 3;
        break;
      case 8:
        this.melodyArp = 1;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = -3;
        this.melodyOctave = 3;
        this.melodyThresholdValue = 4;
        break;
      case 9:
        this.melodyArp = 1;
        this.melodyisHalfTime = true;
        this.melodyOctaveSpread = 2;
        this.melodyOctave = -1;
        this.melodyThresholdValue = 2;
        break;
      case 10:
        this.melodyArp = 1;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = -1;
        this.melodyOctave = 1;
        this.melodyThresholdValue = 3;
        break;
      case 11:
        this.melodyArp = 1;
        this.melodyisHalfTime = false;
        this.melodyOctaveSpread = -1;
        this.melodyOctave = 1;
        this.melodyThresholdValue = 3;
        break;

      }
  }

  _setStringsState (state) {

    if(state > 100){
      state = 5
    } else {
      state = int(state / 25);
    }

    console.log('str: '+state);

    switch (state) {


      case 1:
        this.stringsArp = 0;
        this.stringsOctaveSpread = 0;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = true;
        break;
      case 2:
        this.stringsArp = 0;
        this.stringsOctaveSpread = -2;
        this.stringsOctave = 2;
        this.stringsIsHalfTime = true;
        break;
      case 3:
        this.stringsArp = 0;
        this.stringsOctaveSpread = -1;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = true;
        break;
      case 4:
        this.stringsArp = 1;
        this.stringsOctaveSpread = -1;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = true;
        break;
      case 5:
        this.stringsArp = 1;
        this.stringsOctaveSpread = -1;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = false;
        break;
      }
  }

  _setDrumState (state) {

    if(state > 100){
      state = 11
    } else {
      state = int(state / 10);
    }

    console.log('dru: '+state);

    switch (state) {
      case 1:
        this.algo._setNoteDensityDrums(1);
        break;
      case 2:
        this.algo._setNoteDensityDrums(2);
        break;
      case 3:
        this.algo._setNoteDensityDrums(3);
        break;
      case 4:
        this.algo._setNoteDensityDrums(4);
        break;
      case 4:
        this.algo._setNoteDensityDrums(5);
        break;
      case 5:
        this.algo._setNoteDensityDrums(6);
        break;
      case 6:
        this.algo._setNoteDensityDrums(7);
        break;
      case 7:
        this.algo._setNoteDensityDrums(8);
        break;
      case 8:
        this.algo._setNoteDensityDrums(9);
        break;
      case 9:
        this.algo._setNoteDensityDrums(10);
        break;
      case 10:
        this.algo._setNoteDensityDrums(10);
        break;
      case 11:
        this.algo._setNoteDensityDrums(11);
        break;

      }
    }

  _getAlgorithmDrumRhythm () {
    this.drumVoices = this.algo.drumVoices;
    this.drumRhythm = this.algo.drumRhythm;
  }

  _reverseArray(array){
    for (let i = 0; i < array.length; i++){
      let temp = array.pop();
      array.unshift(temp);
    }
    return array;
  }

  //renders the notes from algorithm.js to a score.
  _renderChords () {

    let stringVoices = 0;
    this.chordRhythm = this.algo.chordRythm;

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){

        if (this.stringsHalfTimeVar == 1 || !this.stringsIsHalfTime) {

          if (this.chordRhythm[beatsPerMeasure % this.chordRhythm.length] == 1){

            this.scoreNotes = this.algo.notes;
            this.chordNotes = this.scoreNotes.slice();
            // this.chordNotes = this.scoreNotes;
            //set octave for strings:
            for (let notes = 0; notes < this.chordNotes.length; notes++){
              this.chordNotes[notes] = this.chordNotes[notes] +
              (12 * this.stringsOctaveSpread * notes) +
              (12 * this.stringsOctave);
            }

            // this.scoreNotes = this._reverseArray(this.scoreNotes);
            if (this.stringsArp == 0){ // if no arpeggio
              this.chordList[beatsPerMeasure + (measures * 32)][beatsPerMeasure] = this.chordNotes;
              for (let stringVoices = 0; stringVoices < 3; stringVoices++){
                this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.chordNotes[stringVoices];
              }
            } else {
              this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.chordNotes[stringVoices];
              this.strings[(stringVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
              this.strings[(stringVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
            }
          } else {
            if(this.stringsArp == 0){
            this.chordList[beatsPerMeasure + (measures * 32)].push(0);
            for (let stringVoices = 0; stringVoices < 3; stringVoices++){
              this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = 0;
            }
          } else {
            this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.chordNotes[stringVoices];
            this.strings[(stringVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
            this.strings[(stringVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
          }
        }
          stringVoices = (stringVoices + 1) % this.strings.length;
          this.stringsHalfTimeVar = 0;
        } else {

          for (let voices = 0; voices < 3; voices++){
            this.strings[voices][beatsPerMeasure + (measures * 32)] = 0;
          }
          this.stringsHalfTimeVar = 1;
        }
        this.scoreNotesChords[beatsPerMeasure + (measures * 32)] = this.chordNotes;
      }
      // console.log("scoreChordNotes = ", this.scoreNotesChords);
      // console.log("scoreChords = ", this.strings);
      this._renderMelody();
    }
  }

  //method that renders the notes from chordList to a melody which is used as a score for lead.js
  _renderMelody () {

    let notess = 0;
    let melodyVoices = 0;
    this.melodyRhythm = this.algo.rhythm;

    for ( let measures = 0; measures < this.measures; measures++ ){
      for ( let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++ ){
        if (this.melodyHalfTimeVar  == 1 || !this.melodyisHalfTime) {

          if ( this.melodyArp == 0 ) {
            if(this.chordRhythm[beatsPerMeasure] == 1){
              for ( let voices = 0; voices < 3; voices++ ) {
                this.melodyList[voices][beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][voices]
                + ( 12 * (this.melodyOctaveSpread * voices) + (12 * this.melodyOctave));
                }
            } else {
              for ( let voices = 0; voices < 3; voices++ ) {
                this.melodyList[voices][beatsPerMeasure + (measures * 32)] = 0;
              }
            }
          } else {
              if ( this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1 ){
              this.melodyList[melodyVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][melodyVoices];
              + ( 12 * (this.melodyOctaveSpread * melodyVoices) + (12 * this.melodyOctave));
              this.melodyList[(melodyVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
              this.melodyList[(melodyVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
              } else {
              // console.log("this melodyList = ", this.melodyList);
              for ( let voices = 0; voices < 3; voices++ ) {
                this.melodyList[voices][beatsPerMeasure + (measures * 32)] = 0;
              }
            }
        }
        melodyVoices = (melodyVoices + 1) % 3;
        notess++;
        this.melodyHalfTimeVar = 0;
      } else {
          for (let stringVoices = 0; stringVoices < 3; stringVoices++){
            this.melodyList[stringVoices][beatsPerMeasure + (measures * 32)] = 0;
          }
          this.melodyHalfTimeVar = 1;
        }
        }
      }
      // console.log("melodyList @ _renderMelody = ", this.melodyList);
    }

  _renderDrumRhythm () {

    this.drumVoices = this.algo.drumVoices;
    this.drumRhythm = this.algo.drumRhythm;
    let count = 0;

    this.drumList = [[],[],[]];

    for (let measures = 0; measures < this.measures; measures++){
      for (let voices = 0; voices < this.drumVoices; voices++){
        for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
              this.drumList[voices].push(this.drumRhythm[voices][beatsPerMeasure % this.drumRhythm[voices].length]);
        }
      }
    }
  }

  _renderScore () {
    // let count = 0;
    // console.log(this.countScores);
    this._renderChords();
    this._renderDrumRhythm();
    // this.countScores++;
  }


//Getters=======================================================================

  get scoreMelody () {
    // console.log("melody @ score = ", this.melodyList);
    return this.melodyList;
  }

  get scoreChords () {
    // console.log("strings @ score = ", this.strings);
    return this.strings;
  }

  get scoreDrums () {
    console.log("drumlist @ score = ", this.drumList);
    return this.drumList;
  }


}//end Score
