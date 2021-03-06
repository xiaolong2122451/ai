import React from 'react';
import ReactDOM from 'react-dom';

//import style
import './index.css';

//保存音频文件数据流
let mediaRecorder = null; //音频对象
let chunks = [];
let ws = null; //webSocket

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			audioSrc : null,
			beginAuto : false
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleDown );
		document.addEventListener('keyup', this.handleUp );

		ws = new WebSocket('ws://localhost:8090');
		ws.onmessage = this.handleMessage;

	}

	handleDown = (e) => {

		if( this.state.beginAuto ){
			return false
		}

		switch ( e.keyCode ){
			case 13 :
				this.handleReCording();
			default:
				return;
		}
	}

	handleUp = () => {
		this.setState({
			beginAuto : false
		},() => {
			mediaRecorder.stop();
		})
	}

	//开始录音
	handleReCording(){
		this.setState({
			beginAuto : true
		},() => {

			navigator.mediaDevices.getUserMedia({
				audio : {
					channelCount: 1,
					sampleRate: 16000,
					sampleSize: 16,
					volume: 1
				}
			}).then( stream => {

				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.start();
				mediaRecorder.ondataavailable = function(e) {
					chunks.push(e.data);
				}
				mediaRecorder.onstop = this.handleRecordingStop

			}).catch( error => {
				console.log( error );
			})


		})
	}

	//结束录音
	handleRecordingStop = (e)=>{

		var blob = new Blob(chunks, { 'type' : 'audio/wav' });
		var audioURL = window.URL.createObjectURL(blob);

		this.setState({
			audioSrc : audioURL
		},() => {
			blob.arrayBuffer().then( buffer  => {
				console.log( new Uint8Array(buffer)  )
				ws.send( new Uint8Array(buffer)  );
				chunks = [];
			})
		})

	}

	//ws接受
	handleMessage( res ){
		const results = JSON.parse( res.data );
		console.log( results )
	}

	render() {
		return (
			<div>
				<audio src={ this.state.audioSrc } controls={true}></audio>
				<div className={`frame ${this.state.beginAuto ? 'active' : '' }`}>
					<label htmlFor="check" className="loader">
						<svg width="120px" height="120px" viewBox="0 0 120 120">
							<circle className="circle" cx="60" cy="60" r="58"></circle>
						</svg>
						<div className="microphone">
							<div className="body">
								<div className="inner"></div>
								<div className="inner"></div>
								<div className="inner"></div>
							</div>
							<div className="stem"></div>
							<div className="base"></div>
						</div>
						<div className="dots">
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						</div>
					</label>
					<p className={'tips'}>按下回车键说话</p>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementsByTagName('body')[0]
);




