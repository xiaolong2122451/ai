const WebSocket = require('ws');
const API = require('./api/speech/index')

const client = null;
const wss = new WebSocket.Server({
	port: 8090
});


//绑定事件connection，此事件是当有客户端连接时，触发
wss.on('connection', function (client) { //client就是连接的客户端对象
	client = client;
	//给客户端对象绑定事件message，当客户端发送信息时，触发该事件
	client.on('message', function (msg) { //给客户端对象绑定message事件，有信息发过来了。

		API["短语音识别"]( msg ).then( res => {
			client.send( JSON.stringify({
				code : 200,
				data : res,
				message : 'success'
			}))
		})

	});
});
