class Score {

  constructor () {

    this.algo = new Algorithm;
    this.measures = 8;
    this.beatsPerMeasure = 32;
    this.scoreNotes = this.algo.notes;
    this.melodyRhythm = this.algo.rhythm;
    this.chordRythm = this.algo.chordRhythm;
    this.drumList = this.algo.drumRhythm;
    this.drumVoices = this.algo.drumVoices;
    this.scoreNotesChords = new Array();
    this.melodyList = [];
    this.chordList = new Array();
    this.drumList = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.scoreNotesChords[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < 3; beatsPerMeasure++){
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


  _renderChords () {

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
        if (this.chordRythm[beatsPerMeasure % this.chordRythm.length] == 1){
          this.scoreNotes = this.algo.notes;
          this.chordList[beatsPerMeasure + (measures * 32)].push(this.scoreNotes);
        } else {
          this.chordList[beatsPerMeasure + (measures * 32)].push(0);
        }
        this.scoreNotesChords[beatsPerMeasure + (measures * 32)].push(this.scoreNotes);
      }
    }
    console.log("chordList = ", this.chordList);
    console.log("scoreNoteList = ", this.scoreNotesChords);
    this._renderMelody();
  }

  _renderMelody () {

    let notess = 0;

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
        if (this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1){
          this.melodyList[beatsPerMeasure + (measures * 32)] = this.scoreNotesChords[beatsPerMeasure + (measures * 32)][0][notess % 3];
        } else {
          this.melodyList[beatsPerMeasure + (measures * 32)] = 0;
        }
        notess++;
      }
    }
    console.log("melodyList = ", this.melodyList);
  }

  _renderDrumRhythm () {

    for (let measures = 0; measures < this.measures; measures++){
      for (let voices = 0; voices < this.drumVoices; voices++){
        for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
              this.drumList[voices].push(this.drumRhythm[voices][beatsPerMeasure % this.drumRhythm[voices].length]);
        }
      }
    }
    console.log("drumRhythm = ", this.drumList);
  }

  _renderScore () {
    this._updateAlgorithm();
    this._renderChords();
    // this._renderMelody();
    this._renderDrumRhythm();
  }


//Getters=======================================================================

  get scoreMelody () {

    return this.melodyList;
  }

  get scoreChords () {
    return this.chordList;
  }

  get scoreDrums () {
    return this.drumList;
  }


}//end Score
