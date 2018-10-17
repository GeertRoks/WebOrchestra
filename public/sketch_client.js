var socket;

function setup() {
  //Server Setup
  createCanvas(displayWidth, displayHeight);
  socket = io.connect("http://" + hostname + ":" + port);
  socket.emit('clienttype', "instrument");

  //  Time sync code from their socket example vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
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
  //  TimeSync^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  socket.on('newscore', function (data) {
    updateNotes(data.score, data.mask);
    // console.log('mask: ' + data.mask.kick);
  });

  //P5 setup
  setupSequencer();
  bsodSetup();
}

// ================ DRAW
function draw() {
  sequence();
  if(frameCount % 3 == 0){
    bsodDraw();
  }
}


function keyTyped() {
	// onNote();
}
