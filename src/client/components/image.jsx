import React, { Component } from 'react';
import { Icon } from 'antd';

export default class FancyImage extends Component {
    constructor(props) {
        super(props);
        console.log('props in Image, rendered from GistCard', props); // first <Image /> is fine, second <Image /> is undefined.. why? 
        this.state = {
            src: props.src,
            loading: true
        };
    }
    componentWillMount() {
        const tmp = new Image();
        tmp.onload = _ => {
            this.setState({loading: false});
        };
        tmp.src = this.state.src;
    }
    render() {
        if( this.state.loading ) {
            return <Icon type="loading" spin="true" />;
        }
        return <img src={this.state.src}/>
    }
}
