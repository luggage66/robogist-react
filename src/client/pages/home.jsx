import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row, Col, Card } from 'antd';
import dataStore from '../dataStore';
import GistCard from '../components/gist-card';

export default class HomePage extends Component {
    // static contextTypes = { //must declare which context things ou want
    //     currentUser: React.PropTypes.object
    // }
    //Logged in as {this.context.currentUser ? this.context.currentUser.login : 'NO ONE'}

    render() {
    	const gists = [];
    	for( const gist of dataStore.getGists() ) {
    		gists.push(
				<GistCard  key={gist.id} {...gist} />
    		);
    	}
        return (
        	<Row>
                
                {gists}
            </Row>

        );
    }
}
