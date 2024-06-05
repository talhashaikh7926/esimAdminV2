import React from 'react';
import Router from './routing/routes';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/flaticon/_flaticon.scss';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { AUTHENTICATE } from './redux/types/types';

const history = createBrowserHistory({ forceRefresh: true });

const App = () => {

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      if (error.response?.status === 406 || error.response?.status === 402) {
        notification.error({
          message: 'Session Expired!!',
          className: 'toast-error',
        });
        localStorage.removeItem('token');
      
        // store.dispatch({ type: AUTHENTICATE, payload: {} })
      } else {
        return Promise.reject(error);
      }
    }
  );

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
