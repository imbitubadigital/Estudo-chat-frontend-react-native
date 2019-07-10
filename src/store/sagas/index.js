import { all, takeLatest } from 'redux-saga/effects';

import {
  login, init, setLogout,
} from './auth';
import { AuthTypes } from '~/store/ducks/auth';

import { showMessage, redirect } from './message';
import { MessageTypes } from '~/store/ducks/message';

export default function* rootSaga() {
  yield all([
    init(),
    takeLatest(MessageTypes.SET_MESSAGE, showMessage),
    takeLatest(MessageTypes.SET_REDIRECT, redirect),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(AuthTypes.LOGOUT_REQUEST, setLogout),
  ]);
}
