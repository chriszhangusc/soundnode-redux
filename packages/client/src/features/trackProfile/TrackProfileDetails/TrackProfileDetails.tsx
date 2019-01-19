import * as React from 'react';
import styled from 'styled-components';
import Heading from '@soundnode-redux/client/src/common/components/Heading';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import ColumnLayout from '@soundnode-redux/client/src/common/components/layouts/ColumnLayout';
import TrackActions from './TrackActions';

interface Props {
  title?: string;
  username?: string;
  description?: string;
  userRoute?: string;
}

const Description = styled.p`
  max-height: 190px;
  overflow: scroll;
  white-space: pre-wrap;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.fontColorSub};
`;

const Username = styled(RouterLink)`
  font-size: 1.5rem;
`;

function TrackProfileDetails(props: Props) {
  console.log(props);
  const { title = '', username = '', description = '', userRoute = '' } = props;
  return (
    <ColumnLayout width="800px">
      <Heading>{title}</Heading>
      <Username to={userRoute}>{username}</Username>
      <Description>{description}</Description>
      {/* <TrackActions /> */}
    </ColumnLayout>
  );
}

export default TrackProfileDetails;
