import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Col, Card } from 'antd';
import dataStore from '../dataStore';
import GistCard from '../components/gist-card';

export default class HomePage extends Component {
    render() {
    	const gists = [];
    	for( const gist of dataStore.getGists() ) {
    		gists.push(
				<GistCard  key={gist.id} {...gist} />
    		);
    	}
        return (
        	<Row>{gists}</Row>
        );
    }
}
