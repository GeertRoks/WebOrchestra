const score = new Score;
var socket;

var ref = [];
var countSequence = 0;
var trigger = false;

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
  score._setMelodyState(1);
  score._setStringsState(3);
  score._renderScore();

  var scorelist = {
    drums: score.scoreDrums,
    melody: score.scoreMelody,
    chords: score.scoreChords
  };

  for (var i = 0; i <scorelist.drums[0].length; i++) {
    ref.push(scorelist.drums[0].shift());
  }
  console.log(ref);

  socket.emit('newscore', scorelist);
  socket.emit('sendmask', 256);
}

function draw() {
  var d = new Date();

  if (d.getMilliseconds() % 125 <= 20 && !trigger) {
    ref.shift();
    console.log('ref shift')
    trigger = true;
  }
  if(d.getMilliseconds() % 125 >= 40 && trigger){
    trigger = false;
  }

  if (ref.length < 128) {
    sendNewNotes();
    //console.log('send new notes');
  }
}
