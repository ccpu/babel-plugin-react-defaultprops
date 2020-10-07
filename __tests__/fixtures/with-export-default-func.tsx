import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export default function FunctionComponent(props: ComponentProps) {
  const { bar, foo = 'func' } = props;
  return <div>{bar + foo}</div>;
}
