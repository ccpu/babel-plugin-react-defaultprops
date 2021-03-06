import { NodePath } from '@babel/core';
import { types as t } from '@babel/core';

export type Path<N> = NodePath<N>;

export interface PluginOptions {
  value: string;
  comments?: boolean;
}

export interface PathInfo {
  props: t.AssignmentPattern[];
  path:
    | Path<t.FunctionDeclaration>
    | Path<t.VariableDeclaration>
    | Path<t.CompletionStatement>;
  componentName: string;
}
