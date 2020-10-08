import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const { bar, foo = 'memo' } = props;
  return <div>{bar + foo}</div>;
});

export default MemoComponent;
