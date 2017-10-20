import React from 'react';
import Icon from 'common/components/icons/Icon';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPlayQueueTitle } from 'features/playQueue/playQueueSelectors';
import Wrapper from './Wrapper';

import ClearIcon from './ClearIcon';

const NowPlayingTitle = styled.div`
  padding: 10px 5px;
  font-size: 1.1rem;
  font-weight: 500;
`;

function PlayQueueHeader({ title }) {
  return (
    <Wrapper>
      <NowPlayingTitle>
        <Icon iconName="podcast" /> {`Now Playing: ${title}`}
      </NowPlayingTitle>
      <ClearIcon />
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    title: getPlayQueueTitle(state),
  };
}

export default connect(mapStateToProps)(PlayQueueHeader);
