import React, { Component } from 'react';

import { BrowserRouter, Link, browserHistory } from 'react-router';
import { Row, Col } from 'antd';
import Header from './components/header';

import { page } from './dataLoading';

import './style.scss';

import logoImage from './logo.png';

import Pages from './pages';

async function getUserInfo() {
    const response = await fetch('/api/user/info', { method: 'GET', credentials: 'same-origin' });
    const json = await response.json();
    return json;
}

@page({
    queries: {
        user: _ => getUserInfo()
    }
})

export default class App extends Component {

	constructor(props) {
		super(props);
		// should I store 'user' in the state and pass it down to every page that needs it?
		// or should I pull it every page. makes little sense to pull it every page, 
		// but I'm still not 100% on what is allowed to go in state. 
		this.state = {
			loggedIn: !('error' in this.props.user)
		};
		/* is this kosher? 
		there are a few pages that use some of this information.
		if( this.state.loggedIn ) {
			this.state.user = props.user.data[0];
		}
		*/

	}
	handleAuthenticationChange(state) {
		this.setState({loggedIn: state});
	}
	componentWillMount() {
		window.authenticationCompleteCallback = msg => this.handleAuthenticationChange(true); // this doesn't check shit. just waits for a response. fix
	}
	render() {
		return (
			<BrowserRouter>
				<div className="page-wrapper">
					<Row className="page-header">
						<Header loggedIn={this.state.loggedIn} />
					</Row>
					<Row className="page-content">
						<Pages loggedIn={this.state.loggedIn} authenticationRevokedHandler={_ => this.handleAuthenticationChange(false)} />
					</Row>
				</div>
			</BrowserRouter>
		);
	}
}

