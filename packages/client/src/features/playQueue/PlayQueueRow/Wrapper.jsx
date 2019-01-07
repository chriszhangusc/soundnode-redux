import styled from 'styled-components';

export default styled.li`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.fontColor};
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  padding: 12px 20px;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${props => props.active && props.theme.colors.separatorDark};
  &:hover {
    background-color: ${props => props.theme.colors.separatorDark};
  }
`;
