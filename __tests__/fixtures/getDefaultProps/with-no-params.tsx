/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { getDefaultProps } from 'babel-plugin-react-defaultprops/utils';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent() {
  const defaultProps = getDefaultProps();
  return <></>;
}

export const VariableComponent2 = () => {
  const defaultProps = getDefaultProps();
  return <></>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo(() => {
  const defaultProps = getDefaultProps();
  return <></>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  () => {
    const defaultProps = getDefaultProps();
    return <></>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef(() => {
    const defaultProps = getDefaultProps();
    return <></>;
  }),
);
