#!/usr/bin/env node

import yargs from 'yargs';
import inquirer from 'inquirer';
import { uuid } from 'uuidv4';
import fs from 'fs-extra';
import firebase from 'firebase/app';
import path from 'path';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCig23UBEJNf6o1gItzQWm3tPxqP868vGI',
  authDomain: 'cloud-local-storage.firebaseapp.com',
  databaseURL: 'https://cloud-local-storage.firebaseio.com',
  projectId: 'cloud-local-storage',
  storageBucket: 'cloud-local-storage.appspot.com',
  messagingSenderId: '1040052701754',
  appId: '1:1040052701754:web:96f369cd5489c6f0248303',
  measurementId: 'G-7XSQF4DH9D',
};

firebase.initializeApp(firebaseConfig);

const argv =
  // .alias('h', 'help')
  // .epilog('copyright 2019').argv;
  yargs
    .usage('Usage: $0 <command> [options]')
    .command('list', 'List all tokens')
    .command('create', 'Create new token')
    .command('signup', 'Sign up')
    .command('signin', 'Sign in')
    .demandCommand(1)
    // .example('$0 count -f foo.js', 'count the lines in the given file')
    // .alias('f', 'file')
    // .nargs('f', 1)
    // .describe('f', 'Load a file')
    // .demandOption(['f'])
    .help('h').argv;

const command = argv._[0];

if (command === 'signup') {
  inquirer
    .prompt([{ type: 'input', name: 'email', message: 'Enter your email' }])
    .then(async (answers) => {
      const { email } = answers;
      const token = uuid();

      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, token);

      if (!res.user) {
        console.log('Error: Could not create user');
        return;
      }

      console.log(`Created an account for ${email}`);
      console.log(`Your (secret) token is: ${token}`);

      const homedir = require('os').homedir();

      const credsFilePath = path.resolve(homedir, '.cls');

      fs.outputJsonSync(credsFilePath, { email, token });

      console.log(`Your credentials were saved to: ${credsFilePath}`);
    })
    .catch((err) => console.log(err.message));
}

// if (command === 'signin') {
//   inquirer
//     .prompt([
//       { type: 'input', name: 'email', message: 'Enter your email' },
//       { type: 'input', name: 'token', message: 'Enter your auth token' },
//     ])
//     .then((answers) => {
//       // Use user feedback for... whatever!!
//     });
// }
