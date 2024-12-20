import axios from 'axios';

const pacificAPI = import.meta.env.VITE_APP_API_URL;

const axiosServices = axios.create({ baseURL: pacificAPI });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServices;

export const fetcher = async (args, isValid, cancelToken) => {
  /** Skip the request if isValid is specifically to false */
  if (isValid === false) {
    return;
  }

  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config, ...cancelToken });

  return res.data;
};

export const fetcherPost = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
