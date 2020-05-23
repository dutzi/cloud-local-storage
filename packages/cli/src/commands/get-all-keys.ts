import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';
import * as logger from '../utils/logger';
import colorize from '../utils/colorize';

export default function getAllKeys() {
  try {
    (async () => {
      const token = loadToken();

      if (!token) {
        logger.error('Token not found, run `cls init` first');
        return;
      }

      const keys = await cls.getAllKeys(token);

      if (keys.length === 0) {
        logger.log('No storages found');
        return;
      }

      logger.log(colorize('Found the following keys:', 'muted', true));
      keys.forEach((key: string) => {
        console.log('  ' + key);
      });

      process.exit(0);
    })();
  } catch (err) {
    logger.error(err);
  }
}
