/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { getDefaultProps } from 'babel-plugin-react-defaultprops/utils';

export function FunctionComponent({ bar, foo = 'func' }) {
  const defaultProps = getDefaultProps();
  return <div>{bar + foo}</div>;
}

export const VariableComponent2 = ({ bar, foo = 'variable' }) => {
  const defaultProps = getDefaultProps();
  return bar + foo;
};

export const MemoComponent = React.memo(({ bar, foo = 'memo' }) => {
  const defaultProps = getDefaultProps();

  return <>{bar + foo}</>;
});

export const ForwardRefComponent = React.forwardRef(
  ({ bar, foo = 'forwardRef' }) => {
    const defaultProps = getDefaultProps();

    return <>{bar + foo}</>;
  },
);

export const MemoForwardRefComponent = React.memo(
  React.forwardRef(({ bar, foo = 'memo-forwardRef' }, ref) => {
    const defaultProps = getDefaultProps();

    return <div ref={ref}>{bar + foo}</div>;
  }),
);
