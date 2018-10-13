class Score {

  constructor () {

    const algo = new Algorithm;

    this.scoreNotes = algo.notes;
    this.melodyRhythm = algo.rhythm;
    this.chordRythm = algo.rhythm;
    this.noteIndex = 0;
    this.melodyList = [];
    this.chordList = new Array();

    for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++){
    this.chordList[beatsPerMeasure] = new Array(0, 0, 0);
    }
  }

  _renderMelody () {

    this.scoreNotes = algo.notes;
    this.melodyRhythm = algo.rhythm;

    console.log("ALGORITHM R = ", this.melodyRhythm);
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
        this.noteIndex = (this.noteIndex + 1) % this.scoreNotes.length;
      }
    }


  _renderChords () {
    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.chordRythm == 1){
          for (voices = 0; voices < 3; voices++){
            this.scoreNotes = algorithm.notes;
            this.chordList[beatsPerMeasure][voices] = this.scoreNotes[voices];
          }
        }
        this.noteIndex = (this.noteIndex + 1) % this.scoreNotes.length;
      }
      console.log(melodyList);
  }
}
