const drums = new Drums;
const fmSynth = new FmStrings(3);
const lead = new Lead;
const lead2 = new Lead;

var trigger = false;
var countSequence = 0;

function setupSequencer () {
  updateParams();
}

function updateParams(){
  lead._setOctave(1);
  lead2._setOctave(2);
  lead._setNoteDuration(3);
  lead2._setNoteDuration(3);
}

function updateNotes(scorelist, mask) {
  //scoreChords = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  fmSynth._setScore(scorelist.chords, mask);
  //scoreMelody = []
  lead._setScore(scorelist.melody, mask);
  //copy scorelist.melody
  var melodyTwoScore = scorelist.melody.slice()
  //create a offset of 1
  melodyTwoScore.unshift(0);
  melodyTwoScore.pop();
  lead2._setScore(melodyTwoScore ,mask);
  //scoreDrums = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  drums._setScore(scorelist.drums, mask);
  // console.log("chords @ updateNotes = ", scorelist.chords);
  // console.log("lead @ updateNotes = ", scorelist.melody);
  // console.log("drums @ updateNotes = ", scorelist.drums);
}

function sequence() {
  var d = new Date();
  updateParams();

  if(d.getMilliseconds() % 125 <= 20 && !trigger){

    drums._sequence();

    lead._sequence();

    lead2._sequence();

    fmSynth._sequence();

    trigger = true;

    // if(countSequence % 256 == 0) {
    //   updateNotes();
    // }
    countSequence++;
  }

  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }
}
