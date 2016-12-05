import React from 'react';
import { pushState } from '../routing';

export class Link extends React.Component {
    handleClick = (event) => {
        pushState(this.props.to);
        event.preventDefault();
    }

    render() {
        let { to, onClick, ...otherProps } = this.props;

        return <a href={to} onClick={this.handleClick} {...otherProps}>
            {this.props.children}
        </a>;
    }
}
