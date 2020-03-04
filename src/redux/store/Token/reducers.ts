import { UPDATE_TOKEN, TokenState, TokenActionTypes } from './types';

const initialState: TokenState = {
  isFetch: false,
  token: localStorage.getItem('token') || ''
};

export function Login(
  state = initialState,
  action: TokenActionTypes
): TokenState {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
