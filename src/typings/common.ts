import { NodePath } from '@babel/core';

export type Path<N> = NodePath<N>;

export interface PluginOptions {
  value: string;
  comments?: boolean;
}
