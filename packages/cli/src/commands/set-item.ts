import inquirer from 'inquirer';
import loadToken from '../utils/load-token';
import * as cls from 'cloud-local-storage';
import * as logger from '../utils/logger';
import colorize from '../utils/colorize';

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
        message: 'Type the data you would like to save:',
      },
    ])
    .then(async (answers) => {
      const token = loadToken();

      if (!token) {
        console.log('Token not found, run `cls init` first');
        return;
      }

      let data: any;
      try {
        data = JSON.parse(answers.data);
      } catch (err) {
        data = answers.data;
      }

      const key = await cls.setItem(answers.key, data, token);

      logger.log(
        [
          colorize(`Saved with the following key: `, 'muted', true),
          colorize(key, 'highlighted', true),
        ].join('')
      );
      process.exit(0);
    })
    .catch((err) => {
      if (err.message) {
        logger.error(err.message);
      }
    });
}
