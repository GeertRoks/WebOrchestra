// Server based on oscServer.js by csdhku:
// https://github.com/csdhku/csdosc/blob/master/oscServer.js

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

var clients = [];

//Web sockets
// What to do when a client connects
io.sockets.on('connection', function(socket) {
  // For it to work:
  //    - Add socket.io cdn to html
  //    - Add 'var socket = io.connect('url');' to the p5 sketch in setup.

  // Add the new client to the clients array with its socket id.
  clients.push(new Client("client", socket.id));

  for (var j = 0; j < clients.length; j++) {
    console.log('client ' + j + ': ' + Object.entries(clients[j]));
  }

// What to do when a client disconnects
  socket.on('disconnect', function() {
    console.log('Client disconnect!');

    // remove the right ID out of the clients array.
    var i = clients.findIndex(i => i.id ===socket.id);
    clients.splice(i, 1);

    for (var j = 0; j < clients.length; j++) {
      console.log('client ' + j + ': ' + Object.entries(clients[j]));
    }
  });
});

// Building block for a client object
function Client(type, id) {
  this.type = type;
  this.id = id;
};


//Http server
// Start the server on the given port
server.listen(port, function() {
  console.log("Server is running on port " +port);
});

// Lets the server reach all paths in the public folder
app.use(express.static(path.join(__dirname,'/public/')));

// Generate error message when given page doesn't exist
app.use(function(req,res,next) {
  res.status(400).send("Error 400: Bad Request. This folder doesn't exist");
});
