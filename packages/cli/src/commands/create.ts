import inquirer from 'inquirer';
import fetch from 'node-fetch';
import loadToken from '../utils/load-token';
import { BASE_URL } from './../utils/consts';

export default function create() {
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
