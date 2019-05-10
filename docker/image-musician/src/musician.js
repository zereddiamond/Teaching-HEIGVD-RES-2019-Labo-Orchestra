const uuidv4 = require('uuid/v4');

// https://stackabuse.com/command-line-arguments-in-node-js/
var instrumentArgument = process.argv[2];
var idMusician = uuidv4();

var port = 50000;
var host = '127.0.0.1';
var multicast_group = '233.252.18.10';

var instruments = ['piano', 'trumpet', 'flute', 'violin', 'drum'];
var soundInstruments = ['ti-ta-ti', 'pouet', 'trulu', 'gzi-gzi', 'boum-boum'];

var index;
for(var i = 0; i < instruments.length; ++i) {
    // https://www.tutorialspoint.com/What-is-the-best-way-to-compare-two-strings-in-JavaScript
    if(instrumentArgument.localeCompare(instruments[i]) == 0) {
        index = i;
        break;
    }
}

var datagram = require('dgram');
var client = datagram.createSocket('udp4');
var message;
var index;

message = new Buffer('UUID : ' + idMusician +', Instrument : ' + instruments[index] + ', sound : ' + soundInstruments[index]);

var json;

function clientSend() {
    var date = new Date();
    json = new Buffer(JSON.stringify({ uuid: idMusician, instrument: instruments[index], activeSince: date }));
    client.send(json, 0, json.length, port, multicast_group, function(err, bytes) {
        if (err) throw err;
        console.log('Instrument : ' + instruments[index] + ', sound : ' + soundInstruments[index]);
    });
}

setInterval(clientSend, 1000);