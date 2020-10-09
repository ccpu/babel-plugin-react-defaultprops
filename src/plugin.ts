import { PluginOptions, Path } from './typings';
import { PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';
import { isComponent, getFunctionNode, getPropsAndInsert } from './utils';

const isValidPath = (
  path:
    | Path<t.FunctionDeclaration>
    | Path<t.VariableDeclaration>
    | Path<t.CompletionStatement>
    | Path<t.TaggedTemplateExpression>,
) => {
  if (t.isExportNamedDeclaration(path.parent)) return true;
  if (t.isExportDefaultDeclaration(path.parent)) return true;
  if (t.isProgram(path.parent)) return true;

  return false;
};

export default function (): PluginObj<
  PluginPass & { opts: PluginOptions & { isReactFile: boolean } }
> {
  return {
    manipulateOptions: (_opts, parserOpts) => {
      parserOpts.plugins.push('jsx');
    },
    name: 'react defaultprops',

    visitor: {
      Program: {
        enter: (path) => {
          path.traverse({
            FunctionDeclaration(path) {
              const { node } = path;

              if (!isComponent(node) || !isValidPath(path)) return;

              const componentName = node.id.name;

              getPropsAndInsert(path, node, componentName);
            },

            // `const Foo = (props: Props) => {};`
            // `const Foo: React.FC<Props> = () => {};`
            // `const Ref = React.forwardRef<Element, Props>();`
            // `const Memo = React.memo<Props>();`
            VariableDeclaration(path) {
              const { node } = path;
              if (!node.declarations || node.declarations.length === 0) {
                return;
              }

              const declarationNode = node.declarations[0];
              const init = declarationNode.init;

              if (!isComponent(declarationNode) || !isValidPath(path)) return;

              if (!t.isIdentifier(declarationNode.id)) return;

              const componentName = declarationNode.id.name;

              if (
                !t.isArrowFunctionExpression(init) &&
                !t.isCallExpression(init) &&
                !t.isTaggedTemplateExpression(init)
              ) {
                return;
              }

              const funcNode = getFunctionNode(init);

              if (!funcNode) return;

              getPropsAndInsert(path, funcNode, componentName);
            },
          });
        },
      },
    },
  };
}
