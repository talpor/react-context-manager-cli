import chalk from 'chalk';

import {
  findFile,
  findRcm,
  generateIndex,
  setPrettierOptions,
  setType
} from '../utils/helpers';
import paths from '../utils/paths';

export async function regenerateIndex(args) {
  const foundPkg = findFile('package.json', paths.rootPath);
  const foundRcm = foundPkg && (await findRcm());

  if (foundPkg) {
    if (foundRcm) {
      const foundSrc = findFile('src', paths.rootPath);
      const foundStore = foundSrc && findFile('store', paths.srcPath);
      if (foundSrc && foundStore) {
        const type = setType();
        const options = setPrettierOptions(type);
        generateIndex(type, options);
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
