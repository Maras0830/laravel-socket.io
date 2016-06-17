var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

// Redis subscribe `message-channel` channel.
redis.subscribe('message-channel', function (err, count) {
});

// when Redis event, Socket.IO Server send message.
redis.on('message', function (channel, message) {
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});

// connection Socket.IO Server with port 3000.
http.listen(3000, function () {
    console.log('Listening on Port 3000');
});
