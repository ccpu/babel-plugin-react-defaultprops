import { getProps, getExpressionStatement, getPropsFormBody } from '.';
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
    const exp = getExpressionStatement({
      componentName,
      // node,
      path,
      props: getProps(func),
    });
    path.insertAfter(exp);
  } else if (func.body.body) {
    const props = getPropsFormBody(func);

    const exp = getExpressionStatement({
      componentName,
      // node,
      path,
      props: props || [],
    });

    func.body.body = func.body.body.reduce((arr, node) => {
      if (t.isReturnStatement(node)) {
        arr.push(exp);
      }
      arr.push(node);
      return arr;
    }, []);
  }
};
