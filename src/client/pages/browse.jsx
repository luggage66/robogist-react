import React, { Component } from 'react';
import { Link } from 'react-router';
import { page } from '../dataLoading';

async function getFoo() {
    const response = await fetch('/api/foo', { method: 'POST' });
    const json = await response.json();
    return json;
}

// waits for shit :D how awesome is that 
@page({
    queries: {
        foo: _ => getFoo()
    }
})

export default class BrowsePage extends Component {
    render() {
        return (
            <div>{this.props.foo.data}</div>
        );
    }
}
