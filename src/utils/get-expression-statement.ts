import { PathInfo } from '../typings';
import { types as t } from '@babel/core';

export const getExpressionStatement = (info: PathInfo) => {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier(info.componentName),
        t.identifier('__defaultProps'),
      ),
      t.objectExpression(
        info.props && info.props.length
          ? info.props.map((prop) => {
              return t.objectProperty(prop.left as t.Identifier, prop.right);
            })
          : [],
      ),
    ),
  );
};
