import React, { Component } from 'react';
import { Link } from './navigation';
import { Menu, Col } from 'antd';

import logoImage from '../logo.png';

export default class TopMenu extends Component {
    constructor(props) {
        super(props);

        const [,pathname = 'home'] = location.pathname.match(/^\/(\w+)/) || [];
        this.state = {
            current: pathname,
        };
    }
    handleClick(e) {
        this.setState({
            current: e.key
        });
    }
    render() {
        const logoutLink = (
            <Menu.Item key="logout">
                <Link to="/logout">logout</Link>
            </Menu.Item>
        );

        const loginLink = (
            <Menu.Item key="login">
                <Link to="/login">login</Link>
            </Menu.Item>
        );

        const profileLink = (
            <Menu.Item key="profile">
                <Link to="/profile">profile</Link>
            </Menu.Item>
        );

        const loggedInLinks = [profileLink, logoutLink];

        return (
            <div>
                <Col lg={4} md={6} sm={24} xs={24}>
                    <Link to="/">
                        <img src={logoImage} /> ROBOGIST STORE
                    </Link>
                </Col>
                <Col lg={20} md={18} sm={17} xs={24} style={{display: 'block'}}>
                    <Menu mode="horizontal" key="menu" selectedKeys={[this.state.current]} onClick={e=>this.handleClick(e)}>
                        <Menu.Item key="home">
                            <Link to="/">home</Link>
                        </Menu.Item>
                        <Menu.Item key="browse">
                            <Link to="/browse">browse</Link>
                        </Menu.Item>

                        {this.props.loggedIn ? loggedInLinks : loginLink}
                    </Menu>
                </Col>
            </div>
        );
    }
}
