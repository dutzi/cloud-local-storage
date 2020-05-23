import os from 'os';
import path from 'path';

export const CLS_RC_FILE_NAME = '.clsrc';
export const CREDS_FILE_PATH = path.resolve(os.homedir(), CLS_RC_FILE_NAME);
