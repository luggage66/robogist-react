import React, { Component } from 'react';
import { Button } from 'antd';


export default class LoginPage extends Component {
	constructor(props) {
		super(props);
	}
	// openLoginPopup() {
	// 	const loginPopup = window.open(`${window.location.origin}/login/github`, 'login', 'toolbar=0,status=0,width=548,height=325');
	// }
	// postLogin() {

	// }
    render() {
    	return (
            <Button type="primary" onClick={ _=> window.location = '/login/github'}>Login with GitHub</Button>
        );
    }
}
