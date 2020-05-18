# React Context Manager CLI

This package allows you to create an **store** file structure with one command.

It helps you to enforce a standard for your React's apps using Context API for its state management.

This package must be used with our custom [react-context-manager](https://github.com/talpor/react-context-manager) package to connect and manage the store in your app.

If you want to follow a tutorial, we recommend this [post](https://medium.com/swlh/handle-the-state-of-reactjs-applications-in-a-simple-and-efficient-way-225975562f33?source=friends_link&sk=04bff2674ed9a63d799e97327af3bf55)

## Installation

To add `@talpor/react-context-manager-cli` you need to install it globally.

With **npm**:

```console
npm install -g @talpor/react-context-manager-cli
```

**Note:** React Context Manager CLI works with any React Project that has [react-context-manager](https://github.com/talpor/react-context-manager) installed.

## Basic Project Structure

We recommend to use this CLI in projects created with [create-react-app](https://create-react-app.dev/) or projects with similar structures. The app should have:

- A ```package.json``` (in root folder)
- a ```src``` folder (in root folder)
- An ```index.[js|ts]``` (in src folder)

```
myApp
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.[js|ts]
    App.test.[js|ts]
    index.css
    index.[js|ts]
    logo.svg
    store/
      index.[js|ts]
      store1/
        __tests__
        actions.[js|ts]
        mocks.[js|ts]
        store.[js|ts]
      store2/
        __tests__
        actions.[js|ts]
        mocks.[js|ts]
        store.[js|ts]
      store3
        ...
      ...
```

## Basic Usage (Commands)

To use this package, run

```console
react-context-manager-cli
```

We know the name is quite large, so you can also use the shorthand```rcmc```

### rcmc init

This command is used to create a **Store** file structure for the app. The **init** command will create for you a **store** and **component** folders inside /src/. Also, it will create an store **index.[js|ts]** file. The file type (JS or TS) will be determined if a *Typescript* dependency or devDependency exists in the package.json of your project.

***index.ts initial example***
```jsx
/** This is a auto-generated file, please do not modify it*/
import { GlobalStore, initContext, Modifiers } from '@talpor/react-context-manager';

export interface IStore extends GlobalStore {}

export interface IActions extends Modifiers<IStore> {}

const store: IStore = {}

const actions: IActions = {}

const ctx = initContext<IStore, IActions>();

export { actions, ctx, store };

```

### create-store [name1 name2 ...]

This command generates a complete sub-store file structure inside the store folder. **create-store user** will create a folder named **user** with **actions.[js|ts]** and  **store.[js|ts]**. Also, it will create a **/__test__/** folder with a **userStore.spec.[js|ts]** and **mocks.[js|ts]**.

Before the structure creation, the client will ask you if you want an empty actions file or a *CRUD* actions file. The last one, will create a file with generic ***CREATE***, ***GET***, ***LIST***, ***UPDATE*** and ***DELETE*** actions for this sub-store.


***actions.ts example***
```jsx
import { Scope } from '@talpor/react-context-manager';

import { IStore } from '../index';

export interface IUserActions extends Scope<IStore> {
  userAction: (state: IStore) => () => IStore;
  /** Add your others USER actions types here */
}

export const userActions: IUserActions = {
  myUserAction: (state: IStore) => () => {
    /** Do your logic here */
    return {
      ...state,
      user: {
        ...state.user,
        /** Your modified USER store */
      },
      /** Any other scope of your store */
    };
  }
  /** You can add other USER actions here */
};
```

***store.ts example***
```jsx
export interface IUserStore {}

export const userStore: IUserStore = {}
```

After all the elements had been created, the CLI would ask you if you want to overwrite your ***index.[ts|js]*** to reflect the updated changes

***index.ts example regenerated***
```jsx
/** This is a auto-generated file, please do not modify it*/
import { GlobalStore, initContext, Modifiers } from '@talpor/react-context-manager';

import { userStore, IUserStore } from "./user/store"
import { userActions, IUserActions } from "./user/actions"

export interface IStore {
  user: IUserStore
}

export interface IActions {
  user: IUserActions
}

const store: IStore = {
  user: userStore,
}

const actions: IActions = {
  user: userActions,
}

const ctx = initContext<IStore, IActions>();

export { actions, ctx, store };
```
### remove-store

This command allows you to remove one or more stores from your ***/store*** folder. The client will display the store folders that you can remove from the project.

![](https://i.imgur.com/qeK1rXQ.png)

After the folders have been removed from the project, the client will ask you if you want to re-generate the store index without these elements.

### generate-store-index

This command allows you to regenerate the **index.[js|ts]** of your store. if you added one or more folders manually, this command will recognize them and make the imports and generate your store and actions objects.

### create-component [name1 name2 ...]

This command generates a component file structure inside the components folder. **create-component user** will create a folder named **user** with **user.[jsx|tsx]** and **index.[js|ts]**. Also, it will create a **/__test__/** folder with a **user.spec.[js|ts]**.

Before the structure creation, the client will ask you if you want a *Class Component* file or a *Function Component* file. After that, you can select which stores you want to link to your new components.


***User.tsx example -  Class Component connected to user store***
```jsx
import React from 'react';
import { ctx } from '../../store';

import { mapContextToProps } from '@talpor/react-context-manager';

class UserComponent extends React.Component<any, any> {
  render() {
    const { actions, store } = this.props;
    return <div className="User"></div>;
  }
}

const User = mapContextToProps(ctx)(UserComponent)('user');
export { User };
```

***User.tsx example -  Function Component connected to user store***
```jsx
import React, { useContext } from 'react';
import { ctx } from '../../store';

const User = () => {
  const store = useContext(ctx.store);
  const actions = useContext(ctx.actions);

  return <div className="User"></div>;
}

export { User };
```

***index.ts example regenerated***
```jsx
import { User } from './User';

export default User;
```

If you are building a ***React Native*** project, your <div> tags will be replaced for <View> tags, importing them from the 'react-native' package.

### rcmc --help

### rcmc --version

## We use Prettier!

If the project has a **.prettierrc** file or **.prettierrc.js** file in the root directory, **react-context-manager-cli** would use these options to format all the generated files. If you don't have prettier installed the package would use these settings to format the files:
```
{
    singleQuote: true,
    tabWidth: 2,
    semi: true
};
```

## Authors
- Juan Perozo <jperozo@talpor.com> (https://github.com/jperozo)
- Fernando Galindez <fgalindez@talpor.com> (https://github.com/fergalindez)
