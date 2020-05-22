import inquirer from 'inquirer';
import firebase from 'firebase/app';

export default function resetPassword() {
  inquirer
    .prompt([{ type: 'input', name: 'email', message: 'Enter your email' }])
    .then(async (answers) => {
      const { email } = answers;
      await firebase.auth().sendPasswordResetEmail(email, {
        url: 'https://cls.tools/reset-password',
      });
      console.log('Check you inbox for instructions');
    })
    .catch((err) => {
      console.log(err.message);
    });
}
