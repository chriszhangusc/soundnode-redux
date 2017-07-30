import styled from 'styled-components';

const TrackDescription = styled.p`
  max-height: 190px;
  overflow: scroll;
  white-space: pre-wrap;
  font-size: 0.9rem;
  color: ${props => props.theme.fontColorSub};
`;

export default TrackDescription;
