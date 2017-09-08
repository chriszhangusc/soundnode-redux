import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: ${props => props.grow && 1};
`;

export default FlexColumn;
