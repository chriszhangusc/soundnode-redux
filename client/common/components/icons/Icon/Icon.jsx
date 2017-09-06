import styled from 'styled-components';
import { margins, paddings } from 'app/css/mixin';

const color = props => (props.active ? props.activeColor : props.color);

// iconSize: lg(33% increase) 2x 3x 4x 5x
export default styled.i.attrs({
  className: props => `fa fa-fw fa-${props.iconName} fa-${props.iconSize}`,
})`
  ${margins};
  ${paddings};
  color: ${color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;
