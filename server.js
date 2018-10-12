// Server based on oscServer.js by csdhku:
// https://github.com/csdhku/csdosc/blob/master/oscServer.js

var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(app);

const port = 3000;

var clients = [];


//-----------Http server-------------//
// Start the server on the given port
function handler (req, res) {
  console.log('request', req.url);

// Lets the server reach all paths in the public folder
  if (req.url === '/timesync/timesync.js') {
    res.setHeader('Content-Type', 'application/javascript');
    return sendFile(path.join(__dirname, '/node_modules/timesync/dist/timesync.js'), res);
  }

  if (req.url === '/' || req.url === 'index.html') {
    return sendFile(__dirname + '/public/index.html', res);
  }
  if (req.url === '/' || req.url === '/sketch_client.js') {
    return sendFile(__dirname + '/public/sketch_client.js', res);
  }
  if (req.url === '/' || req.url === '/kick.wav') {
    return sendFile(__dirname + '/public/kick.wav', res);
  }

  // Generate error message when given page doesn't exist
  res.writeHead(404);
  res.end('Not found');
};

function sendFile(filename, res) {
  fs.readFile(filename,
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading ' + filename.split('/').pop());
        }

        res.writeHead(200);
        res.end(data);
      });
}

app.listen(port);
console.log('Server listening at http://192.168.0.100:' + port);




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

  socket.on('timesync', function (data) {
    console.log('message', data);
    socket.emit('timesync', {
      id: data && 'id' in data ? data.id : null,
      result: Date.now()
    });
  });
});

// Building block for a client object
function Client(type, id) {
  this.type = type;
  this.id = id;
};
