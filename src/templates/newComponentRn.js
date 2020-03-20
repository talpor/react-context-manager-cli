import { capFirst } from '../utils/helpers';

export const classComponentRnJs = function(name, stores) {
  return `import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ctx } from '../../store';

import { mapContextToProps } from '@talpor/react-context-manager';

class ${capFirst(name)}Component extends React.Component {
  render() {
    const { actions, store } = this.props;
    return (
      <View style={styles.${name}}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ${name}: {
    flex: 1
  }
});

const ${capFirst(name)} = mapContextToProps(ctx)(${capFirst(name)}Component)(${stores ? stores : ''});
export { ${capFirst(name)} }`;
};

export const classComponentRnTs = function(name, stores) {
  return `import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ctx } from '../../store';

import { mapContextToProps } from '@talpor/react-context-manager';

class ${capFirst(name)}Component extends React.Component<any, any> {
  render() {
    const { actions, store } = this.props;
    return (
      <View style={styles.${name}}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ${name}: {
    flex: 1
  }
});


const ${capFirst(name)} = mapContextToProps(ctx)(${capFirst(name)}Component)(${stores ? stores : ''});
export { ${capFirst(name)} }`;
};

export const functionComponentRn = function(name) {
  return `import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { ctx } from '../../store';

function ${capFirst(name)}() {
  const store = useContext(ctx.store);
  const actions = useContext(ctx.actions);

  return (
      <View style={styles.${name}}>
      </View>
  );
}

const styles = StyleSheet.create({
  ${name}: {
    flex: 1
  }
});

export { ${capFirst(name)} };`;
};