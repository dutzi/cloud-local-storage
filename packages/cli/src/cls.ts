#!/usr/bin/env node

import yargs from 'yargs';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import getAllKeys from './commands/get-all-keys';
import create from './commands/create';
import resetPassword from './commands/reset-password';
import init from './commands/init';
import getItem from './commands/get-item';
import setItem from './commands/set-item';

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

if (process.env.NODE_ENV === 'development') {
  firebase.functions().useFunctionsEmulator('http://localhost:5011');

  // firebase.firestore().settings({
  //   host: 'localhost:8100',
  //   ssl: false,
  // });
}

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('init', 'Initialize Cloud Local Storage')
  .command('get', 'Get storage item')
  .command('set', 'Set storage item')
  .command('get-all-keys', 'List all storages')
  .command('create', 'Create new storage item')
  .command('reset-password', 'Send reset password link')
  .demandCommand(1)
  .help('h').argv;

const command = argv._[0];

if (command === 'init') {
  init();
}

if (command === 'reset-password') {
  resetPassword();
}

if (command === 'get-all-keys') {
  getAllKeys();
}

if (command === 'create') {
  create();
}

if (command === 'get') {
  getItem();
}

if (command === 'set') {
  setItem();
}
