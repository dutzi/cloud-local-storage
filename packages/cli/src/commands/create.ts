import inquirer from 'inquirer';
import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';

export default function create() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'key',
        message:
          'Type a key for your storage (leave empty to name it automatically):',
      },
    ])
    .then(async (answers) => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const createdKey = await cls.create(answers.key, token);

      console.log(`Created new storage: ${createdKey}`);

      process.exit(0);
    })
    .catch((err) => {
      if (err.message) {
        console.log(err.message);
      }
    });
}
