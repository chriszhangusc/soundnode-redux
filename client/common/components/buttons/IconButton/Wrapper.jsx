import styled from 'styled-components';

export default styled.button`
  padding: 4px;
  border: none;
  /* HACK: This is a hack to fix the ugly outline set by bootstrap */
  outline: none !important;
  background-color: transparent;
  cursor: ${props => !props.disabled && 'pointer'};
  text-align: center;
`;
