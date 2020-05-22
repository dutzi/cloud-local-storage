#!/usr/bin/env node

import yargs from 'yargs';
import inquirer from 'inquirer';
import { uuid } from 'uuidv4';
import fs from 'fs-extra';
import firebase from 'firebase/app';
import path from 'path';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import os from 'os';
import fetch from 'node-fetch';

// const BASE_URL = 'http://localhost:5011/cloud-local-storage/us-central1';
const isDeveloping = true;

const BASE_URL = isDeveloping
  ? 'http://localhost:5011/cloud-local-storage/us-central1'
  : '';

const rcFileName = '.clsrc';
const credsFilePath = path.resolve(os.homedir(), rcFileName);

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

if (isDeveloping) {
  firebase.functions().useFunctionsEmulator('http://localhost:5011');
  firebase.firestore().settings({
    host: 'localhost:8100',
    ssl: false,
  });
}

const argv =
  // .alias('h', 'help')
  // .epilog('copyright 2019').argv;
  yargs
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initialize Cloud Local Storage')
    .command('list', 'List all storages')
    .command('create', 'Create new storage')
    // .command('signup', 'Sign up')
    // .command('signin', 'Sign in')
    .command('resetpass', 'Send reset password link')
    .demandCommand(1)
    // .example('$0 count -f foo.js', 'count the lines in the given file')
    // .alias('f', 'file')
    // .nargs('f', 1)
    // .describe('f', 'Load a file')
    // .demandOption(['f'])
    .help('h').argv;

const command = argv._[0];

function signUp() {
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

      // fs.outputJsonSync(credsFilePath, { email, token });
      // console.log(`Your credentials were saved to: ${credsFilePath}`);
      return { email, password };
    })
    .catch((err) => console.log(err.message));
}

function signIn() {
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
      // fs.outputJsonSync(credsFilePath, { email, token });
      // console.log(`Successfull signed in as ${email}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function saveToken(token: string) {
  fs.outputJsonSync(credsFilePath, { token });
}

function loadToken() {
  try {
    return fs.readJsonSync(credsFilePath)?.token;
  } catch (err) {
    return undefined;
  }
}

if (command === 'init') {
  (async () => {
    if (loadToken()) {
      const { getAnotherToken } = await inquirer.prompt([
        {
          type: 'list',
          name: 'getAnotherToken',
          message: `Token found in ~/${rcFileName}, would you like to use it?`,
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
          return signUp();
        }
      })
      .then(async () => {
        const user = firebase.auth().currentUser;

        if (!user) {
          throw { message: 'User not found' };
        }

        const token = uuid();
        await firebase.firestore().doc(`users/${user.uid}`).set({ token });
        saveToken(token);
        console.log('Cloud Local Storage initialized');
        console.log(`Saved token to ~/${rcFileName}`);
        process.exit(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  })();
}

if (command === 'resetpass') {
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

if (command === 'list') {
  try {
    (async () => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const getStoragesResult = await fetch(
        `${BASE_URL}/getStorages?token=${token}`
      );
      const storages = (await getStoragesResult.json()).storages;

      if (storages.length === 0) {
        console.log('No storages found');
        return;
      }

      console.log('Found the following storages:');
      console.log(
        storages
          .map((storage: string) => {
            return '  - ' + storage;
          })
          .join('\n')
      );

      process.exit(0);
    })();
  } catch (err) {
    console.log({ err });
    console.log(err);
  }
}

if (command === 'create') {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message:
          'Choose a name for your storage (leave empty to name automatically):',
      },
    ])
    .then(async (answers) => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const createStorageResult = await fetch(`${BASE_URL}/createStorage`, {
        method: 'post',
        body: JSON.stringify({ token, name: answers.name }),
      });

      const storageName = (await createStorageResult.json()).name;

      console.log(`Created new storage: ${storageName}`);

      process.exit(0);
    })
    .catch((err) => {
      if (err.message) {
        console.log(err.message);
      }
    });
}
