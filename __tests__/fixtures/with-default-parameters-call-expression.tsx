import React, { memo, forwardRef, SFC, Ref } from 'react';

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

export const MemoComponent: SFC<ComponentProps> = memo(
  ({ bar, foo = 'memo' }) => {
    return <>{bar + foo}</>;
  },
);

export const ForwardRefComponent: SFC<ComponentProps> = forwardRef(
  ({ bar, foo = 'forwardRef' }) => {
    return <>{bar + foo}</>;
  },
);

export const MemoForwardRefComponent: SFC<ComponentProps> = memo(
  forwardRef(({ bar, foo = 'memo-forwardRef' }, ref: Ref<HTMLDivElement>) => {
    return <div ref={ref}>{bar + foo}</div>;
  }),
);
