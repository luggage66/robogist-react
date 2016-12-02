import React from 'react';
import { Match, Miss } from 'react-router';
import Home from './home';
import Browse from './browse';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

export default (
	<div>
	    <Match pattern="/" exactly component={Home} />
	    <Match pattern="/browse" exactly component={Browse} />
	    <Match pattern="/login" exactly component={Login} />
	    <Match pattern="/logout" exactly component={Logout} />
	    <Match pattern="/profile" exactly component={UserProfile} />
	    <Miss component={NotFound} />
	</div>
);
