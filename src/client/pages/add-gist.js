import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AddGist extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form">
                <h3> Add New Gist </h3>
                <div className="control">
                    <label> Gist Name 
                            <input type="text" placeholder="Robo Gist!" />
                    </label>
                </div>
                <div className="control">
                    <label> Gist URL 
                            <input type="text" placeholder="Robo Gist!" />
                    </label>
                </div>
                <div className="control">
                    <label> Matching Pattern 
                            <input type="text" placeholder="Robo Gist!" />
                    </label>
                </div>
                <div className="control">
                    <label> Description
                            <input type="text" placeholder="Robo Gist!" />
                    </label>
                </div>
                <div className="control">
                    <button className="save">
                        save </button>
                </div>
            </div>
        );
    }
}

