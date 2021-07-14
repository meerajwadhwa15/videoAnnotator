import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockForgotPass } from './mockForgotPass';
import { mockLogin } from './mockLogin';
import { mockSignup } from './mockSignup';
import { mockResetPassword } from './mockResetPassword';
import { API_ENDPOINT } from 'utils/constants';

const mockAxios = axios.create();

const mock = new MockAdapter(mockAxios);

mock.onPost('/user/signin').reply(200, mockLogin);
mock.onPost('/user/signup').reply(200, mockSignup);
mock.onPost(API_ENDPOINT.forgotPassword).reply(200, mockForgotPass);
mock.onPost('/resetpassword').reply(200, mockResetPassword);

export { mockAxios };
