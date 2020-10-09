/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';

interface ComponentProps {
  str: string;
  num: number;
  arr: string[];
  obj: {
    foo: string;
  };
  arrObj: { bar: string }[];
  bool: boolean;
  [key: string]: any;
}

export function FunctionComponent(props: ComponentProps) {
  const val = 'foo';
  const {
    str = 'string',
    num = 1,
    bool = true,
    arr = ['item-1'],
    arrObj = [{ bar: 'bar-val' }],
    obj = { foo: 'foo-val' },
    foo = 'func',
    bar: test = 'bar-2',
    prop,
    div = <div />,
    span = <span className={val} />,
  } = props;

  return <div>{foo + test}</div>;
}

export const VariableComponent = (props: ComponentProps) => {
  const val = 'foo';
  const {
    str = 'string',
    num = 1,
    bool = true,
    arr = ['item-1'],
    arrObj = [{ bar: 'bar-val' }],
    obj = { foo: 'foo-val' },
    foo = 'func',
    bar: test = 'bar-2',
    prop,
    div = <div />,
    span = <span className={val} />,
  } = props;

  return <div>{foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo((props) => {
  const val = 'foo';
  const {
    str = 'string',
    num = 1,
    bool = true,
    arr = ['item-1'],
    arrObj = [{ bar: 'bar-val' }],
    obj = { foo: 'foo-val' },
    foo = 'func',
    bar: test = 'bar-2',
    prop,
    div = <div />,
    span = <span className={val} />,
  } = props;

  return <div>{foo + test}</div>;
});

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const val = 'foo';
    const {
      str = 'string',
      num = 1,
      bool = true,
      arr = ['item-1'],
      arrObj = [{ bar: 'bar-val' }],
      obj = { foo: 'foo-val' },
      foo = 'func',
      bar: test = 'bar-2',
      prop,
      div = <div />,
      span = <span className={val} />,
    } = props;

    return <div ref={ref}>{foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const val = 'foo';
    const {
      str = 'string',
      num = 1,
      bool = true,
      arr = ['item-1'],
      arrObj = [{ bar: 'bar-val' }],
      obj = { foo: 'foo-val' },
      foo = 'func',
      bar: test = 'bar-2',
      prop,
      div = <div />,
      span = <span className={val} />,
    } = props;

    return <div ref={ref}>{foo + test}</div>;
  }),
);
