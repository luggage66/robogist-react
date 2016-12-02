import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';


export default class TopMenu extends Component {
    constructor(props) {
        super(props);

        const [,pathname = 'home'] = location.pathname.match(/^\/(\w+)/) || [];
        console.log( 'topmenu props in constructor', props );
        this.state = {
            current: pathname,
            loggedIn: props.loggedIn
        };
    }
    handleClick(e) {
        this.setState({
            current: e.key
        });
        console.log( this.state );
    }
    render() {
        let authlink =  (<Menu.Item key="login">
                            <Link to="/login">login</Link>
                        </Menu.Item>);
        if( this.state.loggedIn ) {
            authlink =  (<Menu.Item key="logout">
                            <Link to="/logout">logout</Link>
                        </Menu.Item>);
        }
        console.log('rendering topMenu with state: ', this.state)
        return (
            <Menu mode="horizontal" key="menu" selectedKeys={[this.state.current]} onClick={e=>this.handleClick(e)}>
                <Menu.Item key="home">
                    <Link to="/">home</Link>
                </Menu.Item>
                <Menu.Item key="browse">
                    <Link to="/browse">browse</Link>
                </Menu.Item>

                {authlink}
            </Menu>
        );
    }
}

