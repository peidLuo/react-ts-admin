import { LoginParams } from '@/api/types';
import { Action } from 'redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export function updateSession(newSession: string) {
  return {
    type: 'UPDATE_SESSION',
    payload: newSession
  };
}

export function addSession(session: string) {
  return {
    type: 'ADD_SESSION',
    payload: session
  };
}

export interface LoginAction extends Action, LoginParams {
  type: typeof LOGIN_REQUEST;
  payload: LoginParams;
}
