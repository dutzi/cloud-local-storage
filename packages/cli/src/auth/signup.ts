import inquirer from 'inquirer';
import firebase from 'firebase/app';
import * as logger from '../utils/logger';
import colorize from '../utils/colorize';

export default function signup() {
  return inquirer
    .prompt([
      { type: 'input', name: 'email', message: 'Enter your email' },
      { type: 'password', name: 'password', message: 'Choose a password' },
      {
        type: 'password',
        name: 'passwordVerification',
        message: 'Re-type your password',
      },
    ])
    .then(async (answers) => {
      const { email, password, passwordVerification } = answers;

      if (password !== passwordVerification) {
        logger.error("Passwords don't match");
        return {};
      }

      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!res.user) {
        logger.error('Could not create user');
        throw new Error();
      }

      logger.success(
        [colorize(`Created an account for `, 'muted', true), email].join('')
      );

      return {};
    })
    .catch((err) => logger.error(err.message));
}
