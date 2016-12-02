import React, { Component } from 'react';
import { Button } from 'antd';


export default class LogoutPage extends Component {
	constructor(props) {
		super(props);
		fetch('/logout', {
			method: 'POST',
			credentials: 'same-origin' 
		}).then(results => {
			// should redirect the user and change the loggedIn state on App
			// but I don't konw how to do that. 
			window.location = '/';
		})
	}
    render() {
    	return (
            <div>Logging you out...</div>
        );
    }
}
