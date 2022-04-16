import axios from "axios";
/**
 * Create an Axios Client with defaults
 */
const client = axios.create();
// Manejo de códigos de error del backend.
client.interceptors.response.use(
  (response) => {
    if (response.config.responseType === "blob") {
      return response;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  if (options.private) {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }

  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};

export default request;
