# babel-react-defaultprops

A babe plugin that extracts es6 default parameters and append it to the component.

## Usage

```
npm install --save-dev babel-react-defaultprops
```

```
yarn add -D babel-react-defaultprops
```

Add the plugin to the Babel configuration:

babel.config.js

```
module.exports = {
plugins: ['module:babel-react-defaultprops'],
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
  VariableComponent.__defaultProps = {
    foo: 'variable',
  };
  return _react['default'].createElement('div', null, bar + foo);
};
```

For more example look into the test folder.
