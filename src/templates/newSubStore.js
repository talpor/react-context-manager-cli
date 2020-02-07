import { capFirst } from '../utils/helpers';

export const storeJs = function(name) {
  return `export const ${name}Store = {};`
}

export const storeTs = function(name) {
  return `export interface I${capFirst(name)}Store {}

export const ${name}Store = {};`
}
