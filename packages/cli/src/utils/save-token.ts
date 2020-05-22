import fs from 'fs-extra';
import { CREDS_FILE_PATH } from './consts';

export function saveToken(token: string) {
  fs.outputJsonSync(CREDS_FILE_PATH, { token });
}
