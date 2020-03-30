import { capFirst } from '../utils/helpers';

export const emptyActionsJs = function(name) {
  return `export const ${name}Actions = {
  my${capFirst(name)}Action: (state) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  /** You can add other ${name.toUpperCase()} actions here */
};`;
};

export const emptyActionsTs = function(name) {
  return `import { Scope } from '@talpor/react-context-manager';

  import { IStore } from '../index';

  export interface I${capFirst(name)}Actions extends Scope<IStore> {
  my${name[0].toUpperCase() +
    name.slice(1)}Action: (state: IStore) => () => IStore;
  /** Add your others ${name.toUpperCase()} actions types here */
}

  export const ${name}Actions: I${capFirst(name)}Actions = {
  my${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };

  },
  /** You can add other ${name.toUpperCase()} actions here */
};`;
};

export const crudActionsJs = function(name) {
  return `import { IStore } from '../index';

  export const ${name}Actions = {
  create${capFirst(name)}Action: (state) => () {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  get${capFirst(name)}Action: (state) => () {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  list${capFirst(name)}Action: (state) => () {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  update${capFirst(name)}Action: (state) => () {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  delete${capFirst(name)}Action: (state) => () {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
};`;
};

export const crudActionsTs = function(name) {
  return `import { Scope } from '@talpor/react-context-manager';
  import { IStore } from '../index';

  export interface I${capFirst(name)}Actions extends Scope<IStore> {
    create${capFirst(name)}Action: (state: IStore) => () => IStore;
    get${capFirst(name)}Action: (state: IStore) => () => IStore;
    list${capFirst(name)}Action: (state: IStore) => () => IStore;
    update${capFirst(name)}Action: (state: IStore) => () => IStore;
    delete${capFirst(name)}Action: (state: IStore) => () => IStore;
  }


    export const ${name}Actions:  I${capFirst(name)}Actions= {
  create${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  get${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  list${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  update${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
  delete${capFirst(name)}Action: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      ${name}: {
        ...state.${name},
        /** Your modified ${name.toUpperCase()} store */
      },
      /** Any other scope of your store */
    };
  },
};`;
};
