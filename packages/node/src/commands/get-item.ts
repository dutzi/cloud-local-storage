import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default function getItem(key: string, token?: string) {
  return fetch(`${BASE_URL}/getItem?key=${key}&token=${token}`)
    .then((res) => res.json())
    .then((res) => {
      if (res && 'data' in res) {
        return res.data;
      } else throw res;
    });
}
