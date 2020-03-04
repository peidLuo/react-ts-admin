import { TokenState, UPDATE_TOKEN } from './types';

export function updateSession(newToken: TokenState) {
  return {
    type: UPDATE_TOKEN,
    payload: newToken
  };
}
