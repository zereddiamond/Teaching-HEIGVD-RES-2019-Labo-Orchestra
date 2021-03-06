// include packages
var net = require('net');
var datagram = require('dgram');
var moment = require('moment');

var mapMusicians = new Map();

var host = '127.0.0.1';
var port = 2205;

var port_udp = 50000;
var multicast_address = '233.252.18.10';

net.createServer(function(socket) {
    console.log('client connected');

    socket.on('data', function(data) {
        console.log('Message from client : ' + data);
    });

    socket.on('close', function() {
        console.log('Connection closed');
    });
    
    verificationAllMusicians();

    var result = [];

    mapMusicians.forEach(function(value, key) {
        result.push(value);
    });

    socket.write(JSON.stringify(result));
    socket.write('\r\n');
    socket.end();
}).listen(port);

var serverUdp = datagram.createSocket('udp4');

serverUdp.on('listening', function() {
    console.log('Waiting for musicians requests...');
});

function delayBetweenTimes(dateAndTime) {
    var start = moment(dateAndTime);
    var end = moment();

    var difference = moment.duration(end.diff(start));
    var seconds = difference.asSeconds();

    return seconds;
}

function verificationAllMusicians() {
    mapMusicians.forEach(function(value, key) {
        infos = value;
        var dateAndTime = infos.activeSince;

        var delay = delayBetweenTimes(dateAndTime);

        if(delay >= 5) {
            mapMusicians.delete(key);
        }
    });
}

var infosMusician;
serverUdp.on('message', function(message, remote) {
    console.log('From orchestra : ' + message);

    infosMusician = JSON.parse(message);

    mapMusicians.set(infosMusician.uuid, infosMusician);
});

serverUdp.bind(port_udp, function() {
    serverUdp.addMembership(multicast_address);
});