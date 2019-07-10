import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  profileRequest: ['username', 'lastname', 'telephone', 'cpf'],
  profileSuccess: ['data'],
  profileFailure: null,
  loadProfile: null,
  profileAddressUpdate: ['id', 'cep', 'street', 'number', 'neighborhood', 'city', 'state'],
  profilePassword: ['cpf', 'password', 'password_confirmation'],
  profileBrokenCreateUpdate: ['id', 'creci'],
  profileUploadAvatar: ['file'],
  /* getUserRequest: null,
  getUserSuccess: ['data'],
  getUserFailure: null, */

});

export const ProfileTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  loading: false,
  loadUpload: false,
  user: null,
  data: null,
});


/* Reducers */
export const profileLoading = state => state.merge({ loading: true });
export const uploadLoading = state => state.merge({ loadUpload: true });
export const failure = state => state.merge({ loading: false, loadUpload: false });
export const success = (state, { data }) => state.merge({
  data, loading: false, loadUpload: false,
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_PROFILE]: profileLoading,
  [Types.PROFILE_REQUEST]: profileLoading,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.PROFILE_ADDRESS_UPDATE]: profileLoading,
  [Types.PROFILE_PASSWORD]: profileLoading,
  [Types.PROFILE_BROKEN_CREATE_UPDATE]: profileLoading,
  [Types.PROFILE_UPLOAD_AVATAR]: uploadLoading,

});
