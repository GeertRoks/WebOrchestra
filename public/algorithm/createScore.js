class Score {

  constructor () {
    const algorithm = new Algorithm;

    this.scoreNote = algo.notes;
    this.melodyRhythm = algo.rhythm;
    this.scoreChordRythm = algo.chordRythm;
    this.noteIndex = 0;
    this.melodyList = [];

    for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++){
    this.chordsList.push(new Array());
    }
    console.log(chordsList);
  }

  _renderMelody () {

    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure++)
        if (this.melodyRhythm == 1){
          this.melodyList.push(this.scoreNotes[this.noteIndex]);
        } else {
          this.melodyList.push(0);
        }
        this.noteIndex = (this.noteIndex + 1) % this.scoreNotes.length;
      }
      console.log(melodyList);
  }

  _renderChords () {
    for (let measures = 0; measures < 8; measures++){
      for (let beatsPerMeasure = 0; beatsPerMeasure < 32; beatsPerMeasure)
        if (this.melodyRhythm == 1){
          this.melodyList.push(this.scoreNotes[this.noteIndex]);
        } else {
          this.melodyList.push(0);
        }
        this.noteIndex = (this.noteIndex + 1) % this.scoreNotes.length;
      }
      console.log(melodyList);
  }
