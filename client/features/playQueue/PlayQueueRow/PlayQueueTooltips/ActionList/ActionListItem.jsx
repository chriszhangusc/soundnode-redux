import styled from 'styled-components';

export default styled.li`
  line-height: 20px;
  padding: 10px;
  text-align: center;
  /* Rounded corder when */
  border-top-left-radius: ${props => props.first && '10px'};
  border-top-right-radius: ${props => props.first && '10px'};
  border-bottom-left-radius: ${props => props.last && '10px'};
  border-bottom-right-radius: ${props => props.last && '10px'};
  border-bottom: ${props => (props.last ? 'none' : `1px solid ${props.theme.colors.separatorDark}`)};
  &:hover {
    cursor: pointer;
    
    background: ${props => props.theme.colors.separatorDark};
  }
`;
