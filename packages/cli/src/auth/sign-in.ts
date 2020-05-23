import inquirer from 'inquirer';
import firebase from 'firebase/app';
import * as logger from '../utils/logger';
import colorize from '../utils/colorize';

export default function signIn() {
  return inquirer
    .prompt([
      { type: 'input', name: 'email', message: 'Enter your email' },
      { type: 'password', name: 'password', message: 'Enter your password' },
    ])
    .then(async (answers) => {
      const { email, password } = answers;

      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (!res.user) {
        return { error: true };
      }

      return {};
    })
    .catch((err) => {
      logger.error(err.message);
      if (err.code === 'auth/wrong-password') {
        logger.info(
          [
            colorize('Forgot your password? Run ', 'muted', true),
            colorize('cls reset-password ', 'highlighted', true),
            colorize('to get a reset password email', 'muted', true),
          ].join('')
        );
      }
    });
}
