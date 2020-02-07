import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import prettier from 'prettier';

import {
  emptyActionsJs,
  emptyActionsTs,
  crudActionsJs,
  crudActionsTs
} from '../templates/newSubActions';
import { storeJs, storeTs } from '../templates/newSubStore';
import {
  asyncForEach,
  findFile,
  findRcm,
  setType,
  setPrettierOptions,
  generateIndex
} from '../utils/helpers';
import paths from '../utils/paths';

export async function createStore(args) {
  let name;

  let errors = false;
  const foundPkg = findFile('package.json', paths.rootPath);
  const foundRcm = foundPkg && (await findRcm());

  if (foundPkg) {
    if (foundRcm) {
      const foundSrc = findFile('src', paths.rootPath);
      const foundStore = foundSrc && findFile('store', paths.srcPath);
      if (foundSrc && foundStore) {
        const type = setType();
        const options = setPrettierOptions(type);

        await asyncForEach(args._.slice(1), async name => {
          await inquirer
            .prompt([
              {
                type: 'rawlist',
                name: 'template',
                message: chalk.cyanBright.bold(
                  `Select your template for the ${name} actions`
                ),
                choices: ['empty', 'crud']
              }
            ])
            .then(template => {
              const foundModule = foundPkg && findFile(name, paths.storePath);

              if (isNaN(parseInt(name.charAt(0)))) {
                if (!foundModule) {
                  fs.mkdirSync(`${paths.storePath}/${name}`);
                  fs.mkdirSync(`${paths.storePath}/${name}/__tests__`);
                  let storeText = type === 'js' ? storeJs(name) : storeTs(name);
                  let actionsText;
                  if (template.template === 'empty') {
                    actionsText =
                      type === 'js'
                        ? emptyActionsJs(name)
                        : emptyActionsTs(name);
                  } else if (template.template === 'crud') {
                    actionsText =
                      type === 'js' ? crudActionsJs(name) : crudActionsTs(name);
                  }
                  storeText = prettier.format(storeText, options);
                  actionsText = prettier.format(actionsText, options);
                  fs.writeFileSync(
                    `src/store/${name}/store.${type}`,
                    storeText
                  );
                  fs.writeFileSync(
                    `src/store/${name}/actions.${type}`,
                    actionsText
                  );
                  fs.writeFileSync(
                    `src/store/${name}/mocks.${type}`,
                    `export const ${name}Mock = {}`
                  );
                  fs.writeFileSync(
                    `src/store/${name}/__tests__/${name}Store.spec.${type}`,
                    ''
                  );
                  console.log(`
      ------- SUCCESSFULLY CREATED ------\n
      - folder: ${chalk.blueBright.bold('/src/store/')}${chalk.blueBright.bold(
                    name
                  )}\n
      - file: ${chalk.blueBright.bold('store.')}${chalk.blueBright.bold(type)}\n
      - file: ${chalk.blueBright.bold('actions.')}${chalk.blueBright.bold(
                    type
                  )}\n
      - file: ${chalk.blueBright.bold('mocks.')}${chalk.blueBright.bold(type)}\n
      - folder: ${chalk.blueBright.bold('/src/store/')}${chalk.blueBright.bold(
                    name
                  )}${chalk.blueBright.bold('/__tests__')}\n
      -----------------------------------\n
      `);
                } else {
                  console.log(
                    `Store with name ${chalk.redBright.bold(
                      name
                    )} was found. Please try other name`
                  );
                }
              } else {
                console.log(
                  `Forbidden module name ${chalk.redBright.bold(
                    name
                  )}. Please try other name without number at the start`
                );
                errors = true;
              }
            });
        });

        if (!errors) {
          await generateIndex(type, options);
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
    errors = true;
  }
}
