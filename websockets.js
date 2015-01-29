/**
 * Created by sbunke on 1/20/2015.
 */

var socketio = require('socket.io');
var async = require('async');

var messages = [];
var sockets = [];

exports.broadcast = function (topic, data) {


    if (sockets) {
        console.log('sockets length: ' + sockets.length);
    }
    else {
        console.log('sockets do not exist');
    }


    sockets.forEach(function (socket) {
        socket.emit(topic, data);
    });




}

exports.connect = function(server) {
    console.log('started socket io');

    var io = socketio.listen(server);

    io.on('connection', function (socket) {
        messages.forEach(function (data) {
            socket.emit('message', data);
        });

        console.log('connection made');

        sockets.push(socket);

        //broadcast('message', 'my test info');

        socket.on('disconnect', function () {
            sockets.splice(sockets.indexOf(socket), 1);
            //updateRoster();
        });

        socket.on('message', function (msg) {

            console.log('message received: ' + msg);
            var text = String(msg || '');

            if (!text)
                return;

            socket.get('name', function (err, name) {
                var data = {
                    name: name,
                    text: text
                };

                broadcast('message', data);
                console.log('message broadcast: ' + msg);
                messages.push(data);
            });
        });

        socket.on('identify', function (name) {
            socket.set('name', String(name || 'Anonymous'), function (err) {
                //updateRoster();
            });
        });
    });

    function updateRoster() {
        async.map(
            sockets,
            function (socket, callback) {
                socket.get('name', callback); //TODO: SOCKET HAS NO GET METHOD?
            },
            function (err, names) {
                broadcast('roster', names);
            }
        );
    }

    function broadcast(event, data) {
        sockets.forEach(function (socket) {
            socket.emit(event, data);
        });
    }



}

/*
io.on('connection', function (socket) {
    messages.forEach(function (data) {
        socket.emit('message', data);
    });
*/
/*
var ws = require('ws')
exports.connect = function (server) {
    var wss = new ws.Server({server: server})
    wss.on('connection', function (ws) {
        ws.send('hello!')
    })
}

*/