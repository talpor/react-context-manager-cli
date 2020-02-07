#!/usr/bin/env node

import minimist from 'minimist';

import { createStore } from './routes/createSubStore';
import { help } from './routes/help';
import { init } from './routes/createGlobalStore';
import { regenerateIndex } from './routes/generateIndex';
import { removeStore } from './routes/removeSubStore';
import { version } from './routes/version';

export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'version':
      version(args);
      break;

    case 'help':
      help(args);
      break;

    case 'init':
      init(args);
      break;

    case 'create-store':
      createStore(args);
      break;

    case 'remove-store':
      removeStore(args);
      break;

    case 'generate-store-index':
      regenerateIndex(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}