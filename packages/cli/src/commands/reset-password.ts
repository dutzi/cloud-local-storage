import inquirer from 'inquirer';
import firebase from 'firebase/app';
import * as logger from '../utils/logger';

export default function resetPassword() {
  inquirer
    .prompt([{ type: 'input', name: 'email', message: 'Enter your email' }])
    .then(async (answers) => {
      const { email } = answers;
      await firebase.auth().sendPasswordResetEmail(email, {
        url: 'https://cloud-local-storage.web.app/password-reset',
      });
      logger.log(
        'Password reset email sent, check your inbox for instructions'
      );
    })
    .catch((err) => {
      logger.error(err.message);
    });
}
