import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{

	componentDidMount() {

	}

	render() {
		return (
			<div>
				这是一段话
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementsByTagName('body')[0]
);




