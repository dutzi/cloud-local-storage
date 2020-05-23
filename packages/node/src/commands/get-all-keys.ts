import fetch from 'node-fetch';
import { BASE_URL } from '../utils/consts';

export default async function getAllKeys(token: string) {
  const getStoragesResult = await fetch(
    `${BASE_URL}/getStorages?token=${token}`
  );
  const storages = (await getStoragesResult.json()).storages;

  return storages;
}
