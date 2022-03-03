const WebSocket = require('ws');
const API = require('./api/speech/index')


const wss = new WebSocket.Server({
	port: 8090
});

wss.on('message', function message(data) {
	console.log('received: %s', data);
});
