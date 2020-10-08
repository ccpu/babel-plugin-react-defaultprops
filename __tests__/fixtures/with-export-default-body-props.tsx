import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

const VariableComponent = ({ bar, foo = 'variable' }: ComponentProps) => {
  return <div>{bar + foo}</div>;
};

export default VariableComponent;
