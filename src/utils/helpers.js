import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import prettier from 'prettier';

import paths from './paths';
import { indexJs, indexTs } from '../templates/newStoreIndex';

export const findFile = function(fileName, path) {
  const found = fs.readdirSync(path).some(file => file === fileName);
  return found;
};

export const findRcm = async function() {
  const packagejson = fs.readFileSync('package.json', 'utf8');
  if (JSON.parse(packagejson).dependencies) {
    const foundRcm = Object.keys(JSON.parse(packagejson).dependencies).some(
      dep => dep === '@talpor/react-context-manager'
    );
    if (!foundRcm) {
      const question = await inquirer
        .prompt([
          {
            type: 'confirm',
            default: true,
            name: 'install',
            message: `We detect that you do not have ${chalk.cyanBright.bold(
              '@talpor/react-context-manager'
            )} installed in your project. This is important to assure that the files that have been generated works.\n
Please run "${chalk.cyanBright.bold(
              'yarn add @talpor/react-context-manager'
            )}" or "${chalk.cyanBright.bold(
              'npm install --save @talpor/react-context-manager'
            )}" to add it to your package.json.\n
${chalk.greenBright.bold('Do you want to continue the process?')}`
          }
        ])
        .then(answer => {
          if (answer.install) {
            return true;
          } else {
            return false;
          }
        });
      return question;
    }
    return true;
  } else {
    return false;
  }
};

export const setType = function() {
  const packagejson = fs.readFileSync('package.json', 'utf8');
  let foundTs = false;
  if (JSON.parse(packagejson).dependencies) {
    foundTs = Object.keys(JSON.parse(packagejson).dependencies).some(
      dep => dep === 'typescript'
    );
  }
  if (!foundTs && JSON.parse(packagejson).devDependencies) {
    foundTs = Object.keys(JSON.parse(packagejson).devDependencies).some(
      dep => dep === 'typescript'
    );
  }
  return !foundTs ? 'js' : 'ts';
};

export const setFramework = function() {
  const packagejson = fs.readFileSync('package.json', 'utf8');
  let foundRn = null;
  if (JSON.parse(packagejson).dependencies) {
    foundRn = Object.keys(JSON.parse(packagejson).dependencies).some(
      dep => dep === 'react-native'
    );
  }
  return !foundRn ? 'react' : 'react-native';
};

export const setPrettierOptions = function(type) {
  const foundPrettier = findFile('.prettierrc', paths.rootPath);
  let options = foundPrettier
    ? JSON.parse(fs.readFileSync('.prettierrc', 'utf8'))
    : {
        singleQuote: true,
        tabWidth: 2,
        semi: true
      };
  options.parser = type === 'js' ? 'babel' : 'typescript';
  return options;
};

export const generateIndex = function(type, options) {
  type = type || setType();
  options = options || setPrettierOptions(type);
  inquirer
    .prompt([
      {
        type: 'confirm',
        default: false,
        name: 'overwrite',
        message: chalk.cyanBright.bold(
          'Do you want to overwrite your index of your Store?'
        )
      }
    ])
    .then(answer => {
      if (answer.overwrite) {
        let actionsToWrite = '';
        let storeToWrite = '';
        let importsToWrite = '';
        let storeInterface = '';
        let actionsInterface = '';

        fs.readdirSync(paths.storePath).forEach(folder => {
          if (
            fs.lstatSync(`${paths.storePath}/${folder}`).isDirectory() &&
            !folder.startsWith('index') &&
            !folder.startsWith('.') &&
            !folder.startsWith('mocks')
          ) {
            importsToWrite =
              type === 'js'
                ? `${importsToWrite || ''}
          import { ${folder}Store } from './${folder}/store';
          import { ${folder}Actions } from './${folder}/actions';`
                : `${importsToWrite || ''}
          import { ${folder}Store, I${capFirst(
                    folder
                  )}Store } from './${folder}/store';
          import { ${folder}Actions, I${capFirst(
                    folder
                  )}Actions } from './${folder}/actions';`;

            storeToWrite = `${storeToWrite}
    ${folder}: ${folder}Store,`;

            actionsToWrite = `${actionsToWrite}
    ${folder}: ${folder}Actions,`;

            storeInterface = `${storeInterface}
    ${folder}: I${capFirst(folder)}Store,`;

            actionsInterface = `${actionsInterface}
    ${folder}: I${capFirst(folder)}Actions,`;
          }
        });

        let text =
          type === 'js'
            ? indexJs(importsToWrite, storeToWrite, actionsToWrite)
            : indexTs(
                importsToWrite,
                storeToWrite,
                actionsToWrite,
                storeInterface,
                actionsInterface
              );

        text = prettier.format(text, options);

        fs.writeFileSync(`${paths.storePath}/index.${type}`, text);
        console.log(`
      ------- SUCCESSFULLY GENERATED ------\n
      - file: ${chalk.blueBright.bold('index.')}${chalk.blueBright.bold(type)}\n
      -------------------------------------\n
      `);
      }
    });
};

export const name = msn => {
  console.log(
    chalk.cyanBright(
      figlet.textSync(msn, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const capFirst = name => {
  return name[0].toUpperCase() + name.slice(1);
};
