import React from 'react';
import { fireEvent, render, screen } from 'utils/testUtil';
import { AlertMessageType } from 'utils/types';
import { loginWorker } from './saga';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Login from './index';

import reducer, {
  dispatchLogin,
  dispatchLoginFail,
  dispatchLoginSuccess,
} from './slice';
import { API_ENDPOINT } from 'utils/constants';
import { runSaga } from '@redux-saga/core';
import { act } from 'react-dom/test-utils';

describe('testing login reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      loading: false,
      message: {
        type: '',
        text: '',
      },
    });
  });
  test('loading shoule be true when login pending', () => {
    expect(reducer(undefined, { type: dispatchLogin.type })).toEqual({
      loading: true,
      message: {
        type: '',
        text: '',
      },
    });
  });
  test('should reset loading and update message status when login success or fail', () => {
    expect(reducer(undefined, { type: dispatchLoginFail.toString() })).toEqual({
      loading: false,
      message: {
        type: AlertMessageType.error,
        text: 'login_error',
      },
    });
    expect(
      reducer(undefined, { type: dispatchLoginSuccess.toString() })
    ).toEqual({
      loading: false,
      message: {
        type: AlertMessageType.success,
        text: 'login_success',
      },
    });
  });
});

describe('test login saga', () => {
  const loginActions = {
    type: 'login',
    payload: {
      email: 'test@gmail.com',
      password: 'Axlkjdakj',
      remember: false,
    },
  };
  const mock = new MockAdapter(axios);

  test('should dispatch success action when login success', async () => {
    mock.onPost(API_ENDPOINT.login).reply(200, { token: 'access_token' });
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ value: 'test' }),
      },
      loginWorker,
      loginActions
    ).toPromise();
    expect(dispatched).toEqual([{ type: dispatchLoginSuccess.type }]);
  });

  test('should dispatch login failed when login fail', async () => {
    mock.onPost(API_ENDPOINT.login).reply(400);
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ value: 'test' }),
      },
      loginWorker,
      loginActions
    ).toPromise();
    expect(dispatched).toEqual([{ type: dispatchLoginFail.type }]);
  });
});

describe('test login form', () => {
  test('It should mount', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(
      'login:loginFormEmailPlaceholder'
    );
    const passwordInput = screen.getByPlaceholderText(
      'login:loginFormPasswordPlaceholder'
    );
    const checkbox = screen.getByRole('checkbox', {
      name: 'login:loginFormRememberTitle',
    });
    const button = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Abcd12345' } });
      fireEvent.click(checkbox);
    });
    expect(emailInput).toHaveValue('test@gmail.com');
    expect(passwordInput).toHaveValue('Abcd12345');
    expect(checkbox).toBeChecked();
    await act(async () => {
      fireEvent.click(button);
    });
  });
});
