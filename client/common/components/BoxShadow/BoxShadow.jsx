import styled from 'styled-components';

const BoxShadow = styled.div`
  box-shadow: ${props => props.offsetX || 0} ${props => props.offsetY || 0} 8px rgba(0, 0, 0, .8);
`;

export default BoxShadow;
