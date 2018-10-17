const score = new Score;
var socket;

var ref = [];
var countSequence = 0;
var trigger = false;
var switchState = 0;

function setup() {
  socket = io.connect("http://" + hostname + ":" + port);
  socket.emit('clienttype', "algorithm");
  sendNewNotes();

  var ts = timesync.create({
    server: socket,
    interval: 5000
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
    ts.receive(null, data);
  });
}

function sendNewNotes() {
  
  score._testStateVars(switchState + 1);
  score._renderScore();

  switchState = (switchState + 1) % 17;

  var scorelist = {
    drums: score.scoreDrums,
    melody: score.scoreMelody,
    chords: score.scoreChords
  };
  // console.log("scoreDrums @ score.js = ", score.scoreDrums);
  // console.log("scoreList @ score.js = ", scorelist);


  ref = [];

  for (var i = 0; i <256; i++) {
    ref.push(0);
  }

  socket.emit('newscore', scorelist);
}

function draw() {
  var d = new Date();

  if (d.getMilliseconds() % 125 <= 20 && !trigger) {
    ref.shift();
    // console.log('ref shift')
    trigger = true;
  }
  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }

  // console.log(ref.length);

  if (ref.length < 128) {
    sendNewNotes();
    console.log('send new notes');
  }
}
