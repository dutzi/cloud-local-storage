import inquirer from 'inquirer';
import { uuid } from 'uuidv4';
import loadToken from '../utils/load-token';
import { CLS_RC_FILE_NAME } from './../utils/consts';
import signIn from '../auth/sign-in';
import signup from '../auth/signup';
import firebase from 'firebase/app';
import { saveToken } from '../utils/save-token';
import colorize from '../utils/colorize';
import * as logger from '../utils/logger';

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
        logger.log(colorize('Initialized', 'muted', true));
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
          return;
        }

        const token = uuid();
        await firebase.functions().httpsCallable('setToken')({ token });
        saveToken(token);
        logger.log(colorize('Initialized', 'muted', true));
        logger.log(
          [
            colorize('Saved token to ', 'muted', true),
            colorize(`~/${CLS_RC_FILE_NAME}`, 'highlighted', true),
          ].join('')
        );
        process.exit(0);
      })
      .catch((err) => {
        logger.error(err.message);
      });
  })();
}
