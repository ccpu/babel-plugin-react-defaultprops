import React from 'react';

export function FunctionComponent({ bar, foo = 'func' }) {
  return <div>{bar + foo}</div>;
}

export const VariableComponent2 = ({ bar, foo = 'variable' }) => {
  return bar + foo;
};

export const MemoComponent = React.memo(({ bar, foo = 'memo' }) => {
  return <>{bar + foo}</>;
});

export const ForwardRefComponent = React.forwardRef(
  ({ bar, foo = 'forwardRef' }) => {
    return <>{bar + foo}</>;
  },
);

export const MemoForwardRefComponent = React.memo(
  React.forwardRef(({ bar, foo = 'memo-forwardRef' }, ref) => {
    return <div ref={ref}>{bar + foo}</div>;
  }),
);
