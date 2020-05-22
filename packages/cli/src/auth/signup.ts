import inquirer from 'inquirer';
import firebase from 'firebase/app';

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
        console.log('Passwords mismatch');
        throw new Error();
      }

      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!res.user) {
        console.log('Error: Could not create user');
        throw new Error();
      }

      console.log(`Created an account for ${email}`);

      return { email, password };
    })
    .catch((err) => console.log(err.message));
}
