import React, { Component } from 'react';
import { Link } from 'react-router';
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
        
        if( this.props.user.error ) {
            return <div>{this.props.user.error}</div>;
        }
        return (
            <div>
                <Row>
                    <Col lg={4} md={4} sm={4} xs={0}>
                        <FancyImage src="http://lorempizza.com/400/400" style={{borderRadius: '50%', width: '100%'}} />
                    </Col>
                </Row>
                <Row>
                    <Col offset={1} lg={4} md={6} sm={6} xs={24}>
                        <h1>{this.props.user.data[0].login}</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}