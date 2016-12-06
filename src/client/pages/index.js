import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import Home from './home';
import AddGist from './add-gist';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

export default function Pages(props) {
	return (
	<div>

		<Match pattern="/" exactly component={Home} />

		<Match pattern="/addgist" exactly render={ args => (
			props.loggedIn ?
			<AddGist {...props}/> :
			<Redirect to={
				{
					pathname: '/login', 
					state: {
						from: args.location
					}
				}
			}/>
		)} />

		<Match pattern="/login" exactly render={ args => (
			!props.loggedIn ? 
			<Login /> : 
			<Redirect to={
				{
					pathname: args.location.state ? args.location.state.from.pathname : '/', 
					state: {from: args.location}
				}
			}/>
		)} />

		<Match pattern="/logout" exactly render={ args => (
			props.loggedIn ? 
			<Logout {...props}/> :
			<Redirect to={
				{
					pathname: '/', 
					state: {
						from: args.location
					}
				}
			}/>
		)} />

		<Match pattern="/profile" exactly render={ args => (
			props.loggedIn ?
			<UserProfile {...props}/> :
			<Redirect to={
				{
					pathname: '/login', 
					state: {
						from: args.location
					}
				}
			}/>
		)} />

		<Miss component={NotFound} />
	</div>
)};
 