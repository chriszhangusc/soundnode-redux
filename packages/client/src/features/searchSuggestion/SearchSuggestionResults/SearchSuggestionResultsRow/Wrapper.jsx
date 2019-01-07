import styled from 'styled-components';

export default styled.div`
  padding: 8px 10px;
  display: flex;
  align-items: middle;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;
