import { types as t } from '@babel/core';

export const getArrowFunction = (
  node: t.CallExpression | t.ArrowFunctionExpression,
) => {
  if (t.isArrowFunctionExpression(node)) {
    return node;
  }

  if (
    t.isMemberExpression(node.callee) &&
    t.isIdentifier(node.callee.object) &&
    t.isIdentifier(node.callee.property)
  ) {
    if (
      node.callee.property.name === 'forwardRef' ||
      node.callee.property.name === 'memo'
    ) {
      const func = node.arguments[0];
      if (t.isArrowFunctionExpression(func)) {
        return func;
      } else if (t.isCallExpression(func)) {
        return getArrowFunction(func);
      }
    }
  }
  return undefined;
};
