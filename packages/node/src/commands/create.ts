import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default async function create(nameOrToken?: string, token?: string) {
  let _name: string, _token: string;
  if (!token) {
    if (!nameOrToken) {
      throw new Error(
        'Missing token, you need to pass either a name and token, or just a token'
      );
    }

    _name = '';
    _token = nameOrToken;
  } else {
    if (!nameOrToken) {
      throw new Error('Missing name');
    }

    _name = nameOrToken;
    _token = token;
  }

  const createStorageResult = await fetch(`${BASE_URL}/createStorage`, {
    method: 'post',
    body: JSON.stringify({ token: _token, name: _name }),
  });

  return (await createStorageResult.json()).name;
}
