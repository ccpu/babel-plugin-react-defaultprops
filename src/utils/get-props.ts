import { types as t } from '@babel/core';

export const getProps = (node: t.FunctionDeclaration) => {
  const properties =
    node.params && t.isObjectPattern(node.params[0])
      ? node.params[0].properties
      : undefined;

  const props = properties.reduce((arr, n) => {
    if (!t.isObjectProperty(n) || !t.isAssignmentPattern(n.value)) {
      return arr;
    }
    arr.push(n.value);
    return arr;
  }, []);

  return props;
};
