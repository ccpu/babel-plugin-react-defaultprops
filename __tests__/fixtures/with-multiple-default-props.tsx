import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { foo = 'func' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { foo = 'func' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { foo = 'func' } = props;
  const { bar = 'bar-1' } = props;
  const { bar: test = 'bar-2' } = props;

  return <div>{bar + foo + test}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'func' } = props;
    const { bar = 'bar-1' } = props;
    const { bar: test = 'bar-2' } = props;

    return <div ref={ref}>{bar + foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'func' } = props;
    const { bar = 'bar-1' } = props;
    const { bar: test = 'bar-2' } = props;

    return <div ref={ref}>{bar + foo + test}</div>;
  }),
);
