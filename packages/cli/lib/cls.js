#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var inquirer_1 = __importDefault(require("inquirer"));
var uuidv4_1 = require("uuidv4");
var fs_extra_1 = __importDefault(require("fs-extra"));
var app_1 = __importDefault(require("firebase/app"));
var path_1 = __importDefault(require("path"));
require("firebase/auth");
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
var argv = 
// .alias('h', 'help')
// .epilog('copyright 2019').argv;
yargs_1.default
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
var command = argv._[0];
if (command === 'signup') {
    inquirer_1.default
        .prompt([{ type: 'input', name: 'email', message: 'Enter your email' }])
        .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
        var email, token, res, homedir, credsFilePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = answers.email;
                    token = uuidv4_1.uuid();
                    return [4 /*yield*/, app_1.default
                            .auth()
                            .createUserWithEmailAndPassword(email, token)];
                case 1:
                    res = _a.sent();
                    if (!res.user) {
                        console.log('Error: Could not create user');
                        return [2 /*return*/];
                    }
                    console.log("Created an account for " + email);
                    console.log("Your (secret) token is: " + token);
                    homedir = require('os').homedir();
                    credsFilePath = path_1.default.resolve(homedir, '.cls');
                    fs_extra_1.default.outputJsonSync(credsFilePath, { email: email, token: token });
                    console.log("Your credentials were saved to: " + credsFilePath);
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) { return console.log(err.message); });
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
