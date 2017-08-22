import styled from 'styled-components';

export default styled.div`
  width: 100%;
  position: absolute;
  top: 50px;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[3]};
  display: block;
  transition: all 0.4s ease-in-out;
  box-shadow: ${props => !props.hidden && '0 0 10px 8px rgba(0, 0, 0, 0.2)'};
  padding: ${props => !props.hidden && '10px 10px 5px 10px'};
  transform: ${props => !props.hidden && 'translateY(0)'};
  max-height: ${props => !props.hidden && '600px'};
`;
