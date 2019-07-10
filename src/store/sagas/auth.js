import { call, put, select } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

import api from '~/services/api';

import NavigationService from '~/services/navigation';
import MessageActions from '~/store/ducks/message';
import AuthActions from '~/store/ducks/auth';
// import FavoritesActions from '~/store/ducks/favorites';
/* import AvatarActions from '~/store/ducks/avatar'; */

// verifica se esta logado ou não
export function* init() {
  const token = yield call([AsyncStorage, 'getItem'], '@Socket:token');
  const loaderUser = yield call([AsyncStorage, 'getItem'], '@Socket:user');
  const user = JSON.parse(loaderUser);

  if (token && user) {
    try {
      const { data } = yield call(api.get, `users/${user.id}`);
      yield put(AuthActions.checkLoginTrue(token, data.user));
    } catch (err) {
      const { response } = err;
      if (
        response
        && response.status === 401
        && response.data.error.name === 'ExpiredJwtToken'
      ) {
        yield put(AuthActions.logoutRequest());
      }
    }
  } else {
    yield put(AuthActions.checkLoginFalse());
  }
}


// função para o login
export function* login({ email, password }) {
  try {
    const destination = yield select(state => state.message.destination);
    const { data } = yield call(api.post, 'login', { email, password });
    yield call([AsyncStorage, 'setItem'], '@Socket:token', data.token);
    yield call([AsyncStorage, 'setItem'], '@Socket:user', JSON.stringify(data.user));
    yield put(AuthActions.signInSuccess(data));
    NavigationService.navigate(destination);
    yield put(ToastActionsCreators.displayInfo('Tudo certo! Agora você está logado!', 5000));
  } catch (err) {
    yield put(AuthActions.signInFailure());
    const { response } = err;
    if (
      response
      && response.status === 401
      && response.data.error.name === 'UserNotFoundException'
    ) {
      yield put(
        ToastActionsCreators.displayWarning(
          'O e-mail informado não existe em nosso sistema!',
          5000,
        ),
      );
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'PasswordMisMatchException'
    ) {
      yield put(ToastActionsCreators.displayWarning('A senha informada não confere!', 5000));
    } else if (response && response.status && response.status === 401) {
      yield put(MessageActions.setMessageInfo(response.data.error.message));
      yield put(MessageActions.setBack('Home'));
      NavigationService.navigate('Messages', null);
    } else if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(response.data[0].message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('E-mail e/ou Senha não conferem!', 5000));
    }
  }
}

// função para logout
export function* setLogout() {
  yield call([AsyncStorage, 'clear']);
  yield put(AuthActions.logoutSuccess());
  NavigationService.navigate('Home', null);
  yield put(
    ToastActionsCreators.displayInfo('Você foi deslogado com sucesso! Volte sempre!', 5000),
  );
}

// função para recuperação de senha
export function* recovery({ email }) {
  try {
    const { data } = yield call(api.post, 'recover', { email });
    yield put(AuthActions.recoverySuccess());
    yield put(
      MessageActions.setMessageInfo(
        `Olá ${
          data.username
        }, atendendo sua solicitação, uma nova senha foi gerada e enviada para o seu e-mail. Por favor acesse seu e-mail e siga as instruções que acabamos de enviar para você!`,
      ),
    );
    yield put(MessageActions.setBack('SignIn'));
    NavigationService.navigate('Messages', null);
  } catch (err) {
    const { response } = err;
    yield put(AuthActions.recoveryFailure());

    if (response && response.status === 401) {
      yield put(MessageActions.setMessageInfo(response.data.error.message));
      yield put(MessageActions.setBack('Home'));
      NavigationService.navigate('Messages', null);
    } else if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(response.data[0].message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro ao recuperar senha!', 5000));
    }
  }
}


