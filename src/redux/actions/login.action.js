import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
  } from '../types/types';
  import axios from 'axios';

  
  
  export const adminLogin = (data) => (dispatch) => {
    dispatch({ type: POST_LOGIN_REQUEST });
    return axios({
      method: 'POST',
      url: `auth/signIn`,
      headers: {
        Accept: "application/json",
      },
      data: {
        loginField: data.email,
        type: 'email',
        password: data.password,
        userType: 'admin',
  
      },
    })
      .then((response) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          payload: response.data,
        });
        return response.data
      })
      .catch((error) => {
        return dispatch({
          type: POST_LOGIN_ERROR,
          payload: error.response,
        });
      });
  }
  
  