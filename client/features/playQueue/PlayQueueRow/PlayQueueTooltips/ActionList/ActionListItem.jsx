import styled from 'styled-components';

export default styled.li`
  line-height: 20px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.separatorDark};
  }
`;
