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
  socket = io.connect("http://192.168.0.100:3000");

  var ts = timesync.create({
    server: socket,
    interval: 5000
  });
  ts.on('sync', function (state) {
    console.log('sync ' + state + '');
  });
  ts.on('change', function (offset) {
    console.log('changed offset: ' + offset + ' ms');
  });
  ts.send = function (socket, data, timeout) {
    //console.log('send', data);
    return new Promise(function (resolve, reject) {
      var timeoutFn = setTimeout(reject, timeout);
      socket.emit('timesync', data, function () {
        clearTimeout(timeoutFn);
        resolve();
      });
    });
  };
  socket.on('timesync', function (data) {
    //console.log('receive', data);
    ts.receive(null, data);
  });

//Kick sync test v
  createCanvas(100, 100);
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
      console.log("date: " + d);
    }
  }
}
//kick sync test ^
