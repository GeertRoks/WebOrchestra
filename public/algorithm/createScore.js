class Score {

  constructor () {

    this.algo = new Algorithm;


    this.stringsArp = 1;
    this.melodyArp = 0;
    this.measures = 8;
    this.beatsPerMeasure = 32;
    this.scoreNotes = this.algo.notes;
    this.melodyRhythm = this.algo.rhythm;
    this.chordRythm = this.algo.chordRhythm;
    this.drumList = this.algo.drumRhythm;
    this.drumVoices = this.algo.drumVoices;
    this.scoreNotesChords = new Array();
    this.melodyList = new Array();
    this.chordList = new Array();
    this.drumList = new Array();
    this.strings = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array();
      this.scoreNotesChords[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < 3; beatsPerMeasure++){
      this.strings[beatsPerMeasure] = new Array();
      this.melodyList[beatsPerMeasure] = new Array();
      this.drumList[beatsPerMeasure] = new Array();
    }

  }

  _updateAlgorithm () {
    this._getAlgorithmNotes();
    this._getAlgorithmMelodyRhythm();
    this._getAlgorithmChordRhythm();
    this._getAlgorithmDrumRhythm();
  }

  _getAlgorithmNotes () {
    this.scoreNotes = this.algo.notes;
  }

  _getAlgorithmMelodyRhythm () {
    this.melodyRhythm = this.algo.rhythm;
  }

  _getAlgorithmChordRhythm () {
    this.chordRythm = this.algo.chordRythm;
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

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
        if (this.chordRythm[beatsPerMeasure % this.chordRythm.length] == 1){
          this.scoreNotes = this.algo.notes;
          // this.scoreNotes = this._reverseArray(this.scoreNotes);
          if (this.stringsArp == 0){ // if no arpeggio
            this.chordList[beatsPerMeasure + (measures * 32)][beatsPerMeasure] = this.scoreNotes;
            for (let stringVoices = 0; stringVoices < 3; stringVoices++){
              this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[stringVoices];
            }
          } else {
            this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[stringVoices];
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
          this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[stringVoices];
          this.strings[(stringVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
          this.strings[(stringVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
        }
      }
        stringVoices = (stringVoices + 1) % this.strings.length;
        this.scoreNotesChords[beatsPerMeasure + (measures * 32)] = this.scoreNotes;
      }
    }
    this._renderMelody();
  }




  _renderMelody1 () {

    let notess = 0;

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
        if (this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1){
          this.melodyList[beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][notess % 3];
        } else {
          this.melodyList[beatsPerMeasure + (measures * 32)] = 0;
        }
        notess++;
      }
    }
  }


  //method that renders the notes from chordList to a melody which is used as a score for lead.js
  _renderMelody () {

    let notess = 0;
    let melodyVoices = 0;

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

    for (let measures = 0; measures < this.measures; measures++){
      for (let voices = 0; voices < this.drumVoices; voices++){
        for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
              this.drumList[voices].push(this.drumRhythm[voices][beatsPerMeasure % this.drumRhythm[voices].length]);
        }
      }
    }
  }

  _renderScore () {
    this._updateAlgorithm();
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


// _renderChords1 () {
//
//   let stringVoices = 0;
//
//   for (let measures = 0; measures < this.measures; measures++){
//     for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
//
//       if (this.chordRythm[beatsPerMeasure % this.chordRythm.length] == 1){
//         this.scoreNotes = this.algo.notes;
//       }
//
//       this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[stringVoices];
//       this.strings[(stringVoices + 1) % 3][beatsPerMeasure + (measures * 32)] = 0;
//       this.strings[(stringVoices + 2) % 3][beatsPerMeasure + (measures * 32)] = 0;
//
//       stringVoices = (stringVoices + 1) % this.strings.length;
//       this.scoreNotesChords[beatsPerMeasure + (measures * 32)] = this.scoreNotes;
//       }
//     }
//   // console.log("in _renderChords = ", this.chordList);
//   console.log("in _renderChords stringList = ", this.strings);
//   // console.log("in _renderChords = ", this.scoreNotesChords);
//   //split chord list into three lists
//   this._renderMelody();
// }
