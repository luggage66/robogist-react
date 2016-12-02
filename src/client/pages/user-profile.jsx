import React, { Component } from 'react';
import { Link } from 'react-router';
import { page } from '../dataLoading';

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
            <div>{JSON.stringify(this.props.user.data)}</div>
        );
    }
}
