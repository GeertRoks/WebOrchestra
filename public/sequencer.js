const algo = new Algorithm;
const score = new Score;
const drums = new Drums;
const fmSynth = new FmStrings(3);
const lead = new Lead;
const lead2 = new Lead;

var noteLengthSlider;
var intervalSilder;
var octaveLeadSlider;
var octaveChordsSlider;

var numberOfSliders = 4;

var fmNotes;
var rhythm;
var chordRhythm;

var trigger = false;
var countSequence = 0;

function setupSequencer () {

  score._renderScore();
  // drums._setScore(score.scoreDrums);

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
  updateNotes();
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

//update notes moet gekoppeld worden aan de server
function updateNotes() {
  score._renderScore();
  // fmSynth._setScore(score.scoreChords);
  lead._setScore(score.scoreMelody);  
  lead2._setScore(score.scoreMelody);
  drums._setScore(score.scoreDrums);
}

function sequence() {
  var d = new Date();
  updateParams();

  if(d.getMilliseconds() % 125 <= 20 && !trigger){

    if(countSequence % 1 == 0) {
      drums._sequence();
    }
    //
    if(countSequence % 2 == 0) {
      lead._sequence();
    }
    //
    //
    if(countSequence % 2 == 1) {
      lead2._sequence();
    }

    //
    // if(countSequence % 2 == 1){
    //   fmSynth._sequence();
    //   }

    // console.log("count = ", count);
    trigger = true;
    countSequence++;
  }

  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }
}

// const algo = new Algorithm;
// const score = new Score;
// const drums = new Drums;
// const fmSynth = new FmStrings(3);
// const lead = new Lead;
// const lead2 = new Lead;
//
// var noteLengthSlider;
// var intervalSilder;
// var octaveLeadSlider;
// var octaveChordsSlider;
//
// var numberOfSliders = 4;
//
// var fmNotes = algo.notes;
// var rhythm = algo.rhythm;
// var chordRhythm = fmSynth._getRhythm();
//
// var trigger = false;
// var countSequence = 0;
//
// function setupSequencer () {
//
//   score._renderMelody();
//
//   //Slider controls ============================================================
//   intervalSilder = createSlider(1, 12, 3);
//   noteLengthSlider = createSlider(0, 10, 1);
//   octaveLeadSlider= createSlider(-2, 2, 0);
//   octaveChordsSlider = createSlider(-2, 2, 0);
//
//   var sliderPos = displayWidth/numberOfSliders;
//
//   intervalSilder.position(10 + (0 * sliderPos), 10);
//   intervalSilder.style('width', '80px');
//   noteLengthSlider.position(10 + (1 * sliderPos), 10);
//   noteLengthSlider.style('width', '80px');
//   octaveLeadSlider.position(10 + (2 * sliderPos), 10);
//   octaveLeadSlider.style('width', '80px');
//   octaveChordsSlider.position(10 + (3 * sliderPos), 10);
//   octaveChordsSlider.style('width', '80px');
//
//   lead._setRhythm(rhythm);
//   lead2._setRhythm(rhythm);
//   updateParams();
//
// }
//
// function updateParams(){
//   algo._setInterval(intervalSilder.value());
//   fmSynth._setOctave(octaveChordsSlider.value());
//   lead._setOctave(octaveLeadSlider.value());
//   lead2._setOctave(octaveLeadSlider.value() + 1);
//   lead._setNoteDuration(noteLengthSlider.value());
//   lead2._setNoteDuration(noteLengthSlider.value());
// }
//
// //update notes moet gekoppeld worden aan de server
// function updateNotes() {
//   algo._constructNotes();
//   var fmNotes = algo.notes;
//   fmSynth._setNotes(fmNotes);
//   lead._setNotes(fmNotes);
//   lead2._setNotes(fmNotes);
// }
//
// function sequence() {
//   var d = new Date();
//   updateParams();
//
//   if(d.getMilliseconds() % 125 <= 20 && !trigger){
//
//     if(countSequence % 1 == 0) {
//       drums._sequence();
//     }
//
//     if(countSequence % 2 == 0) {
//       lead._sequence();
//     }
//
//
//     if(countSequence % 2 == 1) {
//       lead2._sequence();
//     }
//
//
//     if(chordRhythm[countSequence % chordRhythm.length] == 1){
//       updateNotes();
//       fmSynth._sequence();
//       }
//
//     // console.log("count = ", count);
//     trigger = true;
//     countSequence++;
//   }
//
//   if(d.getMilliseconds() % 125 >= 40 && trigger){
//     trigger = false;
//   }
// }
