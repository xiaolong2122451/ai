let fs = require('fs');
var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "25694300";
var API_KEY = "jeZyOSEHmV0LYG8LQw1BTGgx";
var SECRET_KEY = "ZxDuvuGAiyq170S0TGUAV0BcI0WOuowD";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = function ( data ){
	return new Promise( (resolve,reject) => {
		let voice = fs.readFileSync('D:\\www\\my\\ai\\ai-baidu\\api\\speech\\components\\recognize\\16k.wav');
		let voiceBuffer = new Buffer(data);
		client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
			resolve({
				...result
			})
		}, function(err) {
			console.log(err);
		});

	})
}