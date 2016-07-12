import React from 'react';
import ReactDOM from 'react-dom';

class TestClass extends React.Component {
	render() {
		return (
			<div>
				Hello world!
			</div>
		)
	}
}

const documentLocation = document.getElementById('app');

ReactDOM.render((
    <TestClass />
), documentLocation);