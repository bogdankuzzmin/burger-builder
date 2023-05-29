import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-be198-default-rtdb.firebaseio.com/'
});

export default instance;

