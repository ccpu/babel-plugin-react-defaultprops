import { styled, css } from 'styled-components';

const Component = styled.div`
  ${({ height = '100%', width = '100%' }) => css`
    height: ${height};
    width: ${width};
  `}
`;

const Component2 = styled(Component)`
  ${({ color = 'red' }) => css`
    color: ${color};
  `}
`;

export const Component3 = styled(Component)`
  ${({ color2 = 'red' }) => css`
    color: ${color2};
  `}
`;

export const ComponentWithAttrs = styled.div.attrs(({ index = 1 }) => ({
  tabIndex: index,
}))`
  color: blue;
`;

export const Input = styled.input.attrs((props) => ({
  size: props.size || '1em',
  type: 'text',
}))`
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

export { Component, Component2 };
