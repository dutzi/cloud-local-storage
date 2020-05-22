import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default async function create(keyOrToken?: string, token?: string) {
  let _key: string, _token: string;
  if (!token) {
    if (!keyOrToken) {
      throw new Error(
        'Missing token, you need to pass either a name and token, or just a token'
      );
    }

    _key = '';
    _token = keyOrToken;
  } else {
    if (!keyOrToken) {
      throw new Error('Missing name');
    }

    _key = keyOrToken;
    _token = token;
  }

  const createStorageResult = await fetch(`${BASE_URL}/createStorage`, {
    method: 'post',
    body: JSON.stringify({ token: _token, name: _key }),
  });

  return (await createStorageResult.json()).key;
}
