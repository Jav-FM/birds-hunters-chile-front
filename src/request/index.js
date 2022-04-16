import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: process.env.API_URL,
});

// Manejo de códigos de error del backend.
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    return Promise.reject(e.response || e.message);
  }
);
/**
 * Request Wrapper with default success/error actions
 */
const request = async (options) => {
    console.log(process.env.API_URL)
  let token = '';
  //En casos de petisión privada, con private true
  if (options.private) {
    if (options.token) {
      token = options.token;
    } else {
      token = localStorage.getItem(options.tokenName.token);
    }
    client.defaults.headers.common.Authorization = `Bearer ${token.token}`;
  }
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    return Promise.reject(error.response || error.message || error);
  };
  return client(options).then(onSuccess).catch(onError);
};
export default request;
