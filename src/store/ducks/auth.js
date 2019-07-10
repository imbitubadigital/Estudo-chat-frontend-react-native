import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* Types & Action Creators */
const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['data'],
  signInFailure: null,
  checkLoginTrue: ['token', 'user'],
  checkLoginFalse: null,
  logoutRequest: null,
  logoutSuccess: null,
  recoveryRequest: ['email'],
  recoverySuccess: null,
  recoveryFailure: null,
  setUpdateAvatar: ['data'],
  favoriteRequest: ['id'],
  setFavorites: ['data'],
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  isLogged: false,
  token: null,
  user: null,
  loader: false,
  favorites: [],
});

/* Reducers */
export const setValuesFavorites = (state, { data }) => state.merge({ favorites: data });
export const setAvatar = (state, { data }) => state.merge({ user: data });

export const setLoaderTrue = state => state.merge({ loader: true });

export const signinSuccess = (state, { data }) => state.merge({
  token: data.token,
  user: data.user,
  isLogged: true,
  loader: false,
  favorites: data.favorites,
});

export const loginInitTrue = (state, { token, user }) => state.merge({
  token,
  user,
  isLogged: true,
  loader: false,
});

export const resetState = state => state.merge({
  token: null,
  user: null,
  isLogged: false,
  loader: false,
  favorites: [],
});

export const setLoaderFalse = state => state.merge({ loader: false });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: setLoaderTrue,
  [Types.SIGN_IN_SUCCESS]: signinSuccess,
  [Types.SIGN_IN_FAILURE]: setLoaderFalse,
  [Types.CHECK_LOGIN_TRUE]: loginInitTrue,
  [Types.LOGOUT_SUCCESS]: resetState,
  [Types.RECOVERY_REQUEST]: setLoaderTrue,
  [Types.RECOVERY_SUCCESS]: resetState,
  [Types.RECOVERY_FAILURE]: setLoaderFalse,
  [Types.SET_UPDATE_AVATAR]: setAvatar,
  [Types.SET_FAVORITES]: setValuesFavorites,
});
