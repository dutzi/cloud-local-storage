import inquirer from 'inquirer';
import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';

export default function getItem() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'key',
        message: 'Type a key for your storage:',
      },
    ])
    .then(async (answers) => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const data = await cls.getItem(answers.key, token);

      console.log(JSON.stringify(data, undefined, 2));

      process.exit(0);
    })
    .catch((err) => {
      if (err.message) {
        console.log(err.message);
      }
    });
}
