import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.3/ProyectoComepa/web/',
});

export default axiosClient;
