import React from 'react';
import { Match, Miss } from 'react-router';
import Home from './home';
import Browse from './browse';
import Login from './login';
import NotFound from './not-found';

export default (
	<div>
	    <Match pattern="/" exactly component={Home} />
	    <Match pattern="/browse" exactly component={Browse} />
	    <Match pattern="/login" exactly component={Login} />
	    <Miss component={NotFound} />
	</div>
);
