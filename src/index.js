import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import the Redux store
import App from './App';

ReactDOM.render(
  <Provider store={store}> {/* Wrap the App with Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
