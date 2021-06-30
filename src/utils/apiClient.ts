import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// default
axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

// content type
axios.defaults.headers.common['Content-Type'] = 'application/json';

// intercepting request
axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// intercepting response
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data ? response.data : response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class APIClient {
  /**
   * Fetch data from given url
   */
  get = (url: any, params: any) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  post = (url: any, data: any, config = {}) => {
    return axios.post(url, data);
  };

  /**
   * Update data to url
   */
  update = (url: any, data: any, config = {}) => {
    return axios.patch(url, data);
  };

  /**
   * Delete data from url
   */
  delete = (url: any, data: any, config = {}) => {
    axios.delete(url, {
      data,
    });
  };
}

export { APIClient };
