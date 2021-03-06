import axios from 'axios';

const ROOT_URL = 'https://battlehip-with-chuck-norris.herokuapp.com';

  axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
  axios.defaults.headers.post['Content-Type'] = 'application/json';

export const attackBoard = (data, success) => {
  axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  // debugger;
  axios.patch(`${ROOT_URL}/boards/`, data)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const newGame = (success) => {
  axios.post(`${ROOT_URL}/games`)
  .then(success);
};