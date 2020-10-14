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
  const getValue = () => 'FunctionComponent';

  const { bar, foo = getValue() } = props;
  const defaultProps = getDefaultProps(props);

  return <div>{bar + foo}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const getValue = () => 'VariableComponent';

  const { bar, foo = getValue() } = props;
  const defaultProps = getDefaultProps(props);

  return <div>{bar + foo}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const getValue = () => 'memo';

  const { bar, foo = getValue() } = props;
  const defaultProps = getDefaultProps(props);

  return <div>{bar + foo}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const getValue = () => 'forwardRef';

    const { bar, foo = getValue() } = props;
    const defaultProps = getDefaultProps(props);

    return <div ref={ref}>{bar + foo}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const getValue = () => 'forwardRef-memo';

    const { bar, foo = getValue() } = props;
    const defaultProps = getDefaultProps(props);

    return <div ref={ref}>{bar + foo}</div>;
  }),
);
