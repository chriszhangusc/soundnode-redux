import styled from 'styled-components';

export default styled.button`
  padding: 4px;
  border: none;
  outline: none !important;
  background-color: transparent;
  cursor: ${props => !props.disabled && 'pointer'};
  text-align: center;
`;
