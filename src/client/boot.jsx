/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material.js';
import 'antd/dist/antd.css';
// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

console.log('app booting');

function saveAppInstance(appComponentInstance) {
	window.app = appComponentInstance; //useful for debugging.
}

App.getUserInfo().then(user => {
	//mounty mounty
	ReactDOM.render(<App ref={saveAppInstance} user={user} />, reactContainer);
});
