import styled from 'styled-components';

export default styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;
  width: 100%;
  /* This is not right for replying on parent to be relative */
  position: absolute;
  top: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;
