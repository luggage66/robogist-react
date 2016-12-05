import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import Home from './home';
import Browse from './browse';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

export default function Pages(props) {
	return (
	<div>
	    <Match pattern="/" exactly component={Home} />
	    <Match pattern="/browse" exactly component={Browse} />
	    <Match pattern="/login" exactly render={ args => (
	    	!props.loggedIn ? 
	    	<Login /> : 
	    	<Redirect to={{pathname: '/', state: {from: args.location}}}/>
	    )} />
	    <Match pattern="/logout" exactly render={ args => (
	    	props.loggedIn ? 
	    	<Logout {...props} /> :
	    	<Redirect to={{pathname: '/', state: {from: args.location}}}/>
	    )} />
	    <Match pattern="/profile" exactly component={UserProfile} />
	    <Miss component={NotFound} />
	</div>
)};
