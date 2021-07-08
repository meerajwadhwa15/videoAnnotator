import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockAxios } from 'mock';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { ACCESS_TOKEN } from './clientCookies';
import { parseContextCookie } from './helpers';

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

class APIServer {
  private axiosInstance = Axios.create();
  constructor() {
    this.axiosInstance.defaults.baseURL = 'http://13.82.120.142:8080';
    // intercepting response
    this.axiosInstance.interceptors.response.use(
      function (response: AxiosResponse) {
        return response.data ? response.data : response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get({
    url,
    params,
    context,
  }: {
    url: string;
    params?: Record<string, any>;
    context: GetServerSidePropsContext;
  }) {
    const cookie = parseContextCookie(context);
    return this.axiosInstance.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${cookie[ACCESS_TOKEN]}`,
      },
    });
  }
}

export const requestServer = new APIServer();

export const request = new APIClient();
