import { AxiosResponse } from 'axios';
import { all, takeLatest, fork, put, call, delay } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { APIClient } from '../../utils/apiClient';
import { increment, decrement, getSinglePokemon, getSinglePokemonSuccess } from '../home/slice';

const get: any = new APIClient().get;
// const post: any = new APIClient().post;
// const update: any = new APIClient().update;

function* beforeIncrement() {
  console.log('before Increment Counter run...');
}

function* beforeDecrement() {
  console.log('before Decrement Counter run...');
}

function* getSinglePokemonSaga(action: PayloadAction) {
  try {
    const response: AxiosResponse = yield call(get, `/pokemon/${action.payload}`);
    yield delay(1500);
    yield put(getSinglePokemonSuccess(response));
  } catch (error) {
    console.log('error', error);
    window.alert('API error');
  }
}

export function* watchBeforeIncrement() {
  yield takeLatest(increment.type, beforeIncrement);
}

export function* watchBeforeDecrement() {
  yield takeLatest(decrement.type, beforeDecrement);
}

export function* watchSinglePokemon() {
  yield takeLatest(getSinglePokemon.toString(), getSinglePokemonSaga);
}

function* homeSaga() {
  yield all([fork(watchBeforeIncrement), fork(watchBeforeDecrement), fork(watchSinglePokemon)]);
}

export default homeSaga;
