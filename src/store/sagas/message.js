import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import NavigationService from '~/services/navigation';
/* import { AsyncStorage } from 'react-native';

import NavigationService from '../../services/navigation'; */
/* import { NavigationActions } from 'react-navigation'; */

import MessageActions from '~/store/ducks/message';

export function* showMessage({ content_message, type_message }) {
  switch (type_message) {
    case 'error':
      yield put(ToastActionsCreators.displayError(content_message, 5000));
      break;
    case 'info':
      yield put(ToastActionsCreators.displayInfo(content_message, 5000));
      break;
    default:
      yield put(ToastActionsCreators.displayWarning(content_message, 5000));
  }
}

export function* redirect({ destination }) {
  yield put(MessageActions.setBack('Home'));
  NavigationService.navigate(destination, null);
}
