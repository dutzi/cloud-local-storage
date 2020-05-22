import * as admin from 'firebase-admin';

admin.initializeApp();

import getItem from './functions/get-item';
import setItem from './functions/set-item';
import getStorages from './functions/get-storages';
import createStorage from './functions/create-storage';

export { getItem, setItem, getStorages, createStorage };
