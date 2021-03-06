import { PluginOptions } from './typings';
import { PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';
import {
  isImported,
  // getFunctionNode,
  // getProps,
  // isComponent,
  setDefaultProps,
  // isRootPath,
  getComponentRecursively,
} from './utils';
import { getFunctionDeclarationProps } from './get-function-declaration-props';
import { getVariableDeclarationProps } from './get-variable-declaration-props';
import { getPropsFormPath } from './get-props-form-path';

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
              const propInfo = getFunctionDeclarationProps(path);
              if (!propInfo) return;
              setDefaultProps(path, propInfo.componentName, propInfo.props);
            },

            // `const Foo = (props: Props) => {};`
            // `const Foo: React.FC<Props> = () => {};`
            // `const Ref = React.forwardRef<Element, Props>();`
            // `const Memo = React.memo<Props>();`
            VariableDeclaration(path) {
              const declarationNode = path.node.declarations[0];
              const init = declarationNode.init;

              if (
                t.isCallExpression(init) &&
                t.isIdentifier(init.callee) &&
                init.callee.name === 'getDefaultProps' &&
                isImported(path, 'getDefaultProps')
              ) {
                const componentPath = getComponentRecursively(path);
                const propInfo = getPropsFormPath(componentPath, false);

                path.replaceWith(
                  t.variableDeclaration(path.node.kind, [
                    t.variableDeclarator(
                      declarationNode.id,
                      propInfo ? propInfo.props : t.nullLiteral(),
                    ),
                  ]),
                );
                return;
              }

              const propInfo = getVariableDeclarationProps(path);
              if (!propInfo) return;
              setDefaultProps(path, propInfo.componentName, propInfo.props);
            },
          });
        },
      },
    },
  };
}
