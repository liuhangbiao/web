import request from '../utils/request';

export function getInfo({ page = 1 }) {
  return request(`/api/wave/info?_page=${page}`);
}

export function getInfoa() {
  return request(`/api/wave/a`);
}
export function getInfob() {
  return request(`/api/wave/b`);
}
export function getInfoc() {
  return request(`/api/wave/c`);
}

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=5`);
}

export function add({ page = 1 }) {
  return request(`/api/add/${page}`);
}