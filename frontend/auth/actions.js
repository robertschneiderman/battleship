import axios from 'axios';
import { hashHistory } from 'react-router';
import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'https://battlehip-with-chuck-norris.herokuapp.com';

export function signinUser({ email, name, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, name, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data.user });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', response.data.user._id);
        
        const currentUser = localStorage.getItem('currentUser');        
        dispatch({ type: 'REQUEST_USER', payload: currentUser });        
        hashHistory.push('game');
      })
      .catch(() => {
        dispatch(authError("Bad Login Info"));
      });
  };
}

export function signupUser({ email, name, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, name, password})
      .then(response => {
        debugger;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('currentUser', response.data.user._id);        
        dispatch({ type: AUTH_USER });
        hashHistory.push('game');
      })
      .catch(() => {
        dispatch(authError("Bad Signup Info"));
      });
      // .catch(response => dispatch(authError(response.data.error)))
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  return function(dispatch) {
    dispatch({ type: "SIGNOUT" });
    dispatch({ type: UNAUTH_USER });
  };
}