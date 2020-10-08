import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent() {
  return <></>;
}

export const VariableComponent2 = () => {
  return <></>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo(() => {
  return <></>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  () => {
    return <></>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef(() => {
    return <></>;
  }),
);
