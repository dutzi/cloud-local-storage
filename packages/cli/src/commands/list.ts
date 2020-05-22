import fetch from 'node-fetch';
import loadToken from '../utils/load-token';
import { BASE_URL } from './../utils/consts';

export default function list() {
  try {
    (async () => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const getStoragesResult = await fetch(
        `${BASE_URL}/getStorages?token=${token}`
      );
      const storages = (await getStoragesResult.json()).storages;

      if (storages.length === 0) {
        console.log('No storages found');
        return;
      }

      console.log('Found the following storages:');
      console.log(
        storages
          .map((storage: string) => {
            return '  - ' + storage;
          })
          .join('\n')
      );

      process.exit(0);
    })();
  } catch (err) {
    console.log({ err });
    console.log(err);
  }
}
