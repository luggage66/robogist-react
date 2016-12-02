import React, { Component } from 'react';

import { BrowserRouter, Link } from 'react-router';
import { Row, Col } from 'antd';
import TopMenu from './components/top-menu';

import './style.scss';

import logoImage from './logo.png';

import pages from './pages';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
	}
	componentWillMount() {
		window.handlePopupClosure = message => {
			const newState = {loggedIn: true};
			console.log('updating state of App', newState);
			this.setState(newState);
			console.log('new state', this.state);
		};
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

