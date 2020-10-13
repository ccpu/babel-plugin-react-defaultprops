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
  const { bar = 'FunctionComponent' } = prop1;

  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    const defaultProps = getDefaultProps(props);
    return <div>{bar}</div>;
  };

  return (
    <div>
      {bar}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
}

export const VariableComponent = (props: ComponentProps) => {
  const { bar = 'VariableComponent' } = prop1;

  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    const defaultProps = getDefaultProps(props);
    return <div>{bar}</div>;
  };

  return (
    <div>
      {bar}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { bar = 'MemoComponent' } = prop1;

  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    const defaultProps = getDefaultProps(props);
    return <div>{bar}</div>;
  };

  return (
    <div>
      {bar}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { bar = 'ForwardRefComponent' } = prop1;

    const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
      const { bar = 'inner-bar' } = prop1;
      const defaultProps = getDefaultProps(props);
      return <div>{bar}</div>;
    };

    return (
      <div>
        {bar}
        <InnerComponent />
        <InnerComponent2 />
      </div>
    );
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { bar = 'MemoForwardRefComponent' } = prop1;

    const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
      const { bar = 'inner-bar' } = prop1;
      const defaultProps = getDefaultProps(props);
      return <div>{bar}</div>;
    };

    return (
      <div>
        {bar}
        <InnerComponent />
        <InnerComponent2 />
      </div>
    );
  }),
);
