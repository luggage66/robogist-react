//third prty JS
import React, { Component } from 'react';
import { BrowserRouter, Link, browserHistory } from 'react-router';
import { Row, Col } from 'antd';

//my JS
import TopMenu from './components/top-menu';
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
			currentUser: props.user
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

	render() {
		return (
			<BrowserRouter>
				<div className="page-wrapper">

					<Row className="page-header">
						<Col lg={4} md={8} sm={8} xs={0}>
							<img src={logoImage} />
						</Col>
						<Col lg={20} md={16} sm={16} xs={24}>

							<TopMenu loggedIn={!!this.state.currentUser} />

						</Col>
					</Row>

					<Row className="page-content">
						<Pages loggedIn={!!this.state.currentUser} authenticationRevokedHandler={_ => this.handleAuthenticationChange(false)} />
					</Row>

				</div>
			</BrowserRouter>
		);
	}
}
