import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { bar, foo = 'func' } = props;
  return <div>{bar + foo}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const { bar, foo = 'variable' } = props;
  return <div>{bar + foo}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { bar, foo = 'memo' } = props;
  return <div>{bar + foo}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { bar, foo = 'forwardRef' } = props;
    return <div ref={ref}>{bar + foo}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { bar, foo = 'memo-forwardRef' } = props;

    return <div ref={ref}>{bar + foo}</div>;
  }),
);
