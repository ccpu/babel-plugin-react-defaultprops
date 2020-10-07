export function FunctionComponent(props) {
  const { bar, foo = 'func' } = props;
  return bar + foo;
}
