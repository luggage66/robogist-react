import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

export default class GistList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gists: [],
			offset: 0
		};
	}
	async getGistList(offset, limit) {
		const response = await fetch(`/api/gist/list?offset=${offset}&limit=${limit}`, { 
			method: 'GET', 
			credentials: 'same-origin'
		});
		const json = await response.json();
		return json.rows;
	}
	async getGistCount() {
		const response = await fetch('/api/gist/count', { 
			method: 'GET', 
			credentials: 'same-origin'
		});
		const json = await response.json();
		return json.rows;
	}
	loadDataFromServer() {
		console.log(this.props);
		const {limit} = this.props;
		Promise.all([this.getGistCount(),this.getGistList(this.state.offset,limit)]).then(data => {
			const [[{count}],list] = data;
			this.setState({
				gists: list, 
				pageCount: Math.ceil( count / limit )
			});
		});
	}
	handlePageClick(data) {
		const {selected} = data;
		const offset = Math.ceil( selected * this.props.limit );
		this.setState({offset}, _ => {
			this.loadDataFromServer();
		});
	}
	componentDidMount() {
		this.loadDataFromServer();
	}
	render() {
		const rows = this.state.gists.map((details,i) => {
			return (<tr key={i}>
				<td></td>
				<td>{details.name}</td>
				<td>{details.gistid}</td>
				<td>{details.matches}</td>
				<td>{details.description}</td>
				<td></td>
			</tr>);
		});
		return (
			<div className="table">
				<table>
					<thead>
						<tr>
						<th></th>
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
						<th></th>
						</tr>
					</thead>
					<tbody className="gist-list">
						{rows}
					</tbody>
				</table>
				<ReactPaginate  previousLabel={"previous"}
								nextLabel={"next"}
								breakLabel={<a href="">...</a>}
								breakClassName={"break-me"}
								pageCount={this.state.pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={data => this.handlePageClick(data)}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"} />
			</div>
		);
	}
}