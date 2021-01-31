import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-df1f2-default-rtdb.firebaseio.com/'
});

export default instance;

