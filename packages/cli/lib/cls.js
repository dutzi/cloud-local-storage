#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
require("firebase/functions");
var get_all_keys_1 = __importDefault(require("./commands/get-all-keys"));
var create_1 = __importDefault(require("./commands/create"));
var reset_password_1 = __importDefault(require("./commands/reset-password"));
var init_1 = __importDefault(require("./commands/init"));
var get_item_1 = __importDefault(require("./commands/get-item"));
var set_item_1 = __importDefault(require("./commands/set-item"));
var firebaseConfig = {
    apiKey: 'AIzaSyCig23UBEJNf6o1gItzQWm3tPxqP868vGI',
    authDomain: 'cloud-local-storage.firebaseapp.com',
    databaseURL: 'https://cloud-local-storage.firebaseio.com',
    projectId: 'cloud-local-storage',
    storageBucket: 'cloud-local-storage.appspot.com',
    messagingSenderId: '1040052701754',
    appId: '1:1040052701754:web:96f369cd5489c6f0248303',
    measurementId: 'G-7XSQF4DH9D',
};
app_1.default.initializeApp(firebaseConfig);
if (process.env.CLOUD_LOCAL_STORAGE_DEV === 'true') {
    app_1.default.functions().useFunctionsEmulator('http://localhost:5011');
    // firebase.firestore().settings({
    //   host: 'localhost:8100',
    //   ssl: false,
    // });
}
var argv = yargs_1.default
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initialize Cloud Local Storage')
    .command('get', 'Get storage item')
    .command('set', 'Set storage item')
    .command('get-all-keys', 'List all storages')
    .command('create', 'Create new storage item')
    .command('reset-password', 'Send reset password link')
    .demandCommand(1)
    .help('h').argv;
var command = argv._[0];
if (command === 'init') {
    init_1.default();
}
if (command === 'reset-password') {
    reset_password_1.default();
}
if (command === 'get-all-keys') {
    get_all_keys_1.default();
}
if (command === 'create') {
    create_1.default();
}
if (command === 'get') {
    get_item_1.default();
}
if (command === 'set') {
    set_item_1.default();
}
