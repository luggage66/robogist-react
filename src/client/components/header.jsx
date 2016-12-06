import React, { Component } from 'react';
import { Link } from 'react-router';

import logoImageMain from '../logo-main.png';

export default class Header extends Component {
    
    static contextTypes = {
        currentUser: React.PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    getAvailableLinks() {
        const [,pathname = 'home'] = location.pathname.match(/^\/(\w+)/) || [];
        const {loggedIn} = this.props;
        const links = [
            {
                key: 'home',
                props: {
                    to: '/'
                }
            },
            {
                key: 'addgist',
                props: {
                    to: '/addgist'
                },
                authToggle: true
            },
            {
                key: 'profile',
                props: {
                    to: '/profile'
                },
                authToggle: true
            },
            {
                key: 'login',
                props: {
                    to: '/login'
                },
                authToggle: false
            },
            {
                key: 'logout',
                props: {
                    to: '/logout'
                },
                authToggle: true
            }
        ];
        const availableLinks = [];
        for( const link of links ) {
            const {key, props, authToggle = null} = link;
            props.className = 'pop-button';
            if( key === pathname ) {
                props.className += ' active';
            }
            if( (authToggle === true && loggedIn) || authToggle === null || (authToggle === false && !loggedIn) ) {
                availableLinks.push(<Link key={key} {...props}>{key}</Link>);
            }
        }
        return availableLinks;
    }

    render() {
        return (
            <div className="header" style={{backgroundImage: `url(${logoImageMain})`}}>
                <div className="menu">
                    {this.getAvailableLinks()}
                </div>
            </div>
        );
    }
}