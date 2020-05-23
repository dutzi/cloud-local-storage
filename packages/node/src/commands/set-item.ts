import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default function setItem(key: string, data: any, token?: string) {
  // if (typeof data !== 'object' || Array.isArray(data)) {
  //   throw new Error('data-not-object');
  // }

  return fetch(`${BASE_URL}/setItem`, {
    method: 'post',
    body: JSON.stringify({
      key,
      data,
      token,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.key);
}
