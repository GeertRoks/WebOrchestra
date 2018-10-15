// Server based on oscServer.js by csdhku:
// https://github.com/csdhku/csdosc/blob/master/oscServer.js

var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(app);

const port = 3000;
var clients = [];


//-----------Http server-------------//
function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

const mimeLookup = {
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.wav': 'audio/wave',
  '.otf': 'application/x-font-otf',
  '.ttf': 'application/x-font-ttf'
};

// Start the server on the given port
function handler (req, res) {
  if (req.method == 'GET') {
    //load Timesync
    let fileurl;

    if (req.url === '/timesync/timesync.js') {
      fileurl = '/node_modules/timesync/dist/timesync.js';
    } else if (req.url == '/') {
       fileurl = '/public/index.html';
    } else if (req.url == '/conductor_rhythm') {
      fileurl = '/public/conductor_rhythm/index.html';
    } else if (req.url == '/conductor_melody') {
      fileurl = '/public/conductor_melody/index.html';
    } else if (req.url == '/conductor_drone') {
      fileurl = '/public/conductor_drone/index.html';
    } else if (req.url == '/algorithm') {
      fileurl = '/public/algorithm/index.html';
    } else {
       fileurl = '/public' + req.url;
    }
    let filepath = path.resolve('./' + fileurl);

    let fileExt = path.extname(filepath);
    let mimeType = mimeLookup[fileExt];

    if (!mimeType) {
     send404(res);
     return;
    }

    fs.exists(filepath, (exists) => {
     if (!exists) {
       send404(res);
       return;
     }
     res.writeHead(200, {'Content-Type': mimeType});
     fs.createReadStream(filepath).pipe(res);
    });
  }
};

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
  console.log('A client connected!');
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
    console.log('Current clients: ');
    for (var j = 0; j < clients.length; j++) {
      console.log('client ' + j + ': ' + Object.entries(clients[j]));
    }
    console.log(' ');
  });

  socket.on('timesync', function (data) {
    socket.emit('timesync', {
      id: data && 'id' in data ? data.id : null,
      result: Date.now()
    });
  });

  socket.on('newscore', function (scorelist) {
    socket.broadcast.emit('newscore', scorelist);
    console.log(scorelist);
  });

  socket.on('genscore', function () {
    socket.broadcast.emit('genscore');
  });

  socket.on('conductor', function (data) {
    // console.log(data.id + ' conductor: ' + data.x +' '+ data.y);
  })

});

// Building block for a client object
function Client(type, id) {
  this.type = type;
  this.id = id;
};
