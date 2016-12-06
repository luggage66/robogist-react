import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HomePage extends Component {
    // static contextTypes = { //must declare which context things ou want
    //     currentUser: React.PropTypes.object
    // }
    //Logged in as {this.context.currentUser ? this.context.currentUser.login : 'NO ONE'}

    render() {
        const rows = [];
        for( let i = 0; i < 12; i++ ) {
            rows.push(
                <tr key={i}>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            );
        }
        return (
            <div>
                <h3> Gist Store </h3>
                <div className="table">
                    <table>
                    <thead>
                        <tr>
                        <th></th>{/* actions */}
                        <th>
                            Name
                        </th>
                        <th>
                            ID
                        </th>
                        <th>
                            Matches
                        </th>
                        <th>
                            Description
                        </th>
                        <th></th>{/* vote or display if not logged in */}
                        </tr>
                    </thead>
                    <tbody id="gist-list">
                        {rows}
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
