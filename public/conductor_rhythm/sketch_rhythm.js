var socket;

function setup() {
  createCanvas(displayWidth, displayHeight);
  socket = io.connect("http://localhost:3000/conductor_rhythm/");
}

function draw() {
  ellipse(mouseX, mouseY, 100);
}
