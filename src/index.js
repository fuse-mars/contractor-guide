import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';


import './styles/index.css';
import './styles/semantic/dist/semantic.min.css';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />, document.getElementById('root')
);
registerServiceWorker();
