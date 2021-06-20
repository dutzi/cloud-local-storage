import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default function getItem(key: string, token?: string) {
  let url = `${BASE_URL}/getItem?key=${key}`;
  if (token) {
    url += `&token=${token}`;
  }

  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res && 'data' in res) {
        return res.data;
      }
    });
}
