import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';

import { findFile, generateIndex } from '../utils/helpers';
import paths from '../utils/paths';

export async function removeStore(args) {
  const foundPkg = findFile('package.json', paths.rootPath);
  const foundSrc = foundPkg && findFile('src', paths.rootPath);
  const foundStore = foundSrc && findFile('store', paths.srcPath);

  let directories = [];

  if (foundPkg && foundStore) {
    fs.readdirSync(paths.storePath).forEach(folder => {
      if (!folder.startsWith('index') && !folder.startsWith('.')) {
        directories.push(folder);
      }
    });
    await inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'toRemove',
          message: chalk.cyanBright.bold(
            'Which directory do you want to remove?'
          ),
          choices: directories
        }
      ])
      .then(answer => {
        answer.toRemove.forEach(folder => {
          fs.removeSync(`${paths.storePath}/${folder}`, { recursive: true });
          console.log(`
      ------- SUCCESSFULLY REMOVED ------\n
      - folder: ${chalk.redBright.bold('/src/store/')}${chalk.redBright.bold(
            folder
          )}\n
      -----------------------------------\n`);
        });
      });
    generateIndex();
  } else {
    console.log(`No "${chalk.redBright.bold('store')}" folder found`);
  }
}
