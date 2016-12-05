import React, { Component } from 'react';
import { Link } from '../components/navigation';
import { Col, Card } from 'antd';
import InstallButton from './install-button';
import FancyImage from './fancy-image';

export default class GistCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const directLink = <Link to={`/gist/${this.props.id}`}>view</Link>;
        return (
                <Col lg={8} md={11} sm={17} xs={17} style={{ padding: '1rem' }}>
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
