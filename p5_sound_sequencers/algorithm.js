
class Algorithm {

    constructor () {
      console.log("hallo");
      this.first = true;
      this.notePicked = 0;
    }

  _constructNotes () {
    const scale = [60, 62, 63, 65, 67, 68, 70, 72];
    const notes = new Array(1);

    for (let i = 0; i < notes.length; i++) {
      notes[i] = new Array(3);
    }

    if(this.first){
      this.notePicked = Math.round((Math.random() * 10) % 8);
    }


    for (let i = 0; i < 3; i++){
        notes[0][i] = scale[this.notePicked];
      if (!this.first) {
        this.notePicked = notes[0][Math.round((Math.random() * 2) % 3)];
      }
      //noot afstand = 5 (1, 2, 3, 4)
      this.notePicked = (this.notePicked + 3) % 8;
    }
   return notes;
  }

  _constructRhythm () {
    const rhythm = [1, 0, 1, 0, 1, 1, 1];
    // for (let i = 0; i < 7; i++){
    //   rhythm[i] = Math.round(Math.random(1));
    // }
    return rhythm;
  }

  get notes () {
    let c = this._notes = this._constructNotes();
    return c;
  }

  get rhythm () {
    let r = this._rhythm;
    if (!r) r = this._rhythm = this._constructRhythm();
    return r;
  }
}
