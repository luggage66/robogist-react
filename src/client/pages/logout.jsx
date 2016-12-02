import React, { Component } from 'react';
import { Button } from 'antd';


export default class LogoutPage extends Component {
	constructor(props) {
		super(props);
		fetch('/logout', {
			method: 'POST'
		}).then(results => {
			console.log(results);
		})
	}
    render() {
    	return (
            <div>Logging you out...</div>
        );
    }
}
