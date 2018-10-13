class Score {

  constructor () {

    const algo = new Algorithm;

    this.scoreNotes = algo.notes;
    this.melodyRhythm = algo.rhythm;
    this.chordRythm = algo.rhythm;
    this.drumList = algo.drumRhythm;
    this.melodyList = [];
    this.chordList = new Array();
    this.drumList = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++){
      this.chordList[beatsPerMeasure] = new Array(0, 0, 0);
    }

    for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++){
      this.drumList[beatsPerMeasure] = new Array();
    }


  }

  _renderMelody () {

    this.scoreNotes = algo.notes;
    this.melodyRhythm = algo.rhythm;

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
    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.chordRythm == 1){
          for (let voices = 0; voices < 3; voices++){
            this.scoreNotes = algorithm.notes;
            this.chordList[beatsPerMeasure][voices] = this.scoreNotes[voices];
          }
        }
      }
      console.log("chordList = ", this.chordList);
    }

  _renderDrumRhythm () {
    let drumVoices = algo.drumVoices;
    this.drumRhythm = algo.drumRhythm;

    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.chordRythm == 1){
          for (let voices = 0; voices < drumVoices; voices++){
            this.drumList[beatsPerMeasure][voices].push(this.drumRhythm[beatsPerMeasure % this.drumRhythm.length][voices]);
          }
        }
      }
      console.log("drumList = ", this.drumList);
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
