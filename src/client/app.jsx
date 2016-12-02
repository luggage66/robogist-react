import React, { Component } from 'react';

import { BrowserRouter, Link } from 'react-router';
import { Row, Col } from 'antd';
import TopMenu from './components/top-menu';

import { page } from './dataLoading';

import './style.scss';

import logoImage from './logo.png';

import pages from './pages';

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
		this.state = {
			loggedIn: !('error' in this.props.user)
		};
	}
	handleAuthenticationChange(message) {
		this.setState({loggedIn: true});
	}
	componentWillMount() {
		window.authenticationCompleteCallback = msg => this.handleAuthenticationChange(msg); // this doesn't check shit. just waits for a response. fix
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
							
							<TopMenu loggedIn={this.state.loggedIn} />

						</Col>
					</Row>

					<Row className="page-content">
						{pages}
					</Row>

				</div>
			</BrowserRouter>
		);
	}
}

