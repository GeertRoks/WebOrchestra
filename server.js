// Server based on oscServer.js by csdhku:
// https://github.com/csdhku/csdosc/blob/master/oscServer.js

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

var clients = [];



//---------Web sockets---------//
// What to do when a client connects
io.sockets.on('connection', function(socket) {
  // For it to work:
  //    - Add socket.io cdn to html
  //    - Add 'var socket = io.connect('url');' to the p5 sketch in setup.

  // Add the new client to the clients array with its socket id.
  clients.push(new Client("client", socket.id));
  // Debug code
  console.log('Current clients: ');
  for (var j = 0; j < clients.length; j++) {
    console.log('client ' + j + ': ' + Object.entries(clients[j]));
  }
  console.log(' ');

  // What to do when a client disconnects
  socket.on('disconnect', function() {
    console.log('A client disconnect!');

    // remove the right ID out of the clients array.
    var i = clients.findIndex(i => i.id === socket.id);
    clients.splice(i, 1);
    // Debug code
    console.log('Current clients: ');
    for (var j = 0; j < clients.length; j++) {
      console.log('client ' + j + ': ' + Object.entries(clients[j]));
    }
    console.log(' ');
  });

  socket.on('mouse', function(data) {
    console.log(data);
  });
});

// Building block for a client object
function Client(type, id) {
  this.type = type;
  this.id = id;
};




//-----------Http server-------------//
// Start the server on the given port
server.listen(port, function() {
  console.log("Server is running on port " +port);
});

// Lets the server reach all paths in the public folder
app.use('/', express.static(path.join(__dirname,'/public/')));

// Timesync code from their express example
app.use('/timesync/', express.static(path.join(__dirname, '/node_modules/timesync/dist')));
app.post('/timesync', function (req, res) {
  var data = {
    id: (req.body && 'id' in req.body) ? req.body.id : null,
    result: Date.now()
  };
  res.json(data);
});

// Generate error message when given page doesn't exist
app.use(function(req,res,next) {
  res.status(400).send("Error 400: Bad Request. This folder doesn't exist");
});
