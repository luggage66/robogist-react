import React, { Component } from 'react';
import { Link } from 'react-router';
import FancyImage from '../components/fancy-image';
import { Menu, Col } from 'antd';

import logoImage from '../logo.png';

export default class Header extends Component {
    
    static contextTypes = {
        currentUser: React.PropTypes.object
    }

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
        const links = [];
        // this is pretty bad, I know it. I'm still not sure about the nav containers I can use. 
        // so I'm cheating / being lazy and just fucking with the styles here
        // don't judge me, I'm already dead. 
        if( this.props.loggedIn ) {
            links.push(
                <Menu.Item key="logout" style={{float: 'right'}}>
                    <Link to="/logout">logout</Link>
                </Menu.Item>);
            links.push(
                <Menu.Item key="profile" style={{float: 'right'}}>
                    <Link to="/profile">
                        profile <FancyImage 
                                    src={this.context.currentUser.avatar_url} 
                                    style={
                                            {
                                                borderRadius: '50%', 
                                                width: '28px', 
                                                padding: '0 2px', 
                                                verticalAlign: 'middle'
                                            }
                                    }/>
                    </Link>
                </Menu.Item>);
        } else {
            links.push(
            <Menu.Item key="login" style={{float: 'right'}}>
                <Link to="/login">login</Link>
            </Menu.Item>
            );
        }

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
                        {links}
                    </Menu>
                </Col>
            </div>
        );
    }
}

