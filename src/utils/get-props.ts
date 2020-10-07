import { types as t } from '@babel/core';
import { getPropsFromObject } from './get-props-from-object';
import { getPropsFormBody } from './get-props-form-body';

export const getProps = (
  node: t.FunctionDeclaration | t.ArrowFunctionExpression,
) => {
  if (!node.params.length) return undefined;

  const firstParam = node.params[0];
  if (t.isObjectPattern(firstParam)) {
    return getPropsFromObject(firstParam.properties);
  }

  const props = getPropsFormBody(node);

  return props;
};
