import inquirer from 'inquirer';
import firebase from 'firebase/app';

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
        throw { message: 'User not found' };
      }

      return { email, password };
    })
    .catch((err) => {
      console.log(err.message);
    });
}
