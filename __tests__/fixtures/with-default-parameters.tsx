export function Component({ bar, foo = 'hello' }) {
  return bar + foo;
}

// export const Component2 = ({ bar, foo = 'hello' }) => {
//   return bar + foo;
// };

// export function Component2({ bar, foo = 'hello' }) {
//   return bar + foo;
// }

// export const Component = ({ bar, foo = 'hello' }) => {
//   return bar + foo;
// };

// interface Props {
//   foo: {
//     baz: string;
//   };
//   bar?: string;
// }

// export function Component2(props: Props) {
//   const {
//     bar,
//     foo: { baz = 'hello' },
//   } = props;
//   return bar + baz;
// }

// export function Component2({ bar, foo = 'hello' }) {
//   return bar + foo;
// }

// export const Component = ({ bar, foo = 'hello' }) => {
//   return bar + foo;
// };

// export const MemoComponent: SFC<any> = memo({ bar, foo = 'hello' } => {
//   return null;
// });

// export const ForwardRefComponent: SFC<any> = forwardRef(
//   ({ bar, foo = 'hello', children }) => {
//     console.log(bar, foo, children);
//     return null;
//   },
// );

// export function Component2({ bar, foo = 'hello'+1 }) {
//   return bar + foo;
// }
