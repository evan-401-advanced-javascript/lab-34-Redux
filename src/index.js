import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';

import createStore from './create-store';

import * as serviceWorker from './serviceWorker';

/**
 * main renderer for the entire app. Wrapped in a provider tag created by redux
 * @type {Store<S, AnyAction>}
 */
const store = createStore();
ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
