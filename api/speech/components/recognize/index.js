let fs = require('fs');
var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "你的 App ID";
var API_KEY = "你的 Api Key";
var SECRET_KEY = "你的 Secret Key";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = function (){
	return new Promise( (resolve,reject) => {


		//let voice = fs.readFileSync('assets/voice/16k_test.pcm');
		//let voiceBuffer = new Buffer(voice);
		// 识别本地文件
		// client.recognize(voiceBuffer, 'pcm', 16000).then(function (result) {
		// 	console.log('<recognize>: ' + JSON.stringify(result));
		// }, function(err) {
		// 	console.log(err);
		// });
		resolve()
	})
}