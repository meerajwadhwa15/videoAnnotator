import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockLogin } from './mockLogin';

const mockAxios = axios.create();

const mock = new MockAdapter(mockAxios);
mock.onPost('/login').reply(200, mockLogin);

export { mockAxios };
