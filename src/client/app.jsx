//third prty JS
import React, { Component } from 'react';
import { Row, Col } from 'antd';

//my JS
import Header from './components/header';
import { page } from './dataLoading';
import Pages from './pages';

//non-JS
import './style.scss';
import logoImage from './logo.png';

export default class App extends Component {

	//define what we provide to children implicitly
	static childContextTypes = {
		currentUser: React.PropTypes.object
	}

	// we use this to pre-fetch data, so it's static.
	static async getUserInfo() {
		const response = await fetch('/api/user/info', { method: 'GET', credentials: 'same-origin' });
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

		// here we COPY user from props to state and then only ever use it
		// from state. This is because the props.user can get out-of-date and
		// we want to update it on-the-fly.
		this.state = {
			currentUser: props.user,
			currentComponent: () => <div>loading</div>,
			currentComponentParams: undefined
		};
	}

	getChildContext() {
		return { currentUser: this.state.currentUser };
	}

	handleAuthenticationChange(state) {
		App.getUserInfo().then(userInfo => this.setState({ currentUser: userInfo }));
	}

	componentWillMount() {
		window.authenticationCompleteCallback = msg => this.handleAuthenticationChange(true); // this doesn't check shit. just waits for a response. fix
	}

	setCurrentPage(component, props) {
		console.log('setCurrentPage', component, props);
		this.setState({
			currentComponent: component,
			currentComponentParams: props
		});
	}

	render() {
		return (
			<div className="page-wrapper">
				<Row className="page-header">
					<Header loggedIn={!!this.state.currentUser} />
				</Row>
				<Row className="page-content">
					<this.state.currentComponent {...this.state.currentComponentParams} loggedIn={!!this.state.currentUser} authenticationRevokedHandler={_ => this.handleAuthenticationChange(false)} />
				</Row>
			</div>
		);
	}
}
