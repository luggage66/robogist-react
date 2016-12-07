import React, { Component } from 'react';
import { Link } from 'react-router';
import { page } from '../dataLoading';

async function getGistList() {
    const response = await fetch('/api/gist/list?offset=0&limit=3', { 
        method: 'GET', 
        credentials: 'same-origin'
    });
    const json = await response.json();
    return json.rows;
    //return 'rows' in json ? json.rows : [];
}

@page({
    queries: {
        gists: _ => getGistList()
    }
})

export default class HomePage extends Component {
    static contextTypes = {
        currentUser: React.PropTypes.object
    }
    //Logged in as {this.context.currentUser ? this.context.currentUser.login : 'NO ONE'}

    render() {
        const rows = this.props.gists.map((row,i) => {
            return (
                <tr key={i}>
                    <td>-</td>
                    <td>{row.name}</td>
                    <td>{row.gistid}</td>
                    <td>{row.matches}</td>
                    <td>{row.description}</td>
                    <td>-</td>
                </tr>
            );
        })
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
