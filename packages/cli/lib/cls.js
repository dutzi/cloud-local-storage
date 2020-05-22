#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
require("firebase/firestore");
var list_1 = __importDefault(require("./commands/list"));
var create_1 = __importDefault(require("./commands/create"));
var reset_password_1 = __importDefault(require("./commands/reset-password"));
var init_1 = __importDefault(require("./commands/init"));
var isDeveloping = process.env.NODE_ENV === 'development';
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
if (isDeveloping) {
    app_1.default.firestore().settings({
        host: 'localhost:8100',
        ssl: false,
    });
}
var argv = yargs_1.default
    .usage('Usage: $0 <command> [options]')
    .command('init', 'Initialize Cloud Local Storage')
    .command('list', 'List all storages')
    .command('create', 'Create new storage')
    .command('resetpass', 'Send reset password link')
    .demandCommand(1)
    .help('h').argv;
var command = argv._[0];
if (command === 'init') {
    init_1.default();
}
if (command === 'resetpass') {
    reset_password_1.default();
}
if (command === 'list') {
    list_1.default();
}
if (command === 'create') {
    create_1.default();
}
