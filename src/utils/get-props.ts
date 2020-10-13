import { getPropsFromParams, getObjectExpression, getPropsFormBody } from '.';
import { types as t, NodePath } from '@babel/core';

export const getProps = (
  path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclaration>,
  func: t.FunctionDeclaration,
  componentName: string,
) => {
  const firstParam = func.params.length && func.params[0];

  if (
    firstParam &&
    (t.isObjectExpression(firstParam) || t.isObjectPattern(firstParam))
  ) {
    return getObjectExpression({
      componentName,
      path,
      props: getPropsFromParams(func),
    });
  } else if (func.body.body) {
    const assignmentPatterns = getPropsFormBody(func);

    return getObjectExpression({
      componentName,
      path,
      props: assignmentPatterns || [],
    });
  }
  return undefined;
};
