import inquirer from 'inquirer';
import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';

export default function setItem() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'key',
        message:
          'Type a key for your storage (leave empty to name it automatically):',
      },
      {
        type: 'input',
        name: 'data',
        message: 'Type the JSON object you would like to save:',
      },
    ])
    .then(async (answers) => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      const res = await cls.setItem(
        answers.key,
        JSON.parse(answers.data),
        token
      );

      console.log(`Saved with the following key: ${res.key}`);
      process.exit(0);
    })
    .catch((err) => {
      if (err.message) {
        console.log(err.message);
      }
    });
}
