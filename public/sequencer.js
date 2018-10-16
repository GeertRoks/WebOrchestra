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
  lead._setNoteDuration(2);
  lead2._setNoteDuration(2);
}


function updateNotes(scorelist) {
  //scoreChords = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  fmSynth._setScore(scorelist.chords);
  //scoreMelody = []
  lead._setScore(scorelist.melody.slice());
  lead2._setScore(scorelist.melody.slice());
  //scoreDrums = [[],[],[]] een lijst van 256 indexen voor iedere voice een lijst
  drums._setScore(scorelist.drums);
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
  }

  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }
}
