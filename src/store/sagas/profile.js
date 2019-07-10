import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '~/services/api';
import { AsyncStorage } from 'react-native';

import ProfileActions from '~/store/ducks/profile';
import AuthActions from '~/store/ducks/auth';

// import MessageActions from '~/store/ducks/message';

export function* profileUpdate({
  username, lastname, telephone, cpf,
}) {
  try {
    const { data } = yield call(api.put, 'users/1', {
      username, lastname, telephone, cpf,
    });
    yield put(ProfileActions.profileSuccess(data));
    yield call([AsyncStorage, 'setItem'], '@MappImoveis:user', JSON.stringify(data));
    yield put(ToastActionsCreators.displayInfo('Perfil Atualizado', 5000));
  } catch (err) {
    const { response } = err;
    yield put(ProfileActions.profileFailure());
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}

export function* profileLoad() {
  try {
    const { data } = yield call(api.get, 'users/1');
    yield put(ProfileActions.profileSuccess(data.user));
  } catch (err) {
    const { response } = err;
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}

export function* updateAddressProfile({
  id, cep, street, number, neighborhood, city, state,
}) {
  try {
    const { data } = yield call(api.put, `user-address/${id}`, {
      cep, street, number, neighborhood, city, state,
    });
    yield put(ProfileActions.profileSuccess(data));
    yield put(ToastActionsCreators.displayInfo('Endereço Atualizado', 5000));
  } catch (err) {
    const { response } = err;
    yield put(ProfileActions.profileFailure());
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else if (response && response.status && response.status === 401) {
      yield put(ToastActionsCreators.displayWarning(response.data.error.message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}

export function* profileChangePassword({
  cpf, password, password_confirmation,
}) {
  try {
    yield call(api.put, 'recover', { cpf, password, password_confirmation });
    yield put(ToastActionsCreators.displayInfo('Senha alterada com sucesso!', 5000));
    yield put(ProfileActions.profileFailure());
  } catch (err) {
    const { response } = err;
    yield put(ProfileActions.profileFailure());
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else if (response && response.status && response.status === 401) {
      yield put(ToastActionsCreators.displayWarning(response.data.error.message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}

export function* createUpdateBroken({ id, creci }) {
  try {
    if (id) {
      const { data } = yield call(api.put, `broken/${id}`, { creci });
      yield put(ProfileActions.profileSuccess(data));
      yield put(ToastActionsCreators.displayInfo('Creci atualizado com sucesso', 5000));
    } else {
      const { data } = yield call(api.post, 'broken', { creci });
      yield put(ProfileActions.profileSuccess(data));
      yield put(ToastActionsCreators.displayInfo('Creci cadastrado com sucesso', 5000));
    }
  } catch (err) {
    const { response } = err;
    yield put(ProfileActions.profileFailure());
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else if (response && response.status && response.status === 401) {
      yield put(ToastActionsCreators.displayWarning(response.data.error.message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}

export function* avatarUpload({ file }) {
  try {
    const dataForm = new FormData();
    dataForm.append('file', {
      uri: file.uri,
      type: file.type,
      name: 'teste.jpeg',
    });
    const configHeader = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const { data } = yield call(api.post, 'file-user', dataForm, configHeader);
    yield put(ProfileActions.profileSuccess(data));
    yield call([AsyncStorage, 'setItem'], '@MappImoveis:user', JSON.stringify(data));
    yield put(ToastActionsCreators.displayInfo('Avatar atualizado com sucesso!', 5000));
  } catch (err) {
    const { response } = err;
    yield put(ProfileActions.profileFailure());
    if (response && response.status && response.status === 400) {
      yield put(ToastActionsCreators.displayWarning(err.response.data[0].message, 5000));
    } else if (
      response
      && response.status === 401
      && response.data.error.name === 'ExpiredJwtToken'
    ) {
      yield put(AuthActions.logoutRequest());
    } else if (response && response.status && response.status === 401) {
      yield put(ToastActionsCreators.displayWarning(response.data.error.message, 5000));
    } else {
      yield put(ToastActionsCreators.displayWarning('Erro no sistema!', 5000));
    }
  }
}
