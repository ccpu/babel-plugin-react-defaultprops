import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { bar = props.foo || 'bar' } = props;
  return <div>{bar}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { bar = props.bar === 'foo' ? 'bar' : 'foo' } = props;
  return <div>{bar}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { bar = props.foo || 'bar' } = props;
  return <div>{bar}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { bar = props.foo || 'bar' } = props;
    return <div ref={ref}>{bar}</div>;
  },
);
