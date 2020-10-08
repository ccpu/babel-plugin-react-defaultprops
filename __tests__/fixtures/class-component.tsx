import React, { Component, ComponentClass } from 'react';

/**
 * should not transform
 */

export interface ClassComponentProps {
  foo: string;
}

class ClassComponent extends Component<ClassComponentProps> {
  static defaultProps = {
    foo: 'stranger',
  };
  render() {
    return <div></div>;
  }
}

const comp = (ClassComponent as unknown) as ComponentClass<ClassComponentProps>;
export { comp as ClassComponent };
