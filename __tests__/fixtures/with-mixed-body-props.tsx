import React, { SFC } from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const { bar, foo = 'FunctionComponent' } = props;

  const props2 = { a: 1, b: 2 };

  const { a = 3, b } = props2;

  return <div>{bar + foo + test + a + b}</div>;
}

const WithMixedBodyVariable: SFC<ComponentProps> = (props) => {
  const { bar, foo = 'WithMixedBodyVariable' } = props;

  const props2 = { a: 1, b: 2 };

  const { a = 3, b } = props2;

  return <div>{bar + foo + test + a + b}</div>;
};

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { bar, foo = 'MemoForwardRefComponent' } = props;

    const props2 = { a: 1, b: 2 };

    const { a = 3, b } = props2;

    return <div ref={ref}>{bar + foo + test + a + b}</div>;
  }),
);

WithMixedBodyVariable.displayName = 'WithMixedBodyVariable';

export { WithMixedBodyVariable };
