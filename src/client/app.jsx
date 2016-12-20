import React, { Component } from 'react';

import Pages from './pages';

import './assets/style.scss';

export default class App extends Component {

	static childContextTypes = {
		currentUser: React.PropTypes.object
	}

	static async getUserInfo() {
		const response = await fetch('/api/user/info', { method: 'POST', credentials: 'same-origin' });
		const json = await response.json();

		if (json.error) {
			return null; //no user
		}
		else {
			return json.data[0];
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			currentUser: props.user
		};
	}

	getChildContext() {
		return { currentUser: this.state.currentUser };
	}

	handleAuthenticationChange() {
		App.getUserInfo().then(userInfo => this.setState({ currentUser: userInfo }));
	}

	componentWillMount() {
		window.authenticationCompleteCallback = _ => this.handleAuthenticationChange();
	}

	render() {
		// build up the UI here. the main app should contain the overall layout I think. 
		// pages is the content pages. 
		// I'll also have to manage the Nav's here unless there is too much state passing
		// and it gets messy. The nav can be built with each page if that is the case. 
		return (
			<Pages />
		);
	}
}
