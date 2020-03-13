import chalk from 'chalk';

import { name } from '../utils/helpers';

const menus = {
    main: `
${chalk.greenBright.bold('rcmc [command] <options>')}
  ${chalk.blueBright.bold(
      'init'
  )} .......................... create main store structure
  ${chalk.blueBright.bold('create-store')} ${chalk.yellowBright.bold(
        'names'
    )} ............ create sub stores folder with internal structure
  ${chalk.blueBright.bold(
      'remove-store'
  )} .................. remove sub stores
  ${chalk.blueBright.bold(
      'generate-store-index'
  )} .......... regenerate store index
  ${chalk.blueBright.bold('create-component')} ${chalk.yellowBright.bold(
        'names'
    )} ........ create class or function components
  ${chalk.blueBright.bold(
      'version'
  )} ....................... show package version
  ${chalk.blueBright.bold(
      'help'
  )} .......................... show help menu for a command
`
};

export async function help(args) {
    name('react-context-manager');
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
}
