const score = new Score;
var socket;

function setup() {
  socket = io.connect(hostname + ":" + port);
  socket.on('genscore', sendNewNotes);
}

//function sendNewNotes() {
function mouseClicked() {
  score._renderScore();

  var scorelist = {
    drums: score.scoreDrums,
    melody: score.scoreMelody,
    chords: score.scoreChords
  };

  socket.emit('newscore', scorelist);
}
