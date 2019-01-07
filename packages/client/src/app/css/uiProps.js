import { css } from 'styled-components';

// Prop passing Shorthands for Styled-components

// For future reference
export const borderProps = props => css`
  ${props.borderBottom && `border-bottom: ${props.borderWidth || '1px'} solid ${props.color.border}`};
  ${props.borderTop && `border-top: ${props.borderWidth || '1px'} solid ${props.color.border}`};
  ${props.borderLeft && `border-left: ${props.borderWidth || '1px'} solid ${props.color.border}`};
  ${props.borderRight && `border-right: ${props.borderWidth || '1px'} solid ${props.color.border}`};
`;

export const marginProps = props => css`
  ${props.marginBottom &&
    `margin-bottom: ${typeof props.marginBottom === 'string' ? props.marginBottom : '1em'}`};
  ${props.marginTop &&
    `margin-top: ${typeof props.marginTop === 'string' ? props.marginTop : '1em'}`};
  ${props.marginLeft &&
    `margin-left: ${typeof props.marginLeft === 'string' ? props.marginLeft : '1em'}`};
  ${props.marginRight &&
    `margin-right: ${typeof props.marginRight === 'string' ? props.marginRight : '1em'}`};
  ${props.margin && `margin: ${typeof props.margin === 'string' ? props.margin : '1em'}`};
  ${props.marginVertical &&
    `
    margin-top: ${typeof props.marginVertical === 'string' ? props.marginVertical : '1em'}
    margin-bottom: ${typeof props.marginVertical === 'string' ? props.marginVertical : '1em'}
  `};
  ${props.marginHorizontal &&
    `
    margin-left: ${typeof props.marginHorizontal === 'string' ? props.marginHorizontal : '1em'}
    margin-right: ${typeof props.marginHorizontal === 'string' ? props.marginHorizontal : '1em'}
  `};
`;

// An example of how you can use it with your components

// const SomeDiv = styled.div`${borderProps} ${marginProps};`;

// This lets you pass all borderProps to the component like so:
