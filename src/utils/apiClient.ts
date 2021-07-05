import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockAxios } from 'mock';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axios = publicRuntimeConfig?.isMock ? mockAxios : Axios;

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
  get = (url: string, params: Record<string, unknown>) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  post = (url: string, data: Record<string, unknown>) => {
    return axios.post(url, data);
  };

  /**
   * Update data to url
   */
  update = (url: string, data: Record<string, unknown>) => {
    return axios.patch(url, data);
  };

  /**
   * Delete data from url
   */
  delete = (url: string, data: Record<string, unknown>) => {
    axios.delete(url, {
      data,
    });
  };
}

export { APIClient };
