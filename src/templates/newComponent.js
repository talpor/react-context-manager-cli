import { capFirst } from '../utils/helpers';

export const classComponentJs = function(name, stores) {
  return `import React from 'react';
import { ctx } from '../../store';

import { mapContextToProps } from '@talpor/react-context-manager';

class ${capFirst(name)}Component extends React.Component {
  render() {
    const { actions, store } = this.props;
    return (
      <div className="${capFirst(name)}">
      </div>
    );
  }
}

const ${capFirst(name)} = mapContextToProps(ctx)(${capFirst(name)}Component)(${stores ? stores : ''});
export { ${capFirst(name)} }`;
};

export const classComponentTs = function(name, stores) {
  return `import React from 'react';
import { ctx } from '../../store';

import { mapContextToProps } from '@talpor/react-context-manager';

class ${capFirst(name)}Component extends React.Component<any, any> {
  render() {
    const { actions, store } = this.props;
    return (
      <div className="${capFirst(name)}">
      </div>
    );
  }
}

const ${capFirst(name)} = mapContextToProps(ctx)(${capFirst(name)}Component)(${stores ? stores : ''});
export { ${capFirst(name)} }`;
};

export const functionComponent = function(name) {
  return `import React, { useContext } from 'react';
import { ctx } from '../../store';

const ${capFirst(name)} = () => {
  const store = useContext(ctx.store);
  const actions = useContext(ctx.actions);

  return (
    <div className="${capFirst(name)}">
    </div>
  );
}

export { ${capFirst(name)} };`;
};