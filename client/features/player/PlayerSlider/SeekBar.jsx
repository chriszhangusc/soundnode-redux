import styled from 'styled-components';

export default styled.div`
  position: relative;
  height: ${props => props.height || '3px'};
  ${props => props.backgroundColor && `background-color: ${props.backgroundColor}`};
  cursor: pointer;
`;
