// import * as babel from '@babel/core';
import { PluginOptions, Path } from './typings';
import { PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';
import {
  isComponent,
  getProps,
  getPropsFormBody,
  getArrowFunction,
} from './utils';

interface CurrentItem {
  node: t.FunctionDeclaration | t.VariableDeclarator;
  props: t.AssignmentPattern[];
  path:
    | Path<t.FunctionDeclaration>
    | Path<t.VariableDeclaration>
    | Path<t.CompletionStatement>;
  componentName: string;
}

export default function (): PluginObj<PluginPass & { opts: PluginOptions }> {
  return {
    name: 'css inline',
    visitor: {
      Program: {
        enter: (path) => {
          let currentItem: CurrentItem;

          const items: CurrentItem[] = [];
          let isReactFile = false;

          path.node.body.forEach((node) => {
            if (!t.isImportDeclaration(node)) {
              return;
            }
            if (node.source.value === 'react') {
              isReactFile =
                node.specifiers.find((x) => x.local.name === 'React') !==
                undefined;
            }
          });

          if (!isReactFile) return;

          path.traverse({
            CompletionStatement(path) {
              if (
                currentItem &&
                currentItem.node.end === path.parent.end
                // (currentItem.path.node as any).body.start === path.parent.start
              ) {
                items.push(currentItem);
                currentItem = undefined;
              }
            },

            FunctionDeclaration(path) {
              const { node } = path;

              if (currentItem || !isComponent(node)) return;

              const firstParam = node.params.length && node.params[0];

              const componentName = node.id.name;

              if (
                firstParam &&
                (t.isObjectExpression(firstParam) ||
                  t.isObjectPattern(firstParam))
              ) {
                currentItem = {
                  componentName,
                  node,
                  path,
                  props: getProps(node),
                };
              } else {
                const props = getPropsFormBody(node);

                currentItem = {
                  componentName,
                  node,
                  path,
                  props: props || [],
                };
              }
            },
            // `const Foo = (props: Props) => {};`
            // `const Foo: React.FC<Props> = () => {};`
            // `const Ref = React.forwardRef<Element, Props>();`
            // `const Memo = React.memo<Props>();`
            VariableDeclaration(path) {
              const { node } = path;

              if (node.declarations.length === 0) {
                return;
              }

              const declarationNode = node.declarations[0];
              const init = declarationNode.init;

              if (currentItem || !isComponent(declarationNode)) return;
              if (!t.isIdentifier(declarationNode.id)) return;

              const componentName = declarationNode.id.name;

              if (
                !t.isArrowFunctionExpression(init) &&
                !t.isCallExpression(init)
              )
                return;

              const funcNode = getArrowFunction(init);

              if (!funcNode) return;

              const params = getProps(funcNode);

              currentItem = {
                componentName,
                node: funcNode,
                path: path,
                props: params,
              };
            },
          });

          items.forEach((item) => {
            item.path.insertAfter(
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.memberExpression(
                    t.identifier(item.componentName),
                    t.identifier('__defaultProps'),
                  ),
                  t.objectExpression(
                    item.props && item.props.length
                      ? item.props.map((prop) => {
                          return t.objectProperty(
                            prop.left as t.Identifier,
                            prop.right,
                          );
                        })
                      : [],
                  ),
                ),
              ),
            );
          });
        },
      },
    },
  };
}
