const score = new Score;
const drums = new Drums;
const fmSynth = new FmStrings(3);
const lead = new Lead;
const lead2 = new Lead;

var trigger = false;
var countSequence = 0;

function setupSequencer () {
  updateNotes();
  updateParams();
}

function updateParams () {
  // algo._setInterval(intervalSilder.value());
  lead._setOctave(1);
  lead2._setOctave(2);
  lead._setNoteDuration(2);
  lead2._setNoteDuration(2);
}

//update notes moet gekoppeld worden aan de server
function updateNotes() {
  // score._setMelodyState(Math.round(Math.random() * 4));
  // score._setStringsState(Math.round(Math.random() * 4));
  score._setMelodyState(4);
  score._setStringsState(2);
  score._renderScore();
  //scoreChords = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  fmSynth._setScore(score.scoreChords);
  //scoreMelody = [] , used slice() to create a copy of the list
  lead._setScore(score.scoreMelody.slice());
  lead2._setScore(score.scoreMelody.slice());
  //scoreDrums = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  drums._setScore(score.scoreDrums);

  console.log("score melody = ", score.scoreMelody);
  console.log("score chords = ", score.scoreChords);
  console.log("score drums = ", score.scoreDrums);
}

function sequence() {
  var d = new Date();
  updateParams();

  if(d.getMilliseconds() % 125 <= 20 && !trigger){

    // drums._sequence();

    lead._sequence();

    // lead2._sequence();

    fmSynth._sequence();

    trigger = true;

    if(countSequence % 256 == 0) {
      updateNotes();
    }
    countSequence++;
  }

  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }
}
