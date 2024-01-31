import axios from 'axios';

const isLocal = process.env.NODE_ENV === 'development';

axios.defaults.baseURL = isLocal
  ? process.env.REACT_APP_LOCAL_SERVER
  : process.env.REACT_APP_PROD_SERVER;

// Could be used to Handle CORS
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
