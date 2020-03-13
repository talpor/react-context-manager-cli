import { capFirst } from '../utils/helpers';

export const indexJs = function(name) {
    return `import { ${capFirst(name)} } from './${capFirst(name)}';

export default ${capFirst(name)};`;
};
