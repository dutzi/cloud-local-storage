import fs from 'fs-extra';
import { CREDS_FILE_PATH } from './consts';

export default function loadToken() {
  try {
    return fs.readJsonSync(CREDS_FILE_PATH)?.token;
  } catch (err) {
    return undefined;
  }
}
