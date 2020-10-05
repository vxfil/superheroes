import { spawn } from 'redux-saga/effects';

import heroSaga from './heroesSaga';

export default function* rootSaga() {
  console.log('Hello From Redux-Saga!');

  yield spawn(heroSaga);
}
