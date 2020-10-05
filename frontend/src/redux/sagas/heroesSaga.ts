import { put, call, takeEvery } from 'redux-saga/effects';

import {
  SET_LOADING,
  GET_HEROES,
  GET_HEROES_REQUESTED,
} from '../actions/heroActions';

import { getAllHeroes } from '../api/heroApi';

function* getHeroes() {
  yield put({ type: SET_LOADING });
  const heroes = yield call(getAllHeroes);
  yield put({ type: GET_HEROES, payload: heroes });
}

export default function* heroSaga() {
  yield takeEvery(GET_HEROES_REQUESTED, getHeroes);
}
