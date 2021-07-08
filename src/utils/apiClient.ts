import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockAxios } from 'mock';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axios = publicRuntimeConfig?.isMock ? mockAxios : Axios;

// default
axios.defaults.baseURL = '/api';

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

export class APIClient {
  /**
   * Fetch data from given url
   */
  get = (url: string, params: Record<string, any>) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  post = (url: string, data: Record<string, any>) => {
    return axios.post(url, data);
  };

  /**
   * Update data to url
   */
  update = (url: string, data: Record<string, any>) => {
    return axios.patch(url, data);
  };

  /**
   * Delete data from url
   */
  delete = (url: string, data: Record<string, any>) => {
    axios.delete(url, {
      data,
    });
  };
}

export const request = new APIClient();
