import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { foo = 'FunctionComponent', bar: test = 'bar-2' } = props;

  return <div>{foo + test}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

  return <div>{foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { foo = 'MemoComponent', bar: test = 'bar-2' } = props;

  return <div>{foo + test}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'ForwardRefComponent', bar: test = 'bar-2' } = props;

    return <div ref={ref}>{foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'MemoForwardRefComponent', bar: test = 'bar-2' } = props;

    return <div ref={ref}>{foo + test}</div>;
  }),
);
