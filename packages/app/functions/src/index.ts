import * as admin from 'firebase-admin';

admin.initializeApp();

import getItem from './functions/get-item';
import setItem from './functions/set-item';

export { getItem, setItem };
