import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

function saveAppInstance(appComponentInstance) {
	window.app = appComponentInstance; //useful for debugging.
}

App.getUserInfo().then(user => {
	ReactDOM.render(<App ref={saveAppInstance} user={user} />, reactContainer);
});
