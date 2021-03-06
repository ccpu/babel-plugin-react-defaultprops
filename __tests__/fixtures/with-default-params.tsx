import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent({ bar, foo = 'func' }: ComponentProps) {
  return <div>{bar + foo}</div>;
}

export const VariableComponent2 = ({ bar, foo = 'variable' }) => {
  return bar + foo;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo(
  ({ bar, foo = 'memo' }) => {
    return <>{bar + foo}</>;
  },
);

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  ({ bar, foo = 'forwardRef' }) => {
    return <>{bar + foo}</>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef(
    ({ bar, foo = 'memo-forwardRef' }, ref: React.Ref<HTMLDivElement>) => {
      return <div ref={ref}>{bar + foo}</div>;
    },
  ),
);
