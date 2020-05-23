import * as admin from 'firebase-admin';

admin.initializeApp();

import getItem from './functions/get-item';
import setItem from './functions/set-item';
import getAllKeys from './functions/get-all-keys';
import createItem from './functions/create-item';
import setToken from './functions/set-token';

export { getItem, setItem, getAllKeys, createItem, setToken };
