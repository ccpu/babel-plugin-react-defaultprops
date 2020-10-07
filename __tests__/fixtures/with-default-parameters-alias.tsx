import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent({
  foo = 'func',
  bar: test = 'bar-2',
}: ComponentProps) {
  return <div>{foo + test}</div>;
}

export const VariableComponent = ({
  foo = 'func',
  bar: test = 'bar-2',
}: ComponentProps) => {
  return <div>{foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo(
  ({ foo = 'func', bar: test = 'bar-2' }) => {
    return <div>{foo + test}</div>;
  },
);

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  ({ foo = 'func', bar: test = 'bar-2' }, ref: React.Ref<HTMLDivElement>) => {
    return <div ref={ref}>{foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef(
    ({ foo = 'func', bar: test = 'bar-2' }, ref: React.Ref<HTMLDivElement>) => {
      return <div ref={ref}>{foo + test}</div>;
    },
  ),
);
