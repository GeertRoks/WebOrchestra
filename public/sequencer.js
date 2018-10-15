const drums = new Drums;
const fmSynth = new FmStrings(3);
const lead = new Lead;
const lead2 = new Lead;

var trigger = false;
var countSequence = 0;

function setupSequencer () {
  socket.emit('genscore');
  updateParams();
}

function updateParams(){
  fmSynth._setOctave(-1);
  lead._setOctave(2);
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

    if(countSequence % 1 == 0) {
      drums._sequence();
    }

    if(countSequence % 2 == 0) {
      lead._sequence();
    }

    if(countSequence % 2 == 1) {
      lead2._sequence();
    }


    if(countSequence % 2 == 0){
      fmSynth._sequence();
      }
    // console.log("count = ", count);
    trigger = true;
    countSequence++;
  }

  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }
}
