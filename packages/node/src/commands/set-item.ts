import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default function setItem(
  key: string,
  data: any,
  token?: string
): Promise<string>;

export default function setItem(data: any, token?: string): Promise<string>;

export default function setItem(key: string, data: any, token?: string) {
  // if (typeof data !== 'object' || Array.isArray(data)) {
  //   throw new Error('data-not-object');
  // }

  let _key, _data, _token;
  if (token === undefined) {
    if (data === undefined) {
      _data = key;
    } else {
      _key = key;
      _data = data;
    }
  } else {
    _key = key;
    _data = data;
    _token = token;
  }

  return fetch(`${BASE_URL}/setItem`, {
    method: 'post',
    body: JSON.stringify({
      key: _key,
      data: _data,
      token: _token,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.key);
}
