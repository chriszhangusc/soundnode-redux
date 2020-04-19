import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { getActiveTrackId } from '@soundnode-redux/client/src/features/player/playerSelectors';
import BoxShadow from '@soundnode-redux/client/src/common/components/BoxShadow';
import PlayerLeftSection from '@soundnode-redux/client/src/features/player/PlayerLeftSection';
import PlayerMiddleSection from '@soundnode-redux/client/src/features/player/PlayerMiddleSection';
import PlayerRightSection from '@soundnode-redux/client/src/features/player/PlayerRightSection';
import PlayerAudio from '@soundnode-redux/client/src/features/player/PlayerAudio';
import PlayerProgressBar from '@soundnode-redux/client/src/features/player/PlayerProgressBar';
import { getStreamUrl } from '@soundnode-redux/client/src/common/utils/apiUtils';
import Wrapper from './Wrapper';
import ContentWrapper from './ContentWrapper';

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    track(id: $id) {
      streamUrl
      streamable
      id
      title
      description
      artworkUrl
      user {
        id
        username
      }
      permalinkUrl
      playbackCount
      likesCount
      duration
      genre
      streamUrl
      commentCount
    }
  }
`;

function Player({ activeTrackId }) {
  if (!activeTrackId) {
    return null;
  }

  const { data } = useQuery(GET_TRACK, {
    variables: { id: activeTrackId },
  });

  if (!data) {
    return null;
  }

  const activeTrack = data.track;

  return (
    <Wrapper>
      <BoxShadow blur={10} spread={4} shade={5}>
        <ContentWrapper>
          <PlayerProgressBar playerTrack={activeTrack} />
          <PlayerAudio streamUrl={getStreamUrl(activeTrack)} />
          <PlayerLeftSection playerTrack={activeTrack} />
          <PlayerMiddleSection />
          <PlayerRightSection playerTrack={activeTrack} />
        </ContentWrapper>
      </BoxShadow>
    </Wrapper>
  );
}

Player.defaultProps = {
  playerTrack: null,
};

Player.propTypes = {
  activeTrack: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    activeTrackId: getActiveTrackId(state),
  };
}

export default connect(mapStateToProps)(Player);
