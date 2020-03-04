import fetch from './fetch';
import { LoginParams } from './types';

export async function allowMenu() {
  return fetch.get('/allow_menu');
}

export async function getAllowOperate(menu_id: string) {
  return fetch.get(`/allow_operate/${menu_id}`);
}

export async function login(params: LoginParams) {
  return fetch.post('/login', params);
}

export async function getUser() {
  return fetch.get('/get_current_user');
}

export async function refreshToken(params: string) {
  return fetch.post('/refresh_token', params);
}

export async function logout() {
  return fetch.post('/logout');
}
