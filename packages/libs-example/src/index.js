import LugiaThemeDevTools from '@lugia/theme-hoc-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './selector/demo';
import * as serviceWorker from './serviceWorker';
LugiaThemeDevTools.inject(window);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
