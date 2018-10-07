
var numVoices = 3;
var numCar = 3;
// the carrier frequency pre-modulation
var carrierBaseFreq = 220;

var carriers = []
var modulators = []

var firstSeq = true;

var envAmp = [];
var envFilter = [];
var filters = [];
var reverb = new p5.Reverb();
var isExp = true;


function initSynthVoice(numVoices){

  for (var y = 0; y < numVoices; y++){
    envAmp.push(new p5.Env());
    envAmp[y].setADSR(1, 1, 0.9, 1);
    envAmp[y].setRange(1, 0);
    envAmp[y].setExp(1);

    envFilter.push(new p5.Env());
    envFilter[y].setADSR(1.2, 1.2, 50, 1);
    envFilter[y].setRange(72, 0);
    envFilter[y].setExp(1);

    filters.push(new p5.LowPass());
    filters[y].freq(envFilter[y]);

    for(var i = 0; i < numCar; i++){
      carriers.push(new p5.Oscillator('sawtooth'));
      carriers[i].freq(carrierBaseFreq); // set frequency
      carriers[i].amp(envAmp[y]);
      filters[y].freq(envFilter[y]);
      carriers[i].start(); // start oscillating
      carriers[i].disconnect();
      carriers[i].connect(filters[y]);
      reverb.process(filters[y], 5, 2);

      modulators.push(new p5.Oscillator('sine'));
      modulators[i].start();
      // add the modulator's output to modulate the carrier's frequency
      modulators[i].disconnect();
      carriers[i].freq(modulators[i]);
    }
    modulators[y].freq(4.8);
    modulators[y].amp(2);
    modulators[1 + y].freq(-4.8);
    modulators[1 + y].amp(2);
    modulators[2 + y].freq(0);
    modulators[2 + y].amp(0);
  }
}

function mtof(midiPitch) {
  return pow(2.0,(midiPitch-69.0)/12.0) * 440.0;
}

function setNotes() {
    var add = Math.round(Math.random() * 10);
    notes = [50 + add, 53 + add, 57 + add];

    for(var y = 0; y < numVoices; y++){
      freqq = mtof(notes[y]);
      for(var i = 0; i < numCar; i++){
        carriers[i + y].freq(freqq);
      }
    }
}


function setup() {

  initSynthVoice(3);
  setNotes();

  var cnv = createCanvas(800,400);
  noFill();

}


function draw() {
  background(30);

  sequence();
}

function sequence() {

  if(firstSeq){
  startTime = millis();
  triggerLenght = 6000;
  count = 0;
  firstSeq = false;
  }

  triggerTime = startTime + (triggerLenght * count);

  if(millis() >= triggerTime){
      if(count % 2 == 0){
        for(var y = 0; y < numVoices; y++){
          setNotes();
          envAmp[y].triggerAttack();
          envFilter[y].triggerAttack();
        }
        console.log("attack");
      } else {
        console.log("release");
      }
    count++;
  }
}
