import os from 'os';
import path from 'path';

export const CLS_RC_FILE_NAME = '.clsrc';
export const CREDS_FILE_PATH = path.resolve(os.homedir(), CLS_RC_FILE_NAME);
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5011/cloud-local-storage/us-central1'
    : 'https://cls.tools';
