class Score {

  constructor () {

    this.algo = new Algorithm;

    this.stringsArp;
    this.stringsOctave;
    this.stringsOctaveSpread;
    this.stringsHalfTimeVar = 1;
    this.stringsIsHalfTime = true;

    this.melodyArp;
    this.melodyOctave;
    this.melodyOctaveSpread;
    this.melodyHalfTime = 1;
    this.melodyOffset;

    this.measures = 8;
    this.beatsPerMeasure = 32;
    this.drumVoices = this.algo.drumVoices;

    this.scoreNotes = [];
    this.melodyRhythm = [];
    this.chordRythm = [];

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

  _setMelodyState (state) {

    switch (state) {
      case 1:
        this.melodyArp = 0;
        break;
      case 2:
        this.melodyArp = 1;
        break;
      }
  }

  _setStringsState (state) {

    switch (state) {
      case 1:
        this.stringsArp = 0;
        this.stringsOctave = -1
        break;
      case 2:
        this.stringsArp = 0;
        this.stringsOctaveSpread = -1;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = true;
        break;
      case 3:
        this.stringsArp = 0;
        this.stringsOctaveSpread = -1;
        this.stringsOctave = 0;
        this.stringsIsHalfTime = false;
        break;
      }
  }

  _setDrumState (state) {

    switch (state) {
      case 1:
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
    this.chordRythm = this.algo.chordRythm;

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){

        if (this.stringsHalfTimeVar == 1 || !this.stringsIsHalfTime) {

          if (this.chordRythm[beatsPerMeasure % this.chordRythm.length] == 1){

            this.scoreNotes = this.algo.notes;
            this.chordNotes = this.scoreNotes.slice();

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
          this.scoreNotesChords[beatsPerMeasure + (measures * 32)] = this.chordNotes;
          this.stringsHalfTimeVar = 0;
        } else {

          for (let stringVoices = 0; stringVoices < 3; stringVoices++){
            this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = 0;
          }
          this.stringsHalfTimeVar = 1;
      }
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
          if ( this.melodyArp == 0 ) {
            if(this.chordRythm[beatsPerMeasure] == 1){
              for ( let voices = 0; voices < 3; voices++ ) {
                this.melodyList[voices][beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][notess % 3];
                }
            } else {
              for ( let voices = 0; voices < 3; voices++ ) {
                this.melodyList[voices][beatsPerMeasure + (measures * 32)] = 0;
              }
            }
          } else {
              if ( this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1 ){
              this.melodyList[melodyVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[melodyVoices];
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
      }
    }
    console.log("melodyList in render melody = ", this.melodyList);
  }

  _renderDrumRhythm () {

    this.drumVoices = this.algo.drumVoices;
    this.drumRhythm = this.algo.drumRhythm;
    let count = 0;

    for (let measures = 0; measures < this.measures; measures++){
      for (let voices = 0; voices < this.drumVoices; voices++){
        for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
              this.drumList[voices].push(this.drumRhythm[voices][beatsPerMeasure % this.drumRhythm[voices].length]);
              // count++;
        }
      }
    }
  }

  _renderScore () {
    let count = 0;

    this._renderChords();
    this._renderDrumRhythm();
    // console.log("drumList @_renderScore = ", this.drumList);
    count++;
    console.log("counter = ", count);
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
