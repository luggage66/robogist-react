import React, { Component } from 'react';
import { page } from '../dataLoading';
import { Row, Col, Card } from 'antd';
import FancyImage from '../components/fancy-image';

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

export default class UserProfilePage extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        if( 'error' in this.props.user ) {
            return <div>{this.props.user.error}</div>;
        }
        const user = this.props.user.data[0];
        return (
            <Row>
                here be the user
            </Row>
        );
    }
}
