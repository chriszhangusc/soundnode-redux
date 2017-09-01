import styled from 'styled-components';
import isNumber from 'lodash/isNumber';
import includes from 'lodash/includes';

function formatPixel(numberOrString) {
  if (isNumber(numberOrString)) {
    return `${numberOrString}px`;
  }
  return includes(numberOrString, 'px') ? numberOrString : `${numberOrString}px`;
}

const offsetX = props => formatPixel(props.offsetX || 0);
const offsetY = props => formatPixel(props.offsetY || 0);
const spread = props => formatPixel(props.spread || 0);
const blur = props => formatPixel(props.blur || 0);
const shade = (props) => {
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
  box-shadow: ${offsetX} ${offsetY} ${blur} ${spread} ${shade};
`;

export default BoxShadow;
