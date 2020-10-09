import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { foo = 'FunctionComponent' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { foo = 'VariableComponent' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { foo = 'MemoComponent' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'ForwardRefComponent' } = props;
    const { bar = 'bar-1' } = props;
    const { bar: test = 'bar-2' } = props;

    return <div ref={ref}>{bar + foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'MemoForwardRefComponent' } = props;
    const { bar = 'bar-1' } = props;
    const { bar: test = 'bar-2' } = props;

    return <div ref={ref}>{bar + foo + test}</div>;
  }),
);
