import styled from 'styled-components';

const Border = styled.div`
  border-width: ${props => props.borderWidth};
  border-style: ${props => props.borderStyle || 'solid'};
  border-color: ${props => props.color};
`;

export default Border;
