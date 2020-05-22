import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';

export default function list() {
  try {
    (async () => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const keys = await cls.list(token);

      if (keys.length === 0) {
        console.log('No storages found');
        return;
      }

      console.log('Found the following storages:');
      console.log(
        keys
          .map((key: string) => {
            return '  - ' + key;
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
