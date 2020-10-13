/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { getDefaultProps } from 'babel-plugin-react-defaultprops/utils';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

  const defaultProps = getDefaultProps(props);

  return <div>{foo + test}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

  const defaultProps = getDefaultProps(props);

  return <div>{foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

  const defaultProps = getDefaultProps(props);

  return <div>{foo + test}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

    const defaultProps = getDefaultProps(props);

    return <div ref={ref}>{foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { foo = 'VariableComponent', bar: test = 'bar-2' } = props;

    const defaultProps = getDefaultProps(props);

    return <div ref={ref}>{foo + test}</div>;
  }),
);
