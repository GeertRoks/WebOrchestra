var socket;

//kick sync test v
var kickRhythm      = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
//Sequencer=====================================================================
var startTime;
var triggerTime;
var triggerLength;
var index = 0;
var count = 0;
var firstSeq = true;
//==============================================================================
var env;

function preload() {
  soundFormats('wav');
  kick = loadSound('kick.wav');
}
//kick sync test ^

function setup() {
  createCanvas(displayWidth, displayHeight);
  socket = io.connect("http://localhost:3000");

  //Time sync code from their express example
  var ts = timesync.create({
    server: /timesync/,
    interval: 5000
  });
  ts.on('sync', function (state) {
    console.log('sync ' + state + '. Current date is: ' + Date());
  });
  ts.on('change', function (offset){
    console.log('changed offset: ' + offset + ' ms');
  });
  ts.send = function (to, data, timeout) {
    //console.log('send', data);
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: to,
        type: 'POST',
        data: JSON.stringify(data),
        contentType : 'application/json',
        dataType: 'json', // response type
        timeout: timeout
      })
      .done(function (data) {
        //console.log('receive', data);
        ts.receive(to, data);
        resolve();
      })
      .fail(function (err) {
        console.log('Error', err);
        reject(err);
      })
    });
  };

//Kick sync test v
  var cnv = createCanvas(100, 100);
  kick.setVolume(0.9);
//Kick sync test ^
}

function draw() {
  sequence();
}


//kick sync test v
function sequence() {
  var d = new Date();

  if(d.getMilliseconds() <= 20 || (d.getMilliseconds() >= 490 && d.getMilliseconds() <= 510)){

    if(kickRhythm[count % kickRhythm.length] == 1){
      kick.play();
    }
  }
}
//kick sync test ^
