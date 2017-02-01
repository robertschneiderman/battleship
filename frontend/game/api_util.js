import axios from 'axios';

const ROOT_URL = (process.env.NODE_ENV !== "production") ? 'http://localhost:3090' : 'https://trackyy.herokuapp.com';
// const ROOT_URL = 'https://trackyy.herokuapp.com';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const attackBoard = (data, success) => {
  axios.patch(`${ROOT_URL}/boards/`, data)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};
