import { combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

import { reducer as message } from '~/store/ducks/message';
import { reducer as auth } from '~/store/ducks/auth';

import { reducer as profile } from '~/store/ducks/profile';

const reducers = combineReducers({
  message,
  auth,
  profile,
  toast,
});

export default reducers;
