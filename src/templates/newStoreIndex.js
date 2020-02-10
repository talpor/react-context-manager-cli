export const indexJs = function(imports, store, actions) {
    return `/** This is a auto-generated file, please do not modify it */
import { initContext } from '@talpor/react-context-manager';

${imports}

const store = {${store}
};

const actions = {${actions}
};

const ctx = initContext();

export { actions, ctx, store };`;
};

export const indexTs = function(
    imports,
    store,
    actions,
    storeInterface,
    actionsInterface
) {
    return `/** This is a auto-generated file, please do not modify it */
import { GlobalStore, initContext, UnBoundActions } from '@talpor/react-context-manager';

${imports}

export interface IStore extends GlobalStore {${storeInterface}
}

export interface IActions extends UnBoundActions<IStore> {${actionsInterface}
}

const store: IStore = {${store}
};

const actions: IActions = {${actions}
};

const ctx = initContext<IStore, IActions>();

export { actions, ctx, store };`
};
