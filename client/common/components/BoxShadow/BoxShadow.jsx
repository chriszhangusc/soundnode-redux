import styled from 'styled-components';
import isNumber from 'lodash/isNumber';
import includes from 'lodash/includes';

function formatPixel(numberOrString) {
  if (isNumber(numberOrString)) {
    return `${numberOrString}px`;
  }
  return includes(numberOrString, 'px') ? numberOrString : `${numberOrString}px`;
}

const offsetXMixin = props => formatPixel(props.offsetX || 0);
const offsetYMixin = props => formatPixel(props.offsetY || 0);
const spreadMixin = props => formatPixel(props.spread || 0);
const blurMixin = props => formatPixel(props.blur || 0);
const shadeMixin = (props) => {
  const { shade } = props;
  const { shades } = props.theme;
  const defaultShadeLevel = 4;
  if (isNumber(shade) && shade >= 0 && shade < shades.length) {
    return shades[shade];
  }
  return shades[defaultShadeLevel];
};
// shade between 0 and props.theme.shades.length

const BoxShadow = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: ${offsetXMixin} ${offsetYMixin} ${blurMixin} ${spreadMixin} ${shadeMixin};
`;

export default BoxShadow;
