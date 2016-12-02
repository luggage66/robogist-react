import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';


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
            <Menu mode="horizontal" key="menu" selectedKeys={[this.state.current]} onClick={e=>this.handleClick(e)}>
                <Menu.Item key="home">
                    <Link to="/">home</Link>
                </Menu.Item>
                <Menu.Item key="browse">
                    <Link to="/browse">browse</Link>
                </Menu.Item>

                {this.props.loggedIn ? loggedInLinks : loginLink}
            </Menu>
        );
    }
}

