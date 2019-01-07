import styled from 'styled-components';

/*
 * Not sure which is the better way, having one customizeable component and
 * customize it only by specifying different props.
 * Or, only use styled components, extend based on a base component and customize it by
 * specific css.
 */

const Fixed = styled.div`
  display: block;
  position: fixed;
  /*
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  background-color: ${props => props.bg};
  z-index: ${props => props.z};
  width: ${props => props.width};
  height: ${props => props.height};
  */
`;

export default Fixed;
