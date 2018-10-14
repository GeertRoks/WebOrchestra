class Score {

  constructor () {

    this.algo = new Algorithm;
    this.measures = 8;
    this.beatsPerMeasure = 32;
    this.scoreNotes = this.algo.notes;
    this.melodyRhythm = this.algo.rhythm;
    this.chordRythm = this.algo.rhythm;
    this.drumList = this.algo.drumRhythm;
    this.drumVoices = this.algo.drumVoices;
    this.melodyList = [];
    this.chordList = new Array();
    this.drumList = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array();
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure * this.measures; beatsPerMeasure++){
      this.drumList[beatsPerMeasure] = new Array();
    }
  }

  _updateAlgorithm () {
    this._getAlgorithmNotes();
    this._getAlgorithmMelodyRhythm();
    this._getAlgorithmDrumRhythm();
  }

  _getAlgorithmNotes () {
    this.scoreNotes = this.algo.notes;
  }

  _getAlgorithmMelodyRhythm () {
    this.melodyRhythm = this.algo.rhythm;
  }

  _getAlgorithmDrumRhythm () {
    this.drumVoices = this.algo.drumVoices;
    this.drumRhythm = this.algo.drumRhythm;
  }

  _renderMelody () {

    console.log("ALGORITMH M = ", this.scoreNotes);

    let notess = 0;

    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.melodyRhythm[beatsPerMeasure % this.melodyRhythm.length] == 1){
          this.melodyList.push(this.scoreNotes[0][notess % 3]);
          notess++;
        } else {
          this.melodyList[beatsPerMeasure] = 0;
        }
      }
      console.log("melodyList = ", this.melodyList);
    }

  _renderChords () {

    for (let measures = 0; measures < this.measures; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < this.beatsPerMeasure; beatsPerMeasure++){
        if (this.chordRythm[beatsPerMeasure % this.chordRythm.length] == 1){
          this.chordList[beatsPerMeasure + (measures * 32)].push(this.scoreNotes);
        } else {
          this.chordList[beatsPerMeasure + (measures * 32)].push(0);
        }
      }
    }
    console.log("chordList = ", this.chordList);
  }

  _renderDrumRhythm () {

    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.chordRythm == 1){
          for (let voices = 0; voices < this.drumVoices; voices++){
            this.drumList[beatsPerMeasure + (measures * 32)][voices].push(this.drumRhythm[beatsPerMeasure % this.drumRhythm.length][voices]);
          }
        }
      }
      console.log("drumList = ", this.drumList);
  }

  _renderScore () {
    this._updateAlgorithm();
    this._renderChords();
    this._renderMelody();
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
