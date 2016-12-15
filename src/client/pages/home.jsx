import React, { Component } from 'react';
import { Link } from 'react-router';
import { page } from '../dataLoading';
import GistList from '../components/gist-list';

export default class HomePage extends Component {
	static contextTypes = {
		currentUser: React.PropTypes.object
	}
	//Logged in as {this.context.currentUser ? this.context.currentUser.login : 'NO ONE'}
	render() {
		return (
			<div>
				<h3> Gist Store </h3>
				<GistList offset="0" limit="5" />
			</div>
		);
	}
}
