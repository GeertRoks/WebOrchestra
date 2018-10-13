const fmSynth = new FmStrings(3);
const algo = new Algorithm;
const lead = new Lead;
const lead2 = new Lead;

var noteLengthSlider;
var intervalSilder;
var octaveLeadSlider;
var octaveChordsSlider;

var numberOfSliders = 4;

var fmNotes = algo.notes;
var rhythm = algo.rhythm;

var trigger = false;
var countSequence = 0;

function setupSequencer () {

  // background(0);

  //Slider controls ============================================================
  intervalSilder = createSlider(1, 12, 3);
  noteLengthSlider = createSlider(0, 10, 1);
  octaveLeadSlider= createSlider(-2, 2, 0);
  octaveChordsSlider = createSlider(-2, 2, 0);

  var sliderPos = displayWidth/numberOfSliders;

  intervalSilder.position(10 + (0 * sliderPos), 10);
  intervalSilder.style('width', '80px');
  noteLengthSlider.position(10 + (1 * sliderPos), 10);
  noteLengthSlider.style('width', '80px');
  octaveLeadSlider.position(10 + (2 * sliderPos), 10);
  octaveLeadSlider.style('width', '80px');
  octaveChordsSlider.position(10 + (3 * sliderPos), 10);
  octaveChordsSlider.style('width', '80px');

  lead._setRhythm(rhythm);
  lead2._setRhythm(rhythm);
  updateParams();

}

function updateParams(){
  algo._setInterval(intervalSilder.value());
  fmSynth._setOctave(octaveChordsSlider.value());
  lead._setOctave(octaveLeadSlider.value());
  lead2._setOctave(octaveLeadSlider.value() + 1);
  lead._setNoteDuration(noteLengthSlider.value());
  lead2._setNoteDuration(noteLengthSlider.value());
}

function updateNotes() {
  algo._constructNotes();
  var fmNotes = algo.notes;
  fmSynth._setNotes(fmNotes);
  lead._setNotes(fmNotes);
  lead2._setNotes(fmNotes);
}

function sequence() {
  var d = new Date();
  updateParams();

  if(d.getMilliseconds() % 125 <= 20 && !trigger){

    if(countSequence % 2 == 0) {
      lead._sequence();
    }


    if(countSequence % 2 == 1) {
      lead2._sequence();

    }

    if(countSequence % 32 == 0) {
      console.log("count = ", count % 32);
      fmSynth._sequence();
      updateNotes();
    }
    console.log("count = ", count);
    trigger = true;
    countSequence++;
  }

  if(d.getMilliseconds() % 125 >= 50 && trigger){
    trigger = false;
  }
}
