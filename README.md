# babel-plugin-react-defaultprops

A babel plugin that extracts es6 default parameters and append it to the component property named `__defaultProps`.

## Usage

```
npm install --save-dev babel-plugin-react-defaultprops
```

```
yarn add -D babel-plugin-react-defaultprops
```

Add the plugin to the Babel configuration:

babel.config.js

```
module.exports = {
    plugins: ['babel-plugin-react-defaultprops'],
};
```

## Example

Before:

```js
export function FunctionComponent({ bar, foo = 'func' }) {
  return <div>{bar + foo}</div>;
}
```

After:

```js
function FunctionComponent(_ref) {
  var bar = _ref.bar,
    _ref$foo = _ref.foo,
    foo = _ref$foo === void 0 ? 'func' : _ref$foo;
  return _react['default'].createElement('div', null, bar + foo);
}

FunctionComponent.__defaultProps = {
  foo: 'func',
};
```

Or with defaults in function body:

Before:

```js
export const VariableComponent = (props) => {
  const { bar, foo = 'variable' } = props;
  return <div>{bar + foo}</div>;
};
```

After:

```js
var VariableComponent = function VariableComponent(props) {
  var bar = props.bar,
    _props$foo2 = props.foo,
    foo = _props$foo2 === void 0 ? 'variable' : _props$foo2;
  return _react['default'].createElement('div', null, bar + foo);
};

VariableComponent.__defaultProps = {
  foo: 'variable',
};
```

For more example look into the test folder.

## Utils

- getDefaultProps

To make object form default props, works only inside the function body.

> Does not work in nested component, works only with top level components.

```js
import React from 'react';
import { getDefaultProps } from 'babel-plugin-react-defaultprops/utils';

export function FunctionComponent({ bar, foo = 'func' }) {
  const defaultProps = getDefaultProps();
  return <div>{bar + foo}</div>;
}
```

Transform to:

```js
function FunctionComponent(_ref) {
  var bar = _ref.bar,
    _ref$foo = _ref.foo,
    foo = _ref$foo === void 0 ? 'func' : _ref$foo;

  var defaultProps = {
    foo: 'func',
  };

  return _react['default'].createElement('div', null, bar + foo);
}
```

## Typescript

If using typescript ad following to the`global.d.ts` file:

```ts
declare module 'react' {
  export interface FunctionComponent<P = unknown> {
    __defaultProps?: Partial<P>;
  }
}
export {};
```
