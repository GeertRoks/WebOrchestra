const fmSynth = new FmStrings(3);
const algo = new Algorithm;
const lead = new Lead;
const lead2 = new Lead;

var fmNotes = algo.notes;
var rhythm = algo.rhythm;

firstSeq = true;

function setup() {
  lead._setRhythm(rhythm);
  lead2._setRhythm(rhythm);
  algo._setInterval(3);
  fmSynth._setOctave(0);
  lead2._setOctave(1);
}

function updateNotes() {
  algo._constructNotes();
  var fmNotes = algo.notes;
  fmSynth._setNotes(fmNotes);
  lead._setNotes(fmNotes);
  lead2._setNotes(fmNotes);
}

function draw() {
    sequence();
}


function sequence() {

  if(firstSeq){
  startTime = millis();
  triggerLenght = 100;
  count = 0;
  firstSeq = false;
  }

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){

      if(count % 2 == 0) {
        lead._sequence();
      }

      if(count % 2 == 1) {
        lead2._sequence();
      }

      if(count % 32 == 0) {
        fmSynth._sequence();
        updateNotes();
      }

    count++;
  }
}
