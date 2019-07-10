import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  setMessage: ['content_message', 'type_message'],
  setMessageInfo: ['msg'],
  setBack: ['back'],
  setLoginDestination: ['destination'],
  setRedirect: ['destination'],
});

export const MessageTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  msg: null,
  back: 'Home',
  destination: 'Home',
});

/* Reducers */

export const setInfo = (state, { msg }) => state.merge({ msg });
export const setUrlBack = (state, { back }) => state.merge({ back });
export const setDestinationLogin = (state, { destination }) => state.merge({ destination });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MESSAGE_INFO]: setInfo,
  [Types.SET_BACK]: setUrlBack,
  [Types.SET_LOGIN_DESTINATION]: setDestinationLogin,
});
