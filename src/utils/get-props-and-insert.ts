import {
  getProps,
  getObjectExpression,
  getPropsFormBody,
  setDefaultProps,
} from '.';
import { types as t, NodePath } from '@babel/core';

export const getPropsAndInsert = (
  path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclaration>,
  func: t.FunctionDeclaration,
  componentName: string,
) => {
  const firstParam = func.params.length && func.params[0];

  if (
    firstParam &&
    (t.isObjectExpression(firstParam) || t.isObjectPattern(firstParam))
  ) {
    const exp = getObjectExpression({
      componentName,
      path,
      props: getProps(func),
    });
    setDefaultProps(path, componentName, exp);
  } else if (func.body.body) {
    const assignmentPatterns = getPropsFormBody(func);

    const exp = getObjectExpression({
      componentName,
      path,
      props: assignmentPatterns || [],
    });

    setDefaultProps(path, componentName, exp);
  }
};
