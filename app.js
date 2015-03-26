// Emitter
var events = require('events');
var channel = new events.EventEmitter();
channel.clients = {};
channel.broadcastList = {};
channel.on('join', function (id, socket) {
        this.clients[id] = socket;
        this.broadcastList[id] = function (senderId, data) {
            if (id != senderId) {
                this.clients[id].write(data);
            }
        };
        this.on('broadcast', this.broadcastList[id]);
    }
);

// Net Server
var net = require('net');
var server = net.createServer(function (socket) {
    var id = socket.remoteAddress + ':' + socket.remotePort;
    channel.emit('join', id, socket);
    socket.on('data', function (data) {
        channel.emit('broadcast', id, data.toString());
    });
});
server.listen(8124);
