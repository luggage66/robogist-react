import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';

export default class InstallButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isInstalled: false
        };
    }
    toggleLoading() {
        if( this.state.loading ) return;
        const loading = !this.state.loading;
        this.setState({loading});
        this.refs.button.disabled = true;
        setTimeout(_ => this.setState({loading: false, isInstalled: true}), 2000);
    }
    render() {
        return (
            <Button disabled={this.state.isInstalled} ref="button" type={this.state.isInstalled ? "secondary" : "primary"} loading={this.state.loading} onClick={_=>this.toggleLoading()}>
                {this.state.loading ? 'installing' : this.state.isInstalled ? 'installed' : 'install'}
            </Button>
        );
    }
}

