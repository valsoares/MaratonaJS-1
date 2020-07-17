import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './services/store';
import TokenRefresher from './components/refresh';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TokenRefresher />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);