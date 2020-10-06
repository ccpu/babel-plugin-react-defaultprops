// import * as babel from '@babel/core';
import { PluginOptions, Path } from './typings';
import { PluginObj, PluginPass } from '@babel/core';
import { types as t } from '@babel/core';
import { isComponent, getProps } from './utils';

function isComponentName(name: string) {
  return !!name.match(/^[A-Z]/u);
}

function isPropsParam(param: t.Node): param is t.Identifier | t.ObjectPattern {
  return (
    // (props: Props)
    (t.isIdentifier(param) && !!param.typeAnnotation) ||
    // ({ ...props }: Props)
    (t.isObjectPattern(param) && !!param.typeAnnotation)
  );
}

const REACT_FC_NAMES = ['SFC', 'StatelessComponent', 'FC', 'FunctionComponent'];

interface CurrentItem {
  node: t.FunctionDeclaration;
  props: t.AssignmentPattern[];
  path: Path<t.FunctionDeclaration>;
}

export default function (): PluginObj<PluginPass & { opts: PluginOptions }> {
  return {
    name: 'css inline',
    visitor: {
      Program: {
        enter: (path, state) => {
          const options = state.opts;

          let replacePath;

          let currentItem: CurrentItem;

          const items: CurrentItem[] = [];

          path.traverse({
            ArrayPattern(path) {
              replacePath = path;
            },
            ArrayTypeAnnotation(path) {
              replacePath = path;
            },
            ArrowFunctionExpression(path) {
              replacePath = path;
            },
            AssignmentExpression(path) {
              replacePath = path;
            },
            AssignmentPattern(path) {
              replacePath = path;
            },
            AwaitExpression(path) {
              replacePath = path;
            },
            BindExpression(path) {
              replacePath = path;
            },
            Block(path) {
              replacePath = path;
            },
            // BlockParent(path) {
            //   replacePath = path;
            // },
            BlockStatement(path) {
              replacePath = path;
            },
            BreakStatement(path) {
              replacePath = path;
            },
            // CallExpression(path) {
            //   replacePath = path;
            // },
            CatchClause(path) {
              replacePath = path;
            },
            CompletionStatement(path) {
              items.push(currentItem);
              currentItem = undefined;
              replacePath = path;
            },
            Conditional(path) {
              replacePath = path;
            },
            ConditionalExpression(path) {
              replacePath = path;
            },
            ContinueStatement(path) {
              replacePath = path;
            },
            DebuggerStatement(path) {
              replacePath = path;
            },
            DecimalLiteral(path) {
              replacePath = path;
            },
            Declaration(path) {
              replacePath = path;
            },
            DeclareExportAllDeclaration(path) {
              replacePath = path;
            },
            DeclareExportDeclaration(path) {
              replacePath = path;
            },
            DeclareFunction(path) {
              replacePath = path;
            },
            Directive(path) {
              replacePath = path;
            },
            // Function(path) {
            //   replacePath = path;
            // },
            // `function Foo(props: Props) {}`
            FunctionDeclaration(path) {
              const { node } = path;

              if (!currentItem && !isComponent(node)) return;

              currentItem = { node, path, props: getProps(node) };
            },
            FunctionExpression(path) {
              replacePath = path;
            },
            // FunctionParent(path) {
            //   replacePath = path;
            // },
            FunctionTypeAnnotation(path) {
              replacePath = path;
            },
            FunctionTypeParam(path) {
              replacePath = path;
            },
            Identifier(path) {
              replacePath = path;
            },
            // Literal(path) {
            //   replacePath = path;
            // },
            MemberExpression(path) {
              replacePath = path;
            },
            Method(path) {
              replacePath = path;
            },
            ObjectExpression(path) {
              replacePath = path;
            },

            ObjectMember(path) {
              replacePath = path;
            },

            ObjectMethod(path) {
              replacePath = path;
            },

            ObjectPattern(path) {
              replacePath = path;
            },

            ObjectProperty(path) {
              replacePath = path;
            },

            ObjectTypeIndexer(path) {
              replacePath = path;
            },

            OptionalMemberExpression(path) {
              replacePath = path;
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

              const decl = node.declarations[0];
              const id = decl.id as t.Identifier;

              let props = null;

              // const Foo: React.FC<Props> = () => {};
              if (
                id.typeAnnotation &&
                (id.typeAnnotation as any).typeAnnotation
              ) {
                const type = (id.typeAnnotation as any).typeAnnotation;

                if (
                  t.isTSTypeReference(type) &&
                  !!type.typeParameters &&
                  type.typeParameters.params.length > 0 &&
                  // React.FC, React.FunctionComponent
                  ((t.isTSQualifiedName(type.typeName) &&
                    t.isIdentifier(type.typeName.left, {
                      name: state.reactImportedName,
                    }) &&
                    REACT_FC_NAMES.some((name) =>
                      t.isIdentifier((type.typeName as any).right, { name }),
                    )) ||
                    // FC, FunctionComponent
                    (!!state.reactImportedName &&
                      REACT_FC_NAMES.some((name) =>
                        t.isIdentifier(type.typeName, { name }),
                      )))
                ) {
                  props = type.typeParameters.params[0];
                }

                // const Foo = (props: Props) => {};
                // const Foo = function(props: Props) {};
              } else if (
                t.isArrowFunctionExpression(decl.init) ||
                t.isFunctionExpression(decl.init)
              ) {
                if (
                  !!state.reactImportedName &&
                  isComponentName(id.name) &&
                  isPropsParam(decl.init.params[0]) &&
                  t.isTSTypeAnnotation(decl.init.params[0].typeAnnotation)
                ) {
                  props = (decl.init.params[0].typeAnnotation as any)
                    .typeAnnotation;
                }

                // const Ref = React.forwardRef();
                // const Memo = React.memo<Props>();
              } else if (t.isCallExpression(decl.init)) {
                const { init } = decl;
                const typeParameters = (init as any).typeParameters;

                if (
                  t.isMemberExpression(init.callee) &&
                  t.isIdentifier(init.callee.object) &&
                  t.isIdentifier(init.callee.property) &&
                  init.callee.object.name === state.reactImportedName
                ) {
                  if (init.callee.property.name === 'forwardRef') {
                    // const Ref = React.forwardRef<Element, Props>();
                    if (
                      !!typeParameters &&
                      t.isTSTypeParameterInstantiation(typeParameters) &&
                      typeParameters.params.length > 1
                    ) {
                      props = typeParameters.params[1];

                      // const Ref = React.forwardRef((props: Props) => {});
                    } else if (
                      t.isArrowFunctionExpression(init.arguments[0]) &&
                      init.arguments[0].params.length > 0 &&
                      isPropsParam(init.arguments[0].params[0]) &&
                      t.isTSTypeAnnotation(
                        init.arguments[0].params[0].typeAnnotation as any,
                      )
                    ) {
                      props = (init.arguments[0].params[0]
                        .typeAnnotation as any).typeAnnotation;
                    }
                  } else if (init.callee.property.name === 'memo') {
                    // const Ref = React.memo<Props>();
                    if (
                      !!typeParameters &&
                      t.isTSTypeParameterInstantiation(typeParameters) &&
                      typeParameters.params.length > 0
                    ) {
                      props = typeParameters.params[0];

                      // const Ref = React.memo((props: Props) => {});
                    } else if (
                      t.isArrowFunctionExpression(init.arguments[0]) &&
                      init.arguments[0].params.length > 0 &&
                      isPropsParam(init.arguments[0].params[0]) &&
                      t.isTSTypeAnnotation(
                        init.arguments[0].params[0].typeAnnotation as any,
                      )
                    ) {
                      props = (init.arguments[0].params[0]
                        .typeAnnotation as any).typeAnnotation;
                    }
                  }
                  console.log(options, replacePath, props, currentItem);
                }
              }
            },
          });

          items.forEach((item) => {
            item.path.insertAfter(
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.memberExpression(
                    t.identifier(item.node.id.name),
                    t.identifier('__defaultProps'),
                  ),
                  t.objectExpression(
                    item.props.map((prop) => {
                      return t.objectProperty(
                        prop.left as t.Identifier,
                        prop.right,
                      );
                    }),
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
