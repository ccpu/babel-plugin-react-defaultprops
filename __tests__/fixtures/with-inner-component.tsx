import React from 'react';

interface ComponentProps {
  foo: string;
  bar?: string;
}

export function FunctionComponent(props: ComponentProps) {
  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    return <div>{bar}</div>;
  };

  function InnerComponent2(props2: Partial<ComponentProps>) {
    const { bar = 'inner-bar-2' } = props2;
    return <div>{bar}</div>;
  }

  const { bar, foo = 'variable' } = props;

  return (
    <div>
      {bar + foo}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
}

export const VariableComponent = (props: ComponentProps) => {
  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    return <div>{bar}</div>;
  };

  function InnerComponent2(props2: Partial<ComponentProps>) {
    const { bar = 'inner-bar-2' } = props2;
    return <div>{bar}</div>;
  }

  const { bar, foo = 'variable' } = props;

  return (
    <div>
      {bar + foo}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
    const { bar = 'inner-bar' } = prop1;
    return <div>{bar}</div>;
  };

  function InnerComponent2(props2: Partial<ComponentProps>) {
    const { bar = 'inner-bar-2' } = props2;
    return <div>{bar}</div>;
  }

  const { bar, foo = 'variable' } = props;

  return (
    <div>
      {bar + foo}
      <InnerComponent />
      <InnerComponent2 />
    </div>
  );
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
      const { bar = 'inner-bar' } = prop1;
      return <div>{bar}</div>;
    };

    function InnerComponent2(props2: Partial<ComponentProps>) {
      const { bar = 'inner-bar-2' } = props2;
      return <div>{bar}</div>;
    }

    const { bar, foo = 'variable' } = props;

    return (
      <div ref={ref}>
        {bar + foo}
        <InnerComponent />
        <InnerComponent2 />
      </div>
    );
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const InnerComponent: React.SFC<Partial<ComponentProps>> = (prop1) => {
      const { bar = 'inner-bar' } = prop1;
      return <div>{bar}</div>;
    };

    function InnerComponent2(props2: Partial<ComponentProps>) {
      const { bar = 'inner-bar-2' } = props2;
      return <div>{bar}</div>;
    }

    const { bar, foo = 'variable' } = props;

    return (
      <div ref={ref}>
        {bar + foo}
        <InnerComponent />
        <InnerComponent2 />
      </div>
    );
  }),
);
