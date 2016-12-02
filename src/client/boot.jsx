/* globals document */
import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
// import 'react-mdl/extra/material.css';
// import 'react-mdl/extra/material.js';
import 'antd/dist/antd.css';
// make a root element to mount the app into
let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

//mounty mounty
ReactDom.render(<App />, reactContainer);
