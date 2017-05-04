import React from 'react';
import PropTypes from 'prop-types';
import SongCard from 'client/components/SongCard';
import Spinner from 'client/components/Spinner';
import infiniteScroll from 'client/components/Hocs/InfiniteScroll';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 70px;
`;

const SongCardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function renderSongCardList(trackIds, playlistName) {
  return (
    <SongCardListWrapper>
      {trackIds.map(trackId => (
        <SongCard trackId={trackId} playlistName={playlistName} key={trackId.toString()} />
      ))}
    </SongCardListWrapper>
  );
}

function SongCardList({ fetching, trackIds, playlistName }) {
  return (
    <Wrapper>
      {renderSongCardList(trackIds, playlistName)}
      {fetching && <Spinner />}
    </Wrapper>
  );
}

SongCardList.defaultProps = {
  fetching: false,
  playlistName: '',
  trackIds: [],
};

SongCardList.propTypes = {
  fetching: PropTypes.bool,
  trackIds: PropTypes.arrayOf(PropTypes.number),
  playlistName: PropTypes.string,
};

export default infiniteScroll(SongCardList);
