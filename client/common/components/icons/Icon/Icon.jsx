import styled from 'styled-components';
import { margin } from 'app/css/mixin';

const color = props =>
  (props.active ? props.activeColor : props.color || props.theme.colors.fontColor);

// iconSize: lg(33% increase) 2x 3x 4x 5x
export default styled.i.attrs({
  className: props => `fa fa-${props.iconName} fa-${props.iconSize}`,
})`
  ${margin};
  color: ${color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;
