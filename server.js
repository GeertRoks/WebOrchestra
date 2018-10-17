var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(app);

const port = 3000;
var clients = [];
var instrumentclients = [];


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
  '.ttf': 'application/x-font-ttf',
  '.jpg': 'image/jpeg'
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

    // find the right ID out of the clients array
    let i = clients.findIndex(i => i.id === socket.id);
    if (clients[i].type == 'instrument') {
      // remove the client out of the instrumentclients array
      let j = instrumentclients.indexOf(socket.id);
      instrumentclients.splice(j, 1);
    }
    // remove the right ID out of the client array
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

  // Define the client type of a client
  socket.on('clienttype', function(type) {
    let i = clients.findIndex(i => i.id === socket.id);
    clients[i].type = type;
    console.log('Type added to client[' + i + ']. Type is: ' + clients[i].type);
    console.log(' ');

    if (type == "instrument") {
      instrumentclients.push(clients[i].id);
      console.log('Client[' + i + '] added to the instrumentclients array.');
      console.log(' ');
    }
  });

  // Send the new score to the instrument clients
  socket.on('newscore', function (scorelist) {
    let masks = makeMasks(256, instrumentclients.length);
    for (let i = 0; i < instrumentclients.length; i++) {
      let data = {
        mask: masks[i],
        score: scorelist
      }
      io.sockets.connected[instrumentclients[i]].emit('newscore', data);
    }
    console.log('new score + mask send!');
  });


  // Send data from Conductors to instruments and algorithm
  socket.on('rhythm', function (data) {
    // console.log('rhythm\t' + data.param0);
  })

  socket.on('drone', function (data) {
    // console.log('drone\t' + data.param0);
  })

  socket.on('melody', function (data) {
    // console.log('melody\t' + data.param0);
  })
});


// Building block for a client object
function Client(type, id) {
  this.type = type;
  this.id = id;
};

function makeMasks (notelistlength, clientslength) {
  let masks = [];
  for (var i = 0; i < clientslength; i++) {
    masks.push(new Mask([], [], [], [], [], [], [], [], [], [], [], []));
  }
  let instname = "undefined";
  for (let instrument = 0; instrument < 12; instrument++) {
    switch (instrument) {
      case 0:
        instname = "kick";
        break;
      case 1:
        instname = "snare";
        break;
      case 2:
        instname = "hihat";
        break;
      case 3:
        instname = "stringsvoice1";
        break;
      case 4:
        instname = "stringsvoice2";
        break;
      case 5:
        instname = "stringsvoice3";
        break;
      case 6:
        instname = "lead1voice1";
        break;
      case 7:
        instname = "lead1voice2";
        break;
      case 8:
        instname = "lead1voice3";
        break;
      case 9:
        instname = "lead2voice1";
        break;
      case 10:
        instname = "lead2voice2";
        break;
      case 11:
        instname = "lead2voice3";
        break;
      default:
        instame = "undefined";
    }

    for (let i = 0; i < notelistlength; i++) {
      //choose a random number between 0 and the amount of instrument clients. That is the one that plays a note.
      var hit = getRandomInt(masks.length);
      masks[hit][instname].push(1);
      for (let j = 0; j < masks.length; j++) {
        // give the not playing clients a 0
        if (j != hit) {
          masks[j][instname].push(0);
        }
      }
    }
    // for (let i = 0; i < masks.length; i++) {
    //   console.log('masks[' + i + '].' + instname + ': ' + masks[i][instname]);
    //   console.log('masks[' + i + '].' + instname + '.length: ' + masks[i][instname].length);
    // }
  }
  return masks;
}

// Gives random integer between 0 and max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// mask building block
function Mask(kick, snare, hihat, stringsvoice1, stringsvoice2, stringsvoice3, lead1voice1, lead1voice2, lead1voice3, lead2voice1, lead2voice2, lead2voice3) {
  this.kick = kick;
  this.snare = snare;
  this.hihat = hihat;
  this.stringsvoice1 = stringsvoice1;
  this.stringsvoice2 = stringsvoice2;
  this.stringsvoice3 = stringsvoice3;
  this.lead1voice1 = lead1voice1;
  this.lead1voice2 = lead1voice2;
  this.lead1voice3 = lead1voice3;
  this.lead2voice1 = lead2voice1;
  this.lead2voice2 = lead2voice2;
  this.lead2voice3 = lead2voice3;
};
