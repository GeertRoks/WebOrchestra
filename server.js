//Server based on oscServer.js by csdhku:
//https://github.com/csdhku/csdosc/blob/master/oscServer.js

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

//Web sockets
io.sockets.on('connection', newConnection);


function newConnection(socket) {
  //add socket.io cdn to html and add 'var socket = io.connect('url');' to the p5 sketch in setup.
  console.log('new connection: ' + socket.id);
}


//Http server
//Start the server on the given port
server.listen(port, function() {
  console.log("Server is running on port " +port);
});

//lets the server reach all paths
app.use(express.static(path.join(__dirname,'/public/')));

//Generate error message when given page doesn't exist
app.use(function(req,res,next) {
  res.status(400).send("doet het niet");
});
