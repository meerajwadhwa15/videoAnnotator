import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockLogin } from './mockLogin';
import { mockSignup } from './mockSignup';

const mockAxios = axios.create();

const mock = new MockAdapter(mockAxios);

mock.onPost('/login').reply(200, mockLogin);
mock.onPost('/signup').reply(200, mockSignup);

export { mockAxios };
