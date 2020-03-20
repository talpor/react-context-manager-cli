import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import prettier from 'prettier';

import {
  classComponentJs,
  classComponentTs,
  functionComponent
} from '../templates/newComponent';
import {
  classComponentRnJs,
  classComponentRnTs,
  functionComponentRn
} from '../templates/newComponentRn';
import { indexJs } from '../templates/newComponentIndex';
import {
  asyncForEach,
  capFirst,
  findFile,
  findRcm,
  setFramework,
  setType,
  setPrettierOptions,
} from '../utils/helpers';
import paths from '../utils/paths';

export async function createComponent(args) {
  let name;

  let errors = false;
  const foundPkg = findFile('package.json', paths.rootPath);
  const foundRcm = foundPkg && (await findRcm());

  if (foundPkg) {
    if (foundRcm) {
      const foundSrc = findFile('src', paths.rootPath);
      const foundComponents = foundSrc && findFile('components', paths.srcPath);
      if (foundSrc && foundComponents) {
        const type = setType();
        const framework = setFramework();
        const options = setPrettierOptions(type);
        const foundModule = foundPkg && findFile(name, paths.storePath);
        await asyncForEach(args._.slice(1), async name => {
          if (isNaN(parseInt(name.charAt(0)))) {
            if (!foundModule) {
              let directories = [];
              await inquirer
                .prompt([
                  {
                    type: 'rawlist',
                    name: 'template',
                    message: chalk.cyanBright.bold(
                      `Select your template for the ${name} component`
                    ),
                    choices: ['class component', 'function component']
                  }
                ])
                .then(async template => {
                  await fs
                    .readdirSync(paths.storePath)
                    .forEach(async folder => {
                      if (
                        !folder.startsWith('index') &&
                        !folder.startsWith('.')
                      ) {
                        directories.push(folder);
                      }
                    });

                  await inquirer
                    .prompt([
                      {
                        type: 'checkbox',
                        name: 'toAdd',
                        message: chalk.cyanBright.bold(
                          'Which store do you want to link?'
                        ),
                        choices: directories
                      }
                    ])
                    .then(async answers => {
                      let dirString;
                      await asyncForEach(answers.toAdd, async dir => {
                        dirString = `${
                          dirString ? dirString + ',' : ''
                        } "${dir}"`;
                      });

                      fs.mkdirSync(`${paths.componentsPath}/${capFirst(name)}`);
                      fs.mkdirSync(`${paths.componentsPath}/${capFirst(name)}/__tests__`);
                      let componentText;
                      if (framework === 'react') {
                        if (template.template === 'class component') {
                          componentText =
                            type === 'js'
                              ? classComponentJs(name, dirString)
                              : classComponentTs(name, dirString);
                        } else {
                          componentText = functionComponent(name, dirString);
                        }
                      } else {
                        if (template.template === 'class component') {
                          componentText =
                            type === 'js'
                              ? classComponentRnJs(name, dirString)
                              : classComponentRnTs(name, dirString);
                        } else {
                          componentText = functionComponentRn(name, dirString);
                        }
                      }
                        let indexText = indexJs(name);
                        componentText = prettier.format(componentText, options);
                        indexText = prettier.format(indexText, options);
                        fs.writeFileSync(
                          `src/components/${capFirst(name)}/${capFirst(name)}.${type}x`,
                          componentText
                        );
                      fs.writeFileSync(
                        `src/components/${capFirst(name)}/index.${type}`,
                        indexText
                      );
                      fs.writeFileSync(
                        `src/components/${capFirst(name)}/__tests__/${capFirst(name)}.spec.${type}`,
                        ''
                      );
                      console.log(`
      ------- SUCCESSFULLY CREATED ------\n
      - folder: ${chalk.blueBright.bold(
        '/src/components/'
      )}${chalk.blueBright.bold(capFirst(name))}\n
      - file: ${chalk.blueBright.bold(capFirst(name) + '.')}${chalk.blueBright.bold(type + 'x')}\n
      - file: ${chalk.blueBright.bold('index.')}${chalk.blueBright.bold(type)}\n
      - folder: ${chalk.blueBright.bold(
        '/src/components/'
      )}${chalk.blueBright.bold(capFirst(name))}${chalk.blueBright.bold('/__tests__')}\n
      -----------------------------------\n
      `);
                    });
                });
            } else {
              console.log(
                `Component with name ${chalk.redBright.bold(
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
      } else {
        console.log(
          `${chalk.redBright.bold(
            'Process cancelled, please run rcmc init to create src and components folders'
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
