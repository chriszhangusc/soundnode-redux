import styled from 'styled-components';

const Fixed = styled.div`
  display: block;
  position: fixed;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  background-color: ${props => props.bg};
  z-index: ${props => props.z};
  width: ${props => props.width || '100%'};
`;

export default Fixed;
