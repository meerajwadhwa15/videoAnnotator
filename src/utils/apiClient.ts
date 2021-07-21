import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockAxios } from 'mock';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { ACCESS_TOKEN, clientCookies } from './clientCookies';
import { parseContextCookie } from './helpers';

const { publicRuntimeConfig } = getConfig();

const axiosClient = publicRuntimeConfig?.isMock ? mockAxios : Axios;

// default
axiosClient.defaults.baseURL = '/api';

// content type
axiosClient.defaults.headers.common['Content-Type'] = 'application/json';

// set authorization header
if (clientCookies.getToken()) {
  axiosClient.defaults.headers.common['Authorization'] =
    'Bearer ' + clientCookies.getToken();
}

// intercepting request
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// intercepting response
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log('response', response.data);
    return response.data ? response.data : response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const setAuthorizationHeader = () => {
  axiosClient.defaults.headers.common['Authorization'] =
    'Bearer ' + clientCookies.getToken();
};

const removeAuthorizationHeader = () => {
  delete axiosClient.defaults.headers.common['Authorization'];
};

export class APIClient {
  /**
   * Fetch data from given url
   */
  get = (url: string, params: Record<string, any> = {}) => {
    return axiosClient.get(url, params);
  };

  /**
   * Post given data to url
   */
  post = (url: string, data?: Record<string, any>) => {
    return axiosClient.post(url, data);
  };

  /**
   * Put given data to url
   */
  put = (url: string, data?: Record<string, any>) => {
    return axiosClient.put(url, data);
  };

  /**
   * Patch data to url
   */
  update = (url: string, data: Record<string, any>) => {
    return axiosClient.patch(url, data);
  };

  /**
   * Delete data from url
   */
  delete = (url: string, params?: Record<string, any>) => {
    return axiosClient.delete(url, {
      params,
    });
  };
}

class APIServer {
  private axiosServer = Axios.create();
  constructor() {
    this.axiosServer.defaults.baseURL = 'http://13.82.120.142:8080';
    // intercepting response
    this.axiosServer.interceptors.response.use(
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
    return this.axiosServer.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${cookie[ACCESS_TOKEN]}`,
      },
    });
  }

  post({
    url,
    params,
    data,
    context,
  }: {
    url: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
    context: GetServerSidePropsContext;
  }) {
    const cookie = parseContextCookie(context);
    return this.axiosServer.request({
      method: 'POST',
      url,
      data,
      params,
      headers: {
        Authorization: `Bearer ${cookie[ACCESS_TOKEN]}`,
      },
    });
  }
}

const request = new APIClient();
const requestServer = new APIServer();

export {
  setAuthorizationHeader,
  removeAuthorizationHeader,
  request,
  requestServer,
};
