/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface ComponentProps {
  str: string;
  num: number;
  arr: string[];
  obj: {
    foo: string;
  };
  arrObj: { bar: string }[];
  [key: string]: any;
}

export function FunctionComponent({
  str = 'string',
  num = 1,
  bool = true,
  arr = ['item-1'],
  arrObj = [{ bar: 'bar-val' }],
  obj = { foo: 'foo-val' },
  foo = 'func',
  bar: test = 'bar-2',
  prop,
}: ComponentProps) {
  return <div>{foo + test}</div>;
}

export const VariableComponent = ({
  str = 'string',
  num = 1,
  bool = true,
  arr = ['item-1'],
  arrObj = [{ bar: 'bar-val' }],
  obj = { foo: 'foo-val' },
  foo = 'func',
  bar: test = 'bar-2',
  prop,
}: ComponentProps) => {
  return <div>{foo + test}</div>;
};

export const MemoComponent: React.SFC<ComponentProps> = React.memo(
  ({
    str = 'string',
    num = 1,
    bool = true,
    arr = ['item-1'],
    arrObj = [{ bar: 'bar-val' }],
    obj = { foo: 'foo-val' },
    foo = 'func',
    bar: test = 'bar-2',
    prop,
  }) => {
    return <div>{foo + test}</div>;
  },
);

export const ForwardRefComponent: React.SFC<ComponentProps> = React.forwardRef(
  (
    {
      str = 'string',
      num = 1,
      bool = true,
      arr = ['item-1'],
      arrObj = [{ bar: 'bar-val' }],
      obj = { foo: 'foo-val' },
      foo = 'func',
      bar: test = 'bar-2',
      prop,
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return <div ref={ref}>{foo + test}</div>;
  },
);

export const MemoForwardRefComponent: React.SFC<ComponentProps> = React.memo(
  React.forwardRef(
    (
      {
        str = 'string',
        num = 1,
        bool = true,
        arr = ['item-1'],
        arrObj = [{ bar: 'bar-val' }],
        obj = { foo: 'foo-val' },
        foo = 'func',
        bar: test = 'bar-2',
        prop,
      },
      ref: React.Ref<HTMLDivElement>,
    ) => {
      return <div ref={ref}>{foo + test}</div>;
    },
  ),
);
