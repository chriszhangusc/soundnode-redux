import { css } from 'styled-components';

// #TODO: Refactor as needed
export const textStyles = css`
  color: ${props => (props.inverted ? props.theme.colors.white : props.theme.colors.black)};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize.text};
  font-weight: ${props => (props.bold ? props.theme.fontWeight : 'normal')};
  line-height: ${props => props.theme.lineHeight};
`;

export const margins = css`
  margin-right: ${props => props.mr};
  margin-left: ${props => props.ml};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
`;

export const paddings = css`
  padding-top: ${props => props.pt};
  padding-right: ${props => props.pr};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};
`;

export const centerFixed = css`
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
