import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const getValue = () => 'FunctionComponent';

  const { bar, foo = getValue() } = props;

  return <div>{bar + foo}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const getValue = () => 'VariableComponent';

  const { bar, foo = getValue() } = props;
  return <div>{bar + foo}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const getValue = () => 'memo';

  const { bar, foo = getValue() } = props;
  return <div>{bar + foo}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const getValue = () => 'forwardRef';

    const { bar, foo = getValue() } = props;
    return <div ref={ref}>{bar + foo}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const getValue = () => 'forwardRef-memo';

    const { bar, foo = getValue() } = props;

    return <div ref={ref}>{bar + foo}</div>;
  }),
);
