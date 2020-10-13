import { types as t, NodePath } from '@babel/core';
import { getVariableDeclarationProps } from './get-variable-declaration-props';
import { getFunctionDeclarationProps } from './get-function-declaration-props';

export const getPropsFormPath = (
  path: NodePath<t.FunctionDeclaration> | NodePath<t.VariableDeclaration>,
) => {
  const { node } = path;

  if (t.isVariableDeclaration(node)) {
    return getVariableDeclarationProps(path as NodePath<t.VariableDeclaration>);
  } else if (t.isFunctionDeclaration(node)) {
    return getFunctionDeclarationProps(path as NodePath<t.FunctionDeclaration>);
  }
  return undefined;
};
