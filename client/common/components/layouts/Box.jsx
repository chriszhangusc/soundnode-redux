import styled from 'styled-components';

const Box = styled.div`
  display: block;
  width: ${props => props.width};
  margin: ${props => props.margin};
`;

export default Box;
