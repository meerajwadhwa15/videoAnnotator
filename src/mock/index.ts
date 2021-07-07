import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockForgotPass } from './mockForgotPass';
import { mockLogin } from './mockLogin';
import { mockSignup } from './mockSignup';

const mockAxios = axios.create();

const mock = new MockAdapter(mockAxios);

mock.onPost('/login').reply(200, mockLogin);
mock.onPost('/signup').reply(200, mockSignup);
mock.onPost('/updatePassword').reply(200, mockForgotPass);

export { mockAxios };
