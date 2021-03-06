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
        logger.log(colorize('Skipped initialization', 'muted', true));
        logger.info(
          colorize('Token is here ', 'muted', true) +
            colorize(`~/${CLS_RC_FILE_NAME}`, 'highlighted', true)
        );
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
      .then((res) => {
        if (res.token) {
          logger.log(
            'A token was found for your account, would you like to use it or create a new one?'
          );
          logger.info(
            'If you create a new one the old one will become invalid (all your data will still be available)'
          );
          return inquirer
            .prompt([
              {
                type: 'list',
                name: 'createOrUseExistingToken',
                message: 'Create a new token?',
                choices: [
                  { name: 'Yes, create a new one', value: 'new-one' },
                  { name: 'No, use existing', value: 'use-existing' },
                ],
              },
            ])
            .then((answers) => {
              if (answers.createOrUseExistingToken === 'new-one') {
                return;
              } else {
                return res.token;
              }
            });
        }
      })
      .then(async (token) => {
        if (!token) {
          const user = firebase.auth().currentUser;

          if (!user) {
            return;
          }

          token = uuid();
          await firebase.functions().httpsCallable('setToken')({ token });
        }

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
