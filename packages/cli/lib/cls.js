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
require("firebase/firestore");
var os_1 = __importDefault(require("os"));
var node_fetch_1 = __importDefault(require("node-fetch"));
// const BASE_URL = 'http://localhost:5011/cloud-local-storage/us-central1';
var isDeveloping = process.env.NODE_ENV === 'development';
var BASE_URL = isDeveloping
    ? 'http://localhost:5011/cloud-local-storage/us-central1'
    : '';
var rcFileName = '.clsrc';
var credsFilePath = path_1.default.resolve(os_1.default.homedir(), rcFileName);
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
function signUp() {
    var _this = this;
    return inquirer_1.default
        .prompt([
        { type: 'input', name: 'email', message: 'Enter your email' },
        { type: 'password', name: 'password', message: 'Choose a password' },
        {
            type: 'password',
            name: 'passwordVerification',
            message: 'Re-type your password',
        },
    ])
        .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, passwordVerification, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = answers.email, password = answers.password, passwordVerification = answers.passwordVerification;
                    if (password !== passwordVerification) {
                        console.log('Passwords mismatch');
                        throw new Error();
                    }
                    return [4 /*yield*/, app_1.default
                            .auth()
                            .createUserWithEmailAndPassword(email, password)];
                case 1:
                    res = _a.sent();
                    if (!res.user) {
                        console.log('Error: Could not create user');
                        throw new Error();
                    }
                    console.log("Created an account for " + email);
                    return [2 /*return*/, { email: email, password: password }];
            }
        });
    }); })
        .catch(function (err) { return console.log(err.message); });
}
function signIn() {
    var _this = this;
    return inquirer_1.default
        .prompt([
        { type: 'input', name: 'email', message: 'Enter your email' },
        { type: 'password', name: 'password', message: 'Enter your password' },
    ])
        .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = answers.email, password = answers.password;
                    return [4 /*yield*/, app_1.default
                            .auth()
                            .signInWithEmailAndPassword(email, password)];
                case 1:
                    res = _a.sent();
                    if (!res.user) {
                        throw { message: 'User not found' };
                    }
                    return [2 /*return*/, { email: email, password: password }];
            }
        });
    }); })
        .catch(function (err) {
        console.log(err.message);
    });
}
function saveToken(token) {
    fs_extra_1.default.outputJsonSync(credsFilePath, { token: token });
}
function loadToken() {
    var _a;
    try {
        return (_a = fs_extra_1.default.readJsonSync(credsFilePath)) === null || _a === void 0 ? void 0 : _a.token;
    }
    catch (err) {
        return undefined;
    }
}
if (command === 'init') {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAnotherToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!loadToken()) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'getAnotherToken',
                                message: "Token found in ~/" + rcFileName + ", would you like to use it?",
                                choices: [
                                    { name: 'Yes, use existing token', value: 'use-existing' },
                                    {
                                        name: 'No, I would like to generate a new token',
                                        value: 'new-token',
                                    },
                                ],
                            },
                        ])];
                case 1:
                    getAnotherToken = (_a.sent()).getAnotherToken;
                    if (getAnotherToken === 'use-existing') {
                        console.log('Cloud Local Storage initialized');
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    inquirer_1.default
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
                        .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
                        var signInOrSignUp;
                        return __generator(this, function (_a) {
                            signInOrSignUp = answers.signInOrSignUp;
                            if (signInOrSignUp === 'sign-in') {
                                return [2 /*return*/, signIn()];
                            }
                            else {
                                return [2 /*return*/, signUp()];
                            }
                            return [2 /*return*/];
                        });
                    }); })
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var user, token;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    user = app_1.default.auth().currentUser;
                                    if (!user) {
                                        throw { message: 'User not found' };
                                    }
                                    token = uuidv4_1.uuid();
                                    return [4 /*yield*/, app_1.default.firestore().doc("users/" + user.uid).set({ token: token })];
                                case 1:
                                    _a.sent();
                                    saveToken(token);
                                    console.log('Cloud Local Storage initialized');
                                    console.log("Saved token to ~/" + rcFileName);
                                    process.exit(0);
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        console.log(err.message);
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
if (command === 'resetpass') {
    inquirer_1.default
        .prompt([{ type: 'input', name: 'email', message: 'Enter your email' }])
        .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
        var email;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = answers.email;
                    return [4 /*yield*/, app_1.default.auth().sendPasswordResetEmail(email, {
                            url: 'https://cls.tools/reset-password',
                        })];
                case 1:
                    _a.sent();
                    console.log('Check you inbox for instructions');
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) {
        console.log(err.message);
    });
}
if (command === 'list') {
    try {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, getStoragesResult, storages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = loadToken();
                        if (!token) {
                            console.log('Token not found, run `cls init` first');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, node_fetch_1.default(BASE_URL + "/getStorages?token=" + token)];
                    case 1:
                        getStoragesResult = _a.sent();
                        return [4 /*yield*/, getStoragesResult.json()];
                    case 2:
                        storages = (_a.sent()).storages;
                        if (storages.length === 0) {
                            console.log('No storages found');
                            return [2 /*return*/];
                        }
                        console.log('Found the following storages:');
                        console.log(storages
                            .map(function (storage) {
                            return '  - ' + storage;
                        })
                            .join('\n'));
                        process.exit(0);
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    catch (err) {
        console.log({ err: err });
        console.log(err);
    }
}
if (command === 'create') {
    inquirer_1.default
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Choose a name for your storage (leave empty to name automatically):',
        },
    ])
        .then(function (answers) { return __awaiter(void 0, void 0, void 0, function () {
        var token, createStorageResult, storageName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = loadToken();
                    if (!token) {
                        console.log('Token not found, run `cls init` first');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, node_fetch_1.default(BASE_URL + "/createStorage", {
                            method: 'post',
                            body: JSON.stringify({ token: token, name: answers.name }),
                        })];
                case 1:
                    createStorageResult = _a.sent();
                    return [4 /*yield*/, createStorageResult.json()];
                case 2:
                    storageName = (_a.sent()).name;
                    console.log("Created new storage: " + storageName);
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) {
        if (err.message) {
            console.log(err.message);
        }
    });
}
