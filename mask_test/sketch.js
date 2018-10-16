var clients = [];

function setup() {
  for (var i = 0; i < 1; i++) {
    clients.push(new Mask([], [], [], [], [], [], [], [], [], [], [], []));
  }

  makeMask();
}

function makeMask () {
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

    for (let i = 0; i < 256; i++) {
      var hit = getRandomInt(clients.length);
      clients[hit][instname].push(1);
      for (let j = 0; j < clients.length; j++) {
        if (j != hit) {
          clients[j][instname].push(0);
        }
      }
    }
    for (let i = 0; i < clients.length; i++) {
      console.log('client[' + i + '].' + instname + ': ' + clients[i][instname]);
      console.log('client[' + i + '].'+ instname + '.length: ' + clients[i][instname].length);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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
