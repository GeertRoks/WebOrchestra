var socket;

function setup() {
  createCanvas(displayWidth, displayHeight);
  socket = io.connect("http://localhost:3000");
  var timestamp = {
    second: second(),
    minute: minute(),
    hour: hour()
  }

  socket.emit('timestamp', timestamp);
}

function draw() {
  ellipse(mouseX, mouseY, 100);
}
