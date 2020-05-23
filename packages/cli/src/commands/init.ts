import inquirer from 'inquirer';
import { uuid } from 'uuidv4';
import loadToken from '../utils/load-token';
import { CLS_RC_FILE_NAME } from './../utils/consts';
import signIn from '../auth/sign-in';
import signup from '../auth/signup';
import firebase from 'firebase/app';
import { saveToken } from '../utils/save-token';

export default function init() {
  (async () => {
    if (loadToken()) {
      const { getAnotherToken } = await inquirer.prompt([
        {
          type: 'list',
          name: 'getAnotherToken',
          message: `Token found in ~/${CLS_RC_FILE_NAME}, would you like to use it?`,
          choices: [
            { name: 'Yes, use existing token', value: 'use-existing' },
            {
              name: 'No, I would like to generate a new token',
              value: 'new-token',
            },
          ],
        },
      ]);

      if (getAnotherToken === 'use-existing') {
        console.log('Cloud Local Storage initialized');
        return;
      }
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'signInOrSignUp',
          message: 'Do you already have an account?',
          choices: [
            { name: 'Yes, sign me in', value: 'sign-in' },
            { name: 'No, I would like to sign up', value: 'signup' },
          ],
        },
      ])
      .then(async (answers) => {
        const { signInOrSignUp } = answers;
        if (signInOrSignUp === 'sign-in') {
          return signIn();
        } else {
          return signup();
        }
      })
      .then(async () => {
        const user = firebase.auth().currentUser;

        if (!user) {
          throw { message: 'User not found' };
        }

        const token = uuid();
        await firebase.functions().httpsCallable('setToken')({ token });
        saveToken(token);
        console.log('Cloud Local Storage initialized');
        console.log(`Saved token to ~/${CLS_RC_FILE_NAME}`);
        process.exit(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  })();
}
