// import React from 'react';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// let time = new Date();
// let time = new Date().toLocaleString();
class _Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// time: new Date().toLocaleString
			time: function(obj) {
				return new obj();
			}
		};
	}
	startTime(time) {
		time = this.state.time(Date);
		return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
	}

	componentDidMount() {
		// this.intervalID = setInterval(tick(), 1000);
		this.intervalID = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	tick() {
		this.setState(this.state.time(Date));
	}
	render() {
		// return <div className="App-clock">The time is {this.state.time}</div>;
		// return <div className="App-clock">The time is {this.state.time(Date)}</div>;
		return <div className="App-clock">The time is {this.startTime()}</div>;
	}
}
export default _Clock;
