var socket;
var count = 0;

function setup() {
  //Server Setup
  createCanvas(displayWidth, displayHeight);
  // socket = io.connect("http://192.168.0.100:3000");
  socket = io.connect("localhost:3000");


//  Time sync code from their socket example ==================================
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

  //P5 setup
  setupSequencer();
  bsodSetup();
}

// ================ DRAW
function draw() {
  sequence();
  if(count % 4 == 0){
    bsodDraw();
  }
  count++;
}

function keyTyped()
{
	onNote();
}
