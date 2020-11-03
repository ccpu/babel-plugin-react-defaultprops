import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { bar = props.bar === 'foo' ? 'bar' : 'foo' } = props;
  return <div>{bar}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { bar = props.bar === 'foo' ? 'bar' : 'foo' } = props;
  return <div>{bar}</div>;
};
