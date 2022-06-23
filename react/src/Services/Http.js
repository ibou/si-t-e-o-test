import axios from 'axios';

const axiosInstance = axios.create();
const configure = () => {
  axiosInstance.interceptors.request.use((config) => {
    // config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return Promise.resolve(config);
  });
};

const getAxiosClient = () => axiosInstance;
const baseApi = process.env.REACT_APP_BACKEND_HOST;
const Http = { 
  configure,
  getAxiosClient,
  baseApi,
};
export default Http;