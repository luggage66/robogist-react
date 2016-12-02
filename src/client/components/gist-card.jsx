import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col, Card } from 'antd';
import InstallButton from './install-button';
import FancyImage from './image';

export default class GistCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const directLink = <Link to={`/gist/${this.props.id}`}>view</Link>;
        console.log('this.props.image from GistCard', this.props.image);
        return (
                <Col lg={8} md={8} sm={12} xs={24} style={{ padding: '1rem' }}>
                    <Card title={this.props.name} extra={directLink}>
                        <FancyImage src={this.props.image} />
                        <p>
                            {this.props.description}
                        </p>
                        <p>
                            <InstallButton />
                            <span style={{float: 'right'}}> Added by {this.props.username} </span>
                        </p>
                    </Card>
                </Col>
        );
    }
}

