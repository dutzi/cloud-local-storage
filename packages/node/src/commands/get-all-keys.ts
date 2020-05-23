import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default async function getAllKeys(token: string) {
  const getKeysResult = await fetch(`${BASE_URL}/getAllKeys?token=${token}`);
  const keys = (await getKeysResult.json()).keys;

  return keys;
}
