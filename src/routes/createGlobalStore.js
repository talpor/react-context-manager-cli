import fs from 'fs-extra';
import prettier from 'prettier';
import chalk from 'chalk';

import paths from '../utils/paths';
import {
  findFile,
  findRcm,
  setType,
  setPrettierOptions
} from '../utils/helpers';
import { indexJs, indexTs } from '../templates/newStoreIndex';

export async function init(args) {
  const foundPkg = findFile('package.json', paths.rootPath);
  const foundRcm = foundPkg && (await findRcm());

  if (foundPkg) {
    if (foundRcm) {
      const foundSrc = findFile('src', paths.rootPath);
      const foundStore = foundSrc && findFile('store', paths.srcPath);
      const foundComponents = foundSrc && findFile('components', paths.srcPath);
      if (foundSrc) {
        const type = foundSrc ? setType() : 'js';
        const options = setPrettierOptions(type);
        if (!foundStore) {
          fs.mkdirSync(paths.storePath);
          let text =
            type === 'js' ? indexJs('', '', '') : indexTs('', '', '', '', '');

          text = prettier.format(text, options);

          fs.writeFileSync(`src/store/index.${type}`, text);

          console.log(`
      ------- SUCCESSFULLY CREATED ------\n
      - folder: ${chalk.blueBright.bold('/store/')}\n
      - file: ${chalk.blueBright.bold('index.')}${chalk.blueBright.bold(type)}\n
      -----------------------------------\n
      `);
        } else {
          console.log(
            `"${chalk.redBright.bold(
              'Store'
            )}" folder is already created in this project.`
          );
        }
        if (!foundComponents) {
          fs.mkdirSync(paths.componentsPath);

          console.log(`
      ------- SUCCESSFULLY CREATED ------\n
      - folder: ${chalk.blueBright.bold('/components/')}\n
      -----------------------------------\n
      `);
        } else {
          console.log(
            `"${chalk.redBright.bold(
              'Components'
            )}" folder is already created in this project.`
          );
        }

      } else {
        console.log(
          `${chalk.redBright.bold(
            'Process cancelled, please run rcmc init to create src and store folders'
          )}.`
        );
      }
    } else {
      console.log(`${chalk.redBright.bold('Process cancelled')}.`);
    }
  } else {
    console.log(
      `No "${chalk.redBright.bold(
        'package.json'
      )}" found. If you have one, run this command in the root folder of your project.`
    );
  }
}
