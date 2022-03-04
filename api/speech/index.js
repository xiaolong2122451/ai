const GET_Recognize = require('./components/recognize/index');

module.exports = {
	"短语音识别" : function( data ){
		return new Promise( (resolve,reject) => {
			GET_Recognize( data ).then( res => {
				resolve(res)
			}).catch( error => {
				console.log( error )
			})

		})
	}
}