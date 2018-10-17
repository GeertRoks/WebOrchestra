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

  //function to test different combinations of states
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
        //if this.stringIsHalfTime = true this part toggles between if and else....
        //this means that the first time a note is added, second time a 0
        if (this.stringsHalfTimeVar == 1 || !this.stringsIsHalfTime) {

          if (this.chordRhythm[beatsPerMeasure % this.chordRhythm.length] == 1){

            this.scoreNotes = this.algo.notes;
            //create a copy of list to use later in _renderMelody
            this.chordNotes = this.scoreNotes.slice();

            //set octave for strings:
            for (let notes = 0; notes < this.chordNotes.length; notes++){
              this.chordNotes[notes] = this.chordNotes[notes] +
              (12 * this.stringsOctaveSpread * notes) +
              (12 * this.stringsOctave);
            }

            if (this.stringsArp == 0){ // if no arpeggio write chord
              this.chordList[beatsPerMeasure + (measures * 32)][beatsPerMeasure] = this.chordNotes;
              for (let stringVoices = 0; stringVoices < 3; stringVoices++){
                this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.chordNotes[stringVoices];
              }
            } else {
                //writes one note in one 2d list and sets other elements of ohter lists at the same index to zero
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
        //make a list for _renderMelody, for example it changes [60, 0, 70, 0] to [60, 60, 70, 70]
        this.scoreNotesChords[beatsPerMeasure + (measures * 32)] = this.chordNotes;
      }
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
        //if this.melodyisHalfTime = true this part toggles between if and else....
        //this means that the first time a note is added, second time a 0
        if (this.melodyHalfTimeVar  == 1 || !this.melodyisHalfTime) {
          //if this.melodyArp == 0 it creates a chord
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
          } else { // if this.melodyArp == 1 it creates a arpeggio
              if ( this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1 ){
                //writes one note in one 2d list and sets other elements of ohter lists at the same index to zero
                this.melodyList[melodyVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][melodyVoices];
                + ( 12 * (this.melodyOctaveSpread * melodyVoices) + (12 * this.melodyOctave));
                this.melodyList[(melodyVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
                this.melodyList[(melodyVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
              } else {
                  for ( let voices = 0; voices < 3; voices++ ) {
                    this.melodyList[voices][beatsPerMeasure + (measures * 32)] = 0;
              }
            }
        }
        melodyVoices = (melodyVoices + 1) % 3;
        notess++;
        this.melodyHalfTimeVar = 0;
      } else {
          //add zero's if this.melodyisHalfTime = true
          for (let stringVoices = 0; stringVoices < 3; stringVoices++){
            this.melodyList[stringVoices][beatsPerMeasure + (measures * 32)] = 0;
          }
          this.melodyHalfTimeVar = 1;
        }
        }
      }
    }

  _renderDrumRhythm () {
    //retrieve information from algorithm. each time this.algo.drumRhythm is called it generates a new list
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

  //function that renders the score, first _renderChords calls algorithm and get a new list of chord notes
  //in render chords _renderMelody is called which uses the list retrieved in _renderChords to create melody part
  _renderScore () {
    this._renderChords();
    this._renderDrumRhythm();
  }


//Getters=======================================================================

  get scoreMelody () {
    return this.melodyList;
  }

  get scoreChords () {
    return this.strings;
  }

  get scoreDrums () {
    return this.drumList;
  }


}//end Score
