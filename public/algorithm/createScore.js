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
    this.strings = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.scoreNotesChords[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < 3; beatsPerMeasure++){
      this.strings[beatsPerMeasure] = new Array();
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
          for (let stringVoices = 0; stringVoices < 3; stringVoices++){
            this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = this.scoreNotes[stringVoices];
          }
        } else {
          this.chordList[beatsPerMeasure + (measures * 32)].push(0);
          for (let stringVoices = 0; stringVoices < 3; stringVoices++){
            this.strings[stringVoices][beatsPerMeasure + (measures * 32)] = 0;
          }
        }
        this.scoreNotesChords[beatsPerMeasure + (measures * 32)].push(this.scoreNotes);
      }
    }
    //split chord list into three lists
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
    // this._renderMelody();
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
